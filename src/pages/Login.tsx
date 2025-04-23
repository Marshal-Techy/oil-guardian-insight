
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { loginUser } from '@/lib/mockData';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Building, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate login request
    setTimeout(() => {
      const user = loginUser(email, password);
      
      if (user) {
        toast({
          title: "Success",
          description: `Welcome back, ${user.name}!`,
        });
        
        // Navigate to appropriate dashboard based on user role
        if (user.role === 'admin') {
          navigate('/dashboard/admin');
        } else {
          navigate('/dashboard/operator');
        }
      } else {
        toast({
          title: "Authentication Error",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  // Helper function to set demo credentials
  const setDemoCredentials = (selectedRole: string) => {
    if (selectedRole === 'admin') {
      setEmail('admin@oilguardian.com');
      setPassword('admin123');
    } else {
      setEmail('operator@oilguardian.com');
      setPassword('operator123');
    }
    setRole(selectedRole);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Oil Guardian</h2>
          <p className="mt-2 text-muted-foreground">Sign in to your account</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Choose your role and enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Role</label>
                <ToggleGroup
                  type="single"
                  value={role}
                  onValueChange={(value) => {
                    if (value) setDemoCredentials(value);
                  }}
                  className="flex justify-center"
                >
                  <ToggleGroupItem value="admin" className="w-full flex gap-2">
                    <Building className="h-4 w-4" />
                    Admin
                  </ToggleGroupItem>
                  <ToggleGroupItem value="operator" className="w-full flex gap-2">
                    <User className="h-4 w-4" />
                    Operator
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <p>For demo: Use admin@oilguardian.com / admin123</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
