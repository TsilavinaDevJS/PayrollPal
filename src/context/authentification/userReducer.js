import {
	FETCH_DATA_IN_SESSION_STORAGE,
	LOGOUT_USER,
	UPDATED_PROFIL_ADMIN,
	UPDATED_SETTINGS_COMPANY,
} from "../../service/authentification/authAction.js";

const authReducer = (state, action) => {
	switch (action.type) {
		case FETCH_DATA_IN_SESSION_STORAGE:
			return {
				...state,
				infosUsers: action.payload?.userData || null,
				isSecureContext: true,
			};
		case LOGOUT_USER:
			state.isSecureContext = false;
			return {
				...state,
				infosUsers: null,
				isSecureContext: true,
			};
		case UPDATED_PROFIL_ADMIN:
			sessionStorage.setItem("token", action.payload?.authToken);
			return {
				...state,
				infosUsers: action.payload.user,
			};
		case UPDATED_SETTINGS_COMPANY:
			sessionStorage.setItem("token", action.payload?.authToken);
			return {
				...state,
				infosUsers: action.payload?.user,
				isSecureContext: true,
			};
		default:
			return state;
	}
};

export { authReducer };
