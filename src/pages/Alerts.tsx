
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { alerts } from '@/lib/mockData';
import AlertTable from '@/components/Tables/AlertTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter alerts based on search term and filters
  const filteredAlerts = alerts.filter(alert => {
    // Filter by search term
    const searchMatch = searchTerm === '' || 
      Object.values(alert).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      
    // Filter by severity
    const severityMatch = severityFilter === 'all' || 
      alert.severity.toLowerCase() === severityFilter.toLowerCase();
      
    // Filter by status
    const statusMatch = statusFilter === 'all' || 
      alert.status.toLowerCase() === statusFilter.toLowerCase();
      
    return searchMatch && severityMatch && statusMatch;
  });
  
  // Count alerts by status
  const openAlerts = alerts.filter(alert => alert.status.toLowerCase() === 'open').length;
  
  // Count alerts by severity
  const criticalAlerts = alerts.filter(alert => alert.severity.toLowerCase() === 'critical').length;
  const warningAlerts = alerts.filter(alert => alert.severity.toLowerCase() === 'warning').length;
  const lowAlerts = alerts.filter(alert => alert.severity.toLowerCase() === 'low').length;
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
          <p className="text-muted-foreground">Monitor and manage system alerts</p>
        </div>
        
        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Total Alerts</p>
                <h3 className="text-3xl font-bold mt-2">{alerts.length}</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Critical</p>
                <h3 className="text-3xl font-bold text-red-500 mt-2">{criticalAlerts}</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Warning</p>
                <h3 className="text-3xl font-bold text-amber-500 mt-2">{warningAlerts}</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Open Alerts</p>
                <h3 className="text-3xl font-bold text-blue-500 mt-2">{openAlerts}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Alert Log</CardTitle>
            <CardDescription>View and manage system alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input 
                  placeholder="Search alerts..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Alert Table */}
            {filteredAlerts.length > 0 ? (
              <AlertTable alerts={filteredAlerts} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No alerts match the current filters
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Alerts;
