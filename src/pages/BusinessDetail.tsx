
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Layout from '@/components/Layout';
import { getBusinessById } from '@/lib/mock-data';
import { ExternalLink, MapPin, Users, Calendar, Globe, Mail, Phone } from 'lucide-react';

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const business = id ? getBusinessById(id) : undefined;

  if (!business) {
    return (
      <Layout>
        <div className="container py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Business Not Found</h2>
            <p className="text-gray-600 mb-6">The business you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/businesses')}>
              View All Businesses
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
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
      {/* Company header */}
      <section className="bg-white border-b">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="h-20 w-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img src={business.logo} alt={business.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{business.name}</h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <span className="inline-flex items-center">
                      {business.industry}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="inline-flex items-center">
                      {business.companyType}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <Button variant="outline" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <a href={business.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                  <Button>Follow</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-y-2 gap-x-6 mt-6 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{business.headquarters}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{formatNumber(business.employeesCount)} employees</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Founded {formatDate(business.foundedDate)}</span>
            </div>
            {business.totalFunding ? (
              <div className="flex items-center font-medium text-indian-blue">
                <span>₹{formatNumber(business.totalFunding)} total funding</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="container py-8">
        <Tabs defaultValue="overview">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="founders">Founders</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">About {business.name}</h2>
                  <p className="text-gray-700">{business.description}</p>
                </div>
                
                {business.founders.length > 0 && (
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Founders</h2>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="#founders">View All</Link>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {business.founders.slice(0, 2).map(founder => (
                        <div key={founder.id} className="flex items-start">
                          <div className="h-14 w-14 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden">
                            {founder.image ? (
                              <img src={founder.image} alt={founder.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-indian-blue text-white text-xl">
                                {founder.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium">{founder.name}</h3>
                            <p className="text-sm text-gray-500">{founder.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {business.fundingRounds.length > 0 && (
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Funding History</h2>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="#funding">View All</Link>
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {business.fundingRounds.slice(0, 2).map(round => (
                        <div key={round.id} className="border-l-2 border-indian-blue pl-4 pb-4">
                          <div className="text-sm text-gray-500">{formatDate(round.date)}</div>
                          <div className="font-medium">{round.fundingStage}</div>
                          <div className="text-lg font-semibold">₹{formatNumber(round.amount)}</div>
                          <div className="text-sm mt-1">
                            <span className="text-gray-600">Lead investors:</span>{" "}
                            {round.investors.join(", ")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Company Info</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <a 
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-indian-blue hover:underline"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        {business.website.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Headquarters</div>
                      <div>{business.headquarters}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Founded Date</div>
                      <div>{formatDate(business.foundedDate)}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Company Type</div>
                      <div>{business.companyType}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Employee Count</div>
                      <div>{formatNumber(business.employeesCount)}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Status</div>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        business.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {business.status}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="text-sm text-gray-500">Contact</div>
                      <div className="flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-1" />
                        <a href={`mailto:${business.contactEmail}`} className="text-indian-blue hover:underline">
                          {business.contactEmail}
                        </a>
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-1" />
                        <a href={`tel:${business.phoneNumber}`} className="text-indian-blue hover:underline">
                          {business.phoneNumber}
                        </a>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="text-sm text-gray-500">Social Media</div>
                      <div className="flex space-x-3 mt-2">
                        {business.socialLinks.linkedin && (
                          <a 
                            href={business.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                            </svg>
                          </a>
                        )}
                        {business.socialLinks.twitter && (
                          <a 
                            href={business.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-full bg-[#1da1f2] flex items-center justify-center text-white"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg>
                          </a>
                        )}
                        {business.socialLinks.facebook && (
                          <a 
                            href={business.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-full bg-[#1877f2] flex items-center justify-center text-white"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {business.competitors && business.competitors.length > 0 && (
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Similar Companies</h2>
                    <div className="space-y-3">
                      {business.competitors.map(competitor => (
                        <div key={competitor} className="flex items-center">
                          <div className="h-8 w-8 bg-gray-100 rounded-md"></div>
                          <span className="ml-2">{competitor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="founders">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Founders & Leadership</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {business.founders.map(founder => (
                  <div key={founder.id} className="flex">
                    <div className="h-20 w-20 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden">
                      {founder.image ? (
                        <img src={founder.image} alt={founder.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-indian-blue text-white text-2xl">
                          {founder.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{founder.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{founder.position}</p>
                      <p className="text-sm text-gray-700">{founder.bio}</p>
                      {founder.linkedinProfile && (
                        <a 
                          href={founder.linkedinProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center mt-2 text-sm text-indian-blue hover:underline"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="mr-1">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                          </svg>
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="funding">
            {business.fundingRounds.length > 0 ? (
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Funding Rounds</h2>
                  {business.totalFunding && (
                    <div className="text-lg font-medium">
                      Total: <span className="text-indian-blue">₹{formatNumber(business.totalFunding)}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-8">
                  {business.fundingRounds.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(round => (
                    <div key={round.id} className="border-l-2 border-indian-blue pl-6 pb-6 relative">
                      <div className="absolute w-3 h-3 bg-indian-blue rounded-full -left-[7px] top-1"></div>
                      <div className="text-sm text-gray-500">{formatDate(round.date)}</div>
                      <div className="font-medium text-xl mb-1">{round.fundingStage}</div>
                      <div className="text-2xl font-bold text-indian-blue">₹{formatNumber(round.amount)}</div>
                      <div className="mt-2">
                        <div className="text-sm text-gray-600">Investors</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {round.investors.map(investor => (
                            <span 
                              key={investor} 
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100"
                            >
                              {investor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
                <p>No funding information available for {business.name}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="news">
            <div className="bg-white p-6 rounded-lg border shadow-sm text-center py-12">
              <h2 className="text-xl font-semibold mb-2">News & Updates</h2>
              <p className="text-gray-600 mb-6">No news articles are available at this time.</p>
              <Button variant="outline">Subscribe for Updates</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <section className="bg-gray-50 py-12 border-t">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6 text-center">Add Your Business to Indian Business Nexus</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 mb-8">
              Get discovered by potential clients, partners, and investors. Join our community of Indian businesses today.
            </p>
            <Button size="lg" className="bg-indian-orange hover:bg-indian-orange/90 text-white">
              List Your Business
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BusinessDetail;
