export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'central_admin' | 'state_admin' | 'district_admin' | 'village_admin' | 'citizen';
  level: string; // State/District/Block/Village name
  permissions: string[];
}

export interface Village {
  id: string;
  name: string;
  state: string;
  district: string;
  block: string;
  population: number;
  scPercentage: number;
  coordinates: [number, number];
  infrastructure: Infrastructure;
  satisfactionScore: number;
  priorityIndex: number;
}

export interface Infrastructure {
  education: FacilityStatus;
  health: FacilityStatus;
  water: FacilityStatus;
  sanitation: FacilityStatus;
  connectivity: FacilityStatus;
  roads: FacilityStatus;
}

export interface FacilityStatus {
  available: boolean;
  functional: boolean;
  underConstruction: boolean;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  villageId: string;
  status: 'proposed' | 'approved' | 'in_progress' | 'completed';
  budget: number;
  spentAmount: number;
  startDate: string;
  expectedEndDate: string;
  completionDate?: string;
  assignedOfficer: string;
  documents: Document[];
  photos: string[];
  progress: number;
}

export interface Grievance {
  id: string;
  title: string;
  description: string;
  category: string;
  villageId: string;
  citizenId: string;
  citizenName: string;
  citizenPhone: string;
  status: 'pending' | 'in_review' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedDate: string;
  resolvedDate?: string;
  assignedOfficer?: string;
  photos: string[];
  audioFiles: string[];
  response?: string;
  location: [number, number];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedDate: string;
}

export interface DashboardStats {
  totalVillages: number;
  onboardedVillages: number;
  activeProjects: number;
  completedProjects: number;
  pendingGrievances: number;
  resolvedGrievances: number;
  averageSatisfaction: number;
  budgetUtilization: number;
}