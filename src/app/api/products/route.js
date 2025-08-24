import { connectToDB } from '@/lib/dbConncet';
import { NextResponse } from 'next/server';

// ================== Get Product ==================

export async function GET() {
  try {
    const db = await connectToDB();
    const productsCollection = db.collection('products');
    const products = await productsCollection.find().toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// ================== POST Product ==================
export async function POST(req) {
  try {
    const body = await req.json();
    const db = await connectToDB();
    const productsCollection = db.collection('products');

    const result = await productsCollection.insertOne(body);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
