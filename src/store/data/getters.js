export const GET_TYPES_VEHICLES = (state) => {
    return  state.types_vehicles.map((e,index) => {
        return {
            label: e,
            value: e
        }
    })
	// return state.types_vehicles
};

export const GET_TYPES_MODELOS = (state) => {
	return state.types_modelos
};

export const GET_TYPES_FUEL = (state) => {
	return state.types_fuel
};

export const GET_TYPES_DOCUMENT = (state) => {
	return state.types_document
};

export const GET_TYPES_INSPECTIONS = (state) => {
	return state.types_inspections
};

export const GET_TYPES_INSPECTIONS_STATUES = (state) => {
	return state.types_inspections_statues
};