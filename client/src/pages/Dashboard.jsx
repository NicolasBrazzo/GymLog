import { useAuth } from "../context/AuthContext";

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-2xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-foreground">
          Ciao, {user?.first_name || "atleta"} 👋
        </h1>
        <p className="text-muted-foreground text-sm">Pronto per allenarti oggi?</p>
      </div>
    </div>
  );
};
