<template>
    <div>
        <q-page v-show="!showContract && !showsignature">
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
            <div class="row q-py-lg">
                <div class="col-12 col-sm-10 col-md-4 mx-auto q-px-md">
                    <div class="row">
                        <div class="col-12 text-center font-weight-bold">
                            <p>Datos de la Motocicleta</p>
                        </div>
                        <div class="col-12">
                            <q-field :error="$v.formSearch.plaque.$error">
                                <q-input v-model="formSearch.plaque" type="text" placeholder="Placa" class="bg-white q-mt-sm"
                                    v-on:keyup.enter="searchPlaque"
                                    :after="[
                                    {
                                        icon: 'search',
                                        handler() {
                                            searchPlaque()
                                        }
                                    }]"/>
                                <q-tooltip :error="$v.formSearch.plaque.$error">
                                    <p class="error-message mb-0" v-if="!$v.formSearch.plaque.required">
                                        <i class="material-icons">error_outline</i> El campo es obligatorio.
                                    </p>
                                    <p class="error-message mb-0" v-if="!$v.formSearch.plaque.minLength">
                                        <i class="material-icons">error_outline</i> Debe contener al menos 6 caracteres.
                                    </p>
                                </q-tooltip>
                            </q-field>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-show="notFound">
                <div class="col-12 col-sm-10 col-md-8 mx-auto q-px-md">
                    <q-alert color="red" icon="error" appear class="q-mb-sm">
                        LA PLACA INGRESADA NO FUE ENCONTRADA
                    </q-alert>
                </div>
            </div>
            <q-page v-show="showData">
                <div v-if="data.attributes != null" class="q-my-lg q-pt-lg">
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
                        <div class="row mt-3 q-border">
                            <div class="col-12 col-md-6 q-px-md">

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

                            <div class="col-12 col-md-6 q-px-md">
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
                            <div class="col-12 q-px-md q-border" v-if="!isMotocicleta()">
                                <div class="row">
                                    <div class="col-4 col-md-3 col-lg-2 q-mb-lg">
                                        <span class="font-weight-bold">Tipico de Vehículo:</span>
                                    </div>
                                    <div class="col-8 col-md-9 col-lg-10">
                                        <q-btn-group class="bg-white">
                                            <q-btn label="PESADO"
                                                @click="data.type_vehicle = 'PESADO'" 
                                                :class="{'bg-primary ' : data.type_vehicle == 'PESADO'}"/>

                                            <q-btn label="LIVIANO" 
                                                @click="data.type_vehicle = 'LIVIANO'" 
                                                :class="{'bg-primary ' : data.type_vehicle == 'LIVIANO'}"/>

                                            <q-btn label="MOTOCICLETA"
                                                @click="data.type_vehicle = 'MOTOCICLETA'" 
                                                :class="{'bg-primary ' : data.type_vehicle == 'MOTOCICLETA'}"/>

                                        </q-btn-group>
                                    </div>
                                </div>
                            </div>
                            <!-- Vehículo de Enseñanza -->
                            <div class="col-12 q-px-md q-border">
                                <q-field :error="$v.data.teaching_vehicle.$invalid" class="d-inline-block">
                                    <div class="d-inline-block label-invalid">
                                        <span class="q-mr-lg font-weight-bold">
                                            <i class="material-icons color-danger q-mr-xs" v-show="$v.data.teaching_vehicle.$error"> error_outline </i>
                                            <span :class="{'color-danger': $v.data.teaching_vehicle.$error}">Vehículo de Enseñanza:</span>
                                        </span> 
                                    </div>
                                    <div class="d-inline-block">
                                        <q-radio v-model="data.teaching_vehicle" :val="true" label="Si" class="q-mr-lg"/>
                                        <q-radio v-model="data.teaching_vehicle" :val="false" label="No" class="q-mr-lg"/>
                                    </div>
                                    <q-tooltip v-show="$v.data.teaching_vehicle.$error">
                                        <span v-show="!$v.data.teaching_vehicle.required">
                                            <i class="material-icons color-danger"> error_outline </i> El campo es obligatorio.
                                        </span>
                                    </q-tooltip>
                                </q-field>
                            </div>

                            <!-- Gobernador & Taximetro -->
                            <div class="col-12 q-px-md q-border" v-if="!isMotocicleta() && data.type_vehicle != 'MOTOCICLETA'">
                                <q-checkbox v-model="data.governor" label="Gobernador"
                                        :left-label="true"
                                        class="q-mr-lg"/>
                                <q-checkbox v-model="data.taximeter" label="Taxímetro"
                                        :left-label="true"
                                        class="q-mr-lg"/>
                            </div>

                            <div class="col-12 q-border" v-if="!isMotocicleta() && data.type_vehicle != 'MOTOCICLETA'">
                                <div class="row">
                                    <div class="col-12 q-px-md">
                                        <span class="d-inline-block q-mr-lg font-weight-bold">Vehículo a Gas:</span> 
                                        <div class="d-inline-block">
                                            <q-radio v-model="is_vehicle_gas" :val="true" label="Si" class="q-mr-lg"/>
                                            <q-radio v-model="is_vehicle_gas" :val="false" label="No" class="q-mr-lg"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-show="is_vehicle_gas">
                                    <div class="col-12 col-sm-6 q-my-md q-px-sm">
                                        <q-field :error="$v.data.gas_certificate.$error">
                                            <q-input v-model.trim="$v.data.gas_certificate.$model" class="bg-white" placeholder="Certiﬁcado de Gas N°"/>
                                        </q-field>
                                    </div>
                                    <div class="col-12 col-sm-6 q-my-md q-px-sm">
                                        <q-field :error="$v.data.gas_certifier.$error">
                                        <q-input v-model.trim="$v.data.gas_certifier.$model" class="bg-white" placeholder="Certiﬁcador"/>
                                        </q-field>
                                    </div>
                                    <div class="col-12 col-sm-6 q-my-md q-px-sm">
                                        <q-field :error="$v.data.gas_certificate_expiration.$error">
                                        <q-datetime v-model.trim="$v.data.gas_certificate_expiration.$model" type="date" class="bg-white" placeholder="Fecha de Vencimiento" format="YYYY-MM-DD"/>
                                        </q-field>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- kilometraje & diametro -->
                            <div class="col-12 q-border" v-if="!isMotocicleta() && data.type_vehicle != 'MOTOCICLETA'">
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
                                                <span class="font-weight-bold q-mb-sm d-block">
                                                    <i class="material-icons color-danger q-mr-xs" v-show="$v.data.mileage.$error"> error_outline </i>
                                                    <span :class="{'color-danger': $v.data.mileage.$error}">Kilometraje:</span>
                                                </span>
                                                <div>
                                                    <q-field :error="$v.data.mileage.$error" class="q-my-xs">
                                                        <q-input v-model="$v.data.mileage.$model" type="number" min="0" placeholder="Kilometraje" class="bg-white q-my-sm" />
                                                    </q-field>
                                                    <q-tooltip>
                                                        <span v-show="!$v.data.mileage.required"><i class="material-icons"> error_outline </i> El campo es obligatorio.</span>
                                                    </q-tooltip>
                                                </div>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div class="col-12 col-sm-6">
                                        <div class="row">                                        
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field>
                                                    <q-checkbox v-model="data.polarized_glasses"
                                                        :left-label="true"
                                                        label="Vidrios Polarizados: "/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field>
                                                    <q-checkbox v-model="data.armored_vehicle"
                                                        :left-label="true"
                                                        label="Vehículo Blindado: "/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field>
                                                    <q-checkbox v-model="data.modified_engine"
                                                        :left-label="true"
                                                        label="Motor Modiﬁcado: "/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field class="d-inline-block">
                                                    <span class="font-weight-bold q-mr-md q-mt-xs">Llanta de repuesto:</span>
                                                    <div class="d-inline-block">
                                                        <q-input v-model="data.spare_tires" type="number" class="bg-white" style="max-width: 47px"/>
                                                    </div>
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
                                        <q-field :error="$v.data.mileage.$error">
                                            <span class="font-weight-bold q-mb-md d-block" :class="{'color-danger': $v.data.mileage.$error}">
                                                <i class="material-icons color-danger q-mr-xs" v-show="$v.data.mileage.$error">
                                                    error_outline
                                                </i>
                                                Kilometraje:
                                            </span>
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
                                <div class="col-12 col-sm-6 q-my-md q-px-md" v-for="(pre_inspection,item) in data.pre_inspections">
                                    <span class="d-inline-block font-weight-bold q-mr-lg">{{ pre_inspection.name }}</span>
                                    <div class="d-inline-block" v-if="!pre_inspection.options">
                                        <q-radio v-model="pre_inspection.value" :val="true" label="Si" class="q-mr-lg"/>
                                        <q-radio v-model="pre_inspection.value" :val="false" label="No" class="q-mr-lg"/>
                                    </div>
                                    <div v-else>
                                        <q-select v-model="pre_inspection.value" :options="pre_inspection.options" :placeholder="pre_inspection.name" class="bg-white q-py-sm q-my-md"/>
                                    </div>
                                </div>
                            </div>
                            <!-- /Pre-Inspección -->

                            <!-- Llantas -->
                            <q-axes :axes="$v.data.axes" :type="isMotocicleta()" class="col-12 q-px-md q-border"/>
                            <!-- /Llantas -->

                            <!-- Inventario -->
                            <q-inventary :inventory="$v.data.items" class="col-12 q-px-md q-border text-center"/>

                            <!-- CAROUSEL -->
                            <div class="col-12 q-px-md">
                                <p class="font-weight-bold q-px-md q-pt-md">Fotografías</p>
                                <carousel :perPage="3" :paginationEnabled="false" :autoplay="true" :navigationEnabled="true" :navigationNextLabel="nextLabel" :navigationPrevLabel="prevLabel" >
                                  <slide v-for="(img, index) in data.gallery" :key="index">
                                    <div class="q-px-md text-center">
                                      <img :src="img|base_url" style="max-width: 100%;">
                                    </div>
                                  </slide>
                                </carousel>
                            </div>
                            <q-gallery :gallery="data.gallery" :code="data.code" class="col-12 q-px-md"/>

                            <!-- opbservaciones -->
                            <div class="col-12 q-my-md">
                                <q-input v-model="data.observations" type="textarea" float-label="Observaciones:" :max-height="10" rows="4" class="bg-white"/>
                            </div>

                            <div class="col-12 text-right">
                                <q-btn color="black" size="md" label="Guardar" class="q-px-lg btn-app" @click="submitData"/>
                            </div>
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page>
        <q-page v-show="showContract">
            <div class="layout-padding q-py-lg">
                <q-contract/>
                <div class="col-12 q-my-md">
                  <q-checkbox v-model="aceptContract" label="Autorizo al centro de diagnostico para que utilice mis datos personales con ﬁnes comerciales"/>
                </div>
                <div class="col-12 text-right q-my-md">
                  <q-btn color="black" size="md" label="Acepto" class="q-px-lg btn-app" @click="submitContract"/>
                </div>
            </div>
        </q-page>
        <q-page v-show="showsignature">
            <div class="layout-padding q-py-lg">
                <div class="row q-my-lg">
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

                        <img v-else :src="data.vehicle_delivery_signature" 
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

                        <img v-else :src="data.signature_received_report"
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
    import qAxes from '../../../components/q-axes';
    import qInventary from '../../../components/q-inventary';
    import qGallery from '../../../components/q-gallery';
    import qContract from '../../../components/q-contract';
    import resources from 'src/services/resources';
    import VueSignaturePad from 'vue-signature-pad';
    import config from 'src/config/index'
    import { Carousel, Slide } from 'vue-carousel'

    export default {
        name: 'PageData',
        components: { qInputValidation, qGallery, qInventary, qAxes, qContract, VueSignaturePad, Carousel, Slide },
        data () {
            return {
                show: false,
                showData: false,
                showContract: false,
                aceptContract: false,
                showsignature: false,
                is_vehicle_delivery_signature: true,
                is_signature_received_report: true,
                is_vehicle_gas: false,
                notFound: false,
                data: {
                    pre_inspections: [],
                    vehicles_id: null,
                    inspections_types_id: null,
                    teaching_vehicle: null,
                    mileage: null,
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
                    code: Math.round(Math.random()*1000000),
                    user_id: this.$route.params.user_id
                },
                isUpdate: false,
                formSearch : { plaque: null },
                selectInspection: [],
                selectItems: [],
                nextLabel: "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
                prevLabel: "<i class='fa fa-chevron-left' aria-hidden='true'></i>"
            }
        },
        created() {
            this.$q.loading.show()
            Promise.all([
                resources.inspectionsTypes(),
                resources.preInspections(),
                resources.inventory()
            ]).then((response) => {
                this.selectInspection = response[0].map((e,index) => {
                    if (index === 0)
                        this.data.inspections_types_id = e.value;
                    return {
                        label: e.label,
                        value: e.value
                    }
                })

                this.data.pre_inspections = response[1].map(e => {
                    let options = null
                    if (e.values) {
                        options = e.values.map(e => {
                            return {
                                label: e,
                                value: e
                            }
                        })
                    }

                    return {
                        name: e.name,
                        pre_inspection_id: e.id,
                        options: options,
                        value: null,
                        type: e.type
                    }
                })

                var items
                items = response[2].data.map(e => {
                    return {
                        name: e.name,
                        inventory_id: e.id,
                        evaluation: null,
                        quantity: null
                    }
                })
                this.data.items = items

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
        watch: {
            is_vehicle_gas: function(val) {
                if(!val) {
                    this.data.gas_certificate = null
                    this.data.gas_certifier = null
                }
            },
        },
        filters: {
            validity: function (value) {
                return value? 'VIGENTE' : 'NO VIGENTE'
            },
            base_url: function(img_url) {
              return config('api.base_url') + '/' +img_url
            }
        },
        validations: {
            formSearch: {
                plaque: { required, minLength: minLength(6)  }
            },
            data: {
                teaching_vehicle: { required },
                mileage: { required },
                axes: {
                    $each: {
                        $each: {
                            pressure_init: { required },
                            adjustment: { required }
                        }
                    }
                },
                items: {
                    $each: {
                        evaluation: { required : requiredIf(function(model) {
                            return model.quantity != null
                        })},
                        quantity: { required : requiredIf(function(model) {
                            return model.evaluation != null
                        })},
                    }
                },
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
                }
            },
        },
        methods: {
            submitData () {
                this.$v.data.$touch()
                this.$q.loading.show()
                if (this.$v.data.$error) {
                    this.$q.loading.hide()
                    this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                    return
                } else {
                    this.showData = false;
                    if(!this.is_vehicle_delivery_signature)
                        this.showsignature = true
                    else
                        this.showContract = true;
                    this.$q.loading.hide()
                }
            },
            submitContract() {
                if(!this.aceptContract)
                    this.$q.notify({message: 'Debe aceptar los terminos para continuar.',  position: 'top-right', closeBtn: true})
                else{
                    this.$v.data.$reset()
                    this.showContract = false
                    this.showsignature = true
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

                    var jsonData = {};

                    for(var prop in this.data) {
                        if(this.data[prop]!=null)
                            jsonData[prop] = this.data[prop];
                    }

                    var items = this.data.items.filter(function (item) {
                        return item.evaluation != null && item.quantity != null
                    })

                    jsonData['items'] = items;
                    jsonData['gas_certificate'] = this.data.gas_certificate
                    jsonData['gas_certifier']   = this.data.gas_certifier
                    if ( !this.is_vehicle_delivery_signature)
                        delete jsonData['vehicle_delivery_signature'];
                    if ( !this.is_signature_received_report)
                        delete jsonData['signature_received_report'];

                    resources.setInspections(jsonData)
                    .then(response => {
                        this.$q.notify({type:'positive', message: 'Creado exitosamente!',  position: 'top-right', closeBtn: true})
                        this.$router.push({ name: 'home' })
                    }).catch(error => {
                        this.$q.loading.hide()
                        this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
                    })
                }
            },
            onEnd() {
                if ( this.is_vehicle_delivery_signature) {

                    var { isEmpty, data } = this.$refs.signatureEntrega.saveSignature();
                    if(!isEmpty) {
                        this.data.vehicle_delivery_signature = data
                    }
                }

                if ( this.is_signature_received_report) {

                    var { isEmpty, data } = this.$refs.signatureRecibido.saveSignature();
                    if(!isEmpty) {
                        this.data.signature_received_report = data
                    }
                }
            },
            searchPlaque () {
                this.$v.formSearch.$touch()
                this.$q.loading.show()
                this.notFound = false
                if (this.$v.formSearch.$error){
                    this.$q.loading.hide()
                }
                else{
                    resources.vehicle(this.formSearch.plaque.replace(/ /g, ""))
                    .then(response => {
                        console.log(response.data)
                        if(response.data) {
                            this.data.vehicles_id = response.data.id
                            this.data.type_vehicle = response.data.typeVehicle
                            this.data.attributes = response.data
                            if(this.data.type_vehicle == null)
                                this.data.type_vehicle = this.data.attributes.type_vehicle
                        } else
                            this.notFound = true
                        this.showData = true;
                    }).catch(error => {
                        this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
                        console.error('Error ', error)
                    }).then(() => {
                        this.$q.loading.hide()
                    })
                }
            },
            isMotocicleta() {
                return this.data.attributes.type_vehicle == 'MOTOCICLETA';
            },
        }
    }
</script>
