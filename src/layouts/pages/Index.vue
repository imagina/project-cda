<template>
  <q-page>
    <div class="layout-padding q-py-lg">
        <div class="row">
            <div class="col-12 mx-auto">
                <div class="row">
                    <div class="col-12 col-md-5 mx-auto">
                        <span class="w-50 d-inline-block font-weight-bold">
                            TIPO DE INSPECCIÓN:
                        </span>
                        <div class="w-50 d-inline-block">
                            <q-select v-model="formSearch.type_inspection" :options="selectInspection" class="bg-white q-py-sm q-my-md"/>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <div class="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
                <div class="row q-pt-sm q-mb-md q-my-md">
                    <div class="col-12 text-center font-weight-bold">
                        <p>Datos de la Motocicleta</p>
                    </div>
                </div>
                <div class="d-block q-my-md">
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
    <div v-if="showData">
        <div v-if="data.attributes">
            <div class="container-fluid bg-gray-10 q-my-md">
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
                <div class="row my-3">
                    <div class="col-12 col-md-6">
                        <div class="d-block">
                            <div class="d-inline-block q-mb-md">
                                <span class="q-mr-sm d-inline-block">Tipo de servicio: </span> 
                                <div class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.service_type.$invalid">
                                        <q-input v-model="data.attributes.service_type" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.service_type.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </div>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">Clase de Vehículo: </span> 
                                <div class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.type_vehicle.$invalid">
                                        <q-input v-model="data.attributes.type_vehicle" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.type_vehicle.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </div>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">Marca: </span> 
                                <div class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.brand.$invalid">
                                        <q-input v-model="data.attributes.brand" maxlength="45" minlength="3" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.brand.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </div>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">Línea: </span> 
                                <div class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.line.$invalid">
                                        <q-input v-model="data.attributes.line" maxlength="45" minlength="3" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.line.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </div>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">Modelo: </span>
                                <span class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.model.$invalid">
                                        <q-input v-model="data.attributes.model" maxlength="4" minlength="4" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.model.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </span>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">N° Licencia de Tránsito: : </span>
                                <span class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.transit_license.$invalid">
                                        <q-input v-model="data.attributes.transit_license" maxlength="60" minlength="3" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.transit_license.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </span>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">Fecha de Matrícula: : </span>
                                <span class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.enrollment_date.$invalid">
                                        <q-input v-model="data.attributes.enrollment_date" maxlength="60" minlength="3" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.enrollment_date.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">Color: </span>
                                <span class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.color.$invalid">
                                        <q-input v-model="data.attributes.color" maxlength="45" minlength="3" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.color.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </span>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">Tipo de combustible: </span>
                                <span class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.type_fuel.$invalid">
                                        <q-input v-model="data.attributes.type_fuel" maxlength="60" minlength="3" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.type_fuel.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </span>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">N°Vin: </span>
                                <span class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.n_vin.$invalid">
                                        <q-input v-model="data.attributes.n_vin" maxlength="60" minlength="3" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.n_vin.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </span>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">M° de Chases: </span>
                                <span class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.chasis_number.$invalid">
                                        <q-input v-model="data.attributes.chasis_number" maxlength="45" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.chasis_number.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </span>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">N° de Motor: </span>
                                <div class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.engine_number.$invalid">
                                        <q-input v-model="data.attributes.engine_number" maxlength="30" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.engine_number.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </div>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="d-inline-block">
                                <span class="q-mr-sm">Cilindraje: </span>
                                <div class="d-inline-block font-weight-bold">
                                    <q-field :error="$v.data.attributes.displacement.$invalid">
                                        <q-input v-model="data.attributes.displacement" maxlength="30" type="text"/>
                                    </q-field>
                                    <q-tooltip>
                                        <p v-if="!$v.data.attributes.displacement.required">
                                            <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                        </p>
                                    </q-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Atributos -->
                <div class="row q-my-md">
                    <div class="col-12">
                        <hr class="my-4">
                        <span class="d-inline-block q-mr-lg font-weight-bold">Vehículo de Enseñanza:</span> 
                        <div class="d-inline-block">
                            <q-field :error="$v.data.teaching_vehicle.$invalid">
                                <q-radio v-model="data.teaching_vehicle" val="1" label="Si" class="q-mr-lg"/>
                                <q-radio v-model="data.teaching_vehicle" val="0" label="No" class="q-mr-lg"/>
                            </q-field>
                            <q-tooltip>
                                <p v-if="!$v.data.teaching_vehicle.required">
                                    <i class="material-icons"> error_outline </i> El campo es obligatorio.
                                </p>
                            </q-tooltip>
                        </div>
                        <hr class="col-12 my-4">
                    </div>

                    <!-- kilometraje & diametro -->
                    <div class="col-12 col-md-6">
                        <span class="font-weight-bold q-mb-md d-block">Kilometraje:</span>
                        <q-field :error="$v.data.mileage.$invalid">
                            <q-input v-model="data.mileage" type="number" min="0" placeholder="Kilometraje" class="bg-white"/>
                        </q-field>
                        <q-tooltip>
                            <p v-if="!$v.data.mileage.required">
                                <i class="material-icons"> error_outline </i> El campo es obligatorio.
                            </p>
                        </q-tooltip>
                    </div>
                    <div class="col-12 col-md-6">
                        <label class="font-weight-bold q-mb-md d-block">Diametro Exhosto:</label>
                        <q-field :error="$v.data.exhosto_diameter.$invalid">
                            <q-input v-model="data.exhosto_diameter" type="number" min="0" placeholder="Diametro Exhosto" class="bg-white"/>
                        </q-field>
                        <q-tooltip>
                            <p v-if="!$v.data.exhosto_diameter.required">
                                <i class="material-icons"> error_outline </i> El campo es obligatorio.
                            </p>
                        </q-tooltip>
                    </div>
                    <hr class="col-12 my-4">
                    <!-- /kilometraje & diametro-->

                    <!-- Pre-Inspección -->
                    <div class="col-12 text-center q-my-md">
                        <span class="font-weight-bold">Pre-Inspección</span>
                    </div>
                    <div class="col-12 q-mt-md" v-for="(pre_inspection,item) in data.pre_inspections">
                        <span class="d-inline-block font-weight-bold q-mr-lg">{{ pre_inspection.name }}</span>
                        <div class="d-inline-block">
                            <q-radio v-model="pre_inspection.value" val="1" label="Si" class="q-mr-lg"/>
                            <q-radio v-model="pre_inspection.value" val="0" label="No" class="q-mr-lg"/>
                        </div>
                    </div>
                    <!-- /Pre-Inspección -->

                    <!-- Llantas -->
                    <hr class="col-12 my-4">
                    <div class="col-12 q-my-md">
                        <div class="row">
                            <div class="col" style="max-width: 150px">
                                Llantas
                            </div>
                            <div class="col">
                                <div class="row" v-for="(eje,item) in data.axes">
                                    <div class="col" style="max-width: 200px">
                                        <p class="font-weight-bold">Eje  {{ item + 1 }}</p>
                                        <p class="font-weight-bold q-mr-lg">Presión Inicial:</p>
                                        <p class="font-weight-bold q-mr-lg">Ajuste:</p>
                                    </div>
                                    <div class="col">
                                        <q-input v-model="eje.pressure_init" type="text" class="bg-white q-py-sm q-my-md" style="max-width: 100px"/>
                                        <q-input v-model="eje.adjustment" type="text" class="bg-white q-py-sm q-my-md" style="max-width: 100px"/>
                                    </div>
                                    <hr class="col-12 q-mb-lg" v-if="data.axes.length - 1 > item">
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="col-12 my-4">
                    <!-- /Llantas -->

                    <!-- Inventario -->
                    <div class="col-12 q-my-lg text-center">
                        <p class="font-weight-bold q-my-lg">Inventario</p>
                        <div class="row">
                            <div class="col col-md-8 mx-auto">
                                <div class="row border">
                                    <div class="col q-py-md"></div>
                                    <div class="col q-py-md border-l font-weight-bold col-checkout">B</div>
                                    <div class="col q-py-md border-l font-weight-bold col-checkout">D</div>
                                    <div class="col q-py-md border-l font-weight-bold col-checkout">M</div>
                                    <div class="col q-py-md border-l font-weight-bold col-count"><span class="text-truncate">Cantidad</span></div>
                                </div>
                                <div class="row border border-t-0" v-for="item in data.inventory">
                                    <div class="col q-py-md font-weight-bold">{{ item.name }}</div>
                                    <div class="col q-py-sm border-l col-checkout text-center">
                                        <div class="q-mt-sm">
                                            <q-radio v-model="item.evaluation" val="B" class="q-mr-lg mx-auto"/>
                                        </div>
                                    </div>
                                    <div class="col q-py-sm border-l col-checkout">
                                        <div class="q-mt-sm">
                                            <q-radio v-model="item.evaluation" val="D" class="q-mr-lg mx-auto"/>
                                        </div>
                                    </div>
                                    <div class="col q-py-sm border-l col-checkout">
                                        <div class="q-mt-sm">
                                            <q-radio v-model="item.evaluation" val="M" class="q-mr-lg mx-auto"/>
                                        </div>
                                    </div>
                                    <div class="col q-py-sm border-l col-count">
                                        <q-input v-model="item.quantity" type="number" class="bg-white q-py-sm q-my-md" min="0"/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col q-mt-md text-left">
                                        <q-btn round color="primary" size="sm" @click="showAddInventary = true">
                                            <q-icon name="add"/>
                                        </q-btn>
                                        <span class="q-ml-sm font-weight-bold cursor-pointer" @click="showAddInventary = true"> Agregar Item</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /Inventario -->

                    <!-- CAROUSEL -->
                    <div class="col-12 q-my-lg">
                        <p class="font-weight-bold q-px-md">Fotografías</p>
                        <carousel :perPage="3" :paginationEnabled="false" :navigationEnabled="true" :navigationNextLabel="nextLabel" :navigationPrevLabel="prevLabel">
                            <slide v-for="img in data.gallery">
                                <div class="q-px-md">
                                    <img :src="img.file" style="max-width: 100%">
                                </div>
                            </slide>
                        </carousel>
                        <div class="d-block q-mt-md q-mb-lg text-right">
                            <q-btn color="primary" size="md" label="Agregar fotografía" class="q-mx-md q-px-xs text-dark" icon="add" @click="openedUploader = true"/>
                        </div>
                    </div>
                    <!-- /CAROUSEL -->

                    <!-- opbservaciones -->
                    <div class="col-12 q-my-md">
                        <q-input v-model="data.observations" type="textarea" float-label="Observaciones:" :max-height="10" rows="4" class="bg-white"/>
                    </div>
                    <!-- /opbservaciones -->

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
    </div>

    <q-modal v-model="openedUploader" :content-css="{minWidth: '80vw', padding: '25px'}">
        <h4 class="mx-auto">Añadir imagen</h4>
        <q-uploader url="" :auto-expand="true" @remove:cancel="removeUploader" :hide-upload-progress="false" :filter="filterFiles" :upload-factory="uploadFile" :multiple="true" class="q-my-lg" extensions=".jpg,.jpeg,.png" ref="uploader"/>
        <q-btn color="dark" @click="openedUploader = false" label="Cerrar" class="mt-2 q-mr-sm"/>
        <q-btn color="red" @click="addUploader" label="Añadir" class="mt-2 mr-2"/>
    </q-modal>

    <q-modal v-model="showAddInventary" :content-css="{minWidth: '80vw', padding: '25px'}">
        <h4 class="mx-auto">Nuevo elemento para el inventario</h4>
        <q-field :error="$v.addInventory.name.$error" class="q-my-md">
            <q-input v-model="addInventory.name" type="text" placeholder="Nombre" class="bg-white mx-auto"/>
            <div class="error-messages q-px-sm" v-if="$v.addInventory.name.$error">
                <p class="error-message mb-0" v-if="!$v.addInventory.name.required">
                    <i class="material-icons">error_outline</i> El campo es obligatorio.
                </p>
                <p class="error-message mb-0" v-if="!$v.addInventory.name.minLength">
                    <i class="material-icons">error_outline</i> Debe contener al menos 3 caracteres.
                </p>
            </div>
        </q-field>
        <q-btn color="dark" @click="showAddInventary = false" label="Cerrar" class="mt-2 q-mr-md"/>
        <q-btn color="primary" @click="addInventary" label="Aceptar" class="mt-2"/>
    </q-modal>

  </q-page>
