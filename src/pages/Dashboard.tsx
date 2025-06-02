
import React, { useState } from 'react';
import { Plus, Edit, Trash2, LogOut, Coffee, DollarSign, ShoppingBag, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Espresso',
      description: 'Rich and bold espresso shot',
      price: 3.50,
      category: 'Coffee',
      image: '/placeholder.svg',
      available: true
    },
    {
      id: '2',
      name: 'Cappuccino',
      description: 'Creamy cappuccino with steamed milk foam',
      price: 4.50,
      category: 'Coffee',
      image: '/placeholder.svg',
      available: true
    },
    {
      id: '3',
      name: 'Croissant',
      description: 'Buttery, flaky French pastry',
      price: 2.75,
      category: 'Pastries',
      image: '/placeholder.svg',
      available: true
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    available: true
  });

  const categories = ['Coffee', 'Pastries', 'Salads', 'Mains', 'Desserts', 'Beverages'];

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      available: true
    });
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const itemData = {
      ...formData,
      price: parseFloat(formData.price),
      image: '/placeholder.svg'
    };

    if (editingItem) {
      // Update existing item
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...itemData }
          : item
      ));
      toast({
        title: "Item updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      // Add new item
      const newItem = {
        ...itemData,
        id: Date.now().toString()
      };
      setMenuItems(prev => [...prev, newItem]);
      toast({
        title: "Item added",
        description: `${formData.name} has been added to the menu.`,
      });
    }

    resetForm();
  };

  const handleEdit = (item: MenuItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      available: item.available
    });
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item deleted",
      description: "Menu item has been removed successfully.",
    });
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, available: !item.available }
        : item
    ));
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/owner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8 text-amber-600" />
              <h1 className="text-2xl font-bold text-gray-800">QR Cafe Dashboard</h1>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/50 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-800">{menuItems.length}</p>
                </div>
                <Coffee className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available Items</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {menuItems.filter(item => item.available).length}
                  </p>
                </div>
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Price</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${(menuItems.reduce((acc, item) => acc + item.price, 0) / menuItems.length || 0).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {new Set(menuItems.map(item => item.category)).size}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Item Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-8 bg-white/50 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {editingItem ? 'Update the details of your menu item' : 'Fill in the details for your new menu item'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter item name"
                      className="border-amber-200 focus:border-amber-400"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                      className="border-amber-200 focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter item description"
                    className="border-amber-200 focus:border-amber-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="border-amber-200 focus:border-amber-400">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="available">Available</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="available"
                        checked={formData.available}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, available: checked }))}
                      />
                      <span className="text-sm text-gray-600">
                        {formData.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </Button>
                  <Button 
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Menu Items List */}
        <Card className="bg-white/50 backdrop-blur-sm border-amber-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Menu Items</CardTitle>
            <CardDescription className="text-gray-600">
              Manage your cafe menu items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map(item => (
                <Card key={item.id} className="bg-white border-amber-200">
                  <CardHeader className="pb-3">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-gray-800">{item.name}</CardTitle>
                      <Badge 
                        variant={item.available ? "default" : "secondary"}
                        className={item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {item.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-600">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-amber-600">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <Switch
                        checked={item.available}
                        onCheckedChange={() => toggleAvailability(item.id)}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(item)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
