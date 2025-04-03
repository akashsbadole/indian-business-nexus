
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-indian-blue flex items-center justify-center">
              <span className="font-bold text-white">IBN</span>
            </div>
            <span className="font-bold text-xl text-indian-blue">
              Indian Business Nexus
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium text-gray-600 hover:text-indian-blue transition-colors">
            Home
          </Link>
          <Link to="/businesses" className="font-medium text-gray-600 hover:text-indian-blue transition-colors">
            Businesses
          </Link>
          <Link to="/investors" className="font-medium text-gray-600 hover:text-indian-blue transition-colors">
            Investors
          </Link>
          <Link to="/news" className="font-medium text-gray-600 hover:text-indian-blue transition-colors">
            News
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" className="gap-1">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button className="bg-indian-orange hover:bg-indian-orange/90 text-white">
            List Business
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-white absolute w-full border-b shadow-sm transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 invisible"
      )}>
        <nav className="container flex flex-col py-4 space-y-3">
          <Link to="/" className="font-medium p-2 text-gray-600 hover:text-indian-blue transition-colors">
            Home
          </Link>
          <Link to="/businesses" className="font-medium p-2 text-gray-600 hover:text-indian-blue transition-colors">
            Businesses
          </Link>
          <Link to="/investors" className="font-medium p-2 text-gray-600 hover:text-indian-blue transition-colors">
            Investors
          </Link>
          <Link to="/news" className="font-medium p-2 text-gray-600 hover:text-indian-blue transition-colors">
            News
          </Link>
          <div className="pt-2 flex flex-col space-y-2">
            <Button variant="outline" className="justify-start gap-1">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
            <Button variant="ghost">
              Sign In
            </Button>
            <Button className="bg-indian-orange hover:bg-indian-orange/90 text-white">
              List Business
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
