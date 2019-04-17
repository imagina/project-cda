<template>
	<q-page class="create-vehicle">
	    <div class="layout-padding">
	    	<div class="row mt-3">
            	<div class="col-12 q-px-md">
            		<span class="h4 q-mb-md border-bottom d-block">NUEVO VEHICULO</span>
            	</div>
	    	</div>
	    	<div class="row q-py-md border-bottom">
            	<div class="col-12 col-md-6 col-lg-4 mx-auto q-px-md">
		            <q-field :error="$v.search.type_document.$error">
		                <q-select v-model="search.type_document" :options="selectOptions" class="bg-white"/>
		            </q-field>
				</div>
            	<div class="col-12 col-md-6 col-lg-4 mx-auto q-px-md">
		            <q-field :error="$v.search.number_document.$error">
		                <q-input v-model="search.number_document" type="text" placeholder="N° Cédula" class="bg-white mx-auto"
		                    v-on:keyup.enter="searchUser"
		                    :after="[{ icon: 'search', handler() { searchUser()}}]"/>
			                <q-tooltip v-show="$v.search.number_document.$error">
			                    <p class="error-message mb-0" v-if="!$v.search.number_document.required">
			                        <i class="material-icons">error_outline</i> El campo es obligatorio.
			                    </p>
			                    <p class="error-message mb-0" v-if="!$v.search.number_document.minLength">
			                        <i class="material-icons">error_outline</i> Debe contener al menos 8 caracteres.
			                    </p>
			                </q-tooltip>
		            </q-field>
            	</div>
	    	</div>
            <div class="row q-mt-lg" v-show="!$v.attributes.user_id.$invalid">
                <div class="col-12 col-md-6 q-px-md">
			        <q-field :error="$v.attributes.board.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.board.$error}">Placa:</span>
			        	<q-input v-model="attributes.board" type="text" placeholder="Placa" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.service_type.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.service_type.$error}">Tipo de Servicio:</span>
			        	<q-input v-model="attributes.service_type" type="text" placeholder="Tipo de Servicio" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.type_vehicle.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.type_vehicle.$error}">Clase de Vehículo</span>
			        		 <q-select v-model="attributes.type_vehicle" class="q-mb-lg" :options="selectTypesVehicles"/>
			        </q-field>

			        <q-field :error="$v.attributes.brand.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.brand.$error}">Marca:</span>
			        	<q-input v-model="attributes.brand" type="text" placeholder="Marca" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.line.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.line.$error}">Línea:</span>
			        	<q-input v-model="attributes.line" type="text" placeholder="Línea" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.model.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.model.$error}">Modelo:</span>
			        	<q-input v-model="attributes.model" type="text" placeholder="Modelo" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.transit_license.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.transit_license.$error}">N° Licencia de Tránsito:</span>
			        	<q-input v-model="attributes.transit_license" type="text" placeholder="N° Licencia de Tránsito" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.enrollment_date.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.enrollment_date.$error}">Fecha de Matrícula:</span>
	                        <q-datetime v-model.trim="attributes.enrollment_date"
	                        	type="date"
	                        	class="q-mb-lg"
	                        	placeholder="Fecha de Vencimiento"
	                        	format="YYYY-MM-DD"/>
	                        </q-field>
			        </q-field>
                </div>

                <div class="col-12 col-md-6 q-px-md">
			        <q-field :error="$v.attributes.color.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.color.$error}">Color:</span>
			        	<q-input v-model="attributes.color" type="text" placeholder="Color" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.type_fuel.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.type_fuel.$error}">Tipo de combustible:</span>
			        	<q-input v-model="attributes.type_fuel" type="text" placeholder="Tipo de combustible" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.chasis_number.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.chasis_number.$error}">N°Vin:</span>
			        	<q-input v-model="attributes.chasis_number" type="text" placeholder="N°Vin:" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.chasis_number.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.chasis_number.$error}">N° de Chasis:</span>
			        	<q-input v-model="attributes.chasis_number" type="text" placeholder="N° de Chasis" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.engine_number.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.engine_number.$error}">N° de Motor:</span>
			        	<q-input v-model="attributes.engine_number" type="text" placeholder="N° de Motor" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.displacement.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.displacement.$error}">Cilindraje:</span>
			        	<q-input v-model="attributes.displacement" type="text" placeholder="Cilindraje" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.axes_number.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.axes_number.$error}">Numero de ejes:</span>
			        	<q-input v-model="attributes.axes_number" type="text" placeholder="Numero de ejes" class="q-mb-lg"/>
			        </q-field>

			        <q-field :error="$v.attributes.insurance_expidition.$error">
			        	<span class="font-weight-bold d-inline-block"
			        			:class="{'color-danger': $v.attributes.insurance_expidition.$error}">Fecha Fin De Vigencia:</span>
                        <q-datetime v-model.trim="attributes.insurance_expidition"
                        	type="date"
                        	class="q-mb-lg"
                        	format="YYYY-MM-DD"/>
                        </q-field>
			        </q-field>

			        <q-field :error="$v.attributes.insurance_expiration.$error">
			        	<span class="font-weight-bold d-inline-block"
			        			:class="{'color-danger': $v.attributes.insurance_expiration.$error}">Fecha de Expedición:</span>
                        <q-datetime v-model.trim="attributes.insurance_expiration"
                        	type="date"
                        	class="q-mb-lg"
                        	format="YYYY-MM-DD"/>
                        </q-field>
			        </q-field>
                </div>

            	<div class="col-12 text-right q-py-lg">
            	    <q-btn color="black" size="md" label="Guardar" class="q-px-lg btn-app" @click="submitData"/>
            	</div>
            </div>
		</div>
	</q-page>
