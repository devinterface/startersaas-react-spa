import React from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function UserTeams({ user }) {
  const { t } = useTranslation();

  return (
    <div className="max-width">
      <div className="m-0-auto max-width">
        <h1 className="">{t("teamsPage.teams")}</h1>
        <div className="dashboard-box mt-5 py-5 px-5">
          {user.teams && user.teams.length === 0 ? (
            <h4>{t("teamsPage.userWithNoTeams")}</h4>
          ) : (
            <Table responsive bordered>
              <thead>
                <tr className="d-none d-md-table-row">
                  <th
                    className="col-1 text-start fs-5"
                    style={{ borderLeft: "0px", borderRight: "0px" }}
                  >
                    #
                  </th>
                  <th
                    className="col-1 text-start fs-5"
                    style={{ borderLeft: "0px", borderRight: "0px" }}
                  >
                    {t("teamsPage.name")}
                  </th>
                  <th
                    className="col-1 text-start fs-5"
                    style={{ borderLeft: "0px", borderRight: "0px" }}
                  >
                    Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.teams && (
                  <>
                    {user.teams.map((team, i) => (
                      <tr
                        className="table-row-color d-flex flex-column d-md-table-row"
                        key={`${team.code}-${i}`}
                      >
                        <div className="d-md-none fw-bold pb-0">#:</div>
                        <td className="text-start border-0 text-break">
                          {i + 1}
                        </td>
                        <div className="d-md-none fw-bold pb-0">
                          {t("teamsPage.name")}:
                        </div>
                        <td className="text-start border-0 text-break">
                          {team.name}
                        </td>
                        <div className="d-md-none fw-bold pb-0">Code:</div>
                        <td className="text-start border-0 text-break">
                          {team.code}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
