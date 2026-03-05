import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ProductModel from '@/models/Product';

// GET - Fetch products (with optional filters)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const isActive = searchParams.get('isActive');
    const inStock = searchParams.get('inStock');
    const search = searchParams.get('search');
    const id = searchParams.get('id'); // For single product lookup

    // If ID is provided, return single product
    if (id) {
      let product = null;
      
      // Try to find by numeric id field first
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        product = await ProductModel.findOne({ id: numericId });
      }
      
      // If not found by numeric id, try by _id (ObjectId)
      if (!product && id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await ProductModel.findById(id);
      }
      
      if (product) {
        return NextResponse.json({
          success: true,
          products: [product],
          count: 1
        });
      } else {
        return NextResponse.json({
          success: true,
          products: [],
          count: 0
        });
      }
    }

    // Build query for multiple products
    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (inStock !== null && inStock !== undefined) {
      query.inStock = inStock === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch products
    const products = await ProductModel.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      products,
      count: products.length
    });

  } catch (error: any) {
    console.error('Error fetching products:', error);
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

// POST - Create new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'price', 'primaryImage', 'category', 'brand', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create product
    const product = await ProductModel.create(body);

    return NextResponse.json({
      success: true,
      product,
      message: 'Product created successfully'
    });

  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create product',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
