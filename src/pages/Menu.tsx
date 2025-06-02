
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample menu data - in a real app, this would come from an API
  const menuItems: MenuItem[] = [
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
    },
    {
      id: '4',
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with caesar dressing',
      price: 8.95,
      category: 'Salads',
      image: '/placeholder.svg',
      available: true
    },
    {
      id: '5',
      name: 'Grilled Sandwich',
      description: 'Toasted sandwich with fresh ingredients',
      price: 7.50,
      category: 'Mains',
      image: '/placeholder.svg',
      available: true
    }
  ];

  const categories = ['All', 'Coffee', 'Pastries', 'Salads', 'Mains'];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      return prevCart.reduce((acc, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[]);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/')}
                variant="ghost" 
                size="sm"
                className="text-amber-700 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
            </div>
            <Button 
              onClick={() => navigate('/checkout')}
              className="bg-amber-600 hover:bg-amber-700 text-white relative"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category 
                  ? "bg-amber-600 hover:bg-amber-700 text-white" 
                  : "border-amber-300 text-amber-700 hover:bg-amber-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="bg-white/50 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow">
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
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-2">
                    {cart.find(cartItem => cartItem.id === item.id) ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => removeFromCart(item.id)}
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-amber-300 text-amber-700 hover:bg-amber-50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold text-gray-800 min-w-[1.5rem] text-center">
                          {cart.find(cartItem => cartItem.id === item.id)?.quantity || 0}
                        </span>
                        <Button
                          onClick={() => addToCart(item)}
                          size="sm"
                          className="h-8 w-8 p-0 bg-amber-600 hover:bg-amber-700 text-white"
                          disabled={!item.available}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(item)}
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                        disabled={!item.available}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md">
            <Card className="bg-white border-amber-200 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {getTotalItems()} items in cart
                    </p>
                    <p className="text-2xl font-bold text-amber-600">
                      ${getTotalPrice().toFixed(2)}
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigate('/checkout')}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
