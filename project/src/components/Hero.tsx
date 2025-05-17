import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import PreferenceForm from './PreferenceForm';
import DishRecommendation from './DishRecommendation';
import { generateRecommendation } from '../utils/recommendationEngine';
import { Dish } from '../types/types';

const Hero: React.FC = () => {
  const [recommendedDish, setRecommendedDish] = useState<Dish | null>(null);
  
  const handleFormSubmit = (preferences: any) => {
    const dish = generateRecommendation(preferences);
    setRecommendedDish(dish);
  };

  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
              发现您的<span className="text-red-600">专属</span>中国味道
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              根据您的口味偏好，我们的智能系统将为您推荐完美契合的中华美食，从八大菜系到地方小吃，带您开启舌尖上的中国之旅。
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#preference-form" 
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors inline-flex items-center justify-center"
              >
                开始探索 <ChevronRight size={16} className="ml-1" />
              </a>
              <a 
                href="#how-it-works" 
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
              >
                了解更多
              </a>
            </div>
          </div>
          
          <div id="preference-form" className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {recommendedDish ? (
              <>
                <DishRecommendation dish={recommendedDish} />
                <button 
                  onClick={() => setRecommendedDish(null)}
                  className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  重新选择
                </button>
              </>
            ) : (
              <PreferenceForm onSubmit={handleFormSubmit} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;