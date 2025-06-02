import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Plane, Hotel, Car, CreditCard, ArrowRight, 
  Calendar, Users, ChevronDown, ChevronUp, Check,
  Star, MapPin
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectFlight,
  selectTransfer,
  setPassengerCount,
  calculatePackage,
  selectHotel
} from '../redux/slices/packageSlice';
import { MOCK_FLIGHTS, MOCK_HOTELS, MOCK_TRANSFERS } from '../mockData';
import { Flight, Hotel as HotelType, Transfer } from '../types';

const PackageBuilderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [activeStep, setActiveStep] = useState('flight');
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);
  const [expandedHotelId, setExpandedHotelId] = useState<string | null>(null);
  const [expandedTransferId, setExpandedTransferId] = useState<string | null>(null);
  
  const packageState = useAppSelector(state => state.package);
  const { selectedResort } = useAppSelector(state => state.resorts);
  
  // Get resort ID from location state if available
  const resortId = location.state?.resortId;
  
  useEffect(() => {
    // If we have a complete package, calculate total
    if (
      packageState.selectedFlight && 
      packageState.selectedHotel && 
      packageState.selectedTransfer
    ) {
      dispatch(calculatePackage());
    }
  }, [
    packageState.selectedFlight, 
    packageState.selectedHotel, 
    packageState.selectedTransfer, 
    packageState.passengerCount,
    dispatch
  ]);
  
  // Filtered hotels based on selected resort
  const filteredHotels = resortId 
    ? MOCK_HOTELS[resortId] || []
    : [];
  
  const handleFlightSelect = (flight: Flight) => {
    dispatch(selectFlight(flight));
    setActiveStep('hotel');
  };
  
  const handleHotelSelect = (hotel: HotelType) => {
    dispatch(selectHotel(hotel));
    setActiveStep('transfer');
  };
  
  const handleTransferSelect = (transfer: Transfer) => {
    dispatch(selectTransfer(transfer));
    setActiveStep('review');
  };
  
  const handlePassengerChange = (count: number) => {
    if (count >= 1 && count <= 10) {
      dispatch(setPassengerCount(count));
    }
  };
  
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };
  
  const stepStatus = {
    flight: activeStep === 'flight' ? 'active' : packageState.selectedFlight ? 'completed' : 'pending',
    hotel: activeStep === 'hotel' ? 'active' : packageState.selectedHotel ? 'completed' : 'pending',
    transfer: activeStep === 'transfer' ? 'active' : packageState.selectedTransfer ? 'completed' : 'pending',
    review: activeStep === 'review' ? 'active' : 'pending',
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Build Your Ski Package</h1>
          <p className="text-neutral-600 mb-8">
            Customize your perfect ski trip by selecting flights, accommodation, and transfers.
          </p>
          
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              {/* Flight Step */}
              <button 
                onClick={() => setActiveStep('flight')}
                className={`flex flex-col items-center ${
                  stepStatus.flight === 'pending' ? 'text-neutral-400' : 
                  stepStatus.flight === 'active' ? 'text-primary-600' : 'text-secondary-600'
                }`}
                disabled={stepStatus.flight === 'pending'}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  stepStatus.flight === 'pending' ? 'bg-gray-200' : 
                  stepStatus.flight === 'active' ? 'bg-primary-100 text-primary-600' : 
                  'bg-secondary-100 text-secondary-600'
                }`}>
                  {stepStatus.flight === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Plane className="w-5 h-5" />
                  )}
                </div>
                <span className="text-sm font-medium">Flight</span>
              </button>
              
              {/* Line */}
              <div className={`flex-grow h-0.5 mx-4 ${
                stepStatus.hotel === 'pending' && stepStatus.flight === 'pending'
                  ? 'bg-gray-200'
                  : stepStatus.hotel === 'pending' && stepStatus.flight !== 'pending'
                  ? 'bg-gradient-to-r from-secondary-500 to-gray-200'
                  : 'bg-secondary-500'
              }`}></div>
              
              {/* Hotel Step */}
              <button
                onClick={() => packageState.selectedFlight && setActiveStep('hotel')}
                className={`flex flex-col items-center ${
                  stepStatus.hotel === 'pending' ? 'text-neutral-400' : 
                  stepStatus.hotel === 'active' ? 'text-primary-600' : 'text-secondary-600'
                }`}
                disabled={!packageState.selectedFlight}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  stepStatus.hotel === 'pending' ? 'bg-gray-200' : 
                  stepStatus.hotel === 'active' ? 'bg-primary-100 text-primary-600' : 
                  'bg-secondary-100 text-secondary-600'
                }`}>
                  {stepStatus.hotel === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Hotel className="w-5 h-5" />
                  )}
                </div>
                <span className="text-sm font-medium">Hotel</span>
              </button>
              
              {/* Line */}
              <div className={`flex-grow h-0.5 mx-4 ${
                stepStatus.transfer === 'pending' && stepStatus.hotel === 'pending'
                  ? 'bg-gray-200'
                  : stepStatus.transfer === 'pending' && stepStatus.hotel !== 'pending'
                  ? 'bg-gradient-to-r from-secondary-500 to-gray-200'
                  : 'bg-secondary-500'
              }`}></div>
              
              {/* Transfer Step */}
              <button
                onClick={() => packageState.selectedHotel && setActiveStep('transfer')}
                className={`flex flex-col items-center ${
                  stepStatus.transfer === 'pending' ? 'text-neutral-400' : 
                  stepStatus.transfer === 'active' ? 'text-primary-600' : 'text-secondary-600'
                }`}
                disabled={!packageState.selectedHotel}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  stepStatus.transfer === 'pending' ? 'bg-gray-200' : 
                  stepStatus.transfer === 'active' ? 'bg-primary-100 text-primary-600' : 
                  'bg-secondary-100 text-secondary-600'
                }`}>
                  {stepStatus.transfer === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Car className="w-5 h-5" />
                  )}
                </div>
                <span className="text-sm font-medium">Transfer</span>
              </button>
              
              {/* Line */}
              <div className={`flex-grow h-0.5 mx-4 ${
                stepStatus.review === 'pending' && stepStatus.transfer === 'pending'
                  ? 'bg-gray-200'
                  : stepStatus.review === 'pending' && stepStatus.transfer !== 'pending'
                  ? 'bg-gradient-to-r from-secondary-500 to-gray-200'
                  : 'bg-secondary-500'
              }`}></div>
              
              {/* Review Step */}
              <button
                onClick={() => packageState.selectedTransfer && setActiveStep('review')}
                className={`flex flex-col items-center ${
                  stepStatus.review === 'pending' ? 'text-neutral-400' : 'text-primary-600'
                }`}
                disabled={!packageState.selectedTransfer}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  stepStatus.review === 'pending' ? 'bg-gray-200' : 'bg-primary-100'
                }`}>
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Review</span>
              </button>
            </div>
          </div>
          
          {/* Step Content */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Flight Selection */}
            {activeStep === 'flight' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Select Your Flight</h2>
                  
                  <div className="flex items-center">
                    <label htmlFor="passengers" className="text-sm font-medium mr-3">
                      Passengers:
                    </label>
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => handlePassengerChange(packageState.passengerCount - 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                        disabled={packageState.passengerCount <= 1}
                      >
                        -
                      </button>
                      <span className="px-2">{packageState.passengerCount}</span>
                      <button
                        onClick={() => handlePassengerChange(packageState.passengerCount + 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                        disabled={packageState.passengerCount >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {MOCK_FLIGHTS.map(flight => (
                    <div 
                      key={flight.id}
                      className={`border rounded-lg overflow-hidden transition-all ${
                        packageState.selectedFlight?.id === flight.id
                          ? 'border-primary-500 shadow-md'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="bg-white p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <p className="font-bold text-lg">{flight.carrier}</p>
                              <p className="text-sm text-neutral-500">
                                {flight.cabinClass.charAt(0).toUpperCase() + flight.cabinClass.slice(1)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-xl">€{flight.price}</p>
                            <p className="text-sm text-neutral-500">per person</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <p className="text-lg font-semibold">{flight.origin}</p>
                            <p className="text-sm text-neutral-500">
                              {new Date(flight.departureTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          
                          <div className="flex-grow mx-4 flex flex-col items-center">
                            <div className="w-full h-0.5 bg-gray-300 relative">
                              <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                            <p className="text-xs text-neutral-500 mt-1">
                              {Math.round((new Date(flight.arrivalTime).getTime() - new Date(flight.departureTime).getTime()) / 1000 / 60 / 60)}h direct
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-lg font-semibold">{flight.destination}</p>
                            <p className="text-sm text-neutral-500">
                              {new Date(flight.arrivalTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <button
                            onClick={() => setExpandedFlightId(
                              expandedFlightId === flight.id ? null : flight.id
                            )}
                            className="text-sm text-primary-600 hover:underline flex items-center"
                          >
                            Flight details
                            {expandedFlightId === flight.id ? (
                              <ChevronUp className="w-4 h-4 ml-1" />
                            ) : (
                              <ChevronDown className="w-4 h-4 ml-1" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => handleFlightSelect(flight)}
                            className={`btn ${
                              packageState.selectedFlight?.id === flight.id
                                ? 'btn-secondary'
                                : 'btn-primary'
                            }`}
                          >
                            {packageState.selectedFlight?.id === flight.id
                              ? 'Selected'
                              : 'Select'
                            }
                          </button>
                        </div>
                      </div>
                      
                      {expandedFlightId === flight.id && (
                        <div className="bg-gray-50 p-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-medium mb-2">Flight Details</h3>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Departure:</span> {new Date(flight.departureTime).toLocaleDateString()}
                              </p>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Baggage:</span> 1 carry-on, 1 checked bag (23kg)
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Aircraft:</span> Airbus A320 or similar
                              </p>
                            </div>
                            <div>
                              <h3 className="font-medium mb-2">Price Details</h3>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Base fare:</span> €{Math.round(flight.price * 0.7)} per person
                              </p>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Taxes & fees:</span> €{Math.round(flight.price * 0.3)} per person
                              </p>
                              <p className="text-sm font-medium">
                                <span className="font-medium">Total:</span> €{flight.price * packageState.passengerCount} for {packageState.passengerCount} passenger{packageState.passengerCount !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Hotel Selection */}
            {activeStep === 'hotel' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Select Your Accommodation</h2>
                  
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-primary-600 mr-2" strokeWidth={1.5} />
                    <span className="text-sm">7 nights</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredHotels.length > 0 ? (
                    filteredHotels.map(hotel => (
                      <div 
                        key={hotel.id}
                        className={`border rounded-lg overflow-hidden transition-all ${
                          packageState.selectedHotel?.id === hotel.id
                            ? 'border-primary-500 shadow-md'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="bg-white p-4">
                          <div className="sm:flex">
                            <div className="sm:flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                              <img
                                src={hotel.imageUrl}
                                alt={hotel.name}
                                className="w-full sm:w-32 h-24 object-cover rounded-md"
                              />
                            </div>
                            
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold text-lg">{hotel.name}</h3>
                                  <div className="flex items-center mt-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`w-4 h-4 ${
                                          i < hotel.starRating 
                                            ? 'text-accent-500 fill-current' 
                                            : 'text-gray-300'
                                        }`} 
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-xl">€{hotel.pricePerNight}</p>
                                  <p className="text-sm text-neutral-500">per night</p>
                                </div>
                              </div>
                              
                              <div className="mt-3 flex items-center">
                                <MapPin className="w-4 h-4 text-primary-600 mr-1" strokeWidth={1.5} />
                                <span className="text-sm text-neutral-600">{hotel.liftDistanceMeters}m from lifts</span>
                              </div>
                              
                              <div className="mt-2 flex flex-wrap gap-2">
                                {hotel.amenities.slice(0, 3).map((amenity, index) => (
                                  <span 
                                    key={index}
                                    className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                                {hotel.amenities.length > 3 && (
                                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                    +{hotel.amenities.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <button
                              onClick={() => setExpandedHotelId(
                                expandedHotelId === hotel.id ? null : hotel.id
                              )}
                              className="text-sm text-primary-600 hover:underline flex items-center"
                            >
                              Hotel details
                              {expandedHotelId === hotel.id ? (
                                <ChevronUp className="w-4 h-4 ml-1" />
                              ) : (
                                <ChevronDown className="w-4 h-4 ml-1" />
                              )}
                            </button>
                            
                            <button
                              onClick={() => handleHotelSelect(hotel)}
                              className={`btn ${
                                packageState.selectedHotel?.id === hotel.id
                                  ? 'btn-secondary'
                                  : 'btn-primary'
                              }`}
                            >
                              {packageState.selectedHotel?.id === hotel.id
                                ? 'Selected'
                                : 'Select'
                              }
                            </button>
                          </div>
                        </div>
                        
                        {expandedHotelId === hotel.id && (
                          <div className="bg-gray-50 p-4 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-medium mb-2">Hotel Details</h3>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">Room type:</span> Standard Double
                                </p>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">Board:</span> Bed & Breakfast
                                </p>
                                <p className="text-sm mb-3">
                                  <span className="font-medium">Check-in/out:</span> 3PM / 11AM
                                </p>
                                
                                <h3 className="font-medium mb-2">Amenities</h3>
                                <div className="grid grid-cols-2 gap-2">
                                  {hotel.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center">
                                      <Check className="w-4 h-4 text-secondary-600 mr-1" />
                                      <span className="text-sm">{amenity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium mb-2">Price Details</h3>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">Rate per night:</span> €{hotel.pricePerNight}
                                </p>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">Length of stay:</span> 7 nights
                                </p>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">Taxes & fees:</span> €{Math.round(hotel.pricePerNight * 7 * 0.1)}
                                </p>
                                <p className="text-sm font-medium">
                                  <span className="font-medium">Total:</span> €{hotel.pricePerNight * 7 + Math.round(hotel.pricePerNight * 7 * 0.1)}
                                </p>
                                <p className="text-xs text-neutral-500 mt-2">
                                  Cancellation policy: Free cancellation up to 7 days before arrival
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-neutral-600">No accommodations found for this resort.</p>
                      <p className="text-neutral-500 mt-2">Please select a different resort or try again later.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {/* Transfer Selection */}
            {activeStep === 'transfer' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Select Your Transfer</h2>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-primary-600 mr-2" strokeWidth={1.5} />
                    <span className="text-sm">{packageState.passengerCount} passenger{packageState.passengerCount !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {MOCK_TRANSFERS.filter(transfer => 
                    packageState.selectedFlight && 
                    transfer.origin === packageState.selectedFlight.destination
                  ).map(transfer => (
                    <div
                      key={transfer.id}
                      className={`border rounded-lg overflow-hidden transition-all ${
                        packageState.selectedTransfer?.id === transfer.id
                          ? 'border-primary-500 shadow-md'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="bg-white p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">
                              {transfer.type === 'private' ? 'Private Transfer' : 'Shared Shuttle'}
                            </h3>
                            <p className="text-neutral-600 mt-1">
                              {transfer.origin} to {transfer.destination}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-xl">€{transfer.price}</p>
                            <p className="text-sm text-neutral-500">per person</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-primary-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <span className="text-sm">{transfer.duration} min journey</span>
                          </div>
                          
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-primary-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16 3H8a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
                              <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className="text-sm">Door-to-door service</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <button
                            onClick={() => setExpandedTransferId(
                              expandedTransferId === transfer.id ? null : transfer.id
                            )}
                            className="text-sm text-primary-600 hover:underline flex items-center"
                          >
                            Transfer details
                            {expandedTransferId === transfer.id ? (
                              <ChevronUp className="w-4 h-4 ml-1" />
                            ) : (
                              <ChevronDown className="w-4 h-4 ml-1" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => handleTransferSelect(transfer)}
                            className={`btn ${
                              packageState.selectedTransfer?.id === transfer.id
                                ? 'btn-secondary'
                                : 'btn-primary'
                            }`}
                          >
                            {packageState.selectedTransfer?.id === transfer.id
                              ? 'Selected'
                              : 'Select'
                            }
                          </button>
                        </div>
                      </div>
                      
                      {expandedTransferId === transfer.id && (
                        <div className="bg-gray-50 p-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-medium mb-2">Transfer Details</h3>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Type:</span> {transfer.type === 'private' ? 'Private car/minivan' : 'Shared coach'}
                              </p>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Pickup:</span> {transfer.origin} Airport arrivals hall
                              </p>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Dropoff:</span> Your accommodation in {transfer.destination}
                              </p>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Luggage:</span> 1 suitcase + 1 ski/board bag per person
                              </p>
                              {transfer.type === 'shared' && (
                                <p className="text-sm text-neutral-500 mt-2">
                                  Note: Shared transfers may involve stops at other accommodations
                                </p>
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium mb-2">Price Details</h3>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Base rate:</span> €{transfer.price} per person
                              </p>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Passengers:</span> {packageState.passengerCount}
                              </p>
                              <p className="text-sm font-medium">
                                <span className="font-medium">Total:</span> €{transfer.price * packageState.passengerCount}
                              </p>
                              <p className="text-xs text-neutral-500 mt-2">
                                Cancellation policy: Free cancellation up to 48 hours before transfer
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Package Review */}
            {activeStep === 'review' && packageState.packageQuote && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-6">Review Your Package</h2>
                
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Trip Summary</h3>
                    <p className="text-sm text-neutral-500">
                      {packageState.passengerCount} passenger{packageState.passengerCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Flight */}
                      {packageState.selectedFlight && (
                        <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                          <div className="flex items-center text-primary-600 mb-2">
                            <Plane className="w-5 h-5 mr-2" strokeWidth={1.5} />
                            <h4 className="font-medium">Flight</h4>
                          </div>
                          
                          <p className="font-semibold">
                            {packageState.selectedFlight.origin} to {packageState.selectedFlight.destination}
                          </p>
                          <p className="text-sm">
                            {packageState.selectedFlight.carrier}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {new Date(packageState.selectedFlight.departureTime).toLocaleDateString()} at {new Date(packageState.selectedFlight.departureTime).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      )}
                      
                      {/* Hotel */}
                      {packageState.selectedHotel && (
                        <div className="border-b md:border-b-0 md:border-r border-gray-200 py-4 md:py-0 md:px-4">
                          <div className="flex items-center text-primary-600 mb-2">
                            <Hotel className="w-5 h-5 mr-2" strokeWidth={1.5} />
                            <h4 className="font-medium">Accommodation</h4>
                          </div>
                          
                          <p className="font-semibold">
                            {packageState.selectedHotel.name}
                          </p>
                          <p className="text-sm">
                            {Array.from({ length: packageState.selectedHotel.starRating }).map((_, i) => '★').join('')}
                          </p>
                          <p className="text-sm text-neutral-500">
                            7 nights, Bed & Breakfast
                          </p>
                        </div>
                      )}
                      
                      {/* Transfer */}
                      {packageState.selectedTransfer && (
                        <div className="pt-4 md:pt-0 md:pl-4">
                          <div className="flex items-center text-primary-600 mb-2">
                            <Car className="w-5 h-5 mr-2" strokeWidth={1.5} />
                            <h4 className="font-medium">Transfer</h4>
                          </div>
                          
                          <p className="font-semibold">
                            {packageState.selectedTransfer.type === 'private' ? 'Private Transfer' : 'Shared Shuttle'}
                          </p>
                          <p className="text-sm">
                            {packageState.selectedTransfer.origin} to {packageState.selectedTransfer.destination}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {packageState.selectedTransfer.duration} min journey
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-4">Price Breakdown</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p>Flights ({packageState.passengerCount} x €{packageState.selectedFlight?.price})</p>
                      <p>€{packageState.packageQuote.flightTotal}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Accommodation (7 nights)</p>
                      <p>€{packageState.packageQuote.hotelTotal}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Transfers ({packageState.passengerCount} x €{packageState.selectedTransfer?.price})</p>
                      <p>€{packageState.packageQuote.transferTotal}</p>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <p>Total Package Price</p>
                      <p>€{packageState.packageQuote.totalPrice}</p>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-500">
                      <p>Price per person</p>
                      <p>€{packageState.packageQuote.pricePerPerson}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="text-sm text-neutral-500">
                    Quote valid until: {new Date(packageState.packageQuote.expiresAt).toLocaleTimeString()}
                  </p>
                  
                  <button
                    onClick={handleProceedToCheckout}
                    className="btn btn-accent"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageBuilderPage;