import React from 'react';
import { ListChecks, ThumbsUp, ChefHat } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <ListChecks size={48} className="text-red-500" />,
      title: '填写您的偏好',
      description: '告诉我们您喜欢的口味、菜系、辣度和任何饮食限制，越详细的信息可以帮助我们提供更准确的推荐。',
    },
    {
      icon: <ThumbsUp size={48} className="text-red-500" />,
      title: '获取个性化推荐',
      description: '我们的算法将分析您的偏好，从庞大的中华美食数据库中匹配最适合您的菜品，包括难度、所需时间和适合人群的信息。',
    },
    {
      icon: <ChefHat size={48} className="text-red-500" />,
      title: '开始烹饪之旅',
      description: '根据我们的专业分析和详细信息，您可以根据自己的时间和能力选择最合适的菜肴开始制作，享受烹饪的乐趣。',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">如何工作</h2>
          <p className="text-xl text-gray-600">
            简单三步，发现您的专属中国美食
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="mt-6">
                  <span className="inline-block w-10 h-10 rounded-full bg-red-600 text-white text-xl font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#preference-form" 
            className="inline-block px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg text-lg"
          >
            立即开始
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;