</template>

<script>
    import { required, email, minLength, sameAs, requiredIf, requiredUnless} from 'vuelidate/lib/validators';
    import qInputValidation from '../../../components/q-input-validation';
	import resources from 'src/services/resources';
	import config from 'src/config/index'

	export default {
        components: { qInputValidation },
		name: 'PageVehicleCreate',
	  	data () {
	    	return {
	    		attributes: {
					service_type: null,
					type_vehicle: null,
					board: null,
					brand: null,
					line: null,
					model: null,
					color: null,
					type_fuel: null,
					transit_license: null,
					enrollment_date: null,
					chasis_number: null,
					engine_number: null,
					displacement: null,
					axes_number: null,
					insurance_expidition: null,
					insurance_expiration: null,
					user_id: null,
	    		},
	            search: {
	                number_document: null,
	                type_document: 'cc'
	            },
	            selectOptions: [
	                {
	                  label: 'Cédula de ciudadanía',
	                  value: 'cc'
	                },
	                {
	                  label: 'Cédula de extranjería',
	                  value: 'ce'
	                },
	                {
	                  label: 'Pasaporte',
	                  value: 'p'
	                }
	            ],
	            selectTypesVehicles: []
	    	}
	    },
	    created() {
	    	this.$q.loading.show()
            Promise.all([
	    		resources.typesVehicles()
            ]).then((response) => {
                this.selectTypesVehicles = response[0].data.map((e,index) => {
                    if (index === 0)
                        this.attributes.type_vehicle = e;
                    return {
                        label: e,
                        value: e
                    }
                })
            }).catch((error) => {
                this.$q.notify({
                        message: 'Losiento, ocurrio un error en el servidor. Intente de nuevo.',
                        position: 'top-right'
                    })
                console.error('There is an error', error);
            }).then(()=> {
                this.$q.loading.hide()
            })
	    },
        validations: {
            attributes: {
                service_type : { required, minLength: minLength(3) },
                type_vehicle : { required },
                brand        : { required },
                line         : { required },
                model        : { required },
                color           : { required },
                board           : { required },
                type_fuel       : { required },
                transit_license : { required },
                enrollment_date : { required },
                chasis_number   : { required },
                engine_number   : { required },
                displacement    : { required },
                user_id	    	: { required },
                axes_number    	: { required },
                insurance_expidition : { required },
                insurance_expiration : { required },
            },
        	search: {
        	    number_document: { required,minLength: minLength(6) },
        	    type_document: { required }
        	},
        },
        methods: {
            submitData () {
                this.$q.loading.show()
                this.$v.attributes.$touch()
                if (this.$v.attributes.$error) {
                    this.$q.loading.hide()
                    this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                    return
                } else {
                    var attributes = {}
                    Object.keys(this.attributes).filter((element) => {
                    	if (this.attributes[element] != null) {
                    		attributes[element] = this.attributes[element]
                    	}
                    });

	                resources.vehicle(attributes.board)
	                .then(response => {
	                	if (!response.data) {
		                    resources.createVehicle(attributes)
		                    .then(response => {
		                    	if (response.data) {
		                        	this.$q.notify({type:'positive', message: 'Vehiculo creado exitosamente!', position: 'top-right', closeBtn: true})
		                        	this.$router.push({ name: 'vehicles.index' })
		                    	}else {
		                        	this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
		                    	}
		                    }).catch(error => {
		                        this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
		                    })
		                    .then(() => {
		                    	this.$q.loading.hide()
		                    })
	                	}else {
		                    this.$q.notify({message: 'La placa ya se encuentra registrada',  position: 'top-right', closeBtn: true})
                    		this.$q.loading.hide()
	                	}
                    }).catch(error => {
                    	this.$q.loading.hide()
                        this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
                    })
                }
            },
	        searchUser () {
	            this.$q.loading.show()
                this.$v.search.$touch()
                if (this.$v.search.$error) {
                    this.$q.loading.hide()
                    this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                    return
                } else {
		            resources.searchUser(this.search.type_document,this.search.number_document)
		            .then(response => {
		                if(response.data.data.length) {
		                    this.attributes.user_id = response.data.data[0].id
		                }
		                else {		                	
		                    this.attributes.user_id = null
		                    this.$q.notify({
		                    	icon:'error',
		                    	message: 'Usuario no encontrado, debe registrarse',
		                    	position: 'top-right',
		                    	closeBtn: true})
		                }
		            }).catch(error => {
		                this.$q.notify({icon:'error', message: 'Ocurrio un error inesperado',  position: 'top-right', closeBtn: true})
		            }).then(() => {
		                this.$q.loading.hide()
		            });
		        }
	        }
        }
	}
</script>