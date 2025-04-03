
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Layout from '@/components/Layout';
import { getIndustries, getAllBusinesses, Business } from '@/lib/mock-data';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const industries = getIndustries();
  const featuredBusinesses = getAllBusinesses().slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/businesses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const BusinessCard = ({ business }: { business: Business }) => {
    return (
      <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all">
        <div className="flex p-4 items-center border-b">
          <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
            <img src={business.logo} alt={business.name} className="h-full w-full object-cover" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-lg">{business.name}</h3>
            <p className="text-sm text-gray-500">{business.industry}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm line-clamp-2 mb-3 text-gray-700">
            {business.description}
          </p>
          <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
            <div>
              <span className="font-semibold">Founded:</span> {new Date(business.foundedDate).getFullYear()}
            </div>
            <div>
              <span className="font-semibold">Employees:</span> {formatNumber(business.employeesCount)}
            </div>
          </div>
          {business.totalFunding ? (
            <div className="text-xs mb-3">
              <span className="font-semibold">Total Funding:</span> ₹{formatNumber(business.totalFunding)}
            </div>
          ) : null}
          <Link to={`/business/${business.id}`} className="block">
            <Button variant="outline" className="w-full mt-2 border-indian-blue text-indian-blue hover:bg-indian-blue hover:text-white">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-indian-blue text-white py-16 md:py-24 hero-pattern">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Discover India's Business Landscape
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Your comprehensive directory of businesses, startups, and investors across India.
            </p>
            <form onSubmit={handleSearch} className="flex w-full max-w-xl mx-auto mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search companies, industries, or investors"
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="ml-2 h-12 bg-indian-orange hover:bg-indian-orange/90">
                Search
              </Button>
            </form>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-gray-300">Popular:</span>
              {industries.slice(0, 4).map((industry) => (
                <Link
                  key={industry}
                  to={`/businesses?industry=${encodeURIComponent(industry)}`}
                  className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  {industry}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-indian-blue">Featured Businesses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore some of India's most influential companies leading innovation and growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/businesses">
              <Button size="lg" className="bg-indian-blue hover:bg-indian-blue/90">
                View All Businesses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indian-orange mb-2">500+</div>
              <p className="text-gray-600">Businesses Listed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indian-orange mb-2">20+</div>
              <p className="text-gray-600">Industries Covered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indian-orange mb-2">₹150B+</div>
              <p className="text-gray-600">Total Funding Tracked</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indian-orange mb-2">10K+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-indian-blue">Browse By Industry</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover businesses across various sectors driving India's economy.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <Link
                key={industry}
                to={`/businesses?industry=${encodeURIComponent(industry)}`}
                className="bg-white p-5 rounded-lg border hover:shadow-md text-center transition-all"
              >
                <h3 className="text-lg font-medium text-indian-blue">{industry}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {getAllBusinesses().filter(b => b.industry === industry).length} businesses
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indian-blue text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">List Your Business Today</h2>
            <p className="text-lg mb-8 text-gray-200">
              Join our growing community of Indian businesses and gain visibility among investors, partners, and customers.
            </p>
            <Button size="lg" className="bg-indian-orange hover:bg-indian-orange/90">
              Add Your Business
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
