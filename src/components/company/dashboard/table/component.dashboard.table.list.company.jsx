import React from "react";
import { ComponentDashboardTableCompanyStyled } from "./component.dashboard.table.company.styled";
import ComponentDashboardTableCompany from "./component.dashoard.table.company";
import { useCompanyDashboardData } from "../../../../context/company/dashboard/CompanyDashboardContext";

const ComponentDashboardTableListCompany = () => {
	const { companyData, deleteOnePlacementInThisEntreprise } =
		useCompanyDashboardData();

	const { freelances } = companyData;

	return (
		<ComponentDashboardTableCompanyStyled>
			<div className="content-table">
				<div className="justify-space-between">
					<p className="p-title-table">Listes des Freelanceurs</p>
					<p className="p-a">Voir tous</p>
				</div>
				<div className="table-container">
					<table>
						<thead>
							<tr>
								<th style={{ textAlign: "start" }}>Nom et prénom</th>
								<th>TJM en euros</th>
								<th>Téléphone</th>
								<th>intitulé de poste</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{freelances.slice(0, 10).length > 0 ? (
								freelances.map((item) => (
									<>
										<ComponentDashboardTableCompany
											key={item.id}
											data={item}
											deleteOnePlacementInThisEntreprise={
												deleteOnePlacementInThisEntreprise
											}
										/>
									</>
								))
							) : (
								<td colSpan={5}>
									<p
										className="p-h3 text-center"
										style={{ fontSize: "0.85rem" }}>
										Aucune donner disponible
									</p>
								</td>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</ComponentDashboardTableCompanyStyled>
	);
};

export default ComponentDashboardTableListCompany;
