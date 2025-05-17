import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: '李明',
      role: '上班族',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
      stars: 5,
      quote: '作为一个忙碌的上班族，这个网站简直是救星！推荐的菜品既简单又好吃，让我在繁忙的工作日也能享受到家的味道。',
    },
    {
      name: '王芳',
      role: '家庭主妇',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      stars: 5,
      quote: '每天为家人准备不同的菜是件挑战的事，但有了这个推荐系统，我每周都能发现新的菜谱创意，家人都说我的厨艺越来越好了！',
    },
    {
      name: '张伟',
      role: '美食爱好者',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      stars: 4,
      quote: '我一直想尝试烹饪正宗的中国菜，这个网站帮我发现了许多我从未尝试过的地方特色菜。难度分级很实用，让我循序渐进提升厨艺。',
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">用户评价</h2>
          <p className="text-xl text-gray-600">
            听听其他用户对我们服务的评价
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4" 
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">超过10,000名用户的信赖之选</h3>
              <p className="text-gray-600 mb-6">
                加入我们不断增长的中国美食爱好者社区，发现您的专属味道，提升您的烹饪技巧。无论您是初学者还是有经验的厨师，我们都能为您提供适合的建议。
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-50 px-4 py-2 rounded-lg">
                  <p className="font-bold text-2xl text-red-600">10,000+</p>
                  <p className="text-sm text-gray-500">活跃用户</p>
                </div>
                <div className="bg-gray-50 px-4 py-2 rounded-lg">
                  <p className="font-bold text-2xl text-red-600">500+</p>
                  <p className="text-sm text-gray-500">经典菜品</p>
                </div>
                <div className="bg-gray-50 px-4 py-2 rounded-lg">
                  <p className="font-bold text-2xl text-red-600">4.8/5</p>
                  <p className="text-sm text-gray-500">用户评分</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-5xl font-bold">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;