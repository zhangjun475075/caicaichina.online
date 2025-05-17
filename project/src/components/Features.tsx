import React from 'react';
import { Lightbulb, BarChart4, Clock, Map } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Lightbulb size={32} className="text-red-500" />,
      title: '个性化推荐',
      description: '根据您的口味偏好、饮食习惯和限制，智能匹配最适合您的中国菜品。',
    },
    {
      icon: <BarChart4 size={32} className="text-red-500" />,
      title: '专业分析',
      description: '每道菜都配有专业的烹饪难度分析、地域特色解读以及适合人群建议。',
    },
    {
      icon: <Clock size={32} className="text-red-500" />,
      title: '时间友好',
      description: '为忙碌的上班族和家庭主妇提供快速、简单的烹饪方案，节省您的宝贵时间。',
    },
    {
      icon: <Map size={32} className="text-red-500" />,
      title: '文化探索',
      description: '探索中国八大菜系的独特魅力，了解各地方小吃背后的文化故事。',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">专业的中国菜推荐系统</h2>
          <p className="text-xl text-gray-600">
            结合传统与现代，为您提供最适合的中华美食建议
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">八大菜系，数百道经典</h3>
              <p className="text-lg opacity-90 mb-6">
                我们的数据库涵盖了川菜、粤菜、鲁菜、苏菜、浙菜、闽菜、湘菜、徽菜等八大菜系的经典菜肴，以及众多地方特色小吃和家常菜。无论您是追求地道风味，还是寻找家的味道，都能找到满意的选择。
              </p>
              <a href="#pricing" className="inline-block px-6 py-3 bg-white text-red-600 font-medium rounded-md hover:bg-gray-100 transition-colors">
                立即升级
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['川菜', '粤菜', '鲁菜', '苏菜', '浙菜', '闽菜', '湘菜', '徽菜'].map((cuisine, index) => (
                <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4 text-center hover:bg-opacity-20 transition-colors">
                  <p className="text-xl font-medium">{cuisine}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;