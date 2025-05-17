import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: '推荐的菜品会考虑我的饮食限制吗？',
      answer: '是的，我们的系统会充分考虑您的饮食限制，如素食、无麸质、低糖、低脂等。在填写偏好时，请务必选择您的饮食限制，以便我们提供最适合您的推荐。',
    },
    {
      question: '我是厨房新手，适合使用这个服务吗？',
      answer: '非常适合！我们的菜品推荐会标注难度等级，新手可以优先选择"简单"难度的菜品开始尝试。随着技能提升，您可以逐渐挑战更复杂的菜肴。',
    },
    {
      question: '我能获得多少道菜品的推荐？',
      answer: '免费版用户每次可获得1道精准推荐的菜品。升级至会员后，您可以获得多达5道菜品的同时推荐，以及更详细的烹饪技巧和周计划功能。',
    },
    {
      question: '推荐的菜品会有详细的烹饪步骤吗？',
      answer: '会员用户可以获取完整的、分步骤的烹饪指南，包括视频教程。免费用户可以查看基本的烹饪信息和主要食材列表。',
    },
    {
      question: '我可以保存喜欢的菜品吗？',
      answer: '会员用户可以将喜欢的菜品保存到个人收藏夹，并组织成个性化的菜单或按类别分类。这样您可以随时返回查看喜欢的菜品。',
    },
    {
      question: '系统会根据季节推荐不同的菜品吗？',
      answer: '是的，我们的高级算法会考虑季节因素，在不同时节推荐应季食材制作的菜品，让您享受最新鲜的食材和最适合当季的美食。',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">常见问题</h2>
          <p className="text-xl text-gray-600">
            关于我们的服务，您可能想了解这些
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 border-b border-gray-200 pb-4"
            >
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-red-600" />
                ) : (
                  <ChevronDown size={20} className="text-gray-600" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">还有其他问题？</p>
          <a 
            href="mailto:zhangjun475075@gmail.com" 
            className="text-red-600 font-medium hover:text-red-700"
          >
            联系我们获取帮助
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;