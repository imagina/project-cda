<template>
	<q-page class="create-vehicle">
	    <div class="layout-padding">
            <div class="row">
            	<div class="col-12 q-px-md">
            		<span class="h4 q-mb-md border-bottom d-block">VEHICULO [{{ $route.params.board }}] </span>
            	</div>
                <div class="col-12 col-md-6 q-px-md">
			        <q-field :error="$v.attributes.service_type.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.service_type.$error}">Tipo de Servicio:</span>
			        	<q-select v-model="attributes.service_type" class="q-mb-lg uppercase" placeholder="Tipo de Servicio" :options="selectTypesServices"/>
			        </q-field>

			        <q-field :error="$v.attributes.type_vehicle.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.type_vehicle.$error}">Clase de Vehículo</span>
			        		<q-select v-model="attributes.type_vehicle" class="q-mb-lg uppercase" placeholder="Clase de Vehículo" :options="selectTypesVehicles"/>
			        </q-field>

			        <q-field :error="$v.attributes.brand_id.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.brand_id.$error}">Marca:</span>
			        	<q-select v-model="attributes.brand_id" class="q-mb-lg uppercase" placeholder="Marca" :options="selectBrands"/>
			        </q-field>

			        <q-field :error="$v.attributes.line_id.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.line_id.$error}">Línea:</span>
			        	<q-select v-model="attributes.line_id" class="q-mb-lg uppercase" placeholder="Line" :options="selectLines"/>
			        </q-field>

			        <q-field :error="$v.attributes.model.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.model.$error}">Modelo:</span>
			        	<q-select v-model="attributes.model" class="q-mb-lg uppercase" placeholder="Modelo" :options="years"/>
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
			        <q-field :error="$v.attributes.color_id.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.color_id.$error}">Color:</span>
			        	<q-select v-model="attributes.color_id" class="q-mb-lg uppercase" placeholder="Color" :options="selectColors"/>
			        </q-field>

			        <q-field :error="$v.attributes.type_fuel.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.type_fuel.$error}">Tipo de combustible:</span>
			        	<q-select v-model="attributes.type_fuel" class="q-mb-lg uppercase" placeholder="Tipo de combustible" 
			        			:options="selectTypesFuels"/>
			        </q-field>

			        <q-field :error="$v.attributes.vin_number.$error">
			        	<span class="font-weight-bold d-inline-block"
			        		:class="{'color-danger': $v.attributes.vin_number.$error}">N°Vin:</span>
			        	<q-input v-model="attributes.vin_number" type="text" placeholder="N°Vin:" class="q-mb-lg"/>
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

                </div>
				<div class="col-12">
					<div class="row">
						<div class="col-12 q-px-md">
							<h5 class="border-bottom q-my-sm">SOAT</h5>
						</div>

				        <q-field :error="$v.attributes.insurance_expedition.$error" class="col-6 col-sm-4 q-px-md">
				        	<span class="font-weight-bold d-inline-block"
				        			:class="{'color-danger': $v.attributes.insurance_expedition.$error}">Fecha Fin De Vigencia:</span>
	                        <q-datetime v-model.trim="attributes.insurance_expedition"
	                        	placeholder="Fecha Fin De Vigencia"
	                        	type="date"
	                        	class="q-mb-lg"
	                        	format="YYYY-MM-DD"/>
	                        </q-field>
				        </q-field>

				        <q-field :error="$v.attributes.insurance_expiration.$error" class="col-6 col-sm-4 q-px-md">
				        	<span class="font-weight-bold d-inline-block"
				        			:class="{'color-danger': $v.attributes.insurance_expiration.$error}">Fecha de Expedición:</span>
	                        <q-datetime v-model.trim="attributes.insurance_expiration"
	                        	placeholder="Fecha de Expedición"
	                        	type="date"
	                        	class="q-mb-lg"
	                        	format="YYYY-MM-DD"/>
	                        </q-field>
				        </q-field>
					</div>
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
	import config from 'src/config/index'

	export default {
        components: { qInputValidation },
		name: 'PageVehicleCreate',
	  	data () {
	    	return {
	    		attributes: {
					service_type: null,
					type_vehicle: null,
					brand_id: null,
					line_id: null,
					model: null,
					color_id: null,
					type_fuel: null,
					transit_license: null,
					enrollment_date: null,
					chasis_number: null,
					engine_number: null,
					displacement: null,
					axes_number: null,
					insurance_expedition: null,
					insurance_expiration: null,
					user_id: null,
					vin_number: null,
	    		},
	            selectTypesVehicles: [],
	            selectTypesServices: [],
	            selectTypesFuels: [],
	            selectColors: [],
	            selectBrands: [],
	            selectLines: [],
	            selectModel: []
	    	}
	    },
  		computed : {
    		years () {
    			const year = new Date().getFullYear()
    			return Array.from({length: year - 1900}, (value, index) => ({label: parseInt(year - index).toString(), value: year - index}))
    		}
  		},
	    created() {
	    	this.$q.loading.show()
            Promise.all([
                this.$resources.getTypesServices(),
                this.$resources.getTypesFuels(),
                this.$resources.typesVehicles(),
				this.$resources.typesBrands(),
				this.$resources.typesColors(),
				this.$resources.typesLines(),
				this.$resources.searchVehicle(this.$route.params.board)
            ]).then((response) => {
                this.selectTypesServices = response[0].map((e,index) => {
                    return {
                        label: e,
                        value: index
                    }
                })
                this.selectTypesFuels = response[1].map((e,index) => {
                    return {
                        label: e,
                        value: index
                    }
                })
                this.selectTypesVehicles = response[2].map((e,index) => {
                    return {
                        label: e,
                        value: index
                    }
                })
                this.selectBrands = response[3].map((e,index) => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
                this.selectColors = response[4].map((e,index) => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
                this.selectLines = response[5].map((e,index) => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            	this.attributes = response[6].data
            	this.attributes.brand_id 	 = response[6].data.brand_id ? parseInt(response[6].data.brand_id) : null
            	this.attributes.color_id 	 = response[6].data.color_id ? parseInt(response[6].data.color_id) : null
            	this.attributes.line_id 	 = response[6].data.line_id ? parseInt(response[6].data.line_id) : null
            	this.attributes.type_fuel 	 = response[6].data.type_fuel ? parseInt(response[6].data.type_fuel) : null
            	this.attributes.type_vehicle = response[6].data.type_vehicle ? parseInt(response[6].data.type_vehicle) : null
            	this.attributes.service_type = response[6].data.service_type ? parseInt(response[6].data.service_type) : null
            	this.attributes.model        = response[6].data.model ? parseInt(response[6].data.model) : null
            	this.attributes.user_id = response[6].data.user.id
                this.$q.loading.hide()
            }).catch((err) => {
                this.$q.notify({
                        message: 'Ups! Ocurrio un error en el servidor...',
                        position: 'top-right'
                    })
                console.log('There is an error', err);
                this.$q.loading.hide()
            })
	    },
        validations: {
            attributes: {
                service_type : { required },
                type_vehicle : { required },
                brand_id     : { required },
                line_id      : { required },
                model        : { required },
                color_id        : { required },
                type_fuel    : { required },
                transit_license : { required },
                enrollment_date : { required },
                chasis_number   : { required },
                engine_number   : { required },
                displacement    : { required },
                axes_number    	: { required },
                insurance_expedition : { required },
                insurance_expiration : { required },
                user_id	    	: { required },
                vin_number	    	: { required },
            }
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
                    
                    this.$resources.updateVehicle(attributes)
                    .then(response => {
                        this.$q.notify({type:'positive', message: 'Vehiculo actualizado exitosamente!',  position: 'top-right', closeBtn: true})
                        this.$router.push({ name: 'vehicles.index' })
                    }).catch(error => {
                        this.$q.loading.hide()
                        this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
                    })
                }
            }
        }
	}
</script>