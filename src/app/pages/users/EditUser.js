import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "api/queries";
import { Dropdown } from "react-bootstrap";
import { UpdateUser } from "api/mutations";
import ConfirmAlert from "libs/confirmAlert";
import Loader from "app/components/Loader";

export default function EditUser(props) {
  const { t } = useTranslation();

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    language: "",
    role: "",
  });

  const { userId } = useParams();

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(
    ["User", props.user.accountId],
    () => User(userId),
    {
      retry: false,
      onSuccess: (data) => {
        if (data.data.accountOwner) {
          props.history.push("/users");
        } else {
          setUserData({
            name: data.data.name,
            surname: data.data.surname,
            language: data.data.language,
            role: data.data.role,
          });
        }
      },
    }
  );

  const updateUserMutate = useMutation(UpdateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Users", props.user.accountId]);
      queryClient.invalidateQueries(["User", props.user.accountId]);
    },
  });

  const saveUser = async () => {
    const data = userData;
    try {
      const response = await updateUserMutate.mutateAsync({
        userId: userId,
        data: data,
      });
      if (response) {
        props.history.push("/users");
      }
    } catch (error) {
      if (error.response?.data) {
        ConfirmAlert.error(error.response.data);
        return;
      }
    }
  };

  const handleUserNameInput = (event) => {
    setUserData({ ...userData, name: event.target.value });
  };

  const handleUserSurnameInput = (event) => {
    setUserData({ ...userData, surname: event.target.value });
  };

  if (isLoading) {
    return <Loader />;
  }

  const userRole = (role) => {
    if (role === "user") {
      return "User";
    }
    return "Admin";
  };

  return (
    <>
      {data.data && (
        <div>
          <h1>{t("indexUsersPage.users")}</h1>
          <div className="fs-4 text-secondary mt-3">
            {t("userEdit.user")} - {data.data.name}
          </div>
          <div className="dashboard-box mt-3">
            <div className="d-flex justify-content-between mb-3 mt-2">
              <h2>{t("userEdit.editUser")}</h2>
              <div
                onClick={() => saveUser()}
                className="mt-3 create-group-button d-flex justify-content-center align-items-center text-decoration-none"
              >
                {t("userEdit.save")}
              </div>
            </div>

            <div className="p-4 d-flex flex-column gap-4">
              <div>
                <div className="fw-bold mb-2">{t("userEdit.name")}</div>
                <input
                  onChange={(event) => {
                    handleUserNameInput(event);
                  }}
                  value={userData.name}
                  type={"text"}
                  className="w-100-perc edit-user-form"
                  placeholder="Scrivi qualcosa..."
                />
              </div>
              <div>
                <div className="fw-bold mb-2">{t("userEdit.surname")}</div>
                <input
                  onChange={(event) => {
                    handleUserSurnameInput(event);
                  }}
                  value={userData.surname}
                  type={"text"}
                  className="w-100-perc edit-user-form"
                  placeholder="Scrivi qualcosa..."
                />
              </div>
              <div className="fw-bold">{t("userEdit.language")}</div>
              <Dropdown>
                <Dropdown.Toggle className="w-100-perc text-dark bg-white ">
                  {userData.language}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100-perc text-dark bg-white text-center">
                  <Dropdown.Item
                    onClick={() => setUserData({ ...userData, language: "en" })}
                  >
                    en
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setUserData({ ...userData, language: "it" })}
                  >
                    ita
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="fw-bold">{t("userEdit.role")}</div>
              <Dropdown>
                <Dropdown.Toggle className="w-100-perc text-dark bg-white">
                  {userRole(userData.role)}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100-perc text-dark bg-white text-center">
                  <Dropdown.Item
                    onClick={() => setUserData({ ...userData, role: "user" })}
                  >
                    User
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setUserData({ ...userData, role: "admin" })}
                  >
                    Admin
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
