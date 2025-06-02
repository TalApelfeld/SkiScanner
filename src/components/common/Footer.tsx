import React from 'react';
import { Link } from 'react-router-dom';
import { Snowflake, Facebook, Twitter, Instagram, Youtube, CreditCard, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Snowflake className="w-6 h-6 text-white" />
              <span className="ml-2 text-xl font-bold font-heading">SkiScanner</span>
            </Link>
            <p className="text-neutral-300 mb-6">
              Find and book the perfect ski trip with our all-in-one booking platform, featuring the best European ski resorts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resort/chamonix" className="text-neutral-300 hover:text-white transition-colors">
                  Chamonix, France
                </Link>
              </li>
              <li>
                <Link to="/resort/zermatt" className="text-neutral-300 hover:text-white transition-colors">
                  Zermatt, Switzerland
                </Link>
              </li>
              <li>
                <Link to="/resort/stanton" className="text-neutral-300 hover:text-white transition-colors">
                  St. Anton, Austria
                </Link>
              </li>
              <li>
                <Link to="/resort/valthorens" className="text-neutral-300 hover:text-white transition-colors">
                  Val Thorens, France
                </Link>
              </li>
              <li>
                <Link to="/resort/kitzbuhel" className="text-neutral-300 hover:text-white transition-colors">
                  Kitzbühel, Austria
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-neutral-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-neutral-300 hover:text-white transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-neutral-300 hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-neutral-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">We Accept</h3>
              <div className="flex items-center space-x-3">
                <CreditCard size={24} className="text-white" />
                <ShieldCheck size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              &copy; {new Date().getFullYear()} SkiScanner. All rights reserved.
            </p>
            <div className="flex mt-4 md:mt-0">
              <Link to="/privacy" className="text-neutral-400 text-sm hover:text-white mr-4">
                Privacy
              </Link>
              <Link to="/terms" className="text-neutral-400 text-sm hover:text-white mr-4">
                Terms
              </Link>
              <Link to="/sitemap" className="text-neutral-400 text-sm hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;