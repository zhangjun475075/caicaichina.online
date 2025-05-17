import React from 'react';
import { Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: '免费版',
      price: '¥0',
      period: '永久免费',
      description: '体验基本的中国菜推荐功能',
      features: [
        { text: '每次1道菜品推荐', included: true },
        { text: '基本的菜品信息', included: true },
        { text: '口味偏好设置', included: true },
        { text: '广告支持', included: true },
        { text: '详细的烹饪步骤', included: false },
        { text: '收藏喜爱的菜品', included: false },
        { text: '视频教程', included: false },
        { text: '每周菜单规划', included: false },
      ],
      buttonText: '开始免费使用',
      highlight: false,
    },
    {
      name: '高级会员',
      price: '¥29',
      period: '每月',
      description: '解锁完整的个性化烹饪体验',
      features: [
        { text: '每次5道菜品推荐', included: true },
        { text: '详细的菜品信息与分析', included: true },
        { text: '高级口味匹配算法', included: true },
        { text: '无广告体验', included: true },
        { text: '详细的烹饪步骤与技巧', included: true },
        { text: '无限菜品收藏', included: true },
        { text: '专业视频教程', included: true },
        { text: '个性化每周菜单规划', included: true },
      ],
      buttonText: '升级至高级会员',
      highlight: true,
    },
    {
      name: '家庭版',
      price: '¥49',
      period: '每月',
      description: '为全家人打造的完美烹饪方案',
      features: [
        { text: '每次10道菜品推荐', included: true },
        { text: '全面的菜品信息与分析', included: true },
        { text: '家庭成员口味适配', included: true },
        { text: '无广告体验', included: true },
        { text: '详细的烹饪步骤与技巧', included: true },
        { text: '无限菜品收藏与分享', included: true },
        { text: '专业视频教程与直播课', included: true },
        { text: '家庭聚餐菜单定制', included: true },
      ],
      buttonText: '选择家庭版',
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">选择适合您的方案</h2>
          <p className="text-xl text-gray-600">
            无论您是偶尔下厨还是热爱烹饪，我们都有适合您的计划
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${
                plan.highlight ? 'ring-2 ring-red-500 transform scale-105 md:scale-110' : ''
              }`}
            >
              {plan.highlight && (
                <div className="bg-red-600 text-white text-center py-2 font-medium">
                  最受欢迎
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      {feature.included ? (
                        <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X size={20} className="text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.highlight 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-2">所有计划均可随时取消</p>
          <p className="text-sm text-gray-500">价格不含税，可能根据您所在地区有所调整</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;