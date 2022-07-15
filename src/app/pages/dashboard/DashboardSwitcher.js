import DashboardPage from "./DashboardPage";
import UserDashboardPage from "./UserDashboardPage";

const DashboardSwitcher = ({ user }) => {
  return (
    <>
      {user.role === "admin" ? (
        <DashboardPage user={user} />
      ) : (
        <UserDashboardPage user={user} />
      )}
    </>
  );
};

export default DashboardSwitcher;
