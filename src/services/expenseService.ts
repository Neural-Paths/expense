import { Expense } from '@/components/expense/ExpenseCard';
import { OCRResult } from './ocrService';
import { compressImage } from '@/utils/image-utils';
import { detectCategory } from '@/utils/expense-utils';

// In a real app, this would be stored in a database
let expenses: Expense[] = [];

export const addExpense = async (ocrResult: OCRResult, file: File): Promise<Expense> => {
  // Generate a unique ID
  const id = `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Compress the receipt image
  const compressedImage = await compressImage(file);
  
  // Create a new expense from OCR result
  const newExpense: Expense = {
    id,
    title: `${ocrResult.vendor} Receipt`,
    amount: ocrResult.total,
    date: new Date(ocrResult.date),
    category: ocrResult.category || detectCategory(ocrResult.vendor, ocrResult.items),
    vendor: ocrResult.vendor,
    status: 'pending',
    receiptUrl: compressedImage,
    currency: ocrResult.currency,
    isEdited: false,
    originalData: ocrResult,
    items: ocrResult.items,
    taxAmount: ocrResult.taxAmount
  };
  
  // Add to expenses array
  expenses.push(newExpense);
  
  // In a real app, this would be saved to a database
  // For now, we'll just store in memory
  
  return newExpense;
};

export const getExpenses = (): Expense[] => {
  return expenses;
};

export const getExpenseById = (id: string): Expense | undefined => {
  return expenses.find(expense => expense.id === id);
};

export const updateExpense = async (id: string, updatedData: Partial<Expense>): Promise<Expense> => {
  const index = expenses.findIndex(expense => expense.id === id);
  if (index === -1) {
    throw new Error('Expense not found');
  }

  const originalExpense = expenses[index];
  const updatedExpense = {
    ...originalExpense,
    ...updatedData,
    isEdited: true // Mark as edited when updated
  };

  expenses[index] = updatedExpense;
  return updatedExpense;
};

export const deleteExpense = (id: string): boolean => {
  const index = expenses.findIndex(expense => expense.id === id);
  if (index === -1) return false;
  
  expenses.splice(index, 1);
  return true;
}; 