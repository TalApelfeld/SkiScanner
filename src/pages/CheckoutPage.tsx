import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, CreditCard, Calendar, Lock,
  Check, AlertTriangle 
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addBooking } from '../redux/slices/userSlice';
import { clearPackage } from '../redux/slices/packageSlice';
import { addAlert } from '../redux/slices/uiSlice';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { packageQuote, selectedFlight, selectedHotel, selectedTransfer, passengerCount } = 
    useAppSelector(state => state.package);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (packageQuote) {
      // In a real app, this would create a payment intent with Stripe
      // and then confirm the payment before creating the booking
      
      const newBooking = {
        id: Math.random().toString(36).substring(2, 11),
        userId: 'user123', // Would be the actual user ID in a real app
        quoteId: packageQuote.id,
        status: 'confirmed' as const,
        paymentIntent: 'pi_' + Math.random().toString(36).substring(2, 11),
        voucherUrl: '/vouchers/sample.pdf',
        createdAt: new Date().toISOString(),
      };
      
      dispatch(addBooking(newBooking));
      dispatch(clearPackage());
      dispatch(addAlert({
        type: 'success',
        message: 'Booking confirmed! Your ski trip is all set.'
      }));
      
      navigate('/account');
    }
  };
  
  if (!packageQuote || !selectedFlight || !selectedHotel || !selectedTransfer) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-lg mx-auto text-center">
          <AlertTriangle className="w-16 h-16 text-warning-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">No Package Selected</h1>
          <p className="mb-6">
            You don't have a package ready for checkout. Please build your ski package first.
          </p>
          <button
            onClick={() => navigate('/package-builder')}
            className="btn btn-primary"
          >
            Build a Package
          </button>
        </div>
      </div>
    );
  }
  
  // Check if the package quote has expired
  const isExpired = new Date(packageQuote.expiresAt) < new Date();
  
  if (isExpired) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-lg mx-auto text-center">
          <AlertTriangle className="w-16 h-16 text-warning-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Package Quote Expired</h1>
          <p className="mb-6">
            Your package quote has expired. Prices and availability may have changed.
            Please create a new package.
          </p>
          <button
            onClick={() => navigate('/package-builder')}
            className="btn btn-primary"
          >
            Create New Package
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-2">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="card"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Flight</p>
                          <p className="text-sm text-neutral-500">
                            {selectedFlight.origin} to {selectedFlight.destination}
                          </p>
                        </div>
                        <p>€{packageQuote.flightTotal}</p>
                      </div>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Hotel (7 nights)</p>
                          <p className="text-sm text-neutral-500">
                            {selectedHotel.name}
                          </p>
                        </div>
                        <p>€{packageQuote.hotelTotal}</p>
                      </div>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Transfer</p>
                          <p className="text-sm text-neutral-500">
                            {selectedTransfer.type === 'private' ? 'Private' : 'Shared'} transfer
                          </p>
                        </div>
                        <p>€{packageQuote.transferTotal}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 mb-4">
                      <div className="flex justify-between font-bold mb-1">
                        <p>Total</p>
                        <p>€{packageQuote.totalPrice}</p>
                      </div>
                      <p className="text-sm text-neutral-500 text-right">
                        for {passengerCount} passenger{passengerCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    <div className="flex items-start mb-4">
                      <Lock className="w-4 h-4 text-secondary-600 mt-0.5 mr-2" strokeWidth={1.5} />
                      <p className="text-xs text-neutral-600">
                        Your payment is secured using SSL encryption. We never store your full credit card details.
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="flex space-x-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="MasterCard" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="Amex" className="h-6" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Checkout Form */}
            <div className="lg:col-span-2 order-1 lg:order-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="card"
              >
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Traveler Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                            </div>
                            <input
                              type="text"
                              id="firstName"
                              required
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              placeholder="John"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                            </div>
                            <input
                              type="text"
                              id="lastName"
                              required
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                            </div>
                            <input
                              type="email"
                              id="email"
                              required
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              placeholder="john.doe@example.com"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                            </div>
                            <input
                              type="tel"
                              id="phone"
                              required
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {passengerCount > 1 && (
                        <div className="mt-4">
                          <button
                            type="button"
                            className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                          >
                            <span className="mr-1">+</span> Add additional traveler details
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                            </div>
                            <input
                              type="text"
                              id="cardHolder"
                              required
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CreditCard className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                            </div>
                            <input
                              type="text"
                              id="cardNumber"
                              required
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              placeholder="**** **** **** ****"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                              </div>
                              <input
                                type="text"
                                id="expiryDate"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder="MM/YY"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                              </div>
                              <input
                                type="text"
                                id="cvv"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <div className="flex items-start mb-4">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="font-medium text-gray-700">
                            I accept the Terms and Conditions
                          </label>
                          <p className="text-gray-500">
                            By proceeding with this booking, you agree to our terms of service and privacy policy.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newsletter"
                            name="newsletter"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newsletter" className="font-medium text-gray-700">
                            Subscribe to our newsletter
                          </label>
                          <p className="text-gray-500">
                            Get exclusive offers, travel tips, and ski destination guides.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full btn btn-accent py-3"
                    >
                      Complete Booking
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;