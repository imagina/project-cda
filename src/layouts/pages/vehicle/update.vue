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

                </div>
                <div class="col-12">
					<div class="row">
						<div class="col-12 col-md-6 q-px-md">
					        <q-field :error="$v.attributes.insurance_expidition.$error">
					        	<span class="font-weight-bold d-inline-block"
					        			:class="{'color-danger': $v.attributes.insurance_expidition.$error}">Fecha Fin De Vigencia:</span>
		                        <q-datetime v-model.trim="attributes.insurance_expidition"
		                        	type="date"
		                        	class="q-mb-lg"
		                        	format="YYYY-MM-DD"/>
		                        </q-field>
					        </q-field>
						</div>						

						<div class="col-12 col-md-6 q-px-md">
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
					insurance_expedition: null,
					insurance_expiration: null,
					user_id: null,
	    		},
	            selectTypesVehicles: []
	    	}
	    },
	    created() {
	    	this.$q.loading.show()
            Promise.all([
	    		resources.typesVehicles(),
            	resources.vehicle(this.$route.params.board)
            ]).then((response) => {

            	this.attributes = response[1].data

            	this.attributes.user_id = response[1].data.user.id

                this.selectTypesVehicles = response[0].data.map((e,index) => {
                    if (index === 0)
                        this.attributes.type_vehicle = e;
                    return {
                        label: e,
                        value: e
                    }
                })

            }).catch((err) => {
                this.$q.notify({
                        message: 'Losiento, ocurrio un error en el servidor. Intente de nuevo.',
                        position: 'top-right'
                    })
                console.log('There is an error', err);
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
                    
                    resources.updateVehicle(attributes)
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