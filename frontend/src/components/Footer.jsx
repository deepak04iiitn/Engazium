import React from 'react';
import { Zap, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-indigo-600 rounded-lg p-1.5">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Engazium</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              The engagement & reach hub for creators. Build engagement. Expand reach.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#squads" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Squads
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#help" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#guidelines" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 text-sm">
            © 2026 Engazium. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
              Privacy
            </a>
            <a href="#terms" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
              Terms
            </a>
            <a href="#cookies" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}