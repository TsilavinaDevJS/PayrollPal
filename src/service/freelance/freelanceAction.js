import {
	fetchDayDumpInThisMonthService,
	fetchPlacementByFreelanceIdService,
	depositDayDumpService,
} from "./freelanceService";

export const FETCH_DAY_DUMP_IN_THIS_MONTH = "FETCH_DAY_DUMP_IN_THIS_MONTH";
export const FETCH_PLACEMENT_BY_FREELANCE_ID =
	"FETCH_PLACEMENT_BY_FREELANCE_ID";
export const DEPOSIT_DAYDUMP = "DEPOSIT_DAYDUMP";

const fetchPlacementByFreelanceIdAction = async (dispatch, idFreelance) => {
	try {
		const response = await fetchPlacementByFreelanceIdService(idFreelance);
		const placement = response.data?.result[0];
		dispatch({
			type: FETCH_PLACEMENT_BY_FREELANCE_ID,
			payload: placement,
		});
		return placement;
	} catch (error) {
		throw error;
	}
};

const fetchDayDumpInThisMonthAction = async (dispatch, placementId) => {
	try {
		const response = await fetchDayDumpInThisMonthService(placementId);
		dispatch({
			type: FETCH_DAY_DUMP_IN_THIS_MONTH,
			payload: response.data.result,
		});
	} catch (error) {
		throw error;
	}
};
const depositDayDumpAction = async (dispatch, data) => {
	try {
		const response = await depositDayDumpService(data);
		dispatch({
			type: DEPOSIT_DAYDUMP,
			payload: response.data?.result,
		});
	} catch (error) {
		throw error;
	}
};

export {
	fetchDayDumpInThisMonthAction,
	fetchPlacementByFreelanceIdAction,
	depositDayDumpAction,
};
