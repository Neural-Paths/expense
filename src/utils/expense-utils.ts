import { Expense } from '@/components/expense/ExpenseCard';

export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const formatCurrency = (
  amount: number, 
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getExpensesByCategory = (expenses: Expense[]): Record<string, number> => {
  return expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);
};

export const getRecentExpenses = (expenses: Expense[], count: number = 5): Expense[] => {
  return [...expenses]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, count);
};

// Empty placeholder functions to replace the mock data generators
export const generateSampleExpenses = (count: number = 0): Expense[] => {
  return [];
};

export const generateSampleBudgetData = () => [
  { name: 'Food', value: 0, color: '#3b82f6', spent: 0 },
  { name: 'Travel', value: 0, color: '#8b5cf6', spent: 0 },
  { name: 'Office', value: 0, color: '#10b981', spent: 0 }
];

export const CATEGORIES = {
  FOOD: 'Food',
  TRAVEL: 'Travel',
  ACCOMMODATION: 'Accommodation',
  TRANSPORT: 'Transport',
  ENTERTAINMENT: 'Entertainment',
  SUPPLIES: 'Supplies',
  DEFAULT: 'Default'
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

export const CATEGORY_EMOJIS: Record<Category, string> = {
  [CATEGORIES.FOOD]: '🍕',
  [CATEGORIES.TRAVEL]: '✈️',
  [CATEGORIES.ACCOMMODATION]: '🏨',
  [CATEGORIES.TRANSPORT]: '🚕',
  [CATEGORIES.ENTERTAINMENT]: '🎭',
  [CATEGORIES.SUPPLIES]: '📦',
  [CATEGORIES.DEFAULT]: '📝'
};

export const detectCategory = (vendor: string, items: Array<{ description: string }> = []): Category => {
  const vendorLower = vendor.toLowerCase();
  const itemDescriptions = items.map(item => item.description.toLowerCase()).join(' ');

  // Food-related keywords
  const foodKeywords = ['restaurant', 'cafe', 'food', 'dining', 'coffee', 'bakery', 'grocer'];
  if (foodKeywords.some(keyword => vendorLower.includes(keyword) || itemDescriptions.includes(keyword))) {
    return CATEGORIES.FOOD;
  }

  // Travel-related keywords
  const travelKeywords = ['airline', 'flight', 'airport', 'travel', 'tour'];
  if (travelKeywords.some(keyword => vendorLower.includes(keyword) || itemDescriptions.includes(keyword))) {
    return CATEGORIES.TRAVEL;
  }

  // Accommodation keywords
  const accommodationKeywords = ['hotel', 'motel', 'inn', 'resort', 'lodging'];
  if (accommodationKeywords.some(keyword => vendorLower.includes(keyword) || itemDescriptions.includes(keyword))) {
    return CATEGORIES.ACCOMMODATION;
  }

  // Transport keywords
  const transportKeywords = ['taxi', 'uber', 'lyft', 'bus', 'train', 'metro', 'subway'];
  if (transportKeywords.some(keyword => vendorLower.includes(keyword) || itemDescriptions.includes(keyword))) {
    return CATEGORIES.TRANSPORT;
  }

  // Entertainment keywords
  const entertainmentKeywords = ['movie', 'cinema', 'theater', 'concert', 'event', 'ticket'];
  if (entertainmentKeywords.some(keyword => vendorLower.includes(keyword) || itemDescriptions.includes(keyword))) {
    return CATEGORIES.ENTERTAINMENT;
  }

  // Supplies keywords
  const suppliesKeywords = ['store', 'shop', 'market', 'supply', 'office', 'stationery'];
  if (suppliesKeywords.some(keyword => vendorLower.includes(keyword) || itemDescriptions.includes(keyword))) {
    return CATEGORIES.SUPPLIES;
  }

  return CATEGORIES.DEFAULT;
};
