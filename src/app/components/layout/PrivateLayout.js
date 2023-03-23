import {
  faUsers,
  faCircleUser,
  faUser,
  faHouse,
  faXmark,
  faMoneyBills,
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
import { useRef, useState } from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useOnClickOutside from "hoc/onClickOutsude";

const PrivateLayout = ({ children, user }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const refUser = useRef()

  const refMenu = useRef()

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

  useOnClickOutside(refUser, () => setUserIcon("d-none"))
  useOnClickOutside(refMenu, () => setOpen(false))

  return (
    <div className="d-flex flex-column" id="h100">
      <div id="page-content">
        <header>
          <>
            {['md'].map((expand) => (
              <Navbar key={expand} bg="light" expand={"md"} expanded={open} ref={refMenu}>
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
                      <li className="me-4 m-auto" ref={refUser}>
                        <FontAwesomeIcon icon={faCircleUser} className="user-icon" onClick={() => displayUserMenu()} />
                        <div className={`${userIcon} usericon-drop position-absolute`} ref={refUser}>
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
                          <div className="d-flex align-items-baseline fs-4 mt-md-5">
                            {user.role === "admin" &&
                              <>
                                <Link className="text-decoration-none text-white" to="/teams" onClick={() => setOpen(!open)}>
                                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                                </Link>
                                <Link
                                  className="d-md-none d-lg-block text-decoration-none text-white link-aside rounded-2 p-1"
                                  to="/teams"
                                  id="teams"
                                  title="Teams"
                                  onClick={() => setOpen(!open)}
                                >TEAMS</Link>
                              </>
                            }
                          </div>
                          <div className="d-flex align-items-baseline fs-4 mt-md-5">
                            {user.role === "admin" &&
                              <>
                                <Link className="text-decoration-none text-white" to="/plan" onClick={() => setOpen(!open)}>
                                  <FontAwesomeIcon icon={faMoneyBills} className="me-2" />
                                </Link>
                                <Link
                                  className="d-md-none d-lg-block text-decoration-none text-white link-aside rounded-2 p-1"
                                  to="/plan"
                                  id="plan"
                                  title="Plan"
                                  onClick={() => setOpen(!open)}
                                >PLAN</Link>
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
          </>
        </header>
        <div className="d-flex flex-column flex-md-row h-100">

          <div className="d-none d-md-flex flex-column justify-content-lg-start ps-5 gap-2 p-3 align-items-start text-white bg-dark mediaq-side ">
            <div className="d-flex align-items-center fs-4 ms-5 mt-md-5" >
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
            </div>
            <div className="d-flex align-items-center fs-4 ms-5 mt-0 mt-md-5">
              <>
                <Link className="text-decoration-none text-white" to="/teams"> <FontAwesomeIcon icon={faUsers} className="me-2" /></Link>
                <Link
                  className="d-none d-lg-block text-decoration-none text-white link-aside rounded-2 p-1"
                  to={user.role == "admin" ? "/teams" : "/user-teams"}
                  id="teams"
                  title="Teams"
                >TEAMS</Link>
              </>
            </div>
            <div className="d-flex align-items-center fs-4 ms-5 mt-0 mt-md-5">
              <>
                <Link className="text-decoration-none text-white" to={"/plan"}> <FontAwesomeIcon icon={faMoneyBills} className="me-2" /> </Link>
                <Link
                  className="d-none d-lg-block text-decoration-none text-white link-aside rounded-2 p-1"
                  to="/plan"
                  id="plan"
                  title="Plan"
                >{t("dashboardPage.plan").toUpperCase()}</Link>
              </>
            </div>
          </div>

          <Container className="first-container container-width">{children}</Container>
        </div>
      </div>
      <BaseFooter />
    </div>
  );
};

export default PrivateLayout;
