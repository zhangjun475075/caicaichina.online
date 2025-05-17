import { dishes } from './dishData';
import { Dish } from '../types/types';

// 简单的推荐算法实现
export function generateRecommendation(preferences: any): Dish {
  // 计算每道菜与用户偏好的匹配分数
  const scoredDishes = dishes.map(dish => {
    let score = 0;
    
    // 口味匹配
    if (preferences.tastePreference) {
      preferences.tastePreference.forEach((taste: string) => {
        if (dish.taste.includes(taste)) {
          score += 10;
        }
      });
    }
    
    // 菜系匹配
    if (preferences.cuisineType) {
      preferences.cuisineType.forEach((cuisine: string) => {
        if (dish.cuisine === cuisine) {
          score += 15;
        }
      });
    }
    
    // 辣度匹配
    if (dish.spicyLevel === preferences.spicyLevel) {
      score += 10;
    }
    
    // 烹饪时间匹配
    if (dish.cookingTimeCategory === preferences.cookingTime) {
      score += 8;
    }
    
    // 饮食限制匹配 (如果有饮食限制，不符合的会大幅降低分数)
    if (preferences.dietaryRestrictions && preferences.dietaryRestrictions.length > 0) {
      let isCompatible = true;
      
      preferences.dietaryRestrictions.forEach((restriction: string) => {
        if (dish.incompatibleWith.includes(restriction)) {
          isCompatible = false;
        }
      });
      
      if (!isCompatible) {
        score -= 50; // 大幅降低不符合饮食限制的菜品分数
      }
    }
    
    return { dish, score };
  });
  
  // 按分数排序并返回最佳匹配
  scoredDishes.sort((a, b) => b.score - a.score);
  
  // 添加推荐原因
  const topDish = scoredDishes[0].dish;
  topDish.reason = generateRecommendationReason(topDish, preferences);
  
  return topDish;
}

// 生成推荐原因
function generateRecommendationReason(dish: Dish, preferences: any): string {
  let reasons = [];
  
  if (preferences.tastePreference) {
    const matchedTastes = preferences.tastePreference.filter((taste: string) => 
      dish.taste.includes(taste)
    );
    
    if (matchedTastes.length > 0) {
      reasons.push(`符合您喜欢的${matchedTastes.join('、')}口味`);
    }
  }
  
  if (preferences.cuisineType && preferences.cuisineType.includes(dish.cuisine)) {
    reasons.push(`是您偏好的${dish.cuisine}菜系`);
  }
  
  if (dish.spicyLevel === preferences.spicyLevel) {
    reasons.push(`辣度正好符合您的喜好`);
  }
  
  if (dish.cookingTimeCategory === preferences.cookingTime) {
    reasons.push(`烹饪时间符合您的要求`);
  }
  
  // 添加一些随机的专业建议
  const professionalInsights = [
    `这道菜在${dish.region}非常受欢迎`,
    `${dish.name}是${dish.cuisine}的代表性菜品`,
    `特别适合${dish.suitableFor}制作`,
    `采用传统工艺烹制，保留了原汁原味`,
    `使用新鲜时令食材，营养丰富均衡`
  ];
  
  // 随机选择1-2条专业建议
  const insightCount = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < insightCount; i++) {
    const randomIndex = Math.floor(Math.random() * professionalInsights.length);
    reasons.push(professionalInsights[randomIndex]);
    professionalInsights.splice(randomIndex, 1);
  }
  
  return reasons.join('。') + '。';
}