import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">中国味道</h3>
            <p className="text-gray-400 mb-4">
              发现中国美食的无限可能，让每一餐都成为一场舌尖上的旅行。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">特色</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">工作原理</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">用户评价</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">常见问题</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">价格</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <a href="mailto:zhangjun475075@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  zhangjun475075@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">+86 123 4567 8910</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">北京市朝阳区建国路88号</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">订阅我们</h3>
            <p className="text-gray-400 mb-4">
              订阅我们的电子邮件，获取最新的中国美食资讯和独家优惠。
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="您的邮箱地址"
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                订阅
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} 中国味道. 版权所有 —— 张俊
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">隐私政策</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">使用条款</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie政策</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;