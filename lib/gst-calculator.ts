// GST Calculation Service
import { GST_CONFIG } from './payment-config';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface GSTCalculationResult {
  subtotal: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
  breakdown: {
    taxableAmount: number;
    gstAmount: number;
  }[];
}

export class GSTCalculator {
  static isGSTApplicable(category: string): boolean {
    return GST_CONFIG.APPLICABLE_CATEGORIES.includes(category.toLowerCase());
  }

  static calculateGSTForProduct(product: ProductItem): {
    taxableAmount: number;
    gstAmount: number;
    totalAmount: number;
  } {
    const subtotal = product.price * product.quantity;
    
    if (!this.isGSTApplicable(product.category)) {
      // Non-taxable categories
      return {
        taxableAmount: subtotal,
        gstAmount: 0,
        totalAmount: subtotal
      };
    }

    const gstAmount = subtotal * GST_CONFIG.RATE;
    const totalAmount = subtotal + gstAmount;

    return {
      taxableAmount: subtotal,
      gstAmount,
      totalAmount
    };
  }

  static calculateOrderGST(products: ProductItem[]): GSTCalculationResult {
    let totalTaxableAmount = 0;
    let totalGSTAmount = 0;
    const breakdown = [];

    // Calculate GST for each product
    for (const product of products) {
      const productGST = this.calculateGSTForProduct(product);
      totalTaxableAmount += productGST.taxableAmount;
      totalGSTAmount += productGST.gstAmount;
      
      breakdown.push({
        taxableAmount: productGST.taxableAmount,
        gstAmount: productGST.gstAmount
      });
    }

    return {
      subtotal: totalTaxableAmount,
      gstRate: GST_CONFIG.RATE,
      gstAmount: totalGSTAmount,
      totalAmount: totalTaxableAmount + totalGSTAmount,
      breakdown
    };
  }

  static calculateWithDelivery(
    products: ProductItem[],
    deliveryCost: number
  ): {
    subtotal: number;
    deliveryCharges: number;
    gstOnProducts: number;
    gstOnDelivery: number;
    totalGST: number;
    grandTotal: number;
  } {
    const gstResult = this.calculateOrderGST(products);
    
    // Delivery charges are also subject to GST
    const gstOnDelivery = deliveryCost * GST_CONFIG.RATE;
    const totalGST = gstResult.gstAmount + gstOnDelivery;
    const grandTotal = gstResult.totalAmount + deliveryCost + gstOnDelivery;

    return {
      subtotal: gstResult.subtotal,
      deliveryCharges: deliveryCost,
      gstOnProducts: gstResult.gstAmount,
      gstOnDelivery,
      totalGST,
      grandTotal
    };
  }

  static getGSTBreakdown(products: ProductItem[]): {
    categoryName: string;
    taxableAmount: number;
    gstAmount: number;
    totalAmount: number;
  }[] {
    const categoryBreakdown: Record<string, {
      taxableAmount: number;
      gstAmount: number;
    }> = {};

    // Group products by category
    for (const product of products) {
      const category = product.category.toLowerCase();
      
      if (!categoryBreakdown[category]) {
        categoryBreakdown[category] = {
          taxableAmount: 0,
          gstAmount: 0
        };
      }

      const productGST = this.calculateGSTForProduct(product);
      categoryBreakdown[category].taxableAmount += productGST.taxableAmount;
      categoryBreakdown[category].gstAmount += productGST.gstAmount;
    }

    // Convert to array format
    return Object.entries(categoryBreakdown).map(([categoryName, data]) => ({
      categoryName,
      taxableAmount: data.taxableAmount,
      gstAmount: data.gstAmount,
      totalAmount: data.taxableAmount + data.gstAmount
    }));
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  }

  static getGSTSummary(products: ProductItem[], deliveryCost: number = 0): {
    items: {
      categoryName: string;
      taxableAmount: string;
      gstAmount: string;
      totalAmount: string;
    }[];
    delivery: {
      taxableAmount: string;
      gstAmount: string;
      totalAmount: string;
    } | null;
    totals: {
      subtotal: string;
      totalGST: string;
      grandTotal: string;
    };
  } {
    const breakdown = this.getGSTBreakdown(products);
    const withDelivery = this.calculateWithDelivery(products, deliveryCost);

    const items = breakdown.map(item => ({
      categoryName: item.categoryName,
      taxableAmount: this.formatCurrency(item.taxableAmount),
      gstAmount: this.formatCurrency(item.gstAmount),
      totalAmount: this.formatCurrency(item.totalAmount)
    }));

    const delivery = deliveryCost > 0 ? {
      taxableAmount: this.formatCurrency(deliveryCost),
      gstAmount: this.formatCurrency(withDelivery.gstOnDelivery),
      totalAmount: this.formatCurrency(deliveryCost + withDelivery.gstOnDelivery)
    } : null;

    return {
      items,
      delivery,
      totals: {
        subtotal: this.formatCurrency(withDelivery.subtotal),
        totalGST: this.formatCurrency(withDelivery.totalGST),
        grandTotal: this.formatCurrency(withDelivery.grandTotal)
      }
    };
  }
}