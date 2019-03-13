<template>
    <div>
        <q-page >
            <div class="row q-border">
                <div class="col-12 col-sm-10 col-md-6 mx-auto q-px-md">
                    <span class="w-50 d-inline-block font-weight-bold">
                        TIPO DE INSPECCIÓN:
                    </span>
                    <div class="w-50 d-inline-block">
                        <q-select v-model="data.inspections_types_id" :options="selectInspection" class="bg-white q-py-sm q-my-md"/>
                    </div>
                </div>
            </div>
            <div class="row q-my-lg">
                <div class="col-12 col-sm-10 col-md-4 mx-auto q-px-md">
                    <div class="row">
                        <div class="col-12 text-center font-weight-bold">
                            <p>Datos de la Motocicleta</p>
                        </div>
                        <div class="col-12">
                            <q-field :error="$v.formSearch.plaque.$error">
                                <q-search v-model="formSearch.plaque" class="bg-white q-mt-sm" type="text" maxlength="6" minlength="6" placeholder="Placa" v-on:keyup.enter="searchPlaque"/>
                            </q-field>
                            <q-tooltip>
                                <p class="error-message mb-0" v-if="!$v.formSearch.plaque.required">
                                    <i class="material-icons">error_outline</i> El campo es obligatorio.
                                </p>
                                <p class="error-message mb-0" v-if="!$v.formSearch.plaque.minLength">
                                    <i class="material-icons">error_outline</i> Debe contener al menos 6 caracteres.
                                </p>
                            </q-tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <q-page v-if="showData">
                <div v-if="data.attributes" class="q-my-lg q-pt-lg">
                    <!-- SOAP -->
                    <div class="container-fluid bg-gray-10">
                        <div class="row align-items-center">
                            <div class="col-12 col-md-3 px-2 py-3 bg-primary text-right">
                                <span class="h2 font-weight-bold my-3 d-block">SOAT</span>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center">
                                <p class="font-weight-bold font-famili"><b>Fecha de Expedición</b></p>
                                <p class="mb-0">{{ data.attributes.insurance_expiration }}</p>
                            </div>
                            <div class="col-4 col-md-3 mx-auto py-3 text-center">
                                <p class="font-weight-bold font-famili"><b>Fecha Inicio De Vigencia</b></p>
                                <p class="mb-0">{{ data.attributes.insurance_expedition }}</p>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center">
                                <p class="font-weight-bold font-famili"><b>Fecha Fin De Vigencia</b></p>
                                <p class="mb-0">{{ data.attributes.insurance_expiration }}</p>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center">
                                <p class="font-weight-bold font-famili"><b>Estado</b></p>
                                <p class="mb-0 text-uppercase" :class="{'text-green': data.attributes.gas_certificate, 'text-red': !data.attributes.gas_certificate}">
                                    <b>{{ data.attributes.gas_certificate|validity }}</b>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="layout-padding q-py-lg">
                        <!-- Atributos -->
                        <div class="row my-3 q-border">
                            <div class="col-12 col-md-6 q-px-md">

                                <q-input-validation :model="$v.data.attributes.serviceType" class="d-block" label="Tipo de Servicio:"/>

                                <q-input-validation :model="$v.data.attributes.typeVehicle" class="d-block" label="Clase de Vehículo:"/>

                                <q-input-validation :model="$v.data.attributes.brand" class="d-block" label="Marca:"/>

                                <q-input-validation :model="$v.data.attributes.line" class="d-block" label="Línea:"/>

                                <q-input-validation :model="$v.data.attributes.transitLicense" class="d-block" label="N° Licencia de Tránsito:"/>

                                <q-input-validation :model="$v.data.attributes.enrollmentDate" class="d-block" label="Fecha de Matrícula:"/>
                            </div>

                            <div class="col-12 col-md-6 q-px-md">
                                <q-input-validation :model="$v.data.attributes.color" class="d-block" label="Color:"/>

                                <q-input-validation :model="$v.data.attributes.typeFuel" class="d-block" label="Tipo de combustible:"/>

                                <q-input-validation :model="$v.data.attributes.chasisNumber" class="d-block" label="N°Vin:"/>

                                <q-input-validation :model="$v.data.attributes.chasisNumber" class="d-block" label="N° de Chasis:"/>

                                <q-input-validation :model="$v.data.attributes.engineNumber" class="d-block" label="N° de Motor:"/>

                                <q-input-validation :model="$v.data.attributes.displacement" class="d-block" label="Cilindraje:"/>
                            </div>
                        </div>

                        <div class="row q-my-md">
                            <!-- Vehículo de Enseñanza -->
                            <div class="col-12 q-px-md q-border">
                                <span class="d-inline-block q-mr-lg font-weight-bold">Vehículo de Enseñanza:</span> 
                                <div class="d-inline-block">
                                    <q-radio v-model="data.teaching_vehicle" val="1" label="Si" class="q-mr-lg"/>
                                    <q-radio v-model="data.teaching_vehicle" val="0" label="No" class="q-mr-lg"/>
                                </div>
                            </div>

                            <!-- Gobernador & Taximetro -->
                            <div class="col-12 q-px-md q-border" v-if="!isMotocicleta()">
                                <q-checkbox v-model="data.governor" label="Gobernador" :left-label="true" class="q-mr-lg"/>
                                <q-checkbox v-model="data.taximeter" label="Taxímetro" :left-label="true" class="q-mr-lg"/>
                            </div>

                            <div class="col-12 q-border" v-if="!isMotocicleta()">
                                <div class="row">
                                    <div class="col-12 q-px-md ">
                                        <span class="d-inline-block q-mr-lg font-weight-bold">Vehículo a Gas:</span> 
                                        <div class="d-inline-block">
                                            <q-radio v-model="data.vehicle_gas" val="1" label="Si" class="q-mr-lg"/>
                                            <q-radio v-model="data.vehicle_gas" val="0" label="No" class="q-mr-lg"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-if="data.vehicle_gas == 1">
                                    <div class="col-12 col-sm-6 q-my-md q-px-sm">
                                        <q-input v-model="data.gas_certificate" class="bg-white" placeholder="Certiﬁcado de Gas N°"/>
                                    </div>
                                    <div class="col-12 col-sm-6 q-my-md q-px-sm">
                                        <q-input v-model="data.gas_certifier" class="bg-white" placeholder="Certiﬁcador"/>
                                    </div>
                                    <div class="col-12 col-sm-6 q-my-md q-px-sm">
                                        <q-input v-model="data.gas_certificate_expiration" class="bg-white" placeholder="Fecha de Vencimiento"/>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- kilometraje & diametro -->
                            <div class="col-12 q-border" v-if="!isMotocicleta()">
                                <div class="row">
                                    <div class="col-12 col-sm-6">
                                        <div class="row">
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field>
                                                    <span class="font-weight-bold q-mb-md d-block"># Cilindros Motor:</span>
                                                    <q-input v-model="data.engine_cylinders" type="number" min="0" placeholder="# Cilindros Motor" class="bg-white q-my-sm"/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field >
                                                    <span class="font-weight-bold q-mb-md d-block">Kilometraje:</span>
                                                    <q-input v-model="data.mileage" type="number" min="0" placeholder="Kilometraje" class="bg-white q-my-sm" />
                                                </q-field>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div class="col-12 col-sm-6">
                                        <div class="row">                                        
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field label="Vidrios Polarizados">
                                                    <q-checkbox v-model="data.polarized_glasses" :left-label="true" class="q-mr-lg"/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field label="Vehículo Blindado">
                                                    <q-checkbox v-model="data.armored_vehicle" :left-label="true" class="q-mr-lg"/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field  label="Motor Modiﬁcado" >
                                                    <q-checkbox v-model="data.modified_engine" :left-label="true" class="q-mr-lg"/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field label="Llanta de repuesto:">
                                                    <q-input v-model="data.spare_tires" type="number" min="0" class="bg-white"  style="max-width: 47px"/>
                                                </q-field>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- kilometraje & diametro -->
                            <div class="col-12 q-border" v-else>
                                <div class="row">
                                    <div class="col-12 col-md-6 q-px-md">
                                        <q-field>
                                            <span class="font-weight-bold q-mb-md d-block">Kilometraje:</span>
                                            <q-input v-model="data.mileage" type="number" min="0" placeholder="Kilometraje" class="bg-white"/>
                                        </q-field>
                                    </div>
                                    <div class="col-12 col-md-6 q-px-md">
                                        <q-field>
                                            <label class="font-weight-bold q-mb-md d-block">Diametro Exhosto:</label>
                                            <q-input v-model="data.exhosto_diameter" type="number" min="0" placeholder="Diametro Exhosto" class="bg-white"/>
                                        </q-field>
                                    </div>
                                </div>
                            </div>
                            <!-- /kilometraje & diametro-->

                            <!-- Pre-Inspección -->
                            <div class="col-12 row q-border">
                                <div class="col-12 q-px-md q-mb-md text-center">
                                    <span class="font-weight-bold">Pre-Inspección</span>
                                </div>
                                <div class="col-12 col-sm-6 q-my-md q-px-md" v-for="(pre_inspection,item) in pre_inspections">
                                    <span class="d-inline-block font-weight-bold q-mr-lg">{{ pre_inspection.name }}</span>
                                    <div class="d-inline-block">
                                        <q-radio v-model="pre_inspection.value" val="1" label="Si" class="q-mr-lg"/>
                                        <q-radio v-model="pre_inspection.value" val="0" label="No" class="q-mr-lg"/>
                                    </div>
                                </div>
                            </div>
                            <!-- /Pre-Inspección -->

                            <!-- Llantas -->
                            <q-axes :axes="data.axes" :type="isMotocicleta()" class="col-12 q-px-md q-border"/>
                            <!-- /Llantas -->

                            <!-- Inventario -->
                            <q-inventary :inventory="data.inventory" class="col-12 q-px-md q-border text-center"/>

                            <!-- CAROUSEL -->
                            <q-gallery :gallery="data.gallery" :code="data.code" class="col-12 q-px-md q-border"/>

                            <!-- opbservaciones -->
                            <div class="col-12 q-my-md">
                                <q-input v-model="data.observations" type="textarea" float-label="Observaciones:" :max-height="10" rows="4" class="bg-white"/>
                            </div>

                            <div class="col-12 text-right">
                                <q-btn color="black" size="md" label="Guardar" class="q-px-lg btn-app" @click="submit"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layout-padding" v-else>
                    <q-alert color="red" icon="error" appear class="q-mb-sm">
                        LA PLACA INGRESADA NO PERTENECE A UN VEHÍCULO
                    </q-alert>
                </div>
            </q-page>
        </q-page>
    </div>

