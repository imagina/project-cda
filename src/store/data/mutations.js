/**
 * SET Tipos de Vehiculos
 */
export const SET_TYPES_VEHICLES = (state, data) => {
	state.types_vehicles = data
};


/**
 * SET Tipos de Vehiculos
 */
export const SET_CLASS_VEHICLES = (state, data) => {
  state.class_vehicles = data
};

/**
 * SET Tipos de Inspecciones
 */
export const SET_TYPES_INSPECTIONS = (state, data) => {
	state.types_inspections = data
};

/**
 * SET Tipos de estatus de inspecciones
 */
export const SET_TYPES_INSPECTIONS_STATUES = (state, data) => {
	state.types_inspections_statues = data
};

/**
 * SET Tipos de servicios
 */
export const SET_TYPES_SERVICES = (state, data) => {
	state.types_services = data
};

/**
 * SET Tipos de Fuels
 */
export const SET_TYPES_FUELS = (state, data) => {
	state.types_fuels = data
};

/**
 * SET Tipos de Marcas
 */
export const SET_TYPES_BRANDS = (state, data) => {
	state.types_brands = data
};

/**
 * SET Tipos de Marcas
 */
export const SET_TYPES_COLORS = (state, data) => {
	state.types_colors = data
};

/**
 * SET Tipos de modelos
 */
export const SET_TYPES_MODELS = (state, data) => {
	state.types_models = data
};

/**
 * SET Tipos de Lineas
 */
export const SET_TYPES_LINES = (state, data) => {
	state.types_lines = data
};

/**
 * SET Tipos de documentos
 */
export const SET_TYPES_DOCUMENT = (state, data) => {
	state.types_document = data
};


export const LOAD_TRUE = (state) => {
	state.load_inner = true
};

export const LOAD_FALSE = (state) => {
	state.load_inner = false
};