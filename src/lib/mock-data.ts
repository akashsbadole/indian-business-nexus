
export interface Founder {
  id: string;
  name: string;
  position: string;
  linkedinProfile: string;
  bio: string;
  image?: string;
}

export interface FundingRound {
  id: string;
  amount: number;
  investors: string[];
  fundingStage: string;
  date: string;
}

export interface Business {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  foundedDate: string;
  headquarters: string;
  website: string;
  companyType: 'Public' | 'Private';
  employeesCount: number;
  status: 'Active' | 'Closed';
  contactEmail: string;
  phoneNumber: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  founders: Founder[];
  fundingRounds: FundingRound[];
  totalFunding?: number;
  competitors?: string[];
}

const businessData: Business[] = [
  {
    id: "1",
    name: "Tata Consultancy Services",
    logo: "/placeholder.svg",
    description: "Tata Consultancy Services (TCS) is an Indian multinational information technology services and consulting company with its headquarters in Mumbai, Maharashtra. It is a part of the Tata Group and operates in 149 locations across 46 countries.",
    industry: "Information Technology",
    foundedDate: "1968-04-01",
    headquarters: "Mumbai, Maharashtra",
    website: "https://www.tcs.com",
    companyType: "Public",
    employeesCount: 614000,
    status: "Active",
    contactEmail: "contact@tcs.com",
    phoneNumber: "+91-22-67789999",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/tata-consultancy-services",
      twitter: "https://twitter.com/TCS",
      facebook: "https://www.facebook.com/TataConsultancyServices"
    },
    founders: [
      {
        id: "f1",
        name: "F. C. Kohli",
        position: "Founder",
        linkedinProfile: "#",
        bio: "Often referred to as the Father of the Indian Software Industry, F. C. Kohli was the first CEO of TCS."
      }
    ],
    fundingRounds: [],
    totalFunding: 0
  },
  {
    id: "2",
    name: "Infosys",
    logo: "/placeholder.svg",
    description: "Infosys is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.",
    industry: "Information Technology",
    foundedDate: "1981-07-02",
    headquarters: "Bengaluru, Karnataka",
    website: "https://www.infosys.com",
    companyType: "Public",
    employeesCount: 345000,
    status: "Active",
    contactEmail: "contact@infosys.com",
    phoneNumber: "+91-80-28520261",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/infosys",
      twitter: "https://twitter.com/Infosys",
      facebook: "https://www.facebook.com/Infosys"
    },
    founders: [
      {
        id: "f2",
        name: "N. R. Narayana Murthy",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "N. R. Narayana Murthy is an Indian billionaire businessman and co-founder of Infosys."
      },
      {
        id: "f3",
        name: "Nandan Nilekani",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "Nandan Nilekani is an Indian entrepreneur and co-founder of Infosys."
      }
    ],
    fundingRounds: [],
    totalFunding: 0
  },
  {
    id: "3",
    name: "Flipkart",
    logo: "/placeholder.svg",
    description: "Flipkart is an Indian e-commerce company headquartered in Bangalore, Karnataka. It was founded by Sachin Bansal and Binny Bansal in 2007.",
    industry: "E-commerce",
    foundedDate: "2007-10-05",
    headquarters: "Bengaluru, Karnataka",
    website: "https://www.flipkart.com",
    companyType: "Private",
    employeesCount: 35000,
    status: "Active",
    contactEmail: "contact@flipkart.com",
    phoneNumber: "+91-80-49109999",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/flipkart",
      twitter: "https://twitter.com/Flipkart",
      facebook: "https://www.facebook.com/flipkart"
    },
    founders: [
      {
        id: "f4",
        name: "Sachin Bansal",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "Sachin Bansal is an Indian businessman, known for co-founding Flipkart."
      },
      {
        id: "f5",
        name: "Binny Bansal",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "Binny Bansal is an Indian billionaire businessman, known for co-founding Flipkart."
      }
    ],
    fundingRounds: [
      {
        id: "fr1",
        amount: 16000000,
        investors: ["Tiger Global Management"],
        fundingStage: "Series A",
        date: "2009-10-01"
      },
      {
        id: "fr2",
        amount: 150000000,
        investors: ["Naspers", "Tiger Global Management", "Accel Partners"],
        fundingStage: "Series D",
        date: "2012-08-01"
      },
      {
        id: "fr3",
        amount: 16000000000,
        investors: ["Walmart"],
        fundingStage: "Acquisition",
        date: "2018-05-01"
      }
    ],
    totalFunding: 16166000000
  },
  {
    id: "4",
    name: "BYJU'S",
    logo: "/placeholder.svg",
    description: "BYJU'S is an Indian educational technology company, headquartered in Bangalore. It was founded in 2011 by Byju Raveendran.",
    industry: "Ed Tech",
    foundedDate: "2011-01-01",
    headquarters: "Bengaluru, Karnataka",
    website: "https://byjus.com",
    companyType: "Private",
    employeesCount: 50000,
    status: "Active",
    contactEmail: "support@byjus.com",
    phoneNumber: "+91-80-67485700",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/byju's-/",
      twitter: "https://twitter.com/byjus",
      facebook: "https://www.facebook.com/byjusapp/"
    },
    founders: [
      {
        id: "f6",
        name: "Byju Raveendran",
        position: "Founder",
        linkedinProfile: "#",
        bio: "Byju Raveendran is an Indian billionaire businessman and founder of BYJU'S."
      }
    ],
    fundingRounds: [
      {
        id: "fr4",
        amount: 75000000,
        investors: ["Sequoia Capital", "Sofina", "Lightspeed Ventures"],
        fundingStage: "Series C",
        date: "2016-03-01"
      },
      {
        id: "fr5",
        amount: 150000000,
        investors: ["Qatar Investment Authority"],
        fundingStage: "Series D",
        date: "2019-07-01"
      },
      {
        id: "fr6",
        amount: 500000000,
        investors: ["Silver Lake", "Tiger Global", "General Atlantic"],
        fundingStage: "Series F",
        date: "2020-09-01"
      }
    ],
    totalFunding: 725000000
  },
  {
    id: "5",
    name: "Paytm",
    logo: "/placeholder.svg",
    description: "Paytm is an Indian multinational technology company that specializes in digital payment systems, e-commerce and financial services.",
    industry: "Fintech",
    foundedDate: "2010-08-01",
    headquarters: "Noida, Uttar Pradesh",
    website: "https://paytm.com",
    companyType: "Public",
    employeesCount: 12000,
    status: "Active",
    contactEmail: "care@paytm.com",
    phoneNumber: "+91-120-4657000",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/paytm/",
      twitter: "https://twitter.com/Paytm",
      facebook: "https://www.facebook.com/Paytm"
    },
    founders: [
      {
        id: "f7",
        name: "Vijay Shekhar Sharma",
        position: "Founder",
        linkedinProfile: "#",
        bio: "Vijay Shekhar Sharma is an Indian billionaire businessman and founder of Paytm."
      }
    ],
    fundingRounds: [
      {
        id: "fr7",
        amount: 150000000,
        investors: ["Alibaba Group", "SAIF Partners"],
        fundingStage: "Series D",
        date: "2015-02-01"
      },
      {
        id: "fr8",
        amount: 1400000000,
        investors: ["SoftBank Vision Fund", "Alibaba Group"],
        fundingStage: "Series G",
        date: "2017-05-01"
      }
    ],
    totalFunding: 1550000000
  },
  {
    id: "6",
    name: "Ola Cabs",
    logo: "/placeholder.svg",
    description: "Ola Cabs is an Indian ride-sharing company offering services that include vehicle for hire and food delivery.",
    industry: "Transportation",
    foundedDate: "2010-12-03",
    headquarters: "Bengaluru, Karnataka",
    website: "https://www.olacabs.com",
    companyType: "Private",
    employeesCount: 8000,
    status: "Active",
    contactEmail: "info@olacabs.com",
    phoneNumber: "+91-80-33553355",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/ola-cabs/",
      twitter: "https://twitter.com/Olacabs",
      facebook: "https://www.facebook.com/OlaCabs"
    },
    founders: [
      {
        id: "f8",
        name: "Bhavish Aggarwal",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "Bhavish Aggarwal is an Indian entrepreneur and co-founder of Ola Cabs."
      },
      {
        id: "f9",
        name: "Ankit Bhati",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "Ankit Bhati is an Indian entrepreneur and co-founder of Ola Cabs."
      }
    ],
    fundingRounds: [
      {
        id: "fr9",
        amount: 330000000,
        investors: ["SoftBank Group"],
        fundingStage: "Series D",
        date: "2014-10-01"
      },
      {
        id: "fr10",
        amount: 500000000,
        investors: ["Baillie Gifford", "Didi Chuxing", "Tiger Global Management"],
        fundingStage: "Series F",
        date: "2015-11-01"
      }
    ],
    totalFunding: 830000000
  },
  {
    id: "7",
    name: "Zomato",
    logo: "/placeholder.svg",
    description: "Zomato is an Indian multinational restaurant aggregator and food delivery company.",
    industry: "Food Delivery",
    foundedDate: "2008-07-01",
    headquarters: "Gurugram, Haryana",
    website: "https://www.zomato.com",
    companyType: "Public",
    employeesCount: 5000,
    status: "Active",
    contactEmail: "contact@zomato.com",
    phoneNumber: "+91-124-4094500",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/zomato/",
      twitter: "https://twitter.com/zomato",
      facebook: "https://www.facebook.com/zomato"
    },
    founders: [
      {
        id: "f10",
        name: "Deepinder Goyal",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "Deepinder Goyal is an Indian entrepreneur and founder of Zomato."
      },
      {
        id: "f11",
        name: "Pankaj Chaddah",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "Pankaj Chaddah is an Indian entrepreneur and co-founder of Zomato."
      }
    ],
    fundingRounds: [
      {
        id: "fr11",
        amount: 60000000,
        investors: ["Info Edge", "Sequoia Capital"],
        fundingStage: "Series D",
        date: "2013-11-01"
      },
      {
        id: "fr12",
        amount: 120000000,
        investors: ["Alibaba Group", "Ant Financial"],
        fundingStage: "Series G",
        date: "2018-02-01"
      }
    ],
    totalFunding: 180000000
  },
  {
    id: "8",
    name: "Swiggy",
    logo: "/placeholder.svg",
    description: "Swiggy is an Indian online food ordering and delivery platform that was founded in 2014.",
    industry: "Food Delivery",
    foundedDate: "2014-08-01",
    headquarters: "Bengaluru, Karnataka",
    website: "https://www.swiggy.com",
    companyType: "Private",
    employeesCount: 5000,
    status: "Active",
    contactEmail: "support@swiggy.com",
    phoneNumber: "+91-80-45798000",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/swiggy/",
      twitter: "https://twitter.com/swiggy_in",
      facebook: "https://www.facebook.com/swiggy.in"
    },
    founders: [
      {
        id: "f12",
        name: "Sriharsha Majety",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "Sriharsha Majety is an Indian entrepreneur and co-founder of Swiggy."
      },
      {
        id: "f13",
        name: "Nandan Reddy",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "Nandan Reddy is an Indian entrepreneur and co-founder of Swiggy."
      },
      {
        id: "f14",
        name: "Rahul Jaimini",
        position: "Co-founder",
        linkedinProfile: "#",
        bio: "Rahul Jaimini is an Indian entrepreneur and co-founder of Swiggy."
      }
    ],
    fundingRounds: [
      {
        id: "fr13",
        amount: 100000000,
        investors: ["Naspers", "Meituan-Dianping"],
        fundingStage: "Series E",
        date: "2017-05-01"
      },
      {
        id: "fr14",
        amount: 1000000000,
        investors: ["Naspers", "DST Global", "Meituan-Dianping"],
        fundingStage: "Series H",
        date: "2018-12-01"
      }
    ],
    totalFunding: 1100000000
  }
];

export const getAllBusinesses = (): Business[] => {
  return businessData;
};

export const getBusinessById = (id: string): Business | undefined => {
  return businessData.find(business => business.id === id);
};

export const getBusinessesByIndustry = (industry: string): Business[] => {
  return businessData.filter(business => business.industry === industry);
};

export const getIndustries = (): string[] => {
  const industries = new Set(businessData.map(business => business.industry));
  return Array.from(industries);
};

export const searchBusinesses = (query: string): Business[] => {
  const lowerCaseQuery = query.toLowerCase();
  return businessData.filter(
    business => 
      business.name.toLowerCase().includes(lowerCaseQuery) ||
      business.description.toLowerCase().includes(lowerCaseQuery) ||
      business.industry.toLowerCase().includes(lowerCaseQuery)
  );
};
