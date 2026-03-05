import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import ProductStateModel from '@/models/ProductState';
import { PRODUCTS as HARDCODED_PRODUCTS } from '@/lib/product-data';

export const dynamic = 'force-dynamic';

// GET - Fetch products with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const inStock = searchParams.get('inStock');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');
    const id = searchParams.get('id');
    
    // Fetch product states from MongoDB
    await connectDB();
    const productStates = await ProductStateModel.find({});
    const statesMap = {} as any;
    productStates.forEach((state: any) => {
      statesMap[state.productId] = state;
    });
    
    // Start with hardcoded products
    let products = HARDCODED_PRODUCTS.map(product => {
      const state = statesMap[product._id];
      return {
        ...product,
        isHidden: state?.isHidden || false,
        isOutOfStock: state?.isOutOfStock || false,
        isRemoved: state?.isRemoved || false,
        inStock: !(state?.isOutOfStock || false),
        isActive: !(state?.isHidden || state?.isRemoved || false)
      };
    });
    
    // Filter out removed and hidden products by default
    products = products.filter(p => !p.isRemoved && !p.isHidden);
    
    // Apply additional filters
    if (category) products = products.filter(p => p.category === category);
    if (brand) products = products.filter(p => p.brand === brand);
    if (inStock === 'true') products = products.filter(p => p.inStock);
    if (search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p._id.toString().includes(search)
      );
    }
    
    // Handle direct ID lookup
    if (id) {
      const product = products.find(p => p._id.toString() === id || p.id.toString() === id);
      return NextResponse.json({
        success: true,
        count: product ? 1 : 0,
        products: product ? [product] : []
      });
    }
    
    return NextResponse.json({
      success: true,
      count: products.length,
      products
    });
    
  } catch (error: any) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to fetch products',
        error: error.message 
      },
      { status: 500 }
    );
  }
}