export const SET_VEHICLES = (state, data) => {
	state.empty = true
	state.vehicles = data
};

export const ADD_VEHICLE_LIST = (state, data) => {
	state.vehicles.unshift(data)
};

export const RESET_VEHICLE_LIST = (state) => {
	state.empty = false
	state.page = 1
	state.vehicles = []
};

export const INCREMENT_PAGE = (state,page) => {
	state.page = state.page + 1
};

export const SET_PAGE_BUSY = (state,busy) => {
	state.busy = busy
};