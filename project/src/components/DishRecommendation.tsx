import React from 'react';
import { ChefHat, MapPin, Clock, BarChart } from 'lucide-react';
import { Dish } from '../types/types';

interface DishRecommendationProps {
  dish: Dish;
}

const DishRecommendation: React.FC<DishRecommendationProps> = ({ dish }) => {
  const difficultyColor = {
    '简单': 'bg-green-100 text-green-800',
    '中等': 'bg-yellow-100 text-yellow-800',
    '复杂': 'bg-red-100 text-red-800'
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">您的专属推荐</h2>
      <p className="text-gray-500 mb-6 text-center">根据您的喜好，为您推荐以下菜品</p>
      
      <div className="rounded-xl overflow-hidden bg-gray-50 mb-6">
        <div className="h-48 bg-gradient-to-r from-red-600 to-red-400 flex items-center justify-center">
          <h3 className="text-3xl font-bold text-white">{dish.name}</h3>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor[dish.difficulty]}`}>
              <ChefHat size={12} className="mr-1" />
              {dish.difficulty}难度
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <MapPin size={12} className="mr-1" />
              {dish.region}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{dish.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <Clock size={16} className="text-gray-400 mr-2" />
              <span className="text-sm">{dish.cookingTime}</span>
            </div>
            <div className="flex items-center">
              <BarChart size={16} className="text-gray-400 mr-2" />
              <span className="text-sm">适合{dish.suitableFor}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">为什么推荐这道菜</h4>
            <p className="text-gray-600 text-sm">{dish.reason}</p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">主要食材</h4>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ingredient, index) => (
                <span key={index} className="px-2 py-1 bg-white rounded border border-gray-200 text-xs">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishRecommendation;