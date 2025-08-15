// import { WorkerSkill } from './types';
// import { User } from './User';

// export interface Worker extends User {
//   skills?: WorkerSkill[];
//   experience: {
//     title: string;
//     household: string;
//     startDate: Date;
//     endDate?: Date;
//     description: string;
//   }[];
//   hourlyRate: {
//     baseRate: number;
//     weekendRate?: number;
//     holidayRate?: number;
//     overnightRate?: number;
//   };
//   availability: {
//     weekdays: {
//       day: string;
//       available: boolean;
//       slots?: {
//         start: string; // Time in HH:MM format
//         end: string;
//       }[];
//     }[];
//     unavailableDates: Date[];
//   };
//   languages: string[];
// }

// entities/Worker.ts

// types/supportWorker.ts

export interface Worker {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "supportWorker";
  status: "active" | "inactive" | "pending" | "suspended";
  phone: string;
  notificationPreferences: string;
  isEmailVerified: boolean;
  skills: string[];
  availability: {
    unavailableDates: string[];
    weekdays: string[];
  };
  serviceAreas: string[];
  languages: string[];
  ratings?: {
    average: number;
    count: number;
  };
  verificationStatus?: {
    profileSetupComplete: boolean;
    identityVerified: boolean;
    policeCheckVerified: boolean;
    ndisWorkerScreeningVerified: boolean;
    onboardingComplete: boolean;
    onboardingFeeReceived: boolean;
  };
  households: string[];
  qualifications: Qualification[];
  experience: Experience[];
  shiftRates: ShiftRate[];
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  profileImage?: string;
  __v: number;
  organizationCount: number;
  // Some workers might have client-like fields (legacy data)
  supportNeeds?: string[];
  subscription?: {
    tier: string;
    isActive: boolean;
    autoRenew: boolean;
    startDate: string;
  };
  supportCoordinators?: string[];
  preferredLanguages?: string[];
  preferredGenders?: string[];
  requiresSupervision?: boolean;
}

export interface Qualification {
  _id: string;
  title: string;
  institution: string;
  dateObtained: string;
  expiryDate?: string;
  certificateUrl?: string;
}

export interface Experience {
  _id: string;
  jobTitle: string;
  household: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
}

export interface ShiftRate {
  rateTimeBandId: string;
  hourlyRate: number;
  _id: string;
}

// Worker-specific filter interface
export interface WorkerTableFilters {
  status?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  isEmailVerified?: boolean;
  hasProfileImage?: boolean;
  skills?: string[];
  serviceAreas?: string[];
  languages?: string[];
  hasAbn?: boolean;
  hasBankDetails?: boolean;
  minRating?: number;
  maxRating?: number;
  minHourlyRate?: number;
  maxHourlyRate?: number;
  hasQualifications?: boolean;
  hasExperience?: boolean;
  profileSetupComplete?: boolean;
  identityVerified?: boolean;
  policeCheckVerified?: boolean;
  ndisWorkerScreeningVerified?: boolean;
  onboardingComplete?: boolean;
  onboardingFeeReceived?: boolean;
  minHouseholds?: number;
  maxHouseholds?: number;
}

// Verification status summary
export interface VerificationSummary {
  total: number;
  completed: number;
  percentage: number;
}

// Helper type for verification status keys
export type VerificationStatusKey = keyof Worker["verificationStatus"];
