
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from '@/components/Layout';
import { getAllBusinesses, getIndustries, searchBusinesses, getBusinessesByIndustry, Business } from '@/lib/mock-data';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const BusinessList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(searchParams.get('industry') || null);
  const [sortBy, setSortBy] = useState<string>('name');
  const [companyTypes, setCompanyTypes] = useState<Record<string, boolean>>({
    'Public': false,
    'Private': false
  });
  
  const industries = getIndustries();

  useEffect(() => {
    // Load initial data
    let initialBusinesses = getAllBusinesses();
    
    // Apply search from URL if present
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      initialBusinesses = searchBusinesses(searchFromUrl);
      setSearchQuery(searchFromUrl);
    }
    
    // Apply industry filter from URL if present
    const industryFromUrl = searchParams.get('industry');
    if (industryFromUrl) {
      initialBusinesses = getBusinessesByIndustry(industryFromUrl);
      setSelectedIndustry(industryFromUrl);
    }
    
    setBusinesses(initialBusinesses);
    setFilteredBusinesses(initialBusinesses);
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [businesses, selectedIndustry, sortBy, companyTypes]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    
    if (searchQuery) {
      newParams.set('search', searchQuery);
    }
    
    if (selectedIndustry) {
      newParams.set('industry', selectedIndustry);
    }
    
    setSearchParams(newParams);
    
    let searchResults = searchQuery ? searchBusinesses(searchQuery) : getAllBusinesses();
    
    if (selectedIndustry) {
      searchResults = searchResults.filter(business => business.industry === selectedIndustry);
    }
    
    setBusinesses(searchResults);
  };

  const handleIndustryChange = (industry: string) => {
    if (industry === "all") {
      setSelectedIndustry(null);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('industry');
      setSearchParams(newParams);
    } else {
      setSelectedIndustry(industry);
      const newParams = new URLSearchParams(searchParams);
      newParams.set('industry', industry);
      setSearchParams(newParams);
    }
  };

  const handleCompanyTypeChange = (type: string) => {
    setCompanyTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const applyFilters = () => {
    let filtered = [...businesses];
    
    // Apply industry filter
    if (selectedIndustry) {
      filtered = filtered.filter(business => business.industry === selectedIndustry);
    }
    
    // Apply company type filter
    const selectedTypes = Object.entries(companyTypes)
      .filter(([_, isSelected]) => isSelected)
      .map(([type]) => type);
    
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(business => 
        selectedTypes.includes(business.companyType)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'founded':
        filtered.sort((a, b) => new Date(a.foundedDate).getTime() - new Date(b.foundedDate).getTime());
        break;
      case 'employees':
        filtered.sort((a, b) => b.employeesCount - a.employeesCount);
        break;
      case 'funding':
        filtered.sort((a, b) => (b.totalFunding || 0) - (a.totalFunding || 0));
        break;
      default:
        break;
    }
    
    setFilteredBusinesses(filtered);
  };

  const clearFilters = () => {
    setSelectedIndustry(null);
    setCompanyTypes({
      'Public': false,
      'Private': false
    });
    setSortBy('name');
    setSearchParams({});
    setSearchQuery('');
    setBusinesses(getAllBusinesses());
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

  return (
    <Layout>
      {/* Page header */}
      <section className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">Business Directory</h1>
          <p className="text-gray-600">
            Browse and search through Indian businesses across various industries
          </p>
        </div>
      </section>
      
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost" 
                  size="sm" 
                  className="text-sm text-gray-500"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
              
              <Accordion type="single" collapsible defaultValue="industry">
                <AccordionItem value="industry">
                  <AccordionTrigger className="text-sm font-medium">Industry</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div
                        className={`flex items-center cursor-pointer p-2 rounded hover:bg-gray-50 ${!selectedIndustry ? 'bg-indian-blue/10 font-medium text-indian-blue' : ''}`}
                        onClick={() => handleIndustryChange("all")}
                      >
                        <span>All Industries</span>
                      </div>
                      {industries.map(industry => (
                        <div
                          key={industry}
                          className={`flex items-center cursor-pointer p-2 rounded hover:bg-gray-50 ${selectedIndustry === industry ? 'bg-indian-blue/10 font-medium text-indian-blue' : ''}`}
                          onClick={() => handleIndustryChange(industry)}
                        >
                          <span>{industry}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="company-type">
                  <AccordionTrigger className="text-sm font-medium">Company Type</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="public" 
                          checked={companyTypes['Public']}
                          onCheckedChange={() => handleCompanyTypeChange('Public')}
                        />
                        <label htmlFor="public" className="text-sm cursor-pointer">Public</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="private" 
                          checked={companyTypes['Private']}
                          onCheckedChange={() => handleCompanyTypeChange('Private')}
                        />
                        <label htmlFor="private" className="text-sm cursor-pointer">Private</label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search businesses by name, description..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500">
                {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'} found
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort by:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="founded">Founded Date</SelectItem>
                      <SelectItem value="employees">Employees</SelectItem>
                      <SelectItem value="funding">Total Funding</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map(business => (
                  <Link to={`/business/${business.id}`} key={business.id} className="block">
                    <div className="bg-white rounded-lg border shadow-sm hover:shadow-md p-4 transition-all">
                      <div className="flex items-start">
                        <div className="h-14 w-14 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img src={business.logo} alt={business.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{business.name}</h3>
                              <p className="text-sm text-gray-500">{business.industry}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                              Founded: {new Date(business.foundedDate).getFullYear()}
                            </div>
                          </div>
                          <p className="text-sm line-clamp-2 mt-2 text-gray-600">
                            {business.description}
                          </p>
                          <div className="flex flex-wrap gap-x-8 gap-y-1 mt-3">
                            <div className="text-sm">
                              <span className="font-medium">Headquarters:</span> {business.headquarters}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Employees:</span> {formatNumber(business.employeesCount)}
                            </div>
                            {business.totalFunding ? (
                              <div className="text-sm">
                                <span className="font-medium">Total Funding:</span> ₹{formatNumber(business.totalFunding)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <h3 className="text-lg font-medium mb-2">No businesses found</h3>
                  <p className="text-gray-500">Try changing your search or filters</p>
                </div>
              )}
            </div>
            
            {filteredBusinesses.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessList;
