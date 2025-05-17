import React, { useState } from 'react';

interface PreferenceFormProps {
  onSubmit: (preferences: any) => void;
}

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit }) => {
  const [preferences, setPreferences] = useState({
    tastePreference: [],
    cuisineType: [],
    spicyLevel: '中等',
    dietaryRestrictions: [],
    cookingTime: '适中',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (e.target.type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const { checked } = checkbox;
      
      setPreferences(prev => {
        if (checked) {
          return {
            ...prev,
            [name]: [...prev[name as keyof typeof prev] as string[], value],
          };
        } else {
          return {
            ...prev,
            [name]: (prev[name as keyof typeof prev] as string[]).filter(item => item !== value),
          };
        }
      });
    } else {
      setPreferences(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">告诉我们您的口味偏好</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">口味偏好</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['咸鲜', '麻辣', '酸甜', '清淡', '鲜香', '浓郁'].map(taste => (
              <label key={taste} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="tastePreference"
                  value={taste}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2">{taste}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">菜系偏好</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['川菜', '粤菜', '鲁菜', '苏菜', '浙菜', '闽菜', '湘菜', '徽菜', '家常菜'].map(cuisine => (
              <label key={cuisine} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="cuisineType"
                  value={cuisine}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2">{cuisine}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">辣度偏好</label>
          <select
            name="spicyLevel"
            onChange={handleChange}
            value={preferences.spicyLevel}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="不辣">不辣</option>
            <option value="微辣">微辣</option>
            <option value="中等">中等</option>
            <option value="麻辣">麻辣</option>
            <option value="重辣">重辣</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">饮食限制</label>
          <div className="grid grid-cols-2 gap-2">
            {['无麸质', '素食', '低糖', '低脂', '无海鲜'].map(restriction => (
              <label key={restriction} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="dietaryRestrictions"
                  value={restriction}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2">{restriction}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">烹饪时间</label>
          <select
            name="cookingTime"
            onChange={handleChange}
            value={preferences.cookingTime}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="快速">快速 (15分钟内)</option>
            <option value="适中">适中 (15-30分钟)</option>
            <option value="耐心">耐心 (30分钟以上)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
        >
          获取推荐
        </button>
      </form>
    </div>
  );
};

export default PreferenceForm;