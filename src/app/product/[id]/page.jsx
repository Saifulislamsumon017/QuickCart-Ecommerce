'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Spinner from '@/components/Spinner';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-600">
            <Spinner />
          </p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product || product.message) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center pt-20 h-96">
          <p className="text-lg text-gray-600">Product not found</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="px-6 pt-25 md:px-16 lg:px-32 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Only One Product Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
            <Image
              src={product.image?.[0] || '/placeholder.png'}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-contain w-full h-[400px]"
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>

            <div className="flex items-center gap-4 mt-2">
              <p className="text-2xl font-bold text-orange-600">
                ${product.offerPrice}
              </p>
              <p className="text-lg line-through text-gray-500">
                ${product.price}
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Category: <span className="font-medium">{product.category}</span>
            </p>

            <button className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
