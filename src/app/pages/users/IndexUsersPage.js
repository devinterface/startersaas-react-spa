import { faEdit, faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreateUser, DeleteUser } from "api/mutations";
import { Users } from "api/queries";
import Box from "app/components/dashboard/Box";
import Loader from "app/components/Loader";
import { useState } from "react";
import { Col, Dropdown, Modal, Row, Table } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import ConfirmAlert from "libs/confirmAlert";


const IndexUsersPage = ({ user }) => {
  const { t } = useTranslation();

  const [createUserPopup, setCreateUserPopup] = useState(false)
  const [deleteUserPopup, setDeleteUserPopup] = useState(false)
  const [userId, setUserId] = useState(undefined)
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    language: "en",
    role: "user"
  })

  const queryClient = useQueryClient();

  const deleteUserMutate = useMutation(DeleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Users", user.accountId]);
    },
  });

  const createUserMutate = useMutation(CreateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Users", user.accountId]);
    },
  });

  const createUser = async () => {
    const data = userData;
    try {
      const response = await createUserMutate.mutateAsync(data);
      if (response) {
        ConfirmAlert.success(t("createUsersPage.userCreated"));
      }
    } catch (error) {
      if (error.response && error.response.data) {
        ConfirmAlert.error(error.response.data);
        return;
      }
    }
  };

  const { isLoading, data } = useQuery(["Users", user.accountId], Users, {
    retry: false,
  });

  const handleUserNameInput = (event) => {
    setUserData({ ...userData, name: event.target.value })
  }

  const handleUserSurnameInput = (event) => {
    setUserData({ ...userData, surname: event.target.value })
  }

  const handleUserEmailInput = (event) => {
    setUserData({ ...userData, email: event.target.value })
  }

  const deleteUser = async () => {
    try {
      const response = await deleteUserMutate.mutate(userId);
      if (response) {
        ConfirmAlert.success("User deleted")
      }
    } catch (error) {
      if (error.response && error.response.data) {
        ConfirmAlert.error(error.response.data);
        return;
      }
    };
  }

  const userRole = (role) => {
    if (role === "user") {
      return "User"
    }
    return "Admin"
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <Modal show={createUserPopup} onHide={() => setCreateUserPopup(false)}>
          <div className='popup-crea-gruppo p-4'>
            <div>
              <div className='fw-bold mb-2'>{t("createUsersPage.name")}</div>
              <input onChange={(event) => { handleUserNameInput(event) }} type={'text'} className='w-100-perc popup-crea-gruppo-input' placeholder="..." />
            </div>
            <div>
              <div className='fw-bold mb-2'>{t("createUsersPage.surname")}</div>
              <input onChange={(event) => { handleUserSurnameInput(event) }} type={'text'} className="w-100-perc popup-crea-gruppo-input" placeholder="..." />
            </div>
            <div>
              <div className='fw-bold mb-2'>{t("createUsersPage.email")}</div>
              <input onChange={(event) => { handleUserEmailInput(event) }} type={'text'} className="w-100-perc popup-crea-gruppo-input" placeholder="..." />
            </div>
            <Dropdown>
              <Dropdown.Toggle className="w-100-perc text-dark bg-white">{userData.language}</Dropdown.Toggle>
              <Dropdown.Menu className="w-100-perc text-dark bg-white text-center">
                <Dropdown.Item onClick={() => setUserData({ ...userData, language: "en" })}>en</Dropdown.Item>
                <Dropdown.Item onClick={() => setUserData({ ...userData, language: "it" })}>it</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="w-100-perc text-dark bg-white">{userRole(userData.role)}</Dropdown.Toggle>
              <Dropdown.Menu className="w-100-perc text-dark bg-white text-center">
                <Dropdown.Item onClick={() => setUserData({ ...userData, role: "user" })}>User</Dropdown.Item>
                <Dropdown.Item onClick={() => setUserData({ ...userData, role: "admin" })}>Admin</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className='d-flex justify-content-center gap-5'>
              <div onClick={() => {
                setCreateUserPopup(false); setUserData({
                  name: "",
                  surname: "",
                  email: "",
                  language: "en",
                  role: "user"
                });

              }} className="group-cancel-button d-flex justify-content-center align-items-center">{t("createUsersPage.cancel")}</div>
              <div onClick={() => { setCreateUserPopup(false); createUser() }} className='create-group-button d-flex justify-content-center align-items-center'>{t("createUsersPage.save")}</div>
            </div>
          </div>
        </Modal>
        <Modal show={deleteUserPopup}>
          <div className='delete-popup '>
            <div className='text-center m-3'>{t("indexUsersPage.deleteUser")}?</div>
            <div className='d-flex justify-content-center gap-5 mb-3'>
              <div onClick={() => { setDeleteUserPopup(false); deleteUser(userId); setUserId("") }} className="group-cancel-button d-flex justify-content-center align-items-center">{t("indexUsersPage.yes")}</div>
              <div onClick={() => { setDeleteUserPopup(false); setUserId("") }} className="group-cancel-button d-flex justify-content-center align-items-center">{t("indexUsersPage.no")}</div>
            </div>
          </div>
        </Modal>
        <h1>{t("indexUsersPage.users")}</h1>
        <div className='dashboard-box mt-5 h-auto'>
          <div className='d-flex justify-content-end mb-4'>
            <div className='mt-3 create-group-button d-flex justify-content-center align-items-center' onClick={() => setCreateUserPopup(true)}>{t("buttonUsers.createUser")}</div>
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th className='col-1 text-center fs-4'>{t("indexUsersPage.name")}</th>
                <th className='col-1 text-center fs-4'>{t("indexUsersPage.surname")}</th>
                <th className='col-1 text-center fs-4' id="code-group">{t("indexUsersPage.email")}</th>
                <th className='col-1 text-center fs-4' id="delete-group">{t("indexUsersPage.role")}</th>
                <th className='col-1 text-center fs-4' id="delete-group">{t("indexUsersPage.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                <>
                  {
                    data.data.map((element, i) => (
                      <tr key={`element.name-${i}`} className="text-secondary">
                        <td className='text-center'>{element.name}</td>
                        <td className='text-center'>{element.surname}</td>
                        <td className='text-center'>{element.email}</td>
                        <td className='text-center'>{element.role}</td>
                        <td className='d-flex justify-content-center align-items-center'>
                          {user.name != element.name ? (

                            <Link className='me-2 group-button-edit text-decoration-none' to={`/user/${element.id}`}>{t("buttonUsers.edit")}</Link>
                          ) :
                            <Link className='me-2 group-button-edit text-decoration-none' to={`/user/edit`}>{t("buttonUsers.edit")}</Link>
                          }
                          {
                            user.accountOwner && user.name != element.name ?
                              (
                                <div className='group-button-delete' onClick={() => { setDeleteUserPopup(true); setUserId(element.id) }}>{t("buttonUsers.delete")}</div>
                              ) : ""
                          }
                        </td>
                      </tr>
                    ))
                  }
                </>
              ) : ""
              }
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default IndexUsersPage;
