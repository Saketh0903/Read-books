import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between lg:items-start gap-10 lg:gap-20">
        <div className="lg:w-1/3">
          <h2 className="font-bold text-2xl mb-4">About Us</h2>
          <p className="text-gray-400 leading-relaxed">
            Dive into a vast sea of genres and titles. From timeless classics to contemporary bestsellers, from gripping fiction to insightful non-fiction, our curated library offers something for everyone. Our easy-to-navigate categories and powerful search functionality ensure that you can quickly find the book you're looking for.
          </p>
        </div>
        <div className="lg:w-1/3">
          <h2 className="font-bold text-2xl mb-4">Quick Links</h2>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">Profile</a>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/3">
          <h2 className="font-bold text-2xl mb-4">Contact Us</h2>
          <p className="text-gray-400">Mobile No: <a href="tel:+9999999999" className="hover:text-white transition-colors duration-200">9999999999</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
