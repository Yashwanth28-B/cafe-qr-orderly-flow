
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Coffee, Crown, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8 text-amber-600" />
              <h1 className="text-2xl font-bold text-gray-800">QR Cafe</h1>
            </div>
            <Button 
              onClick={() => navigate('/owner')}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <Crown className="h-4 w-4 mr-2" />
              Owner Portal
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-amber-600">QR Cafe</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience seamless dining with our QR-based ordering system. 
            Scan, order, and enjoy your favorite meals!
          </p>
        </div>

        {/* QR Code Section */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <Card className="bg-white/50 backdrop-blur-sm border-amber-200 shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-amber-100 rounded-full w-fit">
                  <QrCode className="h-12 w-12 text-amber-600" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Table QR Code</CardTitle>
                <CardDescription className="text-gray-600">
                  Scan this code to access our digital menu
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-white p-6 rounded-lg border-2 border-dashed border-amber-300 mb-6">
                  <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">QR Code for Table #1</p>
                </div>
                <Button 
                  onClick={() => navigate('/menu')}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  size="lg"
                >
                  <Utensils className="h-4 w-4 mr-2" />
                  Access Menu Directly
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <Card className="bg-white/50 backdrop-blur-sm border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-700">
                  <Utensils className="h-5 w-5 mr-2" />
                  For Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Browse our delicious menu with detailed descriptions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Add items to your cart and customize orders
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Secure payment processing
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Track your order status in real-time
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-700">
                  <Crown className="h-5 w-5 mr-2" />
                  For Cafe Owners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Secure authentication and dashboard access
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Easy menu management - add, edit, delete items
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Dynamic pricing and availability control
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Order management and analytics
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="text-center mt-12">
          <div className="inline-flex rounded-lg bg-white/50 backdrop-blur-sm p-1 border border-amber-200">
            <Button 
              onClick={() => navigate('/menu')}
              className="bg-amber-600 hover:bg-amber-700 text-white mx-1"
            >
              Customer Menu
            </Button>
            <Button 
              onClick={() => navigate('/owner')}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50 mx-1"
            >
              Owner Dashboard
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-amber-200 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 QR Cafe. Revolutionizing the dining experience.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
