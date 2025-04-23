
// Industries
export const industries = [
  { 
    id: 1, 
    name: "Oil & Gas", 
    icon: "building", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Upstream and downstream monitoring"
  },
  { 
    id: 2, 
    name: "Transport", 
    icon: "building", 
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Fleet and infrastructure management"
  },
  { 
    id: 3, 
    name: "Agriculture", 
    icon: "building", 
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Crop and equipment monitoring"
  },
  { 
    id: 4, 
    name: "Defense", 
    icon: "building", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Secure field operations"
  },
  { 
    id: 5, 
    name: "Construction", 
    icon: "building", 
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Site and equipment monitoring"
  },
];

// Equipment for Oil & Gas
export const equipment = [
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
    name: "Drilling Equipment", 
    status: "alert", 
    lastMaintenance: "2025-02-10", 
    nextMaintenance: "2025-05-10"
  },
  { 
    id: 104, 
    industryId: 1, 
    name: "Pressure Valves", 
    status: "healthy", 
    lastMaintenance: "2025-03-28", 
    nextMaintenance: "2025-06-28"
  },
  { 
    id: 105, 
    industryId: 1, 
    name: "Compressor Station", 
    status: "warning", 
    lastMaintenance: "2025-02-05", 
    nextMaintenance: "2025-05-05"
  }
];

// Sensors
export const sensors = [
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
    name: "Flow Rate Sensor F-101",
    type: "flow",
    status: "healthy",
    currentValue: 120,
    unit: "GPM",
    threshold: 200,
    historyData: generateSensorHistory(100, 140, 24),
  },
  {
    id: 1003,
    equipmentId: 102,
    name: "Level Sensor L-201",
    type: "level",
    status: "warning",
    currentValue: 78,
    unit: "%",
    threshold: 80,
    historyData: generateSensorHistory(65, 80, 24),
  },
  {
    id: 1004,
    equipmentId: 102,
    name: "Temperature Sensor T-201",
    type: "temperature",
    status: "healthy",
    currentValue: 62,
    unit: "°C",
    threshold: 75,
    historyData: generateSensorHistory(55, 68, 24),
  },
  {
    id: 1005,
    equipmentId: 103,
    name: "Vibration Sensor V-301",
    type: "vibration",
    status: "alert",
    currentValue: 42,
    unit: "mm/s",
    threshold: 30,
    historyData: generateSensorHistory(20, 45, 24),
  },
  {
    id: 1006,
    equipmentId: 103,
    name: "RPM Sensor R-301",
    type: "rpm",
    status: "alert",
    currentValue: 1850,
    unit: "RPM",
    threshold: 1800,
    historyData: generateSensorHistory(1700, 1900, 24),
  }
];

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

// Helper to generate random sensor data history
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
