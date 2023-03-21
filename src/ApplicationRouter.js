import AuthLayout from "app/components/layout/AuthLayout";
import PrivateLayout from "app/components/layout/PrivateLayout";
import PublicLayout from "app/components/layout/PublicLayout";
import ActivateAccountPage from "app/pages/auth/ActivateAccountPage";
import ForgotPasswordPage from "app/pages/auth/ForgotPasswordPage";
import LoginPage from "app/pages/auth/LoginPage";
import RegisterPage from "app/pages/auth/RegisterPage";
import ResendActivationPage from "app/pages/auth/ResendActivationPage";
import ResetPasswordPage from "app/pages/auth/ResetPasswordPage";
import DashboardSwitcher from "app/pages/dashboard/DashboardSwitcher";
import PlanPage from "app/pages/plan/PlanPage";
import SubscribePlanPage from "app/pages/plan/SubscribePlanPage";
import IndexPage from "app/pages/public/IndexPage";
import IndexTeamsPage from "app/pages/teams/IndexTeamsPage";
import TeamPage from "app/pages/teams/TeamPage";
import AddCardPage from "app/pages/user/AddCardPage";
import EditAccountPage from "app/pages/user/EditAccountPage";
import EditUserPage from "app/pages/user/EditUserPage";
import CreateUsersPage from "app/pages/users/CreateUsersPage";
import EditUser from "app/pages/users/EditUser";
import EditUsersPage from "app/pages/users/EditUsersPage";
import IndexUsersPage from "app/pages/users/IndexUsersPage";
import withCurrentUser from "hoc/withCurrentUser";
import { Switch } from "react-router-dom";
import OnlyPublicRoute from "routes/OnlyPublicRoute";
import PrivateActiveRoute from "routes/PrivateActiveRoute";
import PrivateRoute from "routes/PrivateRoute";

const Private = withCurrentUser(PrivateRoute);
const PrivateActive = withCurrentUser(PrivateActiveRoute);
const OnlyPublic = withCurrentUser(OnlyPublicRoute);

const ApplicationRouter = () => {
  return (
    <Switch>
      <OnlyPublic exact path="/" component={IndexPage} layout={PublicLayout} />
      <OnlyPublic
        exact
        path="/auth/login"
        component={LoginPage}
        layout={AuthLayout}
      />
      <OnlyPublic
        exact
        path="/auth/forgot-password"
        component={ForgotPasswordPage}
        layout={AuthLayout}
      />
      <OnlyPublic
        exact
        path="/auth/resend-activation"
        component={ResendActivationPage}
        layout={AuthLayout}
      />
      <OnlyPublic
        exact
        path="/auth/reset-password/:email"
        component={ResetPasswordPage}
        layout={AuthLayout}
      />
      <OnlyPublic
        exact
        path="/auth/activate/:email"
        component={ActivateAccountPage}
        layout={AuthLayout}
      />
      <OnlyPublic
        exact
        path="/auth/register"
        component={RegisterPage}
        layout={AuthLayout}
      />
      <PrivateActive
        exact
        path="/dashboard"
        layout={PrivateLayout}
        allowedRoles={["admin", "user"]}
        component={DashboardSwitcher}
      />
      <PrivateActive
        exact
        path="/teams"
        layout={PrivateLayout}
        allowedRoles={["admin", "user"]}
        component={IndexTeamsPage}
      />
      <PrivateActive
        exact
        path="/teams/:teamId"
        layout={PrivateLayout}
        allowedRoles={["admin"]}
        component={TeamPage}
      />
      <Private
        exact
        path="/plan/subscribe"
        layout={PrivateLayout}
        allowedRoles={["admin"]}
        component={SubscribePlanPage}
      />
      <Private
        exact
        path="/plan"
        layout={PrivateLayout}
        allowedRoles={["admin"]}
        component={PlanPage}
      />
      <PrivateActive
        exact
        path="/card/add"
        layout={PrivateLayout}
        allowedRoles={["admin"]}
        component={AddCardPage}
      />
      <Private
        exact
        path="/user/edit"
        layout={PrivateLayout}
        allowedRoles={["admin", "user"]}
        component={EditUserPage}
      />
      <Private
        exact
        path="/account/edit"
        layout={PrivateLayout}
        allowedRoles={["admin"]}
        component={EditAccountPage}
      />
      <Private
        exact
        path="/users"
        layout={PrivateLayout}
        allowedRoles={["admin"]}
        planType={["premium"]}
        component={IndexUsersPage}
      />
      <Private
        exact
        path="/create-user"
        layout={PrivateLayout}
        allowedRoles={["admin"]}
        component={CreateUsersPage}
      />
      <Private
        exact
        path="/edit-user/:userId"
        layout={PrivateLayout}
        allowedRoles={["admin"]}
        component={EditUsersPage}
      />
      <Private
        exact
        path="/user/:userId"
        layout={PrivateLayout}
        allowedRoles={["admin"]}
        planType={["premium"]}
        component={EditUser}
      />
    </Switch>
  );
};

export default ApplicationRouter;
