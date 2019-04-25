export const SET_VINSPECTIONS = (state, data) => {
	state.empty = false
	state.inspections = data
};

export const ADD_INSPECTION_LIST = (state, data) => {
	state.inspections.unshift(data)
};

export const RESET_INSPECTIONS_LIST = (state) => {
	state.empty = false
	state.page = 1
	state.busy = false
	state.inspections = []
};

export const INCREMENT_PAGE = (state) => {
	state.page = state.page + 1
};

export const SET_PAGE_BUSY = (state,busy) => {
	state.busy = busy
};