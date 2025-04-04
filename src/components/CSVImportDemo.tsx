
import React, { useState, useEffect } from 'react';
import { importCompleteDataFromCSV } from '@/lib/csv-utils';
import { Business } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CSVImportDemo = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await importCompleteDataFromCSV();
      setBusinesses(data);
    } catch (err) {
      setError('Failed to import data. Please check console for details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">CSV Data Import Demo</h2>
        <Button onClick={handleImport} disabled={loading}>
          {loading ? 'Importing...' : 'Import CSV Data'}
        </Button>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-800 rounded-md">{error}</div>}

      {businesses.length > 0 ? (
        <Table>
          <TableCaption>Imported Businesses from CSV</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Founded</TableHead>
              <TableHead>Headquarters</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead className="text-right">Total Funding</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businesses.map((business) => (
              <TableRow key={business.id}>
                <TableCell className="font-medium">{business.name}</TableCell>
                <TableCell>{business.industry}</TableCell>
                <TableCell>{new Date(business.foundedDate).getFullYear()}</TableCell>
                <TableCell>{business.headquarters}</TableCell>
                <TableCell>{business.employeesCount.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {business.totalFunding 
                    ? `₹${(business.totalFunding / 1000000).toFixed(1)}M` 
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Click the Import button to load CSV data</p>
        </div>
      )}
    </div>
  );
};

export default CSVImportDemo;
