import React from 'react';

const user = {
  name: 'Mohamed Ezz',
  email: 'mohamed@example.com',
  image: 'https://i.pravatar.cc/150?img=3', // Replace with actual user image
  purchases: [
    { id: 1, item: 'Wireless Headphones', price: '$59.99' },
    { id: 2, item: 'Smart Watch', price: '$129.99' },
    { id: 3, item: 'Bluetooth Speaker', price: '$39.99' },
  ],
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)] p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        <img
          src={user.image}
          alt="User"
          className="w-24 h-24 mx-auto rounded-full border-4 border-emerald-400"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Purchase History</h3>
          <ul className="space-y-2 text-left">
            {user.purchases.map((purchase) => (
              <li
                key={purchase.id}
                className="flex justify-between p-2 bg-emerald-50 rounded-lg shadow-sm"
              >
                <span className="text-gray-800">{purchase.item}</span>
                <span className="font-medium text-emerald-600">{purchase.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
