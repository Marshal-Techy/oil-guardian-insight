
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        }}>
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            AI-Powered Remote Monitoring & Predictive Maintenance
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Secure. Predict. Maintain.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/20 p-4 rounded-lg border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-2">Real-Time Monitoring</h3>
              <p className="text-white/80">24/7 remote sensor monitoring for critical equipment across industries.</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-2">AI Prediction</h3>
              <p className="text-white/80">Advanced analytics to predict failures before they occur, saving time and money.</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-2">Multi-Industry</h3>
              <p className="text-white/80">Tailored solutions for Oil & Gas, Transport, Agriculture, Defense, and Construction.</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-2">Role-Based Access</h3>
              <p className="text-white/80">Secure, granular control with admin and operator permission levels.</p>
            </div>
          </div>
          
          <Button size="lg" onClick={() => navigate('/login')} className="bg-primary hover:bg-primary/90">
            Login to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