</template>

<style>
    .q-if-error .q-if-inner {
        position: relative;
    }
    .q-if-error .q-if-inner::before {
        position: absolute;
        content: "!";
        top: 0;
        left: -20px;
        bottom: 0;
        margin: auto;
        width: 19px;
        border-radius: 50%;
        color: white;
        font-size: 17px;
        padding-left: 6.8px;
        height: 18px;
        line-height: 1.2;
        color: white;
        background-color: #f44336bd;
    }
    .q-tooltip {
        background: #f44336bd !important;
        font-size: .7rem;
        padding: 0px;
    }
    .q-tooltip p {
        margin-bottom: 0px;
        padding-left:  10px;
        padding-right: 10px;
    }
</style>
<script>

import { Carousel, Slide } from 'vue-carousel';
import { required, email, minLength } from 'vuelidate/lib/validators'
import resources from 'src/services/resources';

export default {
    name: 'PageData',
    components: { Carousel, Slide},
    data () {
        return {
            value: null,
            nextLabel: "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
            prevLabel: "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
            showData: false,
            showAddInventary: false,
            openedUploader: false,
            urlUploader: "URL",
            data: {
                teaching_vehicle: null,
                observations: null,
                mileage: null,
                exhosto_diameter: null,
                pre_inspections: [],
                axes: [],
                gallery: [],
                inventory: [],
                attributes: null,
            },
            formSearch : {
                type_inspection: null,
                plaque: null
            },
            addInventory : {
                name: null
            },
            selectInspection: [],
            elementInventary: {
                name: null,
                inventory_id: null,
                evaluation: null,
                quantity: null
            }
        }
    },
    created() {
        this.$q.loading.show()
        resources.inspectionsTypes()
        .then(response =>{
            this.selectInspection = response.data.map(e => {
                this.formSearch.type_inspection = e.id;
                return {
                    label: e.name,
                    value: e.id
                }
            })
            this.$q.loading.hide()
        })

        resources.preInspections()
        .then(response => {
            this.data.pre_inspections = response.data.map(e => {
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
            type_inspection: { required },
            plaque: { required, minLength: minLength(6)  }
        },
        data: {
            teaching_vehicle : { required },
            mileage : { required },
            exhosto_diameter : { required },
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
                n_vin           : { required },
                chasis_number   : { required },
                engine_number   : { required },
                displacement    : { required },
            }
        },
        addInventory: {
            name: { required, minLength: minLength(3) }
        }
    },
    methods: {
        addInventary () {
            this.$v.addInventory.$touch()
            this.$q.loading.show()
            if (this.$v.addInventory.$error) {
                this.$q.loading.hide()
                this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                return
            }else { 
                resources.addInventory(this.addInventory.name)
                    .then(response => {
                        this.elementInventary.name = response.data.name;
                        this.elementInventary.id = response.data.id
                        this.addInventory.name = null;
                        this.data.inventory.push(Object.assign({}, this.elementInventary))
                        this.$q.loading.hide()
                        this.showAddInventary = false;
                    })
            }
        },
        searchPlaque () {
            this.$v.formSearch.$touch()
            this.$q.loading.show()
            if (this.$v.formSearch.$error){
                this.$q.loading.hide()
            }
            else{
                resources.vehicle(this.formSearch.plaque)
                .then(response => {
                    for (var item in response.data.axes_number+1) {
                        this.data.axes.push({pressure_init: null, adjustment: null, type: null})
                    }
                    this.data.attributes = response.data
                    setTimeout(this.$q.loading.hide(),1500);
                    this.showData = true;
                })
            }
        },
        submit () {
            this.$v.data.$touch()
            if (this.$v.data.$error) {
                this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                return
            }
        },
        uploadFile (file, updateProgress) {
            const contentType = file.type
            const fileName = file.name
            const file64 = file.__img.src;
            this.data.gallery.push({file : file64, fileName: fileName, type: contentType})
            this.$refs.uploader.reset();
        },
        removeUploader(file) {
            const file64 = file.__img.src;
            this.data.gallery = this.data.gallery.filter(function(item) {
              return item.file !== file64
            })
        },
        addUploader() {
            this.$refs.uploader.upload()
            this.$refs.uploader.reset();
            this.openedUploader = false
        },
        filterFiles (files) {
          const MAX_FILE_SIZE = 3 * 1024 * 1024 /* =3M */
          return files.filter((file) => {
            if (file.size > MAX_FILE_SIZE) {
                this.$q.notify({message: 'El archivo debe ser menor o igual a 3M',  position: 'top-right', closeBtn: true})
            }
            return file.size <= MAX_FILE_SIZE
          })
        }
    }
}
</script>
