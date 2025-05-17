export interface Dish {
  id: string;
  name: string;
  description: string;
  region: string;
  cuisine: string;
  difficulty: '简单' | '中等' | '复杂';
  cookingTime: string;
  suitableFor: string;
  spicyLevel: string;
  ingredients: string[];
  reason: string;
}