</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import qInputValidation from '../../components/q-input-validation';
import qAxes from '../../components/q-axes';
import qInventary from '../../components/q-inventary';
import qGallery from '../../components/q-gallery';
import resources from 'src/services/resources';

export default {
    name: 'PageData',
    components: { qInputValidation, qGallery, qInventary, qAxes},
    data () {
        return {
            showData: false,
            pre_inspections: [],
            selectInspection: [],
            data: {
                vehicles_id: null,
                inspections_types_id: null,
                teaching_vehicle: null,
                mileage: null,
                exhosto_diameter: null,
                engine_cylinders: null,
                axes: [],
                gallery: [],
                inventory: [],
                attributes: null,
                vehicle_gas: null,
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
                code: Math.round(Math.random()*1000000),
            },
            formSearch : {
                plaque: 'AAA00A'
            },
        }
    },
    created() {
        this.$q.loading.show()
        resources.inspectionsTypes()
        .then(response =>{
            this.selectInspection = response.data.map(e => {
                this.data.inspections_types_id = e.id;
                return {
                    label: e.name,
                    value: e.id
                }
            })
            this.$q.loading.hide()
        })

        resources.preInspections()
        .then(response => {
            this.pre_inspections = response.data.map(e => {
                return {
                    name: e.name,
                    pre_inspection_id: e.id,
                    value: null
                }
            })
        })

        resources.inventory()
        .then(response => {
            this.data.inventory = response.data.map(e => {
                return {
                    name: e.name,
                    inventory_id: e.id,
                    evaluation: null,
                    quantity: null
                }
            })
        })
    },
    filters: {
        validity: function (value) {
            return value? 'VIGENTE' : 'NO VIGENTE'
        }
    },
    validations: {
        formSearch: {
            plaque: { required, minLength: minLength(6)  }
        },
        data: {
            attributes: {
                serviceType : { required, minLength: minLength(3) },
                typeVehicle : { required },
                brand        : { required },
                line         : { required },
                model        : { required },
                color           : { required },
                typeFuel       : { required },
                transitLicense : { required },
                enrollmentDate : { required },
                chasisNumber   : { required },
                engineNumber   : { required },
                displacement    : { required },
            }
        },
    },
    methods: {
        searchPlaque () {
            this.$v.formSearch.$touch()
            this.$q.loading.show()
            if (this.$v.formSearch.$error){
                this.$q.loading.hide()
            }
            else{
                resources.vehicle(this.formSearch.plaque)
                .then(response => {
                    this.data.vehicles_id = response.data.id
                    this.data.type_vehicle = response.data.typeVehicle
                    this.data.attributes = response.data
                    setTimeout(this.$q.loading.hide(),1000)
                    this.showData = true;
                })
            }
        },
        submit () {
            this.$q.loading.show()
            this.$v.data.$touch()
            if (this.$v.data.$error) {
                this.$q.loading.hide()
                this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                return
            }else {
                resources.setInspections(this.data)
                .then(response => {
                    setTimeout(this.$q.loading.hide(),1000)
                }).catch(error => {
                    setTimeout(this.$q.loading.hide(),1000)
                    this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
                    reject(error);
                });
            }
        },
        isMotocicleta() {
            return this.data.type_vehicle == 'MOTOCICLETA';
        },
    }
}
</script>
