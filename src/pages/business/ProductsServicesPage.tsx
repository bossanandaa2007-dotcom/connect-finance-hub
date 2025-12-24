import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { Plus, Package, Wrench, DollarSign, Hash, Tag, Check } from 'lucide-react';

const ProductsServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    costPrice: '',
    sellingPrice: '',
    quantity: '',
  });
  const { products, services, addProduct, addService, businessProfile } = useApp();

  const currencySymbol = businessProfile?.currency === 'USD' ? '$' : 
                         businessProfile?.currency === 'EUR' ? '€' : '$';

  const handleAdd = () => {
    if (activeTab === 'products') {
      addProduct({
        name: formData.name,
        category: formData.category,
        costPrice: parseFloat(formData.costPrice),
        sellingPrice: parseFloat(formData.sellingPrice),
        quantity: parseInt(formData.quantity),
      });
    } else {
      addService({
        name: formData.name,
        category: formData.category,
        cost: parseFloat(formData.costPrice),
        sellingPrice: parseFloat(formData.sellingPrice),
      });
    }
    setFormData({ name: '', category: '', costPrice: '', sellingPrice: '', quantity: '' });
    setShowAddForm(false);
  };

  const sampleProducts = [
    { id: '1', name: 'Premium Widget', category: 'Electronics', costPrice: 50, sellingPrice: 99, quantity: 25 },
    { id: '2', name: 'Eco Bag', category: 'Accessories', costPrice: 5, sellingPrice: 15, quantity: 100 },
  ];

  const sampleServices = [
    { id: '1', name: 'Consulting Hour', category: 'Professional', cost: 50, sellingPrice: 150 },
    { id: '2', name: 'Website Design', category: 'Creative', cost: 200, sellingPrice: 800 },
  ];

  const displayProducts = products.length > 0 ? products : sampleProducts;
  const displayServices = services.length > 0 ? services : sampleServices;

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Products & Services</h1>
        <p className="text-muted-foreground">Manage your inventory and offerings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
            activeTab === 'products'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
          }`}
        >
          <Package className="w-5 h-5" />
          Products
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
            activeTab === 'services'
              ? 'bg-accent text-accent-foreground'
              : 'bg-card border border-border text-muted-foreground hover:border-accent/50'
          }`}
        >
          <Wrench className="w-5 h-5" />
          Services
        </button>
      </div>

      {/* Add Button */}
      <Button 
        variant="outline" 
        className="w-full mb-6"
        onClick={() => setShowAddForm(true)}
      >
        <Plus className="w-5 h-5" />
        Add {activeTab === 'products' ? 'Product' : 'Service'}
      </Button>

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-6 p-4 rounded-xl bg-card border border-border space-y-4 animate-slide-up">
          <h3 className="font-semibold text-foreground">
            New {activeTab === 'products' ? 'Product' : 'Service'}
          </h3>
          
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-12"
            />
          </div>

          <Input
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Cost Price"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                className="pl-12"
              />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Selling Price"
                value={formData.sellingPrice}
                onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                className="pl-12"
              />
            </div>
          </div>

          {activeTab === 'products' && (
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="pl-12"
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button 
              className="flex-1"
              onClick={handleAdd}
              disabled={!formData.name || !formData.costPrice || !formData.sellingPrice}
            >
              <Check className="w-5 h-5" />
              Save
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3">
        {activeTab === 'products' ? (
          displayProducts.map((product) => {
            const profit = product.sellingPrice - product.costPrice;
            const margin = ((profit / product.sellingPrice) * 100).toFixed(0);
            
            return (
              <div key={product.id} className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">
                    {margin}% margin
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-4">
                    <span className="text-muted-foreground">
                      Cost: <span className="text-foreground font-medium">{currencySymbol}{product.costPrice}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Price: <span className="text-foreground font-medium">{currencySymbol}{product.sellingPrice}</span>
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    Qty: <span className="text-foreground font-medium">{product.quantity}</span>
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          displayServices.map((service) => {
            const profit = service.sellingPrice - service.cost;
            const margin = ((profit / service.sellingPrice) * 100).toFixed(0);
            
            return (
              <div key={service.id} className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.category}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                    {margin}% margin
                  </span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-muted-foreground">
                    Cost: <span className="text-foreground font-medium">{currencySymbol}{service.cost}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Price: <span className="text-foreground font-medium">{currencySymbol}{service.sellingPrice}</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductsServicesPage;
