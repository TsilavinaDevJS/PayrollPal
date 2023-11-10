import { apiUrl } from "../../config/apiUrl";
import jwt_decode from "jwt-decode";
// import {
// 	isEmailValidInUserService,
// 	checkedEmailService,
// 	checkedPasswordService,
// 	signupCompanyService,
// 	signupFreelanceService,
// } from "./authService";

// export const AUTH_VALIDATION_EMAIL = "AUTH_VALIDATION_EMAIL";
// export const AUTH_CHECKED_EMAIL = "AUTH_CHECKED_EMAIL";
// export const AUTH_CHECKED_PASSWORD = "AUTH_CHECKED_PASSWORD";

export const FETCH_DATA_IN_SESSION_STORAGE = "FETCH_DATA_IN_SESSION_STORAGE ";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGIN_USER = "LOGIN_USER";
export const UPDATED_PROFIL_ADMIN = "UPDATED_PROFIL_ADMIN";
export const UPDATED_SETTINGS_FREELANCE = "UPDATED_SETTINGS_FREELANCE";

// export const isEmailValidInUserAction = async (dispatch, data) => {
// 	try {
// 		const result = await isEmailValidInUserService(data);
// 	} catch (error) {}
// };

export const checkedEmailAction = async (dispatch, data) => {
	try {
		await apiUrl.post("/auth/login/checkedEmail", data);
	} catch (error) {
		throw error;
	}
};
export const signupFreelanceAction = async (data) => {
	try {
		await apiUrl.post("/auth/signup/freelance", data);
	} catch (error) {
		throw error;
	}
};
export const signupCompanyAction = async (data) => {
	try {
		await apiUrl.post("/auth/signup/company", data);
	} catch (error) {
		throw error;
	}
};
export const validationEmailAction = async (data) => {
	try {
		await apiUrl.post("/auth/signup/validation_email", data);
	} catch (error) {
		throw error;
	}
};
export const loginAction = async (dispatch, data) => {
	try {
		const result = await apiUrl.post("/auth/login/checkedPassword", data);
		const token = result.data.authToken;
		const decodedToken = jwt_decode(token);
		dispatch({
			type: LOGIN_USER,
			payload: decodedToken,
		});
		sessionStorage.setItem("token", token);
		window.location = "/";
	} catch (error) {
		throw error;
	}
};

export const logoutAction = async (dispatch) => {
	try {
		sessionStorage.removeItem("token");
		dispatch({
			type: LOGOUT_USER,
			payload: null,
		});
	} catch (error) {
		throw error;
	}
};

export const fetchDataInfosData = async (dispatch) => {
	try {
		const storedToken = sessionStorage.getItem("token");
		if (storedToken) {
			const decodedToken = jwt_decode(storedToken);
			dispatch({
				type: FETCH_DATA_IN_SESSION_STORAGE,
				payload: decodedToken,
			});
		} else {
			dispatch({
				type: FETCH_DATA_IN_SESSION_STORAGE,
				payload: null,
			});
		}
		return null;
	} catch (error) {
		throw error;
	}
};
//Updated settings
export const updatedProfilAction = async (dispatch, formData) => {
	try {
		const response = await apiUrl.post("/admin/settings", formData);
		dispatch({
			type: UPDATED_PROFIL_ADMIN,
			payload: response?.data.result,
		});
	} catch (error) {
		throw error;
	}
};

//updated settings company

export const UPDATED_SETTINGS_COMPANY = "UPDATED_SETTINGS_COMPANY";

export const updatedProfilForCompanyAction = async (
	dispatch,
	userId,
	formData
) => {
	try {
		const response = await apiUrl.post(`/company/settings/${userId}`, formData);
		dispatch({
			type: UPDATED_SETTINGS_COMPANY,
			payload: response?.data.result,
		});
	} catch (error) {
		throw error;
	}
};

export const updatedSettingsUserFreelancerAction = async (
	dispatch,
	userId,
	userData
) => {
	try {
		const response = await apiUrl.post(
			`/freelance/settings/${userId}`,
			userData
		);
		dispatch({
			type: UPDATED_SETTINGS_FREELANCE,
			payload: response?.data.result,
		});
	} catch (error) {
		throw error;
	}
};

// export const checkedPasswordAction = (data) => {
// 	return async (dispatch) => {
// 		try {
// 			const data = await checkedPasswordService(data);
// 			dispatch({
// 				type: AUTH_CHECKED_PASSWORD,
// 				payload: data,
// 			});
// 		} catch (error) {
// 			console.error(
// 				"Erreur de la validation du mot de passe de l'utilisateur:",
// 				error
// 			);
// 		}
// 	};
// };

// export const signupCompanyAction = (data) => {
// 	return async (dispatch) => {
// 		try {
// 			const data = await signupCompanyService(data);
// 			dispatch({
// 				type: AUTH_SIGNUP_COMPANY,
// 				payload: data,
// 			});
// 		} catch (error) {
// 			console.error("Erreur de l'enregistrement de l'entreprise:", error);
// 		}
// 	};
// };

// export const signupFreelanceAction = (data) => {
// 	return async (dispatch) => {
// 		try {
// 			const data = await signupFreelanceService(data);
// 			dispatch({
// 				type: AUTH_SIGNUP_FREELANCE,
// 				payload: data,
// 			});
// 		} catch (error) {
// 			console.error("Erreur de l'enregistrement de la freelance:", error);
// 		}
// 	};
// };
