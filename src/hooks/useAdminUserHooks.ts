// React Query hooks (useAdminUserHooks.ts)
import {
  AdminFilters,
  adminUserService,
  FilterOptions,
  PaginatedUserResponse,
  PaginationOptions,
  ClientFilters,
  SortOptions,
  UserStatistics,
  WorkerFilters,
} from "@/api/services/adminUserService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// Query keys
export const adminUserKeys = {
  all: ["admin-users"] as const,
  clients: () => [...adminUserKeys.all, "clients"] as const,
  clientsList: (
    filters?: ClientFilters,
    sort?: SortOptions,
    pagination?: PaginationOptions
  ) => [...adminUserKeys.clients(), "list", filters, sort, pagination] as const,
  workers: () => [...adminUserKeys.all, "workers"] as const,
  workersList: (
    filters?: WorkerFilters,
    sort?: SortOptions,
    pagination?: PaginationOptions
  ) => [...adminUserKeys.workers(), "list", filters, sort, pagination] as const,
  admins: () => [...adminUserKeys.all, "admins"] as const,
  adminsList: (
    filters?: AdminFilters,
    sort?: SortOptions,
    pagination?: PaginationOptions
  ) => [...adminUserKeys.admins(), "list", filters, sort, pagination] as const,
  filterOptions: () => [...adminUserKeys.all, "filter-options"] as const,
  statistics: () => [...adminUserKeys.all, "statistics"] as const,
};

// Hook to get clients
export const useGetClients = (
  filters?: ClientFilters,
  sort?: SortOptions,
  pagination?: PaginationOptions
): UseQueryResult<PaginatedUserResponse<any>> => {
  return useQuery({
    queryKey: adminUserKeys.clientsList(filters, sort, pagination),
    queryFn: () => adminUserService.getClients(filters, sort, pagination),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get workers
export const useGetWorkers = (
  filters?: WorkerFilters,
  sort?: SortOptions,
  pagination?: PaginationOptions
): UseQueryResult<PaginatedUserResponse<any>> => {
  return useQuery({
    queryKey: adminUserKeys.workersList(filters, sort, pagination),
    queryFn: () => adminUserService.getWorkers(filters, sort, pagination),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get admins
export const useGetAdmins = (
  filters?: AdminFilters,
  sort?: SortOptions,
  pagination?: PaginationOptions
): UseQueryResult<PaginatedUserResponse<any>> => {
  return useQuery({
    queryKey: adminUserKeys.adminsList(filters, sort, pagination),
    queryFn: () => adminUserService.getAdmins(filters, sort, pagination),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get filter options
export const useGetFilterOptions = (): UseQueryResult<FilterOptions> => {
  return useQuery({
    queryKey: adminUserKeys.filterOptions(),
    queryFn: () => adminUserService.getFilterOptions(),
    staleTime: 30 * 60 * 1000, // 30 minutes (filter options don't change often)
  });
};

// Hook to get user statistics
export const useGetUserStatistics = (): UseQueryResult<UserStatistics> => {
  return useQuery({
    queryKey: adminUserKeys.statistics(),
    queryFn: () => adminUserService.getStatistics(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
