import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, X, Home, Users, Phone, User, LogOut, Package } from 'lucide-react';

const SaidePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const menuItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'About Us', icon: Users, href: '/about' },
    { name: 'Contact Us', icon: Phone, href: 'contact' },
    { name: 'Profile', icon: User, href: '/profile' },
  ];

  const productTypes = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Toys & Games'
  ];

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={toggleDrawer}
        className="fixed top-50 right-3 z-50 bg-green-800 text-white p-3 rounded-full shadow-lg  transition-colors duration-200"
      >
        {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed min-h-screen top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                >
                  <item.icon size={20} className="mr-3 text-gray-500 group-hover:text-blue-600" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}

              {/* Product Types Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={toggleProductDropdown}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                >
                  <div className="flex items-center">
                    <Package size={20} className="mr-3 text-gray-500 group-hover:text-blue-600" />
                    <span className="font-medium">Product Types</span>
                  </div>
                  {isProductDropdownOpen ? (
                    <ChevronUp size={16} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-500" />
                  )}
                </button>

                {/* Dropdown Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isProductDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 space-y-1">
                    {productTypes.map((product) => (
                      <a
                        key={product}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                      >
                        {product}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logout */}
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200 group"
              >
                <LogOut size={20} className="mr-3 text-gray-500 group-hover:text-red-600" />
                <span className="font-medium">Logout</span>
              </a>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">Pionner</h3>
              <p className="text-sm text-gray-500">Your trusted partner</p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default SaidePage;