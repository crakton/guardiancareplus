import { get, post, put } from "../apiClient";
import {
  Worker,
  Availability,
  Experience,
  TimeSlot,
  VerificationStatus,
} from "../../types/user.types";

//  worker profile update input
export interface WorkerProfileInput {
  bio?: string;
  skills?: string[];
  languages?: string[];
  serviceAreas?: string[];
  hourlyRate?: number;
  weekendRate?: number;
  holidayRate?: number;
  overnightRate?: number;
}

// Availability update input
export interface AvailabilityInput {
  day: string;
  slots: TimeSlot[];
}

// Service for support worker operations
const workerService = {
  // Get the current support worker's profile
  getProfile: async (): Promise<Worker> => {
    return await get<Worker>("/workers/me");
  },

  // Update support worker's profile
  updateProfile: async (data: WorkerProfileInput): Promise<Worker> => {
    return await put<Worker>("/workers/me", data);
  },

  // Update support worker's availability
  updateAvailability: async (
    availability: AvailabilityInput[]
  ): Promise<Availability> => {
    return await put<Availability>("/workers/me/availability", {
      weekdays: availability,
    });
  },

  // Add work experience
  addExperience: async (
    experience: Omit<Experience, "_id">
  ): Promise<Experience> => {
    return await post<Experience>("/workers/me/experience", experience);
  },

  // Update work experience
  updateExperience: async (
    id: string,
    experience: Omit<Experience, "_id">
  ): Promise<Experience> => {
    return await put<Experience>(`/workers/me/experience/${id}`, experience);
  },

  // Complete profile setup (marks the profile as complete)
  completeProfileSetup: async (): Promise<VerificationStatus> => {
    return await post<VerificationStatus>("/workers/me/complete-profile");
  },

  // Get all available workers (for client view)
  getAllAvailable: async (): Promise<Worker[]> => {
    return await get<Worker[]>("/workers/available");
  },

  // Get support worker details by ID (for client view)
  getById: async (id: string): Promise<Worker> => {
    return await get<Worker>(`/workers/${id}`);
  },
};

export default workerService;
