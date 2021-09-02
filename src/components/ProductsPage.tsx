import React from 'react'
import ProductCard from './ProductCard'

export default function ProductsPage({ products }: { products: any }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product: any) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  )
}
