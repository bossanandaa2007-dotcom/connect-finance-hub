export type OfferingType = 'PRODUCT' | 'SERVICE' | 'MIXED';

export interface Offering {
  id: string;
  name: string;
  defaultAmount?: number;
  createdAt: string;
}

export type ExpenseDefinitionType = 'salary' | 'petty';

export interface ExpenseDefinition {
  id: string;
  name: string;
  expenseType: ExpenseDefinitionType;
  defaultAmount?: number;
}

export type BusinessEntryType = 'revenue' | 'expense' | 'investment';

export interface BusinessEntry {
  id: string;
  type: BusinessEntryType;
  refId?: string;
  refType?: 'product' | 'service' | 'salary' | 'petty';
  refName?: string;
  amount: number;
  date: Date;
  notes?: string;
}
