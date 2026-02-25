import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/LocalMarket.png";

const Footer = () => {
  return (
    <footer className="bg-[#1f3329] text-gray-300 px-6 md:px-12 lg:px-20 pt-14">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="KachaBazar" className="h-10 w-10" />
              <h2 className="text-2xl font-bold text-white">
                কাঁচাবাজার
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted source for daily market prices. Track, compare,
              and save on your grocery shopping.
            </p>

            <div className="flex gap-3 mt-4">
              <a className="p-2 rounded-full bg-[#2a4437] hover:bg-yellow-500 hover:text-black transition">
                <FaFacebookF />
              </a>
              <a className="p-2 rounded-full bg-[#2a4437] hover:bg-yellow-500 hover:text-black transition">
                <FaTwitter />
              </a>
              <a className="p-2 rounded-full bg-[#2a4437] hover:bg-yellow-500 hover:text-black transition">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allproduct" className="hover:text-yellow-400 transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-yellow-400 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-yellow-400 transition">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="hover:text-yellow-400 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-yellow-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-yellow-400 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-yellow-400 mt-1" />
                support@kachabazar.com
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-yellow-400 mt-1" />
                +880 1234-567890
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-yellow-400 mt-1" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2f4d3d] py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© 2026 কাঁচাবাজার. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Made with <span className="text-red-500">❤️</span> for local markets
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
