import { CreateTeam, DeleteTeam } from 'api/mutations';
import { Teams } from 'api/queries';
import confirmAlert from 'libs/confirmAlert';
import React, { useState } from 'react'
import { Button, Form, Modal, ModalBody, ModalHeader, Table } from 'react-bootstrap';

import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from 'react-router-dom';


export default function IndexTeamsPage({ user }) {
  const { t } = useTranslation()

  /* sates */
  const [newTeam, setNewTeam] = useState({ code: null, name: null })
  const [createTeamModal, setCreateTeamModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedTeamId, setSelectedTeamId] = useState(null)

  const queryClient = useQueryClient()

  const { data: teams, isLoading } = useQuery(["Teams", user.accountId], Teams)

  const createTeamMutate = useMutation(CreateTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Teams", user.accountId]);
    }
  })

  /* func create team */
  const createTeam = async () => {
    const data = newTeam;
    try {
      const response = await createTeamMutate.mutateAsync(data);
      if (response) {
        confirmAlert.success("team created");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        confirmAlert.error(error.response.data);
        return;
      }
    }
  }

  const deleteTeamMutate = useMutation(DeleteTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Teams", user.accountId]);
    }
  })

  /* func delete team  */
  const deleteTeam = async (id) => {
    try {
      const response = await deleteTeamMutate.mutateAsync(id);
      if (response) {
        confirmAlert.success("team deleted");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        confirmAlert.error(error.response.data);
        return;
      }
    }
  }

  return (
    <div className='max-width'>
      <Modal show={createTeamModal} centered onHide={() => setCreateTeamModal(false)}>
        <Modal.Header closeButton>
          <h4>{t("teamsPage.createTeam")}</h4>
        </Modal.Header>
        <Form onReset={(e) => { e.preventDefault(); setCreateTeamModal(false); setNewTeam({ name: null, code: null }) }}
          onSubmit={(e) => { e.preventDefault(); createTeam(); setCreateTeamModal(false); setNewTeam({ name: null, code: null }) }}
        >
          <Modal.Body>
            {/* name */}
            <div>
              <Form.Label className='fw-bold mb-2'>{t("teamsPage.name")}</Form.Label>
              <Form.Control required value={newTeam.name} onChange={(event) => setNewTeam({ ...newTeam, name: event.target.value })} />
            </div>
            {/* code */}
            <div className='mt-4'>
              <Form.Label className='fw-bold mb-2'>{t("teamsPage.code")}</Form.Label>
              <Form.Control required value={newTeam.code} onChange={(event) => setNewTeam({ ...newTeam, code: event.target.value })} />
            </div>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between '>
            <Button variant="secondary" type='reset'>{t("teamsPage.cancel")}</Button>
            <Button variant="success" type='submit'>{t("teamsPage.create")}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={deleteModal} centered onHide={() => setDeleteModal(false)}>
        <ModalHeader closeButton>
          <h4 className='text-center w-100-perc'>{t("teamsPage.deleteTeam")}?</h4>
        </ModalHeader>
        <ModalBody className='d-flex gap-5 justify-content-center'>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>{t("teamsPage.no")}</Button>
          <Button variant="secondary" onClick={() => { setDeleteModal(false); deleteTeam(selectedTeamId) }}>{t("teamsPage.yes")}</Button>
        </ModalBody>
      </Modal>
      <h1>Teams</h1>
      <div className='dashboard-box mt-5 h-auto'>
        <div className='d-flex justify-content-end mb-4'>
          <div className='mt-3 create-group-button d-flex justify-content-center align-items-center' onClick={() => { setCreateTeamModal(true) }}>{t("teamsPage.createTeam")}</div>
        </div>
        <Table responsive bordered >
          <thead>
            <tr className="d-none d-md-table-row">
              <th className='col-1 text-start fs-5' style={{ borderLeft: "0px", borderRight: "0px" }}>{t("teamsPage.name")}</th>
              <th className='col-1 text-start fs-5' style={{ borderLeft: "0px", borderRight: "0px" }}>{t("teamsPage.users")}</th>
              <th className='col-1 text-start fs-5' style={{ borderLeft: "0px", borderRight: "0px" }}>{t("teamsPage.code")}</th>
              <th className='col-1 text-start fs-5' style={{ borderLeft: "0px", borderRight: "0px" }}>{t("teamsPage.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {teams &&
              <>{teams.data.map((element, i) =>
                <tr key={`team-${i}`} className='text-secondary d-flex flex-column d-md-table-row'>
                  <div className="d-md-none fs-6 fw-bold pb-0">{t("teamsPage.name")}:</div>
                  <td className='text-start border-0 text-break'>{element.name}</td>
                  <div className="d-md-none fs-6 fw-bold pb-0">{t("teamsPage.users")}:</div>
                  <td className='text-start border-0 text-break'>{element.users.length}</td>
                  <div className="d-md-none fs-6 fw-bold pb-0">{t("teamsPage.code")}:</div>
                  <td className='text-start border-0 text-break'>{element.code}</td>
                  <div className="d-md-none fs-6 fw-bold pb-0">{t("teamsPage.actions")}:</div>

                  <td className='text-start border-0 text-break d-flex justify-content-start'>
                    <Link to={`/teams/${element.id}`} className='me-2 group-button-edit text-decoration-none'>{t("teamsPage.edit")}</Link>
                    <div onClick={() => { setDeleteModal(true); setSelectedTeamId(element.id) }} className='me-2 group-button-delete text-decoration-none'>{t("teamsPage.delete")}</div>
                  </td>
                </tr>
              )
              }
              </>
            }
          </tbody>
        </Table>
      </div>
    </div >
  )
}
