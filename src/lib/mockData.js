// Industries with more detailed descriptions
export const industries = [
  { 
    id: 1, 
    name: "Oil & Gas", 
    icon: "pipe", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Pipeline integrity and leak detection systems"
  },
  { 
    id: 2, 
    name: "Construction", 
    icon: "tank", 
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Construction equipment monitoring"
  },
  { 
    id: 3, 
    name: "Agriculture", 
    icon: "sliders-horizontal", 
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Agricultural machinery monitoring"
  },
  { 
    id: 4, 
    name: "Transport", 
    icon: "sliders-vertical", 
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Fleet fuel system monitoring"
  },
  { 
    id: 5, 
    name: "Aero Defence", 
    icon: "pipe", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Aircraft systems integrity monitoring"
  }
];

// Updated equipment with industry-specific items
export const equipment = [
  // Oil & Gas Equipment
  { 
    id: 101, 
    industryId: 1, 
    name: "Pipeline Network", 
    status: "healthy", 
    lastMaintenance: "2025-03-15", 
    nextMaintenance: "2025-06-15"
  },
  { 
    id: 102, 
    industryId: 1, 
    name: "Storage Tanks", 
    status: "warning", 
    lastMaintenance: "2025-01-22", 
    nextMaintenance: "2025-04-22"
  },
  { 
    id: 103, 
    industryId: 1, 
    name: "Pressure Valves", 
    status: "alert", 
    lastMaintenance: "2025-02-10", 
    nextMaintenance: "2025-05-10"
  },

  // Construction Equipment
  { 
    id: 201, 
    industryId: 2, 
    name: "Hydraulic Machines", 
    status: "healthy", 
    lastMaintenance: "2025-03-20", 
    nextMaintenance: "2025-06-20"
  },
  { 
    id: 202, 
    industryId: 2, 
    name: "Diesel Generators", 
    status: "warning", 
    lastMaintenance: "2025-02-15", 
    nextMaintenance: "2025-05-15"
  },
  { 
    id: 203, 
    industryId: 2, 
    name: "Fuel Storage Tanks", 
    status: "healthy", 
    lastMaintenance: "2025-03-10", 
    nextMaintenance: "2025-06-10"
  },

  // Agriculture Equipment
  { 
    id: 301, 
    industryId: 3, 
    name: "Diesel Pumps", 
    status: "healthy", 
    lastMaintenance: "2025-03-25", 
    nextMaintenance: "2025-06-25"
  },
  { 
    id: 302, 
    industryId: 3, 
    name: "Oil Sprayers", 
    status: "alert", 
    lastMaintenance: "2025-02-20", 
    nextMaintenance: "2025-05-20"
  },
  { 
    id: 303, 
    industryId: 3, 
    name: "Tractors", 
    status: "warning", 
    lastMaintenance: "2025-03-05", 
    nextMaintenance: "2025-06-05"
  },

  // Transport Equipment
  { 
    id: 401, 
    industryId: 4, 
    name: "Fuel Lines", 
    status: "healthy", 
    lastMaintenance: "2025-03-30", 
    nextMaintenance: "2025-06-30"
  },
  { 
    id: 402, 
    industryId: 4, 
    name: "Engines", 
    status: "warning", 
    lastMaintenance: "2025-02-25", 
    nextMaintenance: "2025-05-25"
  },
  { 
    id: 403, 
    industryId: 4, 
    name: "Storage Units", 
    status: "healthy", 
    lastMaintenance: "2025-03-01", 
    nextMaintenance: "2025-06-01"
  },

  // Aero Defence Equipment
  { 
    id: 501, 
    industryId: 5, 
    name: "Aircraft Fuel Systems", 
    status: "healthy", 
    lastMaintenance: "2025-04-01", 
    nextMaintenance: "2025-07-01"
  },
  { 
    id: 502, 
    industryId: 5, 
    name: "Hydraulic Units", 
    status: "alert", 
    lastMaintenance: "2025-03-05", 
    nextMaintenance: "2025-06-05"
  },
  { 
    id: 503, 
    industryId: 5, 
    name: "Fuel Storage Tanks", 
    status: "warning", 
    lastMaintenance: "2025-03-15", 
    nextMaintenance: "2025-06-15"
  }
];

