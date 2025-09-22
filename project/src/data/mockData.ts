import { Village, Project, Grievance, DashboardStats } from '../types';

export const mockVillages: Village[] = [
  {
    id: '1',
    name: 'Rampur',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    block: 'Mohanlalganj',
    population: 2500,
    scPercentage: 65,
    coordinates: [26.8467, 80.9462],
    infrastructure: {
      education: { available: true, functional: true, underConstruction: false, quality: 'good' },
      health: { available: true, functional: false, underConstruction: true, quality: 'fair' },
      water: { available: true, functional: true, underConstruction: false, quality: 'excellent' },
      sanitation: { available: false, functional: false, underConstruction: true, quality: 'poor' },
      connectivity: { available: true, functional: true, underConstruction: false, quality: 'good' },
      roads: { available: true, functional: false, underConstruction: true, quality: 'poor' }
    },
    satisfactionScore: 7.2,
    priorityIndex: 8.5
  },
  {
    id: '2',
    name: 'Shivpur',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    block: 'Sarojininagar',
    population: 1800,
    scPercentage: 72,
    coordinates: [26.8206, 80.9419],
    infrastructure: {
      education: { available: false, functional: false, underConstruction: true, quality: 'poor' },
      health: { available: true, functional: true, underConstruction: false, quality: 'good' },
      water: { available: true, functional: false, underConstruction: false, quality: 'poor' },
      sanitation: { available: true, functional: true, underConstruction: false, quality: 'good' },
      connectivity: { available: false, functional: false, underConstruction: true, quality: 'poor' },
      roads: { available: true, functional: true, underConstruction: false, quality: 'good' }
    },
    satisfactionScore: 6.8,
    priorityIndex: 9.2
  },
  {
    id: '3',
    name: 'Govindpur',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    block: 'Chinhat',
    population: 3200,
    scPercentage: 58,
    coordinates: [26.9124, 80.9624],
    infrastructure: {
      education: { available: true, functional: true, underConstruction: false, quality: 'excellent' },
      health: { available: true, functional: true, underConstruction: false, quality: 'good' },
      water: { available: true, functional: true, underConstruction: false, quality: 'good' },
      sanitation: { available: true, functional: true, underConstruction: false, quality: 'excellent' },
      connectivity: { available: true, functional: true, underConstruction: false, quality: 'excellent' },
      roads: { available: true, functional: true, underConstruction: false, quality: 'good' }
    },
    satisfactionScore: 8.7,
    priorityIndex: 3.2
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Community Health Center Construction',
    description: 'Building a new primary health center with modern facilities',
    category: 'Health',
    villageId: '1',
    status: 'in_progress',
    budget: 2500000,
    spentAmount: 1750000,
    startDate: '2024-01-15',
    expectedEndDate: '2024-06-15',
    assignedOfficer: 'Dr. Amit Verma',
    documents: [],
    photos: ['https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg'],
    progress: 70
  },
  {
    id: '2',
    title: 'School Infrastructure Upgrade',
    description: 'Renovating existing school building and adding new classrooms',
    category: 'Education',
    villageId: '2',
    status: 'proposed',
    budget: 1800000,
    spentAmount: 0,
    startDate: '2024-04-01',
    expectedEndDate: '2024-09-30',
    assignedOfficer: 'Mrs. Sunita Yadav',
    documents: [],
    photos: ['https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg'],
    progress: 0
  },
  {
    id: '3',
    title: 'Rural Road Development',
    description: 'Construction of paved roads connecting village to main highway',
    category: 'Infrastructure',
    villageId: '1',
    status: 'completed',
    budget: 3200000,
    spentAmount: 3150000,
    startDate: '2023-08-01',
    expectedEndDate: '2024-02-29',
    completionDate: '2024-02-25',
    assignedOfficer: 'Eng. Rakesh Gupta',
    documents: [],
    photos: ['https://images.pexels.com/photos/1006120/pexels-photo-1006120.jpeg'],
    progress: 100
  }
];

export const mockGrievances: Grievance[] = [
  {
    id: '1',
    title: 'Water Supply Disruption',
    description: 'No water supply for the past 3 days in our area',
    category: 'Water',
    villageId: '1',
    citizenId: 'citizen1',
    citizenName: 'Ram Kumar',
    citizenPhone: '+91 9876543214',
    status: 'in_review',
    priority: 'high',
    submittedDate: '2024-03-15',
    assignedOfficer: 'Sunita Devi',
    photos: ['https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'],
    audioFiles: [],
    location: [26.8467, 80.9462]
  },
  {
    id: '2',
    title: 'Damaged Road',
    description: 'Main village road has large potholes causing accidents',
    category: 'Roads',
    villageId: '2',
    citizenId: 'citizen2',
    citizenName: 'Geeta Devi',
    citizenPhone: '+91 9876543215',
    status: 'pending',
    priority: 'medium',
    submittedDate: '2024-03-18',
    photos: ['https://images.pexels.com/photos/1006120/pexels-photo-1006120.jpeg'],
    audioFiles: [],
    location: [26.8206, 80.9419]
  },
  {
    id: '3',
    title: 'School Teacher Absence',
    description: 'Primary school teacher has been absent for 2 weeks',
    category: 'Education',
    villageId: '3',
    citizenId: 'citizen3',
    citizenName: 'Mohan Lal',
    citizenPhone: '+91 9876543216',
    status: 'resolved',
    priority: 'high',
    submittedDate: '2024-03-10',
    resolvedDate: '2024-03-20',
    assignedOfficer: 'Block Education Officer',
    response: 'Substitute teacher has been assigned and regular teacher has resumed duties.',
    photos: [],
    audioFiles: [],
    location: [26.9124, 80.9624]
  }
];

export const mockDashboardStats: DashboardStats = {
  totalVillages: 125,
  onboardedVillages: 98,
  activeProjects: 45,
  completedProjects: 128,
  pendingGrievances: 23,
  resolvedGrievances: 187,
  averageSatisfaction: 7.4,
  budgetUtilization: 84.6
};