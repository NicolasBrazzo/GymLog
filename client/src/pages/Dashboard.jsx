import { useAuth } from "../context/AuthContext";

export const Dashboard = () => {
  const { user } = useAuth();

  console.log("USER", user);

  return (
    <h1>Dashboard {user.first_name}</h1>
  );
};
