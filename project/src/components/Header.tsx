import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold text-red-600">中国味道</a>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#features" className="hover:text-red-600 transition-colors">特色</a></li>
              <li><a href="#how-it-works" className="hover:text-red-600 transition-colors">工作原理</a></li>
              <li><a href="#testimonials" className="hover:text-red-600 transition-colors">用户评价</a></li>
              <li><a href="#faq" className="hover:text-red-600 transition-colors">常见问题</a></li>
              <li><a href="#pricing" className="hover:text-red-600 transition-colors">价格</a></li>
            </ul>
          </nav>
          
          <div className="hidden md:block">
            <button className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors">
              立即体验
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-red-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block px-3 py-2 hover:bg-red-50 hover:text-red-600 rounded-md">特色</a>
            <a href="#how-it-works" className="block px-3 py-2 hover:bg-red-50 hover:text-red-600 rounded-md">工作原理</a>
            <a href="#testimonials" className="block px-3 py-2 hover:bg-red-50 hover:text-red-600 rounded-md">用户评价</a>
            <a href="#faq" className="block px-3 py-2 hover:bg-red-50 hover:text-red-600 rounded-md">常见问题</a>
            <a href="#pricing" className="block px-3 py-2 hover:bg-red-50 hover:text-red-600 rounded-md">价格</a>
            <div className="pt-4">
              <button className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors">
                立即体验
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;