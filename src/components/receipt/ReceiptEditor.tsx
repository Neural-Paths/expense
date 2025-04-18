import React, { useState } from 'react';
import { OCRResult } from '@/services/ocrService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/utils/expense-utils';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Pencil } from 'lucide-react';
import { CATEGORIES, CATEGORY_EMOJIS, Category, detectCategory } from '@/utils/expense-utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ReceiptItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface ReceiptEditorProps {
  receipt: OCRResult;
  onSave: (editedReceipt: OCRResult) => void;
  onCancel: () => void;
}

const ReceiptEditor: React.FC<ReceiptEditorProps> = ({ receipt, onSave, onCancel }) => {
  const [editedReceipt, setEditedReceipt] = useState<OCRResult>({ 
    ...receipt,
    category: receipt.category || detectCategory(receipt.vendor, receipt.items)
  });
  const [isEdited, setIsEdited] = useState(false);

  const handleChange = (field: keyof OCRResult, value: any) => {
    setEditedReceipt(prev => ({ ...prev, [field]: value }));
    setIsEdited(true);
  };

  const handleItemChange = (index: number, field: keyof ReceiptItem, value: string) => {
    const newItems = [...editedReceipt.items];
    const item = { ...newItems[index] };
    
    if (field === 'description') {
      item[field] = value;
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        item[field] = numValue;
        if (field === 'quantity' || field === 'unitPrice') {
          item.totalPrice = item.quantity * item.unitPrice;
        }
      }
    }
    
    newItems[index] = item;
    setEditedReceipt(prev => ({
      ...prev,
      items: newItems,
      total: newItems.reduce((sum, item) => sum + item.totalPrice, 0)
    }));
    setIsEdited(true);
  };

  const handleCategoryChange = (category: Category) => {
    setEditedReceipt(prev => ({
      ...prev,
      category
    }));
    setIsEdited(true);
  };

  const handleSave = () => {
    onSave(editedReceipt);
  };

  return (
    <div className="space-y-6">
      {isEdited && (
        <Badge variant="secondary" className="mb-4">
          <Pencil className="h-3 w-3 mr-1" />
          Receipt has been edited
        </Badge>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vendor">Vendor</Label>
          <Input
            id="vendor"
            value={editedReceipt.vendor}
            onChange={(e) => handleChange('vendor', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={editedReceipt.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="total">Total Amount</Label>
          <Input
            id="total"
            type="number"
            value={editedReceipt.total}
            onChange={(e) => handleChange('total', Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tax">Tax Amount</Label>
          <Input
            id="tax"
            type="number"
            value={editedReceipt.taxAmount}
            onChange={(e) => handleChange('taxAmount', Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={editedReceipt.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CATEGORIES).map((category) => (
                <SelectItem key={category} value={category}>
                  {CATEGORY_EMOJIS[category]} {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Items</Label>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {editedReceipt.items.map((item, index) => (
            <div key={index} className="bg-accent/50 p-3 rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Total Price</Label>
                  <Input
                    type="number"
                    value={item.totalPrice}
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ReceiptEditor; 