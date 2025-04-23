
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { predictiveAnalytics, equipment } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const PredictiveMaintenance = () => {
  const getFailureProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-red-500';
    if (probability >= 40) return 'text-amber-500';
    return 'text-green-500';
  };
  
  const getProgressColor = (probability: number) => {
    if (probability >= 70) return 'bg-red-500';
    if (probability >= 40) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Predictive Maintenance</h1>
          <p className="text-muted-foreground">AI-powered failure prediction and maintenance planning</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Equipment Health</CardTitle>
              <CardDescription>Overall health status of monitored equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Healthy</span>
                  <span className="font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2 bg-slate-200" />
                
                <div className="flex justify-between">
                  <span>Warning</span>
                  <span className="font-medium">25%</span>
                </div>
                <Progress value={25} className="h-2 bg-slate-200 [&>div]:bg-amber-500" />
                
                <div className="flex justify-between">
                  <span>Critical</span>
                  <span className="font-medium">15%</span>
                </div>
                <Progress value={15} className="h-2 bg-slate-200 [&>div]:bg-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>AI Recommendation</CardTitle>
              <CardDescription>Based on current equipment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-amber-50 border-amber-200">
                  <h3 className="font-medium mb-2">Critical Priority</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Drilling Equipment requires immediate maintenance.
                    Failure probability is 87% within 3 days.
                  </p>
                  <Button size="sm" variant="outline" className="bg-white">Schedule Now</Button>
                </div>
                
                <div className="p-4 border rounded-md bg-blue-50 border-blue-200">
                  <h3 className="font-medium mb-1">Maintenance Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    Consolidate maintenance for Storage Tanks and Compressor Station
                    to optimize downtime and reduce costs by an estimated 22%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Cost Analysis</CardTitle>
              <CardDescription>Predictive vs. Reactive Maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Predictive Maintenance Cost</span>
                    <span className="font-medium">$21,500</span>
                  </div>
                  <Progress value={30} className="h-2 mt-2 bg-slate-200" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated Failure Cost</span>
                    <span className="font-medium">$75,500</span>
                  </div>
                  <Progress value={100} className="h-2 mt-2 bg-slate-200 [&>div]:bg-red-500" />
                </div>
                
                <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm">
                  <span className="font-medium">Potential Savings: $54,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Equipment Failure Prediction</h2>
        
        <div className="space-y-4">
          {predictiveAnalytics.map((item) => {
            const equipmentItem = equipment.find(e => e.id === item.equipmentId);
            
            return (
              <Card key={item.id} className="overflow-hidden">
                <div className={cn(
                  "h-1",
                  item.failureProbability >= 70 ? "bg-red-500" : 
                  item.failureProbability >= 40 ? "bg-amber-500" : "bg-green-500"
                )} />
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="mb-4 lg:mb-0">
                      <h3 className="text-xl font-medium">{item.equipmentName}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge className={cn(
                          item.failureProbability >= 70
                            ? "bg-red-100 text-red-800 border-red-200"
                            : item.failureProbability >= 40
                            ? "bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-green-100 text-green-800 border-green-200",
                          "font-medium border"
                        )}>
                          {item.failureProbability >= 70 ? "Critical" : 
                           item.failureProbability >= 40 ? "Warning" : "Healthy"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Last maintenance: {equipmentItem?.lastMaintenance}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Failure Probability</div>
                        <div className={cn(
                          "text-2xl font-bold",
                          getFailureProbabilityColor(item.failureProbability)
                        )}>
                          {item.failureProbability}%
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Estimated Time to Failure</div>
                        <div className="text-2xl font-bold">{item.estimatedTimeToFailure}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Maintenance Cost</div>
                        <div className="text-2xl font-bold">{item.maintenanceCost}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Components at Risk</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.componentsAtRisk.map((component, idx) => (
                          <Badge key={idx} variant="outline">{component}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Recommended Action</h4>
                      <p className="text-muted-foreground text-sm">{item.suggestedAction}</p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm">Schedule Maintenance</Button>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default PredictiveMaintenance;
