// src/hooks/useAnalyticsHooks.ts
import {
  useQuery,
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import analyticsService, {
  AdminOverviewAnalytics,
  AdminUserAnalytics,
  AdminFinancialAnalytics,
  PlatformSummary,
  RealTimeMetrics,
  AnalyticsFilters,
  ExportOptions,
  ClientOverviewAnalytics,
  ClientServiceAnalytics,
  WorkerOverviewAnalytics,
  WorkerFinancialAnalytics,
  WorkerScheduleAnalytics,
  WorkerPerformanceAnalytics,
} from "../api/services/analyticsService";
import { DateRange } from "../entities/Analytics";
import { toast } from "sonner";

// Query keys
export const analyticsKeys = {
  all: ["analytics"] as const,
  overview: (dateRange?: DateRange, comparison?: boolean) =>
    [...analyticsKeys.all, "overview", dateRange, comparison] as const,
  userAnalytics: (dateRange?: DateRange) =>
    [...analyticsKeys.all, "user-analytics", dateRange] as const,
  financialAnalytics: (dateRange?: DateRange) =>
    [...analyticsKeys.all, "financial-analytics", dateRange] as const,
  filteredAnalytics: (filters?: AnalyticsFilters) =>
    [...analyticsKeys.all, "filtered", filters] as const,
  platformSummary: (dateRange?: DateRange) =>
    [...analyticsKeys.all, "platform-summary", dateRange] as const,
  realTimeMetrics: () => [...analyticsKeys.all, "real-time"] as const,
  clientOverview: (dateRange?: string, comparison?: boolean) =>
    [...analyticsKeys.all, "client-overview", dateRange, comparison] as const,
  clientServices: (dateRange?: string) =>
    [...analyticsKeys.all, "client-services", dateRange] as const,
  workerOverview: (dateRange?: string, comparison?: boolean) =>
    [...analyticsKeys.all, "worker-overview", dateRange, comparison] as const,
  workerFinancial: (dateRange?: string) =>
    [...analyticsKeys.all, "worker-financial", dateRange] as const,
  workerSchedule: (dateRange?: string) =>
    [...analyticsKeys.all, "worker-schedule", dateRange] as const,
  workerPerformance: (dateRange?: string) =>
    [...analyticsKeys.all, "worker-performance", dateRange] as const,
};

// Hook to get dashboard overview analytics
export const useGetDashboardOverview = (
  dateRange: DateRange,
  comparison: boolean = true,
  enabled: boolean = true
): UseQueryResult<AdminOverviewAnalytics> => {
  return useQuery({
    queryKey: analyticsKeys.overview(dateRange, comparison),
    queryFn: () => analyticsService.getDashboardOverview(dateRange, comparison),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

// Hook to get user analytics
export const useGetUserAnalytics = (
  dateRange: DateRange,
  enabled: boolean = true
): UseQueryResult<AdminUserAnalytics> => {
  return useQuery({
    queryKey: analyticsKeys.userAnalytics(dateRange),
    queryFn: () => analyticsService.getUserAnalytics(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

// Hook to get financial analytics
export const useGetFinancialAnalytics = (
  dateRange: DateRange,
  enabled: boolean = true
): UseQueryResult<AdminFinancialAnalytics> => {
  return useQuery({
    queryKey: analyticsKeys.financialAnalytics(dateRange),
    queryFn: () => analyticsService.getFinancialAnalytics(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

// Hook to get filtered analytics
export const useGetFilteredAnalytics = (
  filters: AnalyticsFilters,
  enabled: boolean = true
): UseQueryResult<any> => {
  return useQuery({
    queryKey: analyticsKeys.filteredAnalytics(filters),
    queryFn: () => analyticsService.getFilteredAnalytics(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

// Hook to get platform summary
export const useGetPlatformSummary = (
  dateRange: DateRange,
  enabled: boolean = true
): UseQueryResult<PlatformSummary> => {
  return useQuery({
    queryKey: analyticsKeys.platformSummary(dateRange),
    queryFn: () => analyticsService.getPlatformSummary(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

// Hook to get real-time metrics
export const useGetRealTimeMetrics = (
  enabled: boolean = true,
  refetchInterval: number = 60000 // 1 minute
): UseQueryResult<RealTimeMetrics> => {
  return useQuery({
    queryKey: analyticsKeys.realTimeMetrics(),
    queryFn: () => analyticsService.getRealTimeMetrics(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval,
    enabled,
  });
};

// Hook to export analytics data
export const useExportAnalyticsData = (): UseMutationResult<
  Blob,
  Error,
  ExportOptions
> => {
  return useMutation({
    mutationFn: (options: ExportOptions) =>
      analyticsService.exportAnalyticsData(options),
    onSuccess: (data, variables) => {
      // Create download link
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;

      // Set file name based on format
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      a.download = `analytics-export-${timestamp}.${
        variables.format === "excel" ? "xlsx" : variables.format
      }`;

      // Trigger download
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(
        `Export completed successfully in ${variables.format.toUpperCase()} format`
      );
    },
    onError: (error) => {
      console.error("Export failed:", error);
      toast.error("Failed to export analytics data. Please try again.");
    },
  });
};

// Hook to get client overview analytics
export const useGetClientOverview = (
  dateRange: string = "month",
  comparison: boolean = true,
  enabled: boolean = true
): UseQueryResult<ClientOverviewAnalytics> => {
  return useQuery({
    queryKey: analyticsKeys.clientOverview(dateRange, comparison),
    queryFn: () => analyticsService.getClientOverview(dateRange, comparison),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

// Hook to get client service analytics
export const useGetClientServices = (
  dateRange: string = "month",
  enabled: boolean = true
): UseQueryResult<ClientServiceAnalytics> => {
  return useQuery({
    queryKey: analyticsKeys.clientServices(dateRange),
    queryFn: () => analyticsService.getClientServices(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

// Hook to get  worker overview analytics
export const useGetWorkerOverview = (
  dateRange: string = "month",
  comparison: boolean = true,
  enabled: boolean = true
): UseQueryResult<WorkerOverviewAnalytics> => {
  return useQuery({
    queryKey: analyticsKeys.workerOverview(dateRange, comparison),
    queryFn: () => analyticsService.getWorkerOverview(dateRange, comparison),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

// Hook to get  worker financial analytics
export const useGetWorkerFinancial = (
  dateRange: string = "month",
  enabled: boolean = true
): UseQueryResult<WorkerFinancialAnalytics> => {
  return useQuery({
    queryKey: analyticsKeys.workerFinancial(dateRange),
    queryFn: () => analyticsService.getWorkerFinancial(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

// Hook to get  worker schedule analytics
export const useGetWorkerSchedule = (
  dateRange: string = "month",
  enabled: boolean = true
): UseQueryResult<WorkerScheduleAnalytics> => {
  return useQuery({
    queryKey: analyticsKeys.workerSchedule(dateRange),
    queryFn: () => analyticsService.getWorkerSchedule(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

// Hook to get  worker performance analytics
export const useGetWorkerPerformance = (
  dateRange: string = "month",
  enabled: boolean = true
): UseQueryResult<WorkerPerformanceAnalytics> => {
  return useQuery({
    queryKey: analyticsKeys.workerPerformance(dateRange),
    queryFn: () => analyticsService.getWorkerPerformance(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};
