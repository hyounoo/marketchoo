import React from 'react'
import ProductCard from './ProductCard'

export default function ProductsPage({ products }: { products: any }) {
  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-2xl font-medium">Products</h3>
      <span className="mt-3 text-sm text-gray-500">choo train</span>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {products.map((product: any) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  )
}
