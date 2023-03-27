import { JWT_TOKEN, SIGNUP_WITH_ACTIVATE } from "config";
import Axios from "libs/axios";
import Storage from "libs/storage";

const Logout = async () => {
  Storage.deleteKey(JWT_TOKEN);
};

const Login = async (data) => {
  const result = await Axios.base().post("/auth/login", data);
  Storage.setItem(JWT_TOKEN, result.data.token);
  return result;
};

const ForgotPassword = async (data) => {
  const result = await Axios.base().post(
    "/auth/send-forgot-password-link",
    data
  );
  return result;
};

const ResetPassword = async (data) => {
  const result = await Axios.base().post("/auth/reset-password", data);
  return result;
};

const ResendActivation = async (data) => {
  const result = await Axios.base().post("/auth/send-activation-link", data);
  return result;
};

const Register = async (data) => {
  const result = await Axios.base().post("/auth/signup", data);
  if (SIGNUP_WITH_ACTIVATE) {
    Storage.setItem(JWT_TOKEN, result.data.token);
  }
  return result;
};

const Activate = async (data) => {
  const result = await Axios.base().post("/auth/activate", data);
  return result;
};

const UpdateAccount = async (data) => {
  const result = await Axios.authenticated().put(
    `/accounts/${data.accountId}`,
    data.data
  );
  return result;
};

const Subscribe = async (data) => {
  const result = await Axios.authenticated().post(
    "/stripe/subscriptions",
    data
  );
  return result;
};

const CancelSubscription = async (data) => {
  const result = await Axios.authenticated().delete("/stripe/subscriptions", {
    data: data,
  });
  return result;
};

const CreateSetupIntent = async (data) => {
  const result = await Axios.authenticated().post(
    "/stripe/create-setup-intent",
    data
  );
  return result;
};

const RemoveCreditCard = async (data) => {
  const result = await Axios.authenticated().delete("/stripe/cards", {
    data: data,
  });
  return result;
};

const SetDefaultCreditCard = async (data) => {
  const result = await Axios.authenticated().put("/stripe/cards", data);
  return result;
};

const ChangePassword = async (data) => {
  const result = await Axios.authenticated().put(
    "/users/me/change-password",
    data
  );
  return result;
};

const UpdateMe = async (data) => {
  const result = await Axios.authenticated().put("/users/me", data);
  return result;
};

const CreateUser = async (data) => {
  const result = await Axios.authenticated().post("/users", data);
  return result;
};

const UpdateUser = async (data) => {
  const result = await Axios.authenticated().put(
    `/users/${data.userId}`,
    data.data
  );
  return result;
};

const DeleteUser = async (userId) => {
  const result = await Axios.authenticated().delete(`/users/${userId}`);
  return result;
};

const CreateCustomerCheckoutSession = async (data) => {
  console.log("-----", data);
  const result = await Axios.authenticated().post(
    `/stripe/create-customer-checkout-session`,
    data
  );
  return result;
};

const CreateCustomerPortalSession = async () => {
  const result = await Axios.authenticated().post(
    `/stripe/create-customer-portal-session`
  );
  return result;
};

const CreateTeam = async (data) => {
  const result = await Axios.authenticated().post(`/teams`, data);
  return result;
};

const DeleteTeam = async (id) => {
  const result = await Axios.authenticated().delete(`/teams/${id}`);
  return result;
};

const UpdateTeam = async ({ id, data }) => {
  const result = await Axios.authenticated().put(`/teams/${id}`, data);
  return result;
};

const AddTeamUser = async ({ teamId, userId }) => {
  const result = await Axios.authenticated().put(
    `/teams/${teamId}/add-user/${userId}`
  );
  return result;
};

const RemoveTeamUser = async ({ teamId, userId }) => {
  const result = await Axios.authenticated().put(
    `/teams/${teamId}/remove-user/${userId}`
  );
  return result;
};

export {
  Logout,
  Login,
  ForgotPassword,
  ResetPassword,
  ResendActivation,
  Register,
  Activate,
  UpdateAccount,
  Subscribe,
  CancelSubscription,
  RemoveCreditCard,
  SetDefaultCreditCard,
  ChangePassword,
  UpdateMe,
  CreateSetupIntent,
  CreateUser,
  UpdateUser,
  DeleteUser,
  CreateCustomerPortalSession,
  CreateCustomerCheckoutSession,
  CreateTeam,
  DeleteTeam,
  UpdateTeam,
  AddTeamUser,
  RemoveTeamUser,
};
