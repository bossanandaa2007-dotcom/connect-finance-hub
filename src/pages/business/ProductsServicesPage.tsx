import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';

/* --------------------
   Animation
-------------------- */
const cardAnim = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const ProductsServicesPage: React.FC = () => {
  const {
    products,
    services,
    addProduct,
    addService,
    expenseDefinitions,
    addExpenseDefinition,
    businessEntries,
    businessProfile,
  } = useApp();

  const currency = businessProfile?.currency || '₹';

  /* --------------------
     OFFERINGS STATE
  -------------------- */
  const [offerType, setOfferType] = useState<'product' | 'service'>('product');
  const [offerName, setOfferName] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  /* --------------------
     EXPENSE STATE
  -------------------- */
  const [expenseType, setExpenseType] = useState<'salary' | 'petty'>('salary');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  /* --------------------
     HANDLERS
  -------------------- */
  const addOffering = () => {
    if (!offerName.trim() || !offerPrice) return;

    if (offerType === 'product') {
      addProduct({
        name: offerName.trim(),
        category: 'General',
        costPrice: 0,
        sellingPrice: Number(offerPrice),
        quantity: 1,
      });
    } else {
      addService({
        name: offerName.trim(),
        category: 'General',
        cost: 0,
        sellingPrice: Number(offerPrice),
      });
    }

    setOfferName('');
    setOfferPrice('');
  };

  const addExpense = () => {
    if (!expenseName.trim()) return;

    addExpenseDefinition({
      name: expenseName.trim(),
      expenseType,
      defaultAmount: expenseAmount
        ? Number(expenseAmount)
        : undefined,
    });

    setExpenseName('');
    setExpenseAmount('');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
      {/* ======================
          HEADER
      ====================== */}
      <div>
        <h1 className="text-2xl font-semibold">Business Setup</h1>
        <p className="text-sm text-muted-foreground">
          Define products, services, and recurring expenses
        </p>
      </div>

      {/* ======================
          OFFERINGS
      ====================== */}
      <motion.div
        variants={cardAnim}
        initial="hidden"
        animate="visible"
        className="border rounded-xl p-5 bg-white space-y-4"
      >
        <h2 className="font-medium text-lg">Products & Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select
            value={offerType}
            onChange={(e) =>
              setOfferType(e.target.value as 'product' | 'service')
            }
            className="border rounded px-3 py-2"
          >
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>

          <input
            className="border rounded px-3 py-2 md:col-span-2"
            placeholder="Name (Apple Juice, Web Dev...)"
            value={offerName}
            onChange={(e) => setOfferName(e.target.value)}
          />

          <input
            className="border rounded px-3 py-2"
            placeholder={`${currency} Price`}
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={addOffering}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

        {(products.length > 0 || services.length > 0) && (
          <div className="pt-3 space-y-2">
            {[...products, ...services].map((o) => (
              <div
                key={o.id}
                className="flex justify-between border rounded-lg px-4 py-2"
              >
                <span>{o.name}</span>
                <span className="font-medium">
                  {currency}
                  {o.sellingPrice}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ======================
          EXPENSE DEFINITIONS
      ====================== */}
      <motion.div
        variants={cardAnim}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.05 }}
        className="border rounded-xl p-5 bg-white space-y-4"
      >
        <h2 className="font-medium text-lg">Expense Definitions</h2>
        <p className="text-xs text-muted-foreground">
          Salary and recurring petty costs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select
            value={expenseType}
            onChange={(e) =>
              setExpenseType(e.target.value as 'salary' | 'petty')
            }
            className="border rounded px-3 py-2"
          >
            <option value="salary">Salary</option>
            <option value="petty">Petty</option>
          </select>

          <input
            className="border rounded px-3 py-2 md:col-span-2"
            placeholder={
              expenseType === 'salary'
                ? 'Employee name'
                : 'Expense name'
            }
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />

          <input
            className="border rounded px-3 py-2"
            placeholder={`${currency} Default`}
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={addExpense}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

        {expenseDefinitions.length > 0 && (
          <div className="pt-3 space-y-2">
            {expenseDefinitions.map((e) => (
              <div
                key={e.id}
                className="flex justify-between border rounded-lg px-4 py-2"
              >
                <span>{e.name}</span>
                <span className="text-xs text-muted-foreground">
                  {e.expenseType}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ======================
          HISTORY PREVIEW
      ====================== */}
      <motion.div
        variants={cardAnim}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="border rounded-xl p-5 bg-white"
      >
        <h2 className="font-medium text-lg mb-3">Recent Activity</h2>

        {businessEntries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No transactions yet
          </p>
        ) : (
          <div className="space-y-2">
            {businessEntries.slice(0, 5).map((e) => (
              <div
                key={e.id}
                className="flex justify-between border rounded-lg px-4 py-2"
              >
                <span>{e.refName || 'Transaction'}</span>
                <span
                  className={
                    e.type === 'expense'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }
                >
                  {e.type === 'expense' ? '-' : '+'}
                  {currency}
                  {e.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductsServicesPage;
