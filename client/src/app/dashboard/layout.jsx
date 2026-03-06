export const metadata = {
  title: "Dashboard - Engazium",
  description:
    "Access your Engazium dashboard to manage squads, monitor engagement stats, and track your creator growth progress.",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
