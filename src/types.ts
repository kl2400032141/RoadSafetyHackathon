export type RoadType = 'NH' | 'SH' | 'Local';

export type IssueCategory = 'Pothole' | 'Waterlogging' | 'Damaged Road' | 'Broken Street Lights' | 'Lack of Signage';

export type TicketStatus = 'Pending' | 'Under Review' | 'In Progress' | 'Resolved';

export interface ExpenseItem {
  id: string;
  category: string;
  amount: number;
  percentage: number;
  proofName: string;
  description: string;
}

export interface Complaint {
  id: string;
  roadId: string;
  roadName: string;
  subject: string;
  description: string;
  category: IssueCategory;
  authority: string;
  status: TicketStatus;
  date: string;
  imageUrl?: string;
  audioText?: string;
  citizenName: string;
  referenceId: string;
  likes?: number;
  gmpCoordinate?: { lat: number; lng: number };
}

export interface Road {
  id: string;
  name: string;
  type: RoadType;
  location: string;
  contractor: string;
  budgetAllocated: number;
  budgetSpent: number;
  authority: string;
  lastRepairDate: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  lengthKm: number;
  lanes: number;
  expenses: ExpenseItem[];
  issues: Complaint[];
  coordinates: { x: number; y: number }[]; // For local visual SVG map rendering
  gmpCoordinates?: { lat: number; lng: number }[];
  gmpCenter?: { lat: number; lng: number };
}
