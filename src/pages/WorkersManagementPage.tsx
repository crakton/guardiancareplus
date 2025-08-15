import WorkersList from "@/components/admin/WorkersManagement";

export default function WorkersManagementPage() {
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Worker Management</h1>
          <p className="text-muted-foreground">Manage all workers</p>
        </div>
      </div>

      <WorkersList />
    </div>
  );
}
