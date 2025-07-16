import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)] flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-80 shadow-2xl rounded-2xl p-10 max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Pionner</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>Pionner</strong> is your trusted partner in the world of online shopping. We offer high-quality products,
          exceptional customer service, and a seamless shopping experience. From electronics to fashion, our curated
          collections are designed to meet the needs of modern shoppers.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          At Pionner, we believe in innovation, transparency, and putting the customer first. Our team works tirelessly to
          source the best products at competitive prices while maintaining ethical and sustainable practices.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Join us on this journey and experience a better way to shop. Welcome to Pionner.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
