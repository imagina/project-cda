<template>
    <div id="printed">
        <q-page v-show="!showsignature && showData">
        	<div class="col-12 q-border col-search print-none">
	            <div class="row">
	                <div class="col-12 col-sm-10 col-md-6 mx-auto q-px-md">
	                    <span class="w-50 d-inline-block font-weight-bold">
	                        TIPO DE INSPECCIÓN:
	                    </span>
                        {{ data.inspections_types_id }}
	                    <div class="w-50 d-inline-block">
	                        <q-select v-model="data.inspections_types_id" :options="selectInspection" class="bg-white q-py-sm q-my-md"/>
	                    </div>
	                </div>
	            </div>
	            <div class="row">
	                <div class="col-12 col-sm-10 col-md-6 mx-auto q-px-md">
	                    <span class="w-50 d-inline-block font-weight-bold">
	                        Estatus:
	                    </span>
	                    <div class="w-50 d-inline-block">
	                    	<q-select v-model="inspection_statues.status" 
	                    		  :options="inspection_statues.options"
	                    		  placeholder="Status" class="bg-white q-py-sm q-my-md"/>
	                   	</div>
	                </div>
	            </div>
        	</div>
            <q-page>
                <div v-if="data.attributes != null" class="q-pb-lg">
                    <!-- SOAP -->
                    <div class="container-fluid bg-gray-10">
                        <div class="row print-row align-items-center">
                            <div class="col-12 col-md-3 px-2 py-3 bg-primary text-right print-none">
                                <span class="h2 font-weight-bold my-3 d-block">SOAT</span>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center print-col-3 print-center">
                                <p class="font-weight-bold font-family"><b>Fecha de Expedición</b></p>
                                <p class="mb-0">{{ data.attributes.insurance_expiration ? data.attributes.insurance_expiration : 'N/D' }}</p>
                            </div>
                            <div class="col-4 col-md-3 mx-auto py-3 text-center print-col-3 print-center">
                                <p class="font-weight-bold font-family"><b>Fecha Inicio De Vigencia</b></p>
                                <p class="mb-0">{{ data.attributes.insurance_expedition ? data.attributes.insurance_expedition : 'N/D' }}</p>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center print-col-3 print-center">
                                <p class="font-weight-bold font-family"><b>Fecha Fin De Vigencia</b></p>
                                <p class="mb-0">{{ data.attributes.insurance_expiration ? data.attributes.insurance_expiration : 'N/D' }}</p>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center print-col-3 print-center">
                                <p class="font-weight-bold font-family"><b>Estado</b></p>
                                <p class="mb-0 text-uppercase" :class="{'text-green': data.attributes.gas_certificate, 'text-red': !data.attributes.gas_certificate}">
                                    <b>{{ data.attributes.gas_certificate|validity }}</b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="layout-padding q-py-lg">
                        <!-- Atributos -->
                        <div class="row mt-3 q-border">
                            <div class="col-12 col-md-6 q-px-md print-col-6">

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.service_type" 
                                    class="d-block"
                                    label="Tipo de Servicio:"/>

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.type_vehicle" 
                                    class="d-block"
                                    label="Clase de Vehículo:"/>

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.brand" 
                                    class="d-block"
                                    label="Marca:"/>

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.line" 
                                    class="d-block"
                                    label="Línea:"/>

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.transit_license" 
                                    class="d-block"
                                    label="N° Licencia de Tránsito:"/>

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.enrollment_date" 
                                    class="d-block"
                                    label="Fecha de Matrícula:"/>
                            </div>

                            <div class="col-12 col-md-6 q-px-md print-col-6">
                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.color" 
                                    class="d-block"
                                    label="Color:"/>

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.type_fuel" 
                                    class="d-block"
                                    label="Tipo de combustible:"/>

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.chasis_number" 
                                    class="d-block"
                                    label="N°Vin:"/>

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.chasis_number" 
                                    class="d-block"
                                    label="N° de Chasis:"/>

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.engine_number" 
                                    class="d-block"
                                    label="N° de Motor:"/>

                                <q-input-validation :isDisable="isUpdate"
                                    :model="$v.data.attributes.displacement" 
                                    class="d-block"
                                    label="Cilindraje:"/>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 print-col-12 q-px-md q-border" v-if="!isMotocicleta()">
                                <div class="row">
                                    <div class="col-12">
                                        <span class="font-weight-bold q-mr-sm">Tipico de Vehículo:</span>
                                        <span class="badge badge-light">{{ data.type_vehicle }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Vehículo de Enseñanza -->
                            <div class="col-12 print-col-12 q-px-md q-border">
                                <span class="font-weight-bold q-mr-sm">Vehículo de Enseñanza:</span>
								<span class="badge badge-light">{{ data.teaching_vehicle ? 'SI' : 'NO' }}</span>
                            </div>

                            <!-- Gobernador & Taximetro -->
                            <div class="col-12 print-col-12 q-px-md q-border" v-if="!isMotocicleta() && data.type_vehicle != 'MOTOCICLETA'">
                            	<div class="row">
                            		<div class="col print-col-6">
                            			<span class="font-weight-bold q-mr-sm">Gobernador</span>	
                            			<span class="badge badge-light">{{ data.governor ? 'SI' : 'NO' }}</span>
                            		</div>
                            		<div class="col print-col-6">
                            			<span class="font-weight-bold q-mr-sm">Taxímetro</span>	
                            			<span class="badge badge-light">{{ data.taximeter ? 'SI' : 'NO' }}</span>
                            		</div>
                            	</div>
                            </div>
								
							<!-- vehicle_gas -->
                            <div class="col-12 print-col-12 q-px-md q-border" :class="{ 'print-none': !is_vehicle_gas }" v-if="!isMotocicleta() && data.type_vehicle != 'MOTOCICLETA'">
                                <div class="row" v-if="is_vehicle_gas">
                                    <div class="col-12 col-sm-6 col-lg-4 print-col-4 q-my-md">
                                		<span class="font-weight-bold q-mr-sm">Certiﬁcado de Gas N°: </span>
                                		<span class="badge badge-light">{{ data.gas_certificate }}</span>
                                	</div>
                                    <div class="col-12 col-sm-6 col-lg-4 print-col-4 q-my-md">
                                		<span class="font-weight-bold q-mr-sm">Certiﬁcador: </span>
                                		<span class="badge badge-light">{{ data.gas_certifier }}</span>
                                    </div>
                                    <div class="col-12 col-sm-6 col-lg-4 print-col-4 q-my-md">
                                		<span class="font-weight-bold q-mr-sm">Fecha de Vencimiento: </span>
                                		<span class="badge badge-light">{{ data.gas_certificate_expiration }}</span>
                                    </div>
                                </div>
                                <div class="row" v-else :class="{ 'print-none': is_vehicle_gas }">
                                	<div class="col-12">
                                    	<span class="font-weight-bold">Vehículo a Gas:</span> 
                                    	NO
                                	</div>
                                </div>
                            </div>
                            
                            <!-- kilometraje & diametro -->
                            <div class="col-12 print-col-12 q-px-md q-border" v-if="!isMotocicleta() && data.type_vehicle != 'MOTOCICLETA'">
                                <div class="row">
                                    <div class="col-12 col-sm-6 print-col-6">
                                        <div class="row">
                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm q-mb-md"># Cilindros Motor:</span>
                                                <span class="badge badge-light">{{ data.engine_cylinders ? data.engine_cylinders : 0 }}</span>
                                            </div>
                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm q-mb-sm"> Kilometraje: </span>
                                                <span class="badge badge-light">{{ data.mileage }}</span>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div class="col-12 col-sm-6 print-col-6">
                                        <div class="row">                              
                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm">Vidrios Polarizados:</span>
                                                <span class="badge badge-light">{{ data.polarized_glasses ? 'SI' : 'NO' }}</span>
                                            </div>
                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm">Vehículo Blindado:</span>
                                                <span class="badge badge-light">{{ data.armored_vehicle ? 'SI' : 'NO' }}</span>
                                            </div>
                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm">Motor Modiﬁcado:</span>
                                                <span class="badge badge-light">{{ data.modified_engine ? 'SI' : 'NO' }}</span>
                                            </div>
                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm">Llanta de repuesto:</span>
                                                <span class="badge badge-light">{{ data.spare_tires ? data.spare_tires: 0 }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- kilometraje & diametro -->
                            <div class="col-12 q-border" v-else>
                                <div class="row">
                                    <div class="col-12 col-md-6 q-px-md">
                                        <span class="font-weight-bold"> Kilometraje:</span>
                                        <span class="badge badge-light">{{ data.mileage }}</span>
                                    </div>
                                    <div class="col-12 col-md-6 q-px-md">
                                        <span class="font-weight-bold">Diametro Exhosto:</span>
                                        <span class="badge badge-light">{{ data.exhosto_diameter }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Pre-Inspección -->
                            <div class="col-12 q-px-md q-border" :class="{'print-none':data.pre_inspections.length > 0}">
                            	<div class="row">                        		
	                                <div class="col-12 print-col-12 q-mb-md">
	                                    <span class="font-weight-bold">Pre-Inspección:</span>
	                                </div>
	                                <div class="col-12 col-sm-6 print-col-6 q-my-md" v-for="(pre_inspection,item) in data.pre_inspections">
                                        <div v-if="pre_inspection.value"> 
	                                       <span class="d-inline-block font-weight-bold q-mr-lg">{{ pre_inspection.name }}</span>
	                                       <span class="badge badge-light">{{ pre_inspection.value | preInspection }}</span>
                                        </div>
	                                </div>
                            	</div>
                            </div>

                            <!-- Llantas -->
							<div class="col-12 q-px-md q-border">
							    <div class="row">
							      	<div class="col-12 col-sm-4 col-md-3 col-lg-2 q-mb-lg print-col-2">
							      		<span class="font-weight-bold">Llantas</span>
							      	</div>
							      	<div class="col-12 col-sm-8 col-md-9 col-lg-10 print-col-10">
								        <div class="row" v-for="(eje,item) in data.axes">
								          <div class="col print-none" style="max-width: 200px">
								            <p class="font-weight-bold q-my-md">Eje  {{ item + 1 }}</p>
								            <p class="font-weight-bold q-mr-lg q-mt-md q-mb-lg">Presión Inicial:</p>
								            <p class="font-weight-bold q-mr-lg q-my-md">Ajuste:</p>
								          </div>
								          <div class="col print-col-12 print-mx q-mx-sm" v-for="(llanta,key) in eje" style="max-width: 130px">
								            <div class="text-center d-block q-my-sm">
								            	<span v-if="!isMotocicleta()">{{ llanta.type|axes }}</span>
								            	<span v-else>&nbsp;</span>
								            </div>
            								<q-field>
            								  	<q-input :disable="true" v-model="llanta.pressure_init" class="bg-white q-py-sm q-my-sm"/>
            								</q-field>
            								<q-field>
            								  	<q-input :disable="true" v-model="llanta.adjustment" class="bg-white q-py-sm q-my-sm"/>
            								</q-field>
								          </div>
								          <hr class="col-12 q-mb-lg" v-if="data.axes - 1 > item">
								        </div>
							      	</div>
							    </div>
							</div>

                            <!-- Inventario -->
						    <div class="col-12 print-col-12 q-px-md q-border" v-if="data.items.length > 0">
						      	<p class="font-weight-bold q-my-lg">Inventario</p>
						      	<div class="row print-row">
							        <div class="col col-md-8 mx-auto">
							            <div class="row boder-botton">
							                <div class="col-12">
                                                <div class="row mb-2">
                                                    <div class="col-4 print-col-4 q-pl-sm font-weight-bold">
                                                        NOMBRE
                                                    </div>
                                                    <div class="col-4 print-col-4 q-pl-sm font-weight-bold text-center">
                                                        EVALUACIÓN
                                                    </div>
                                                    <div class="col-4 print-col-4 q-pl-sm font-weight-bold text-center">
                                                        CANTIDAD
                                                    </div>
                                                    <div class="col-12 print-col-12">
                                                        <hr>
                                                    </div>
                                                </div>
                                                <div class="row" v-for="(item,index) in data.items">
                                                    <div class="col-4 print-col-4 q-pl-sm font-weight-bold">
                                                        {{ item.name }}
                                                    </div>
                                                    <div class="col-4 print-col-4 text-center font-weight-bold">
                                                        {{ item.evaluation }}
                                                    </div>
                                                    <div class="col-4 print-col-4 text-center font-weight-bold">
                                                        {{ item.quantity }}
                                                    </div>
                                                    <div class="col-12 print-col-12">
                                                        <hr>
                                                    </div>
                                                </div>
							                </div>
							            </div>
							        </div>
						      	</div>
							</div>

                            <!-- CAROUSEL -->
                            <div class="col-12 print-col-12 q-px-md" v-if="data.gallery.length">
                                <p class="font-weight-bold q-px-md q-pt-md">Fotografías</p>
                                <carousel :perPage="3" :paginationEnabled="false" :autoplay="true" :navigationEnabled="true" :navigationNextLabel="nextLabel" :navigationPrevLabel="prevLabel" >
                                  <slide v-for="(img, index) in data.gallery" :key="index">
                                    <div class="q-px-md text-center">
                                      <img :src="img|asset" style="max-width: 100%;">
                                    </div>
                                  </slide>
                                </carousel>
                            </div>

                            <!-- opbservaciones -->
                            <div class="col-12 q-my-md" v-if="data.observations">
                                <q-input v-model="data.observations" 
                                	:disabled='true'
                                	type="textarea"
                                	float-label="Observaciones:"
                                	:max-height="10"
                                	rows="4"
                                	class="bg-white"/>
                            </div>

                            <div class="col-12 text-right print-none q-mt-sm">
                                <q-btn color="red" size="md" label="Print" class="q-px-lg q-mr-sm btn-app" @click="print"/>
                                <q-btn color="black" size="md" label="Guardar" class="q-px-lg btn-app" @click="submitData"/>
                            </div>
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page>
        <q-page v-show="showsignature">
            <div class="layout-padding q-py-lg">
                <div class="row print-row q-my-lg">
                    <hr class="col-12 q-my-lg">
                    <div class="col-12 col-md-6">
                      <div class="row">
                        <div class="col-6">
                          <p class="font-weight-bold">
                            <i class="material-icons color-danger q-mr-xs" v-show="$v.data.vehicle_prepared.$error"> error_outline </i>
                            <span :class="{'color-danger': $v.data.vehicle_prepared.$error}">Vehículo preparado para la inspección:</span>
                          </p>
                        </div>
                        <div class="col-6">
                            <div class="d-inline-block">
                              <q-radio v-model="data.vehicle_prepared" :val="true" label="Si" class="q-mr-lg"/>
                              <q-radio v-model="data.vehicle_prepared" :val="false" label="No" class="q-mr-lg"/>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="row">
                        <div class="col-6">
                          <p class="font-weight-bold">Visto bueno director <br>técnico</p>
                        </div>
                        <div class="col-6">
                            <div class="d-inline-block">
                              <q-radio v-model="data.seen_technical_director" :val="true" label="Si" class="q-mr-lg"/>
                              <q-radio v-model="data.seen_technical_director" :val="false" label="No" class="q-mr-lg"/>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 q-mb-lg">
                        <VueSignaturePad
                            v-if="showsignature && is_vehicle_delivery_signature"
                            width="100%"
                            height="200px"
                            ref="signatureEntrega"
                            class="border-bottom signatured"
                            :disable="!is_vehicle_delivery_signature"
                            :options="{ onEnd }"
                            :class="{'border-danger':$v.data.vehicle_delivery_signature.$error}"/>
                        <img v-else :src="data.vehicle_delivery_signature|asset" 
                            style="border: 2px solid #0c0c0c;border-radius: 8px;"
                            width="100%" 
                            height="200px">

                        <p class="font-weight-bold" :class="{'color-danger':$v.data.vehicle_delivery_signature.$error}">
                            <i class="material-icons color-danger q-mr-xs" v-show="$v.data.vehicle_delivery_signature.$error"> error_outline </i>
                            Acepto y estoy conforme con el inventario realizado a mí Motocicleta y he leído, entiendo y acepto todas las bservaciones hechas, politicas de inspección, tratamiento de información y conﬁdencialidad.
                        </p>
                    </div>
                    <div class="col-12 q-mb-lg">
                        <VueSignaturePad 
                            v-if="showsignature && is_signature_received_report"
                            width="100%"
                            height="200px"
                            ref="signatureRecibido"
                            class="border-bottom signatured"
                            :options="{ onEnd }"
                            :class="{'border-danger':$v.data.signature_received_report.$error}"/>

                        <img v-else :src="data.signature_received_report|asset"
                            style="border: 2px solid #0c0c0c;border-radius: 8px;"
                            width="100%" 
                            height="200px">

                        <p class="font-weight-bold" :class="{'color-danger':$v.data.signature_received_report.$error}">
                            <i class="material-icons color-danger q-mr-xs" v-show="$v.data.signature_received_report.$error"> error_outline </i>
                            Acepto y estoy conforme con el inventario realizado a mí Motocicleta y he leído, entiendo y acepto todas las bservaciones hechas, politicas de inspección, tratamiento de información y conﬁdencialidad.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-right q-my-md">
                        <q-btn color="black" size="md" label="Guardar" class="q-px-lg btn-app" @click="submitSave"/>
                    </div>
                </div>
            </div>
        </q-page>
    </div>
</template>

<script>
    import { required, email, minLength, sameAs, requiredIf, requiredUnless} from 'vuelidate/lib/validators';
    import qInputValidation from '../../../components/q-input-validation';
    import qGallery from '../../../components/q-gallery';
    import resources from 'src/services/resources';
    import VueSignaturePad from 'vue-signature-pad';
    import config from 'src/config/index'
    import { Carousel, Slide } from 'vue-carousel'
	import { Printd } from 'printd'

    export default {
        name: 'PageData',
        components: { qInputValidation, qGallery, VueSignaturePad, Carousel, Slide },
        data () {
            return {
                show: false,
                showData: false,
                aceptContract: false,
                showsignature: false,
                is_vehicle_delivery_signature: true,
                is_signature_received_report: true,
                is_vehicle_gas: false,
                data: {
                    pre_inspections: [],
                    vehicles_id: null,
                    inspections_types_id: null,
                    teaching_vehicle: false,
                    mileage: 150,
                    exhosto_diameter: null,
                    engine_cylinders: null,
                    axes: [],
                    gallery: [],
                    items: [],
                    attributes: null,
                    gas_certificate: null,
                    gas_certifier: null,
                    gas_certificate_expiration: null,
                    governor: false,
                    taximeter: false,
                    polarized_glasses: false,
                    armored_vehicle: false,
                    modified_engine: false,
                    spare_tires: null,
                    observations: null,
                    vehicle_prepared: null,
                    seen_technical_director: null,
                    vehicle_delivery_signature: null,
                    signature_received_report: null,
                    type_vehicle: null,
                    user_id: null
                },
                selectInspection: [],
                inspection_statues: {
                	status: null,
                	options: [],
                	change: false
                },
                changeAtributtes: false,
                changeInspection: false,
                isUpdate: true,
                nextLabel: "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
                prevLabel: "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
			    cssText: `
                .q-icon,
                button,
                .print-none,
                .q-if-label-spacer,
                .q-input-target.q-input-area,
                .q-if-baseline {  display: none }
                textarea,
                img { width: 25%; display: inline-block; }
                .print-row { width: 100%; display: block; padding-top: 5px; padding-bottom: 5px}
                .q-input-validation { padding-bottom: 5px; padding-top: 5px}
                .q-input-validation > .d-inline-block { float: left; width: 100% }
                .q-input-validation .d-inline-block span { display: inline-block; float: left; width: 50% !important  }
                .q-input-validation .d-inline-block div { float: left; width: 50%  !important  }
                textarea,
                input { bordr: none !important; background: white !important; box-shadow: none !important }
                .print-col-2  { padding-bottom: 10px; float: left; width: 16.6667% !important }
                .print-col-3  { padding-bottom: 10px; float: left; width: 25% !important }
                .print-col-4  { padding-bottom: 10px; float: left; width: 33.33333% !important }
                .print-col-6  { padding-bottom: 10px; float: left; width: 50% !important }
                .print-col-10 { padding-bottom: 10px; float: left; width: 83.3333% !important }
                .print-col-12 { padding-bottom: 10px; float: left; width: 100% !important }
                .print-center { padding-bottom: 10px; text-align: center}
                .print-mx { padding: 5px}
			    `
            }
        },
        created() {
            this.selectInspection = this.$store.getters['data/GET_TYPES_INSPECTIONS']
            this.inspection_statues.options = this.$store.getters['data/GET_TYPES_INSPECTIONS_STATUES']
            this.getInspection()
        },
        mounted() {},
        watch: {
        	'inspection_statues.status': {
     			handler(newValue, oldValue) {
     				if(oldValue != null) {
        				this.inspection_statues.change = true
                    }
     			},
     			deep: true
        	},
        	'data.attributes' : {
     			handler(newValue, oldValue) {
     				if(oldValue != null)
     					this.changeAtributtes = true
     			},
     			deep: true
        	},
            'data.inspections_types_id' : {
                handler(newValue, oldValue) {
                    if(oldValue != null)
                        this.changeInspection = true
                },
                deep: true 
            }
        },
        filters: {
        	axes: function (axe) {
        	  return axe == 'R' ? 'D' : 'I'
        	},
            validity: function (value) {
                return value? 'VIGENTE' : 'NO VIGENTE'
            },
            preInspection: function(value) {
                if (typeof value === 'boolean')
                    return value ? 'SI' : 'NO'
                else
                    return value
            },
            asset: function(img_url) {
            	return resources.asset(img_url)
            }
        },
        validations: {
            formSearch: {
                plaque: { required, minLength: minLength(6)  }
            },
            data: {
                teaching_vehicle: { required },
                gas_certificate: { required : requiredIf(function(model) {
                    return this.is_vehicle_gas
                })},
                gas_certifier: { required : requiredIf(function(model) {
                    return this.is_vehicle_gas
                })},
                gas_certificate_expiration: { required : requiredIf(function(model) {
                    return this.is_vehicle_gas
                })},
                signature_received_report: { required : requiredIf(function(model) {
                    return this.showsignature && this.data.seen_technical_director
                })},
                vehicle_delivery_signature: { required : requiredIf(function(model) {
                    return this.showsignature 
                })},
                vehicle_prepared : { required : requiredIf(function (model) {
                    return this.showsignature
                })},
                attributes: {
                    service_type 	: { required, minLength: minLength(3) },
                    type_vehicle 	: { required },
                    brand        	: { required },
                    line         	: { required },
                    model        	: { required },
                    color           : { required },
                    type_fuel       : { required },
                    transit_license : { required },
                    enrollment_date : { required },
                    chasis_number   : { required },
                    engine_number   : { required },
                    displacement    : { required },
                }
            },
        },
        methods: {
    		print() {
        		const d = new Printd()
    			const { contentWindow } = d.getIFrame()
        		d.print( this.$el,[ this.cssText ] )
    		  // this.d.print( this.$el, [this.cssText])
    		},
            submitData () {
                this.$v.data.$touch()
                this.$q.loading.show()
                if (this.$v.data.$error) {
                    this.$q.loading.hide()
                    this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                    return
                } else {
                    if(this.is_signature_received_report) {
                    	this.showData = false
                        this.showsignature = true
                    	this.$q.loading.hide()
                    } else {
            			this.submitSave()
                    }
                }
            },
            submitSave() {
                this.$v.data.$touch()
                this.$q.loading.show()
                if (this.$v.data.$error) {
                    this.$q.loading.hide()
                    this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                    return
                } else {
					Promise.all([this.updateInspections(), this.inspectionHistory(), this.updateVehicle()])
					.then((res) => {
					    console.log('Promise.all', res);
	                	this.$router.push({ name: 'inspections' })
					})
					.catch((err) => {
                    	this.$q.loading.hide()
					    console.error('Promise.all error', err); 
					});
	            }
            },
            getInspection() {
                resources.getInspection(this.$route.params.inspection)
                .then(response => {
                    let data = response.data.data
                    this.$store.commit('orden/SET_ORDEN',{
                        timeEntry: data.created_at_time,
                        dateEntry: data.created_at_date,
                        id:  data.id
                    })
                    this.data.id                            = this.$route.params.inspection
					for (var item in this.inspection_statues.options) {
	    				if ( this.inspection_statues.options[item].label == data.inspection_status ) {
							this.inspection_statues.status = this.inspection_statues.options[item].value
	    				}
					}
                    this.data.pre_inspections               = data.pre_inspections
                    this.data.vehicles_id                   = data.vehicles_id
                    this.data.inspections_types_id          = data.inspection_type.id
                    this.data.teaching_vehicle              = data.teaching_vehicle  ? true : false
                    this.data.mileage                       = data.mileage
                    this.data.exhosto_diameter              = data.exhosto_diameter
                    this.data.engine_cylinders              = data.engine_cylinders
                    this.data.axes                          = data.axes
                    this.data.gallery                       = data.gallery ? data.gallery : []
                    this.data.items                         = data.items_inventory
                    this.data.governor                      = data.governor  == '1' ? true : false
                    this.data.taximeter                     = data.taximeter == '1' ? true : false
                    this.data.polarized_glasses             = data.polarized_glasses == '1' ? true : false
                    this.data.armored_vehicle               = data.armored_vehicle   == '1' ? true : false
                    this.data.modified_engine               = data.modified_engine   == '1' ? true : false
                    this.data.attributes                    = data.vehicle
                    this.data.gas_certificate               = data.gas_certificate
                    this.data.gas_certifier                 = data.gas_certifier
                    this.data.gas_certificate_expiration    = data.gas_certificate_expiration
                    	this.is_vehicle_gas                     = this.data.gas_certificate ? true : false
                    this.data.spare_tires                   = data.spare_tires
                    this.data.observations                  = data.observations
                    this.data.vehicle_prepared              = data.vehicle_prepared == '1' ?  true : false
                    this.data.seen_technical_director       = data.seen_technical_director == '1' ?  true : false
                    this.data.vehicle_delivery_signature    = data.vehicle_delivery_signature
                    	this.is_vehicle_delivery_signature      = this.data.vehicle_delivery_signature ? false : true
                    this.data.signature_received_report     = data.signature_received_report
                    	this.is_signature_received_report       = this.data.signature_received_report  ? false : true
                    this.data.type_vehicle                  = data.type_vehicle
					this.inspection_statues.change 			= false
     				this.changeAtributtes					= false
                    this.data.user_id                       = data.vehicle.user.id
                    this.$q.loading.hide()
                    this.showData = true
                }).catch(error => {
                    this.$q.notify(
                            {message: 'Los iento, la inspeccion no se encuentra en nuestra data.',
                            position: 'top-right',
                            closeBtn: true
                        })
                })
                .then(() => {
                    this.$q.loading.hide()
                });
            },
            isMotocicleta() {
                return this.data.attributes.type_vehicle == 'MOTOCICLETA';
            },
            onEnd() {
                if ( this.is_signature_received_report) {
                    var { isEmpty, data } = this.$refs.signatureRecibido.saveSignature();
                    if(!isEmpty) {
                        this.data.signature_received_report = data
                    }
                }
            },
            updateInspections() {
                var jsonData = {};
                jsonData['id'] = this.data.id
            	if (this.is_signature_received_report) {
                	jsonData['signature_received_report'] 	= this.data.signature_received_report
                	jsonData['seen_technical_director'] 	= this.data.seen_technical_director
                    jsonData['inspections_types_id']        = this.data.inspections_types_id
                    return resources.updateInspections(jsonData)
            	}else {
                    if(this.changeInspection) {
                        jsonData['inspections_types_id']    = this.data.inspections_types_id
                        return resources.updateInspections(jsonData)
                    }
            		return false
                }
            },
            inspectionHistory() {
                if (this.inspection_statues.change) {
                    this.$store.commit('inspections/RESET_INSPECTIONS_LIST')
					return resources.inspectionHistory(this.data.id, this.inspection_statues.status)
                }else
                	return false
            },
            updateVehicle() {
            	if (this.changeAtributtes) {
            		return resources.updateVehicle(this.data.attributes)
            	}else
            		return false
            }
        }
    }
</script>
