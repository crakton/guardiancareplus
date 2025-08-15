import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import workerService, {
  WorkerProfileInput,
  AvailabilityInput,
} from "../api/services/workerService";
import {
  Worker,
  Availability,
  Experience,
  VerificationStatus,
} from "../types/user.types";

// Keys for React Query
export const workerKeys = {
  all: ["worker"] as const,
  profile: () => [...workerKeys.all, "profile"] as const,
  experience: () => [...workerKeys.all, "experience"] as const,
  availability: () => [...workerKeys.all, "availability"] as const,
  list: () => [...workerKeys.all, "list"] as const,
  detail: (id: string) => [...workerKeys.all, "detail", id] as const,
};

// Hook to get  worker profile
export const useGetWorkerProfile = (): UseQueryResult<Worker> => {
  return useQuery({
    queryKey: workerKeys.profile(),
    queryFn: () => workerService.getProfile(),
  });
};

// Hook to update  worker profile
export const useUpdateWorkerProfile = (): UseMutationResult<
  Worker,
  Error,
  WorkerProfileInput
> => {
  return useMutation({
    mutationFn: (data: WorkerProfileInput) => workerService.updateProfile(data),
    // Invalidate and refetch profile after mutation
    onSuccess: () => {
      // Invalidate could be handled at a higher level if needed
    },
  });
};

// Hook to update  worker availability
export const useUpdateAvailability = (): UseMutationResult<
  Availability,
  Error,
  AvailabilityInput[]
> => {
  return useMutation({
    mutationFn: (data: AvailabilityInput[]) =>
      workerService.updateAvailability(data),
  });
};

// Hook to add work experience
export const useAddExperience = (): UseMutationResult<
  Experience,
  Error,
  Omit<Experience, "_id">
> => {
  return useMutation({
    mutationFn: (data: Omit<Experience, "_id">) =>
      workerService.addExperience(data),
  });
};

// Hook to update work experience
export const useUpdateExperience = (): UseMutationResult<
  Experience,
  Error,
  { id: string; data: Omit<Experience, "_id"> }
> => {
  return useMutation({
    mutationFn: ({ id, data }) => workerService.updateExperience(id, data),
  });
};

// Hook to complete profile setup
export const useCompleteProfileSetup = (): UseMutationResult<
  VerificationStatus,
  Error,
  void
> => {
  return useMutation({
    mutationFn: () => workerService.completeProfileSetup(),
  });
};

// Hook to get all available  workers
export const useGetAllWorkers = (): UseQueryResult<Worker[]> => {
  return useQuery({
    queryKey: workerKeys.list(),
    queryFn: () => workerService.getAllAvailable(),
  });
};

// Hook to get  worker by ID
export const useGetWorkerById = (id: string): UseQueryResult<Worker> => {
  return useQuery({
    queryKey: workerKeys.detail(id),
    queryFn: () => workerService.getById(id),
    // Only fetch if ID is provided
    enabled: !!id,
  });
};
