export const SET_ORDEN = (state,data) => {
    state.id 		= 	data.id
	state.timeEntry	= 	data.timeEntry
	state.dateEntry =   data.dateEntry
	// state.dateEntry =   data.dateEntry ? this.PadLeft(data.dateEntry,3) : null
};

export const RESET_ORDEN = (state) => {
	state.id 			= null
	state.timeEntry 	= null
	state.dateEntry 	= null
};