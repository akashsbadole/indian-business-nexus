
import { Business, Founder, FundingRound } from './mock-data';

export const parseCSV = (csvText: string): string[][] => {
  const lines = csvText.split('\n');
  return lines.map(line => {
    // Handle quoted fields with commas inside
    const result: string[] = [];
    let inQuotes = false;
    let currentField = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"' && (i === 0 || line[i-1] !== '\\')) {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(currentField);
        currentField = '';
      } else {
        currentField += char;
      }
    }
    
    result.push(currentField);
    return result;
  });
};

export const importBusinessesFromCSV = async (filePath: string): Promise<Business[]> => {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    const headers = rows[0];
    const businesses: Business[] = [];

    for (let i = 1; i < rows.length; i++) {
      if (rows[i].length <= 1) continue; // Skip empty rows
      
      const row = rows[i];
      const business: Partial<Business> = {
        id: row[headers.indexOf('id')],
        name: row[headers.indexOf('name')],
        logo: row[headers.indexOf('logo')],
        description: row[headers.indexOf('description')],
        industry: row[headers.indexOf('industry')],
        foundedDate: row[headers.indexOf('foundedDate')],
        headquarters: row[headers.indexOf('headquarters')],
        website: row[headers.indexOf('website')],
        companyType: row[headers.indexOf('companyType')] as 'Public' | 'Private',
        employeesCount: parseInt(row[headers.indexOf('employeesCount')], 10),
        status: row[headers.indexOf('status')] as 'Active' | 'Closed',
        contactEmail: row[headers.indexOf('contactEmail')],
        phoneNumber: row[headers.indexOf('phoneNumber')],
        socialLinks: {
          linkedin: row[headers.indexOf('linkedin')],
          twitter: row[headers.indexOf('twitter')],
          facebook: row[headers.indexOf('facebook')],
        },
        totalFunding: parseInt(row[headers.indexOf('totalFunding')], 10) || 0,
        founders: [],
        fundingRounds: []
      };

      businesses.push(business as Business);
    }

    return businesses;
  } catch (error) {
    console.error('Error importing businesses from CSV:', error);
    return [];
  }
};

export const importFoundersFromCSV = async (filePath: string): Promise<Record<string, Founder[]>> => {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    const headers = rows[0];
    const foundersByCompany: Record<string, Founder[]> = {};

    for (let i = 1; i < rows.length; i++) {
      if (rows[i].length <= 1) continue; // Skip empty rows
      
      const row = rows[i];
      const companyId = row[headers.indexOf('company_id')];
      
      const founder: Founder = {
        id: row[headers.indexOf('id')],
        name: row[headers.indexOf('name')],
        position: row[headers.indexOf('position')],
        linkedinProfile: row[headers.indexOf('linkedinProfile')],
        bio: row[headers.indexOf('bio')],
      };

      if (!foundersByCompany[companyId]) {
        foundersByCompany[companyId] = [];
      }
      
      foundersByCompany[companyId].push(founder);
    }

    return foundersByCompany;
  } catch (error) {
    console.error('Error importing founders from CSV:', error);
    return {};
  }
};

export const importFundingRoundsFromCSV = async (filePath: string): Promise<Record<string, FundingRound[]>> => {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    const headers = rows[0];
    const fundingByCompany: Record<string, FundingRound[]> = {};

    for (let i = 1; i < rows.length; i++) {
      if (rows[i].length <= 1) continue; // Skip empty rows
      
      const row = rows[i];
      const companyId = row[headers.indexOf('company_id')];
      
      const fundingRound: FundingRound = {
        id: row[headers.indexOf('id')],
        amount: parseInt(row[headers.indexOf('amount')], 10),
        investors: row[headers.indexOf('investors')].split(', '),
        fundingStage: row[headers.indexOf('fundingStage')],
        date: row[headers.indexOf('date')],
      };

      if (!fundingByCompany[companyId]) {
        fundingByCompany[companyId] = [];
      }
      
      fundingByCompany[companyId].push(fundingRound);
    }

    return fundingByCompany;
  } catch (error) {
    console.error('Error importing funding rounds from CSV:', error);
    return {};
  }
};

export const importCompleteDataFromCSV = async (): Promise<Business[]> => {
  const businesses = await importBusinessesFromCSV('/src/data/business_data.csv');
  const foundersByCompany = await importFoundersFromCSV('/src/data/founder_data.csv');
  const fundingByCompany = await importFundingRoundsFromCSV('/src/data/funding_data.csv');
  
  // Merge the data
  return businesses.map(business => {
    const completeBusinessData = {
      ...business,
      founders: foundersByCompany[business.id] || [],
      fundingRounds: fundingByCompany[business.id] || [],
    };
    
    return completeBusinessData;
  });
};
