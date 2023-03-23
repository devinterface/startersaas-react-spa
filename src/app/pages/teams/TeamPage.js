import { AddTeamUser, RemoveTeamUser, UpdateTeam } from 'api/mutations';
import { Team, Users } from 'api/queries';
import confirmAlert from 'libs/confirmAlert';
import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useHistory, useParams } from 'react-router-dom';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TeamPage({ user }) {
  const { t } = useTranslation()

  const history = useHistory()

  const { teamId } = useParams()
  const [teamName, setTeamName] = useState(null)


  const { data: team, isloading } = useQuery(["Team", user.accountId],
    () => Team(teamId),
    {
      onSuccess: (data) => {
        setTeamName(data.data.name)
      }
    }
  )

  const { data: users } = useQuery(["Users", user.accountId],
    Users,
    {
      onSuccess: (data) => {
        console.log(data);
      }
    }
  )

  const queryClient = useQueryClient()

  const addTeamUserMutate = useMutation(AddTeamUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Team", user.accountId]);
      queryClient.invalidateQueries(["Users", user.accountId]);
    }
  })

  /* func Add User */
  const addTeamUser = async (userId) => {
    try {
      const result = await addTeamUserMutate.mutateAsync({ teamId: teamId, userId: userId })
    } catch (error) {
      if (error.response && error.response.data) {
        confirmAlert.error(error.response.data);
        return;
      }
    }
  }

  const removeTeamUserMutate = useMutation(RemoveTeamUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Team", user.accountId]);
      queryClient.invalidateQueries(["Users", user.accountId]);
    }
  })

  /* Func Remove User */
  const removeTeamUser = async (userId) => {
    try {
      const result = await removeTeamUserMutate.mutateAsync({ teamId: teamId, userId: userId })
    } catch (error) {
      if (error.response && error.response.data) {
        confirmAlert.error(error.response.data);
        return;
      }
    }
  }

  const updateTeamMutate = useMutation(UpdateTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Team", user.accountId]);
    }
  })

  /* Func Update Team (team name) */
  const updateTeam = async () => {
    try {
      const result = await updateTeamMutate.mutateAsync({ id: teamId, data: { "name": teamName } });
      if (result) {
        console.log(result);
        confirmAlert.success("team updated")
      }
    } catch (error) {
      if (error.response && error.response.data) {
        confirmAlert.error(error.response.data);
        return
      }
    }
  }

  return (
    <div className='max-width'>
      {team &&
        <>
          <h1>Team</h1>
          <div className='mt-2 text-secondary'> {team.data.name}</div>
          <div className='d-flex flex-column flex-lg-row gap-4'>
            <div className='dashboard-box mt-3'>
              <div className='d-flex justify-content-end mb-4'>
                <Link to={"#"} onClick={() => { history.push("/teams") }} className='table-row-color mt-3 create-group-button d-flex justify-content-center align-items-center text-decoration-none'>{t("teamPage.save")}</Link>
              </div>
              <Table responsive bordered>
                <thead>
                  <tr className="d-none d-md-table-row">
                    <th style={{ borderLeft: "0px", borderRight: "0px" }} className='col-1'><div className='unchecked-user'></div></th>
                    <th style={{ borderLeft: "0px", borderRight: "0px" }} className='col-1 text-start '>#</th>
                    <th style={{ borderLeft: "0px", borderRight: "0px" }} className='col-1 text-start '>{t("teamPage.user")}</th>
                    <th style={{ borderLeft: "0px", borderRight: "0px" }} className='col-1 text-start '>Email</th>
                  </tr>
                </thead>
                {users &&
                  <tbody>
                    {users.data.map((user, id) => (
                      <tr key={`user-${id}`} className='d-flex flex-column d-md-table-row'>
                        {user.teams && user.teams.some((check) => check.id === teamId) ? (
                          <td className='d-flex justify-content-start align-items-center border-0'>
                            <div className='d-flex justify-content-center align-items-center check-user' onClick={() => removeTeamUser(user.id)}>
                              <FontAwesomeIcon className="text-white" icon={faCheck} />
                            </div>
                          </td>
                        ) : (
                          <td className='border-0'>
                            <div className='d-flex justify-content-start align-items-center'>
                              <div className='unchecked-user' onClick={() => addTeamUser(user.id)} />
                            </div>
                          </td>)
                        }
                        <div className="d-md-none fw-bold pb-0">#:</div>
                        <td className='text-start border-0 vertical-align'>{id + 1}</td>
                        <div className="d-md-none fw-bold pb-0">{t("teamPage.user")}:</div>
                        <td className='text-start border-0 vertical-align'>{user.name}</td>
                        <div className="d-md-none fw-bold pb-0">Email:</div>
                        <td className='text-start border-0 vertical-align'>{user.email}</td>

                      </tr>
                    ))
                    }
                  </tbody>
                }
              </Table>
            </div>
            <div className='dashboard-box mt-3' style={{ height: "max-content", maxWidth: "415px" }}>
              <Form onSubmit={(e) => { e.preventDefault(); updateTeam(); }}>
                <div className='d-flex flex-column gap-3'>
                  <div>
                    <div className="fw-bold mb-2">{t("teamPage.name")}</div>
                    <Form.Control
                      onChange={(e) => setTeamName(e.target.value)}
                      type={"text"}
                      className="w-100-perc"
                      placeholder="..."
                      value={teamName}
                    />
                  </div>
                  <div>
                    <div className="fw-bold mb-2">{t("teamPage.code")}</div>
                    <Form.Control
                      className="w-100-perc"
                      disabled
                      value={team.data.code}
                    />
                  </div>
                </div>
                <div className='d-flex justify-content-end'>
                  <Button
                    type='submit'
                    variant="success"
                    className='mt-4 create-group-button d-flex justify-content-center align-items-center text-decoration-none'
                  >
                    {t("teamPage.save")}</Button>
                </div>
              </Form>
            </div>
          </div>
        </>
      }
    </div>
  )
}
