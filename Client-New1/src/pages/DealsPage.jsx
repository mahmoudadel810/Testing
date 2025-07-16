import React from 'react';

const mockDeals = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    sale: true,
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    sale: true,
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    sale: true,
  },
  {
    id: 4,
    name: 'Gaming Mouse',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    sale: true,
  },
  {
    id: 5,
    name: 'Fitness Tracker',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80',
    sale: true,
  },
];

const DealsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Deals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockDeals.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative">
            {product.sale && (
              <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">Sale</span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-2 text-center">{product.name}</h2>
            <div className="text-blue-600 font-bold text-xl mb-2">${product.price.toFixed(2)}</div>
            <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsPage; 