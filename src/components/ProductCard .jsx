'use client';
import React from 'react';
import Link from 'next/link';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  const currency = '$';
  const rating = Math.floor(product?.rating || 4);

  // ✅ fallback image fix
  const imageUrl =
    product?.image?.[0] && product.image[0].startsWith('http')
      ? product.image[0]
      : '/fallback.png';

  return (
    <Link
      href={`/product/${product?._id ?? ''}`}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
    >
      {/* Image Section */}
      <div className="group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl}
          alt={product?.name || 'Product image'}
          className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button
          type="button"
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
          onClick={e => e.preventDefault()}
        >
          <Image
            className="h-3 w-3"
            src={assets.heart_icon}
            alt="Add to wishlist"
          />
        </button>
      </div>

      {/* Product Info */}
      <p className="md:text-base font-medium pt-2 w-full truncate">
        {product?.name}
      </p>
      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
        {product?.description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <p className="text-xs">{product?.rating || 4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-3 w-3"
              src={index < rating ? assets.star_icon : assets.star_dull_icon}
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      {/* Price + Buy Button */}
      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">
          {currency}
          {product?.offerPrice}
        </p>
        <button
          type="button"
          className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
          // onClick={e => e.preventDefault()}
          onClick={`/product/${product?._id ?? ''}`}
        >
          {/* Buy Now */}
          See More
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
