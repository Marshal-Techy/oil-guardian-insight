
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  time: string;
  industry: string;
  component: string;
  sensor: string;
  severity: string;
  message: string;
  status: string;
}

interface AlertTableProps {
  alerts: Alert[];
}

const AlertTable: React.FC<AlertTableProps> = ({ alerts }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Alert ID</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Component</TableHead>
            <TableHead>Sensor</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell className="font-medium">{alert.id}</TableCell>
              <TableCell>{formatDate(alert.time)}</TableCell>
              <TableCell>{alert.industry}</TableCell>
              <TableCell>{alert.component}</TableCell>
              <TableCell>{alert.sensor}</TableCell>
              <TableCell>
                <Badge className={cn("font-medium border", getSeverityColor(alert.severity))}>
                  {alert.severity}
                </Badge>
              </TableCell>
              <TableCell>{alert.message}</TableCell>
              <TableCell className="text-right">
                <Badge className={cn("font-medium border", getStatusColor(alert.status))}>
                  {alert.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AlertTable;
