import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ProductModel from '@/models/Product';

// PUT - Update product (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await request.json();
    const productId = params.id;

    // Update product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        ...body,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: updatedProduct,
      message: 'Product updated successfully'
    });

  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update product',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE - Remove product (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const productId = params.id;

    // Delete product
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      productId
    });

  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to delete product',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
