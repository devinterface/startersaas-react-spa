import {
  faMoneyBill,
  faSignOutAlt,
  faUserEdit,
  faUsers,
  faCircleUser,
  faUser,
  faHouse,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logout, UpdateMe } from "api/mutations";
import BaseFooter from "app/components/layout/BaseFooter";
import { selectedPlanState } from "libs/atoms";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import "../../../css/privateLayout/private.css";
import { useState } from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const PrivateLayout = ({ children, user }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [selectedPlan, setSelectedPlan] = useRecoilState(selectedPlanState);

  const history = useHistory();

  const [userIcon, setUserIcon] = useState("d-none")

  const [open, setOpen] = useState(false)

  const goToHome = () => {
    setSelectedPlan(undefined);
    history.push("/dashboard");
  };

  const logout = () => {
    Logout();
    window.location.href = "/auth/login";
  };

  const { register, handleSubmit } = useForm({
    defaultValues: { language: user.language },
  });

  const mutation = useMutation(UpdateMe, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Me"]);
    },
  });

  const onSubmit = async (data) => {
    data = { language: data.language };
    await mutation.mutateAsync(data);
  };

  const displayUserMenu = () => {
    if (userIcon === "d-none") {
      setUserIcon("d-block")
    } else {
      setUserIcon("d-none")
    }
  }

  return (
    <div className="d-flex flex-column" id="h100">
      <div id="page-content">
        <header>
          <>
            {['md'].map((expand) => (
              <Navbar key={expand} bg="light" expand={"md"} expanded={open}>
                <Container fluid>
                  <Navbar.Brand href="#" className="w-100-perc d-flex justify-content-between p-0">
                    <div className="d-flex">
                      {user.role == "admin" && (
                        <>
                          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className="m-auto h-75" onClick={() => setOpen(true)} />
                        </>)}
                      <a className="navbar-brand" onClick={goToHome}>
                        <picture>
                          <source media="(max-width: 768px)" srcSet="/images/startersaas180x180.png" />
                          <img className="logo-mediaq w-md-auto ms-2 " src="/images/logo-startersaas.svg" />
                        </picture>
                      </a>
                    </div>
                    <ul className="navbar-nav d-flex flex-row justify-content-center d-md-flex justify-content-md-end flex-lg-grow-0 justify-content-xl-end">
                      <li className=" me-md-4 m-auto">
                        <Link
                          to={"/dashboard"}
                          className="menu-link text-decoration-none dashboard-icon d-flex align-baseline" >
                          <FontAwesomeIcon icon={faHouse} className="me-0 me-md-3 fs-4 dashboard-icon" />
                          <span className="d-none d-md-block">Dashboard</span>
                        </Link>
                      </li>
                      <li className="me-4 m-auto">
                        <form onChange={handleSubmit(onSubmit)}>
                          <select className="select-language" {...register("language")}>
                            <option value="it">IT</option>
                            <option value="en">EN</option>
                          </select>
                        </form>
                      </li>
                      <li className="me-4 m-auto">
                        <FontAwesomeIcon icon={faCircleUser} className="user-icon" onClick={() => displayUserMenu()} />
                        <div className={`${userIcon} usericon-drop position-absolute`}>
                          <div className="usericon-items fw-bold" >{user.name}</div>
                          <div className="usericon-items" >
                            <Link
                              to="/user/edit"
                              className="menu-link user-menu"
                              id="user-edit"
                              title={t("privateLayout.editUser")}
                            > {t("privateLayout.manageUser")}
                            </Link>
                          </div>
                          {
                            user.role === "admin" &&
                            (<div className="usericon-items" >
                              <Link
                                to="/account/edit"
                                className="menu-link user-menu"
                                id="account-edit"
                                title={t("privateLayout.billingDetails")}
                              > {t("privateLayout.managePayment")}
                              </Link>
                            </div>)
                          }
                          {user.role === "admin" &&
                            (<div className="usericon-items" >
                              <Link
                                to={"/plan"}
                                className="user-menu"
                              >{t("privateLayout.managePlan")}
                              </Link>
                            </div>)
                          }
                          <div className="usericon-items" >
                            <div
                              href="#"
                              onClick={logout}
                              className="menu-link user-menu"
                              id="logout"
                              title={t("privateLayout.logout")}>
                              {t("privateLayout.logout")}
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Navbar.Brand>
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="start"
                    className="bg-dark text-white"
                  >
                    <Offcanvas.Header>
                      <FontAwesomeIcon icon={faXmark} onClick={() => setOpen(false)} className="fs-4" />
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="">
                        <div className={`d-flex  flex-column justify-content-lg-start  gap-5 m-0-auto`} >
                          <div className="d-flex align-items-baseline fs-4 mt-md-5">
                            {user.role === "admin" &&
                              <>
                                <Link className="text-decoration-none text-white" to="/users" onClick={() => setOpen(!open)}>
                                  <FontAwesomeIcon icon={faUser} className="me-2" />
                                </Link>
                                <Link
                                  className="d-md-none d-lg-block text-decoration-none text-white link-aside rounded-2 p-1"
                                  to="/users"
                                  id="users-edit"
                                  title="Utenti"
                                  onClick={() => setOpen(!open)}
                                >{t("privateLayout.users")}</Link>
                              </>
                            }
                          </div>
                        </div>
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            ))}
            <>
              {/* <div className="container-fluid">
                <div className="row d-lg-flex justify-content-lg">
                  <div className="col-md-12 col-lg-12 col-xl-12 px-0">
                    <nav className="navbar navbar-light navbar-expand-md sticky-top d-xl-flex px-0 bg-white">
                      <div className="container-fluid">
                        <a className="navbar-brand" onClick={goToHome}>
                          <img
                            className="logo"
                            src="/images/logo-startersaas.svg"
                          />
                        </a>
                        <button
                          data-toggle="collapse"
                          className="navbar-toggler"
                          data-target="#navcol-1"
                        >
                          <span className="sr-only">
                            {t("privateLayout.toggle")}
                          </span>
                          <span className="navbar-toggler-icon" />
                        </button>
                        <div
                          className="collapse navbar-collapse d-md-flex d-lg-flex justify-content-md-start justify-content-lg-end"
                          id="navcol-1"
                        >
                          <ul className="navbar-nav d-md-flex flex-grow-1 justify-content-md-end flex-lg-grow-0 justify-content-xl-end">
                            <li className="me-4 m-auto">
                              <Link
                                to={"/dashboard"}
                                className="menu-link text-decoration-none dashboard-icon d-flex align-baseline" >
                                <FontAwesomeIcon icon={faHouse} className="me-0 me-md-3 fs-4 dashboard-icon" />
                                <span className="d-none d-md-block" >Dashboard</span>
                              </Link>
                            </li>
                            <li className="me-4 m-auto">
                              <form onChange={handleSubmit(onSubmit)}>
                                <select className="border-0 bg-white" {...register("language")}>
                                  <option value="it">IT</option>
                                  <option value="en">EN</option>
                                </select>
                              </form>
                            </li>

                            <li>
                              <FontAwesomeIcon icon={faCircleUser} className=" user-icon" onClick={() => displayUserMenu()} />
                              <div className={`${userIcon} usericon-drop position-absolute`}>
                                <div className="usericon-items fw-bold" >{user.email}</div>
                                <div className="usericon-items">
                                  <Link
                                    to="/user/edit"
                                    className="menu-link user-menu"
                                    id="user-edit"
                                    title="gestisci utente"
                                  >Dati utente</Link>
                                </div>
                                {user.role === "admin" &&
                                  <div className="usericon-items">
                                    <Link
                                      to="/account/edit"
                                      className="menu-link user-menu"
                                      id="user-edit"
                                      title="dati di fatturazione"
                                    >Dati di fatturazione</Link>
                                  </div>}
                                {user.role === "admin" ? (
                                  <div className="usericon-items">
                                    <Link
                                      to="/dashboard"
                                      className="menu-link user-menu"
                                      id="user-edit"
                                      title="gestisci abbonamento"
                                    >Gestisci abbonamento</Link>
                                  </div>
                                ) : (<div className="usericon-items">
                                  <Link
                                    to="/plan"
                                    className="menu-link user-menu"
                                    id="user-edit"
                                    title="gestisci abbonamento"
                                  >Gestisci abbonamento</Link>
                                </div>)
                                }
                                <div className="usericon-items">
                                  <div
                                    href="#"
                                    onClick={logout}
                                    className="menu-link user-menu"
                                    id="logout"
                                    title="Logout"
                                  >Logout</div>
                                </div>
                              </div>
                            </li>
                            <li className="nav-item me-4 m-auto">
                              <form onChange={handleSubmit(onSubmit)}>
                                <select {...register("language")}>
                                  <option value="it">IT</option>
                                  <option value="en">EN</option>
                                </select>
                              </form>
                            </li>
                            {user.role === "admin" && (
                              <li className="nav-item">
                                <Link
                                  to="/account/edit"
                                  className="menu-link"
                                  id="account-edit"
                                  title={t("privateLayout.billingDetails")}
                                >
                                  <FontAwesomeIcon icon={faMoneyBill} />
                                  <span className="only-mobile">
                                    {t("privateLayout.billingDetails")}
                                  </span>
                                </Link>
                              </li>
                            )}
                            <li className="nav-item">
                              <Link
                                to="/user/edit"
                                className="menu-link"
                                id="user-edit"
                                title={t("privateLayout.editUser")}
                              >
                                <FontAwesomeIcon icon={faUserEdit} />
                                <span className="only-mobile">
                                  {t("privateLayout.editUser")}
                                </span>
                              </Link>
                            </li>
                            {user.role === "admin" && (
                              <li className="nav-item">
                                <Link
                                  to="/users"
                                  className="menu-link"
                                  id="user-edit"
                                  title={t("privateLayout.users")}
                                >
                                  <FontAwesomeIcon icon={faUsers} />
                                  <span className="only-mobile">
                                    {t("privateLayout.users")}
                                  </span>
                                </Link>
                              </li>
                            )}
                            <li className="nav-item">
                              <a
                                href="#"
                                onClick={logout}
                                className="menu-link"
                                id="logout"
                                title={t("privateLayout.logout")}
                              >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span className="only-mobile">
                                  {t("privateLayout.logout")}
                                </span>
                              </a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div> */}
            </>

          </>
        </header>
        <div className="d-flex flex-column flex-md-row h-100">
          {user.role == "admin" && (<>
            <div className="d-none d-md-flex flex-column justify-content-lg-start gap-5 p-3 align-items-center text-white bg-dark mediaq-side ">
              <div className="d-flex align-items-baseline fs-4 mt-0 mt-md-5" >
                {user.role === "admin" &&
                  <>
                    <Link className="text-decoration-none text-white" to="/users">
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                    </Link>
                    <Link
                      className="d-none d-lg-block text-decoration-none text-white link-aside rounded-2 p-1"
                      to="/users"
                      id="users-edit"
                      title="Utenti"
                    >{t("privateLayout.users")}</Link>
                  </>
                }
              </div>
            </div>
          </>)}
          <Container className="first-container">{children}</Container>
        </div>
      </div>
      <BaseFooter />
    </div>
  );
};

export default PrivateLayout;
