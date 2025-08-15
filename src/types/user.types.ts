// User Role type
export type UserRole = "admin" | "client" | "worker";

// User Status type
export type UserStatus = "active" | "pending" | "suspended" | "inactive";

// Base User interface with common fields
export interface BaseUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  profileImage: string;
  notificationPreferences: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export type WorkersSkills =
  | "deep_cleaning"
  | "laundry_and_ironing"
  | "time_management"
  | "meal_prep_and_nutrition"
  | "food_hygiene"
  | "childcare"
  | "first_aid"
  | "early_education"
  | "defensive_driving"
  | "basic_car_maintenance"
  | "security_surveillance"
  | "access_control"
  | "emergency_response"
  | "fabric_care"
  | "ironing_technique"
  | "guest_handling"
  | "formal_service"
  | "landscaping"
  | "tool_handling"
  | "mobility_assistance"
  | "medication_support"
  | "staff_coordination"
  | "house_budgeting";

// Support Worker Verification Status
export interface VerificationStatus {
  profileSetupComplete: boolean;
  identityVerified: boolean;
  policeCheckVerified: boolean;
  ndisWorkerScreeningVerified: boolean;
  onboardingComplete: boolean;
  onboardingFeeReceived: boolean;
}

// Support Worker Rating
export interface Rating {
  average: number;
  count: number;
}

// Support Worker Availability
export interface Availability {
  unavailableDates: string[];
  weekdays: WeekdayAvailability[];
}

export interface WeekdayAvailability {
  day: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
}

// Support Worker Experience
export interface Experience {
  _id?: string;
  title: string;
  household: string;
  startDate: string;
  endDate?: string;
  description: string;
}

// Support Worker interface
export interface Worker extends BaseUser {
  skills: string[];
  availability: Availability;
  serviceAreas: string[];
  languages: string[];
  ratings: Rating;
  verificationStatus: VerificationStatus;
  households: string[];
  qualifications: string[];
  experience: Experience[];
  bio?: string;
  hourlyRate?: number;
  weekendRate?: number;
  holidayRate?: number;
  overnightRate?: number;
}

// Client Subscription
export interface Subscription {
  tier: string;
  isActive: boolean;
  autoRenew: boolean;
  startDate: string;
  endDate?: string;
}

// Client interface
export interface Client extends BaseUser {
  subscription: Subscription;
  supportNeeds: string[];
  supportCoordinators: string[];
  preferredLanguages: string[];
  preferredGenders: string[];
  requiresSupervision: boolean;
}

// Guardian interface
// export interface Guardian extends BaseUser {
//   clients: string[];
// }

// Admin interface
export interface Admin extends BaseUser {
  permissions: string[];
}

// Union type for all user types
export type User = Worker | Client | Admin;

// Registration input type
export interface UserRegistrationInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
}

// Email verification input
export interface EmailVerificationInput {
  userId: string;
  otpCode: string;
}

// Resend verification input
export interface ResendVerificationInput {
  email: string;
}

// Login input
export interface LoginInput {
  email: string;
  password: string;
}
