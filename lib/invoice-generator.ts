// Invoice Generation Service
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { INVOICE_CONFIG } from './payment-config';
import { GSTCalculator } from './gst-calculator';

// Register fonts
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  total: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface InvoiceData {
  orderId: string;
  orderDate: string;
  customer: CustomerInfo;
  items: InvoiceItem[];
  subtotal: number;
  deliveryCharges: number;
  gstAmount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentId?: string;
}

export class InvoiceGenerator {
  static generateInvoicePDF(invoiceData: InvoiceData): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        const docDefinition = this.createDocumentDefinition(invoiceData);
        
        const pdfDoc = pdfMake.createPdf(docDefinition);
        
        // Generate as blob for email attachment
        pdfDoc.getBlob((blob: Blob) => {
          resolve(blob);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static createDocumentDefinition(invoiceData: InvoiceData) {
    const gstSummary = GSTCalculator.getGSTSummary(
      invoiceData.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category
      })),
      invoiceData.deliveryCharges
    );

    return {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        // Header
        {
          columns: [
            {
              text: 'TAX INVOICE',
              style: 'header',
              fontSize: 24,
              bold: true,
              color: '#2d5a3d'
            },
            {
              alignment: 'right',
              columns: [
                {
                  text: INVOICE_CONFIG.COMPANY_NAME,
                  style: 'companyHeader',
                  bold: true
                },
                {
                  text: INVOICE_CONFIG.COMPANY_ADDRESS,
                  style: 'companyDetails'
                },
                {
                  text: `Email: ${INVOICE_CONFIG.COMPANY_EMAIL}`,
                  style: 'companyDetails'
                },
                {
                  text: `Phone: ${INVOICE_CONFIG.COMPANY_PHONE}`,
                  style: 'companyDetails'
                }
              ]
            }
          ]
        },
        '\n',
        
        // Invoice Details
        {
          columns: [
            {
              width: '*',
              text: [
                { text: 'Bill To:\n', bold: true },
                { text: `${invoiceData.customer.name}\n` },
                { text: `${invoiceData.customer.address}\n` },
                { text: `${invoiceData.customer.city}, ${invoiceData.customer.state} - ${invoiceData.customer.pincode}\n` },
                { text: `Phone: ${invoiceData.customer.phone}\n` },
                { text: `Email: ${invoiceData.customer.email}` }
              ]
            },
            {
              width: 'auto',
              alignment: 'right',
              text: [
                { text: 'Invoice Details:\n', bold: true },
                { text: `Invoice #: ${invoiceData.orderId}\n` },
                { text: `Date: ${invoiceData.orderDate}\n` },
                { text: `Payment Method: ${invoiceData.paymentMethod}\n` },
                invoiceData.paymentId ? { text: `Payment ID: ${invoiceData.paymentId}\n` } : {}
              ]
            }
          ]
        },
        '\n\n',

        // Items Table
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Item Description', style: 'tableHeader' },
                { text: 'Qty', style: 'tableHeader' },
                { text: 'Unit Price', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' }
              ],
              ...invoiceData.items.map(item => [
                { text: item.name, style: 'itemDescription' },
                { text: item.quantity.toString(), style: 'tableCell' },
                { text: `₹${item.price.toFixed(2)}`, style: 'tableCell' },
                { text: `₹${item.total.toFixed(2)}`, style: 'tableCell' }
              ])
            ]
          },
          layout: 'lightHorizontalLines'
        },
        '\n',

        // Summary Section
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              table: {
                widths: ['*', 'auto'],
                body: [
                  ['Subtotal:', `₹${invoiceData.subtotal.toFixed(2)}`],
                  ['Delivery Charges:', `₹${invoiceData.deliveryCharges.toFixed(2)}`],
                  ['GST (18%):', `₹${invoiceData.gstAmount.toFixed(2)}`],
                  [{ text: 'TOTAL AMOUNT:', bold: true }, { text: `₹${invoiceData.totalAmount.toFixed(2)}`, bold: true }]
                ]
              },
              layout: 'noBorders'
            }
          ]
        },
        '\n\n',

        // GST Breakdown
        {
          text: 'GST Breakdown:',
          style: 'sectionHeader'
        },
        {
          table: {
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Category', style: 'tableHeader' },
                { text: 'Taxable Amount', style: 'tableHeader' },
                { text: 'GST Amount', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' }
              ],
              ...gstSummary.items.map(item => [
                { text: item.categoryName, style: 'tableCell' },
                { text: item.taxableAmount, style: 'tableCell' },
                { text: item.gstAmount, style: 'tableCell' },
                { text: item.totalAmount, style: 'tableCell' }
              ]),
              ...(gstSummary.delivery ? [
                [
                  { text: 'Delivery Charges', style: 'tableCell' },
                  { text: gstSummary.delivery.taxableAmount, style: 'tableCell' },
                  { text: gstSummary.delivery.gstAmount, style: 'tableCell' },
                  { text: gstSummary.delivery.totalAmount, style: 'tableCell' }
                ]
              ] : [])
            ]
          },
          layout: 'lightHorizontalLines'
        },
        '\n\n',

        // Footer
        {
          columns: [
            {
              width: '*',
              text: [
                { text: 'Terms & Conditions:\n', bold: true },
                { text: '• Goods once sold will not be taken back\n' },
                { text: '• Subject to jurisdiction of Eco City Courts\n' },
                { text: '• This is computer generated invoice' }
              ],
              fontSize: 8
            },
            {
              width: 'auto',
              alignment: 'right',
              text: [
                { text: 'For Thulira Sustainable Products\n\n\n', alignment: 'center' },
                { text: 'Authorized Signatory', alignment: 'center', bold: true }
              ]
            }
          ]
        },

        // Legal Info
        {
          text: `\nGSTIN: ${INVOICE_CONFIG.GST_NUMBER} | PAN: ${INVOICE_CONFIG.PAN_NUMBER}`,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 20, 0, 0]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 20]
        },
        companyHeader: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        companyDetails: {
          fontSize: 9,
          margin: [0, 0, 0, 2]
        },
        sectionHeader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 10]
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'white',
          fillColor: '#2d5a3d',
          alignment: 'center'
        },
        tableCell: {
          fontSize: 9,
          margin: [0, 5, 0, 5]
        },
        itemDescription: {
          fontSize: 9,
          margin: [0, 5, 0, 5]
        }
      },
      defaultStyle: {
        fontSize: 10
      }
    };
  }

  static generateInvoiceNumber(): string {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `TH-${year}${month}${day}-${random}`;
  }

  static formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}