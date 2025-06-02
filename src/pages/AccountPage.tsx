import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, CreditCard, Settings, Package, LogOut } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, currentUser, bookings, favorites } = useAppSelector(state => state.user);
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="card"
            >
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <a href="#" className="text-primary-600 hover:text-primary-700">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    className="w-full btn btn-primary py-2.5"
                    onClick={() => {
                      // Mock login for demo purposes
                      dispatch({
                        type: 'user/login',
                        payload: {
                          id: 'user123',
                          email: 'demo@example.com',
                          firstName: 'Alex',
                          lastName: 'Smith',
                          locale: 'en',
                          currency: 'EUR'
                        }
                      });
                    }}
                  >
                    Sign In
                  </button>
                </form>
                
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Google
                    </button>
                    <button
                      type="button"
                      className="w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Facebook
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 bg-primary-600 text-white">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 mr-4">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">{currentUser?.firstName} {currentUser?.lastName}</p>
                      <p className="text-sm text-primary-100">{currentUser?.email}</p>
                    </div>
                  </div>
                </div>
                
                <nav className="p-2">
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                          activeTab === 'profile'
                            ? 'bg-primary-50 text-primary-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <User className="w-5 h-5 mr-3" strokeWidth={1.5} />
                        <span>Profile</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('bookings')}
                        className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                          activeTab === 'bookings'
                            ? 'bg-primary-50 text-primary-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <Package className="w-5 h-5 mr-3" strokeWidth={1.5} />
                        <span>My Bookings</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('payment')}
                        className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                          activeTab === 'payment'
                            ? 'bg-primary-50 text-primary-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 mr-3" strokeWidth={1.5} />
                        <span>Payment Methods</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                          activeTab === 'settings'
                            ? 'bg-primary-50 text-primary-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <Settings className="w-5 h-5 mr-3" strokeWidth={1.5} />
                        <span>Settings</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 rounded-md text-left text-neutral-600 hover:bg-gray-100"
                      >
                        <LogOut className="w-5 h-5 mr-3" strokeWidth={1.5} />
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </motion.div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-6">My Profile</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          defaultValue={currentUser?.firstName}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          defaultValue={currentUser?.lastName}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          defaultValue={currentUser?.email}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-4">Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Currency
                        </label>
                        <select
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          defaultValue={currentUser?.currency}
                        >
                          <option value="EUR">Euro (€)</option>
                          <option value="USD">US Dollar ($)</option>
                          <option value="GBP">British Pound (£)</option>
                          <option value="CHF">Swiss Franc (CHF)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Language
                        </label>
                        <select
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          defaultValue={currentUser?.locale}
                        >
                          <option value="en">English</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="it">Italiano</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-6">My Bookings</h2>
                    
                    {bookings.length > 0 ? (
                      <div className="space-y-6">
                        {bookings.map(booking => (
                          <div key={booking.id} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 border-b">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-bold">Booking #{booking.id.slice(0, 8)}</p>
                                  <p className="text-sm text-neutral-500">
                                    {new Date(booking.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  booking.status === 'confirmed'
                                    ? 'bg-success-100 text-success-600'
                                    : booking.status === 'pending'
                                    ? 'bg-warning-100 text-warning-600'
                                    : 'bg-error-100 text-error-600'
                                }`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex justify-between items-center mb-4">
                                <p className="font-medium">Zermatt, Switzerland</p>
                                <p className="font-bold">€1,450</p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <p className="text-sm font-medium">Dates</p>
                                  <p className="text-sm text-neutral-600">Dec 15 - Dec 22, 2025</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Hotel</p>
                                  <p className="text-sm text-neutral-600">Grand Hotel Zermatterhof</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Travelers</p>
                                  <p className="text-sm text-neutral-600">2 Adults</p>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-3">
                                <a 
                                  href={booking.voucherUrl} 
                                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Download Voucher
                                </a>
                                <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                                  View Details
                                </button>
                                {booking.status !== 'cancelled' && (
                                  <button className="text-sm font-medium text-neutral-600 hover:text-neutral-700">
                                    Manage Booking
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Package className="w-12 h-12 text-neutral-300 mx-auto mb-4" strokeWidth={1.5} />
                        <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                        <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                          Your bookings will appear here once you've completed a reservation.
                        </p>
                        <button 
                          onClick={() => navigate('/')}
                          className="btn btn-primary"
                        >
                          Browse Ski Resorts
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Payment Methods Tab */}
                {activeTab === 'payment' && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
                    
                    <div className="space-y-4 mb-8">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-6 bg-blue-600 rounded mr-4"></div>
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-sm text-neutral-500">Expires 12/25</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button className="text-sm text-neutral-600 hover:text-neutral-700">
                              Edit
                            </button>
                            <button className="text-sm text-neutral-600 hover:text-neutral-700">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button className="btn btn-outline">
                      Add Payment Method
                    </button>
                  </div>
                )}
                
                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Booking confirmations</p>
                              <p className="text-sm text-neutral-500">Receive email confirmations for your bookings</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Price alerts</p>
                              <p className="text-sm text-neutral-500">Receive notifications when prices drop for your saved destinations</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Marketing emails</p>
                              <p className="text-sm text-neutral-500">Receive special offers and promotions</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t">
                        <h3 className="font-medium text-error-600 mb-4">Danger Zone</h3>
                        <button className="btn bg-error-100 text-error-600 hover:bg-error-200">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;