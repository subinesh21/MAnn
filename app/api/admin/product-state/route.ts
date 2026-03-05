import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ProductStateModel from '@/models/ProductState';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');
    
    if (productId) {
      // Get state for a specific product
      const productState = await ProductStateModel.findOne({ productId });
      return NextResponse.json({ 
        success: true, 
        productState: productState || null 
      });
    } else {
      // Get all product states
      const productStates = await ProductStateModel.find({});
      return NextResponse.json({ 
        success: true, 
        productStates 
      });
    }
  } catch (error: any) {
    console.error('Error fetching product state:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch product state',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { productId, isHidden, isOutOfStock, isRemoved } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    // Find existing product state or create new one
    let productState = await ProductStateModel.findOne({ productId });
    
    if (productState) {
      // Update existing
      if (typeof isHidden !== 'undefined') productState.isHidden = isHidden;
      if (typeof isOutOfStock !== 'undefined') productState.isOutOfStock = isOutOfStock;
      if (typeof isRemoved !== 'undefined') productState.isRemoved = isRemoved;
      
      await productState.save();
    } else {
      // Create new
      productState = await ProductStateModel.create({
        productId,
        isHidden: isHidden || false,
        isOutOfStock: isOutOfStock || false,
        isRemoved: isRemoved || false
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      productState 
    });
    
  } catch (error: any) {
    console.error('Error updating product state:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update product state',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
