import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ComponentCardPlacementJoinStyled } from "./component.card.placement.join.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalkingLuggage } from "@fortawesome/free-solid-svg-icons";
import DynamicSelect from "../../../common/dynamicSelect";
import { usePlacementData } from "../../../../context/admin/placement/placementContext";

const ComponentCardPlacementJoin = () => {
	const { data, addNewPlacement } = usePlacementData();
	const { freelanceData } = data;
	const { companyData } = data;
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		reset,
	} = useForm({ mode: "onChange" });
	const [error, setError] = React.useState("");
	const [isLoading, setLoading] = React.useState(false);

	const transformData = (data) => {
		let dataObject = {
			idFreelance: data.Freelance.value || "",
			idFreelanceChasseur: data.FreelanceChasseur.value || "",
			idEntreprise: data.Entreprise.value || "",
			revenuMensuelFreelanceChasseur: data.FreelanceChasseurRevenu,
		};
		return dataObject;
	};
	const onSubmit = async (data) => {
		const value = transformData(data);
		try {
			setLoading(true);
			await addNewPlacement(value);
			setError("");
			setLoading(false);
		} catch (error) {
			setError(error?.response?.data.Error);
			setLoading(false);
		}
	};
	return (
		<ComponentCardPlacementJoinStyled>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="content-placement">
					<div className="content-freelance" style={{ flex: 1 }}>
						<p className="p-h3" style={{ color: "#363740" }}>
							Freelances
						</p>
						<div className="form">
							<div>
								<p className="p-label">Freelance</p>
								<Controller
									name="Freelance"
									control={control}
									rules={{ required: "Ce champ est  requis" }}
									render={({ field }) => (
										<>
											<DynamicSelect
												data={freelanceData}
												onSelect={(selectedOption) =>
													field.onChange(selectedOption)
												}
											/>
											{errors.Freelance && (
												<span className="p-error">
													{errors.Freelance.message}
												</span>
											)}
										</>
									)}
								/>
							</div>
							<div>
								<p className="p-label">Freelance chasseur</p>
								<Controller
									name="FreelanceChasseur"
									control={control}
									rules={{ required: "Ce champ est  requis" }}
									render={({ field }) => (
										<>
											<DynamicSelect
												data={freelanceData}
												onSelect={(selectedOption) =>
													field.onChange(selectedOption)
												}
											/>
											{errors.FreelanceChasseur && (
												<span className="p-error">
													{errors.FreelanceChasseur.message}
												</span>
											)}
										</>
									)}
								/>
							</div>
							<div>
								<p className="p-label">Revenu du freelance chasseur</p>
								<Controller
									name="FreelanceChasseurRevenu"
									control={control}
									rules={{ required: "Ce champ est  requis" }}
									render={({ field }) => (
										<>
											<input
												type="number"
												min="0"
												className="input"
												{...field}
											/>
											{errors.FreelanceChasseurRevenu && (
												<span className="p-error">
													{errors.FreelanceChasseurRevenu.message}
												</span>
											)}
										</>
									)}
								/>
							</div>
						</div>
					</div>
					<div className="icon-join">
						<FontAwesomeIcon icon={faPersonWalkingLuggage} />
					</div>
					<div className="content-company" style={{ flex: 1 }}>
						<p className="p-h3" style={{ color: "#363740" }}>
							Entreprises
						</p>
						<div className="form">
							<div>
								<p className="p-label">Entreprises</p>
								<Controller
									name="Entreprise"
									control={control}
									rules={{ required: "Ce champ est  requis" }}
									render={({ field }) => (
										<>
											<DynamicSelect
												data={companyData}
												onSelect={(selectedOption) =>
													field.onChange(selectedOption)
												}
											/>
											{errors.Entreprise && (
												<span className="p-error">
													{errors.Entreprise.message}
												</span>
											)}
										</>
									)}
								/>
							</div>
							<div>
								<div
									style={{
										boxShadow: "0px 0px 1px 1px #eaeaea",
										marginTop: "12px",
										padding: "20px",
										borderRadius: "8px",
										backgroundColor: "rgb(255, 249, 240)",
									}}>
									<p
										className="p-h3"
										style={{ color: "rgb(255, 138, 0)", fontWeight: 700 }}>
										N.B: Autre terme
									</p>
									<p className="p">
										{!isValid ? (
											<>
												veuiller completer toutes les champs pour avoir plus de
												claireter...
											</>
										) : (
											<>
												<>
													La freelanceur{" "}
													{getValues("Freelance")?.label || "non spécifié"} est
													trouvée par la freelanceur qui est son chasseur{" "}
													{getValues("FreelanceChasseur")?.label ||
														"non spécifié"}{" "}
													pour intégrer l'entreprise{" "}
													{getValues("Entreprise")?.label || "non spécifié"} et
													qui dois avoir une revenu mensuel de pour cet
													freelanceur{" "}
													{getValues("FreelanceChasseurRevenu") ||
														"non spécifié"}{" "}
													Arriary.
												</>
											</>
										)}
									</p>
								</div>
							</div>
						</div>
						<div style={{ marginTop: "12px" }}>
							<p className="p-error text-center">{error && <>{error}</>}</p>
							<button className="btn-secondary" onClick={handleSubmit}>
								{isLoading ? <>Chargement</> : <>Join</>}
							</button>
						</div>
					</div>
				</div>
			</form>
		</ComponentCardPlacementJoinStyled>
	);
};

export default ComponentCardPlacementJoin;