// Updated sensors array with data for all equipment
export const sensors = [
  // Oil & Gas Equipment Sensors
  {
    id: 1001,
    equipmentId: 101,
    name: "Pressure Sensor P-101",
    type: "pressure",
    status: "healthy",
    currentValue: 52,
    unit: "PSI",
    threshold: 75,
    historyData: generateSensorHistory(40, 60, 24),
  },
  {
    id: 1002,
    equipmentId: 101,
    name: "Temperature Sensor T-101",
    type: "temperature",
    status: "healthy",
    currentValue: 65,
    unit: "°C",
    threshold: 85,
    historyData: generateSensorHistory(55, 75, 24),
  },

  // Construction Equipment Sensors
  {
    id: 2001,
    equipmentId: 201,
    name: "Hydraulic Pressure P-201",
    type: "pressure",
    status: "healthy",
    currentValue: 2200,
    unit: "PSI",
    threshold: 2500,
    historyData: generateSensorHistory(2000, 2400, 24),
  },
  {
    id: 2002,
    equipmentId: 201,
    name: "Oil Temperature T-201",
    type: "temperature",
    status: "healthy",
    currentValue: 82,
    unit: "°C",
    threshold: 95,
    historyData: generateSensorHistory(75, 90, 24),
  },

  // Agriculture Equipment Sensors
  {
    id: 3001,
    equipmentId: 301,
    name: "Flow Rate F-301",
    type: "flow",
    status: "healthy",
    currentValue: 120,
    unit: "GPM",
    threshold: 150,
    historyData: generateSensorHistory(100, 140, 24),
  },
  {
    id: 3002,
    equipmentId: 301,
    name: "Pump Pressure P-301",
    type: "pressure",
    status: "healthy",
    currentValue: 45,
    unit: "PSI",
    threshold: 60,
    historyData: generateSensorHistory(35, 55, 24),
  },

  // Transport Equipment Sensors
  {
    id: 4001,
    equipmentId: 401,
    name: "Fuel Pressure P-401",
    type: "pressure",
    status: "healthy",
    currentValue: 55,
    unit: "PSI",
    threshold: 70,
    historyData: generateSensorHistory(45, 65, 24),
  },
  {
    id: 4002,
    equipmentId: 401,
    name: "Line Temperature T-401",
    type: "temperature",
    status: "healthy",
    currentValue: 45,
    unit: "°C",
    threshold: 60,
    historyData: generateSensorHistory(35, 55, 24),
  },

  // Aero Defence Equipment Sensors
  {
    id: 5001,
    equipmentId: 501,
    name: "System Pressure P-501",
    type: "pressure",
    status: "healthy",
    currentValue: 3200,
    unit: "PSI",
    threshold: 3500,
    historyData: generateSensorHistory(3000, 3400, 24),
  },
  {
    id: 5002,
    equipmentId: 501,
    name: "Fuel Temperature T-501",
    type: "temperature",
    status: "healthy",
    currentValue: 35,
    unit: "°C",
    threshold: 45,
    historyData: generateSensorHistory(25, 40, 24),
  },
];

// Helper function for generating sensor history data
function generateSensorHistory(min, max, points) {
  const data = [];
  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - (i * 60 * 60 * 1000)); // hourly points
    const value = Math.round(min + Math.random() * (max - min));
    data.push({
      time: time.toISOString(),
      value
    });
  }
  
  return data;
}

// Alerts
export const alerts = [
  {
    id: "ALT-4291",
    time: "2025-04-23T08:23:15",
    industry: "Oil & Gas",
    component: "Drilling Equipment",
    sensor: "Vibration Sensor V-301",
    severity: "Critical",
    message: "Excessive vibration detected - immediate inspection required",
    status: "Open"
  },
  {
    id: "ALT-4290",
    time: "2025-04-23T07:45:09",
    industry: "Oil & Gas",
    component: "Drilling Equipment",
    sensor: "RPM Sensor R-301",
    severity: "Critical", 
    message: "RPM exceeding safe operating threshold",
    status: "Open"
  },
  {
    id: "ALT-4289",
    time: "2025-04-23T06:12:44",
    industry: "Oil & Gas",
    component: "Storage Tanks",
    sensor: "Level Sensor L-201",
    severity: "Warning",
    message: "Tank level approaching maximum capacity",
    status: "Open"
  },
  {
    id: "ALT-4288",
    time: "2025-04-22T23:37:28",
    industry: "Oil & Gas",
    component: "Storage Tanks",
    sensor: "Temperature Sensor T-201",
    severity: "Warning",
    message: "Temperature increase trend detected",
    status: "Resolved"
  },
  {
    id: "ALT-4287",
    time: "2025-04-22T19:15:02",
    industry: "Transport",
    component: "Fleet Vehicle #TRP-2234",
    sensor: "Engine Temperature",
    severity: "Warning",
    message: "Engine temperature fluctuation detected",
    status: "Resolved"
  },
  {
    id: "ALT-4286",
    time: "2025-04-22T14:02:53",
    industry: "Agriculture",
    component: "Irrigation System A-12",
    sensor: "Water Flow Meter",
    severity: "Low",
    message: "Flow rate below expected threshold",
    status: "Resolved"
  }
];

// Predictive Analytics
export const predictiveAnalytics = [
  {
    id: 1,
    equipmentId: 103,
    equipmentName: "Drilling Equipment",
    failureProbability: 87,
    estimatedTimeToFailure: "3 days",
    suggestedAction: "Schedule immediate maintenance",
    componentsAtRisk: ["Main bearing assembly", "Drive shaft"],
    maintenanceCost: "$12,500",
    downtimeCost: "$45,000/day"
  },
  {
    id: 2,
    equipmentId: 102,
    equipmentName: "Storage Tanks",
    failureProbability: 63,
    estimatedTimeToFailure: "14 days",
    suggestedAction: "Inspect during next scheduled maintenance",
    componentsAtRisk: ["Pressure relief valve", "Level sensor"],
    maintenanceCost: "$3,200",
    downtimeCost: "$8,500/day"
  },
  {
    id: 3,
    equipmentId: 105,
    equipmentName: "Compressor Station",
    failureProbability: 41,
    estimatedTimeToFailure: "30 days",
    suggestedAction: "Monitor closely, prepare maintenance plan",
    componentsAtRisk: ["Intake filter", "Oil lubrication system"],
    maintenanceCost: "$5,800",
    downtimeCost: "$22,000/day"
  }
];

// User authentication
export const users = [
  {
    id: 1,
    email: "admin@oilguardian.com",
    password: "admin123",
    role: "admin",
    name: "Alex Morgan",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    email: "operator@oilguardian.com",
    password: "operator123",
    role: "operator",
    name: "Sam Wilson",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

// Auth helpers
export function loginUser(email, password) {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userData } = user;
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return userData;
  }
  return null;
}

export function getCurrentUser() {
  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
}

export function logoutUser() {
  localStorage.removeItem('currentUser');
}
