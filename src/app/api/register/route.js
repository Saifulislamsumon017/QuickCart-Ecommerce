import { connectToDB } from '@/lib/dbConncet';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { name, email, password, image } = await req.json();
    const db = await connectToDB();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      image: image || 'https://i.ibb.co/4pDNDk1/avatar.png',
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, userId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });
  }
}
