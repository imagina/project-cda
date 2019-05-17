<template>
  <q-page class="create-vehicle" v-show="!$store.state.data.load_inner">
    <div class="layout-padding">
      <div class="row mt-3">
        <div class="col-12 q-px-md">
          <span class="h4 q-mb-md border-bottom d-block">
            NUEVO VEHICULO
          </span>
        </div>
      </div>

      <div class="row q-py-md border-bottom">
        <div class="col-12 col-md-6 col-lg-4 mx-auto q-px-md">
          <q-field>
            <q-input 
              type="text"
              v-model="board"
              placeholder="Placa del Vehículo" 
              class="bg-white mx-auto"
              v-on:keyup.enter="searchBoard"

              :after="[{ icon: 'search', handler() { searchBoard()}}]"/>
              <q-tooltip v-show="$v.board.$error">
                <p class="error-message mb-0" v-if="$v.board.$error">
                  <i class="material-icons">error_outline</i> El campo es obligatorio.
                </p>
              </q-tooltip>
          </q-field>
        </div>
      </div>
      <div class="row q-mt-lg" v-if="vehicleExist">
        <div class="col-12 col-md-6 q-px-md">
          <q-field :error="$v.attributes.board.$error">
            <span class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.board.$error}">Placa:</span>
            <q-input 
              readonly
              v-model="attributes.board" 
              type="text" 
              placeholder="Placa" 
              class="q-mb-lg uppercase"/>
          </q-field>
          <q-field :error="$v.attributes.service_type.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.service_type.$error}">
              Tipo de Servicio:
            </span>
            <q-select 
              v-model="attributes.service_type" 
              class="q-mb-lg uppercase" 
              placeholder="Tipo de Servicio" 
              :options="$store.getters['data/GET_TYPES_SERVICES']"/>
          </q-field>
          <q-field :error="$v.attributes.type_vehicle.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.type_vehicle.$error}">
              Tipo de Vehículo
            </span>
            <q-select 
              v-model="attributes.type_vehicle" 
              class="q-mb-lg uppercase" 
              placeholder="Tipo de Vehículo" 
              :options="$store.getters['data/GET_TYPES_VEHICLES']"/>
          </q-field>
          <q-field :error="$v.attributes.brand_id.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.brand_id.$error}">
              Marca:
            </span>
            <q-select 
              v-model="attributes.brand_id" 
              class="q-mb-lg uppercase" 
              placeholder="Marca" 
              :options="$store.getters['data/GET_TYPES_BRANDS']"/>
          </q-field>
          <q-field :error="$v.attributes.line_id.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.line_id.$error}">
              Línea:
            </span>
            <q-select 
              v-model="attributes.line_id" 
              class="q-mb-lg uppercase" 
              placeholder="Line" 
              :options="$store.getters['data/GET_TYPES_LINES']"/>
          </q-field>
          <q-field :error="$v.attributes.model.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.model.$error}">
                Modelo:
              </span>
            <q-select 
              v-model="attributes.model" 
              class="q-mb-lg uppercase"
              placeholder="Modelo" 
              :options="$store.getters['data/GET_TYPES_MODELS']"/>
          </q-field>
          <q-field :error="$v.attributes.transit_license.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.transit_license.$error}">
              N° Licencia de Tránsito:
            </span>
            <q-input 
              v-model="attributes.transit_license" 
              type="text" 
              placeholder="N° Licencia de Tránsito" 
              class="q-mb-lg uppercase"/>
          </q-field>
          <q-field :error="$v.attributes.enrollment_date.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.enrollment_date.$error}">
              Fecha de Matrícula:
            </span>
            <q-datetime 
              v-model.trim="attributes.enrollment_date"
              type="date"
              class="q-mb-lg"
              placeholder="Fecha de Vencimiento"
              format="YYYY-MM-DD"/>
          </q-field>
        </div>
        <div class="col-12 col-md-6 q-px-md">
          <q-field :error="$v.attributes.color_id.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.color_id.$error}">
              Color:
            </span>
            <q-select 
              v-model="attributes.color_id" 
              class="q-mb-lg uppercase" 
              placeholder="Color" 
              :options="$store.getters['data/GET_TYPES_COLORS']"/>
          </q-field>
          <q-field :error="$v.attributes.type_fuel.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.type_fuel.$error}">
              Tipo de combustible:
            </span>
            <q-select 
              v-model="attributes.type_fuel" 
              class="q-mb-lg uppercase" 
              placeholder="Tipo de combustible"
              :options="$store.getters['data/GET_TYPES_FUELS']"/>
          </q-field>
          <q-field :error="$v.attributes.vehicle_class.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.vehicle_class.$error}">
              Clase de vehícilo:
            </span>
            <q-select 
              v-model="attributes.vehicle_class" 
              class="q-mb-lg uppercase" 
              placeholder="Clase de vehícilo"
              :options="$store.getters['data/GET_CLASS_VEHICLES']"/>
          </q-field>
          <q-field :error="$v.attributes.vin_number.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.vin_number.$error}">
              N°Vin:
            </span>
            <q-input 
              v-model="attributes.vin_number" 
              type="text" 
              placeholder="N°Vin:" class="q-mb-lg"/>
          </q-field>
          <q-field :error="$v.attributes.chasis_number.$error">
            <span 
              class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.chasis_number.$error}">
              N° de Chasis:
            </span>
            <q-input 
              v-model="attributes.chasis_number" 
              type="text" 
              placeholder="N° de Chasis" 
              class="q-mb-lg"/>
          </q-field>
          <q-field :error="$v.attributes.engine_number.$error">
            <span class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.engine_number.$error}">
              N° de Motor:
            </span>
            <q-input 
              v-model="attributes.engine_number" 
              type="text" placeholder="N° de Motor" 
              class="q-mb-lg"/>
          </q-field>
          <q-field :error="$v.attributes.displacement.$error">
            <span class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.displacement.$error}">
              Cilindraje:
            </span>
            <q-input 
              v-model="attributes.displacement" 
              type="text" 
              placeholder="Cilindraje" 
              class="q-mb-lg"/>
          </q-field>
          <q-field :error="$v.attributes.axes_number.$error">
            <span class="font-weight-bold d-inline-block"
              :class="{'color-danger': $v.attributes.axes_number.$error}">
              Numero de ejes:
            </span>
            <q-input 
              v-model="attributes.axes_number" 
              type="text" 
              placeholder="Numero de ejes" 
              class="q-mb-lg"/>
          </q-field>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-12 q-px-md">
              <h5 class="border-bottom q-my-sm">
                SOAT
              </h5>
            </div>
            <q-field 
              :error="$v.attributes.insurance_expedition.$error" 
              class="col-6 col-sm-6 q-px-md">
              <span 
                class="font-weight-bold d-inline-block"
                :class="{'color-danger': $v.attributes.insurance_expedition.$error}">
                Fecha de Expedición:
              </span>
              <q-datetime 
                v-model.trim="attributes.insurance_expedition"
                placeholder="Fecha Fin De Vigencia"
                type="date"
                class="q-mb-lg"
                format="YYYY-MM-DD"/>
            </q-field>
            <q-field 
              :error="$v.attributes.insurance_expiration.$error" 
              class="col-6 col-sm-6 q-px-md">
              <span 
                class="font-weight-bold d-inline-block"
                :class="{'color-danger': $v.attributes.insurance_expiration.$error}">
                Fecha Fin De Vigencia:
              </span>
              <q-datetime v-model.trim="attributes.insurance_expiration"
                placeholder="Fecha de Expedición"
                type="date"
                class="q-mb-lg"
                format="YYYY-MM-DD"/>
            </q-field>
          </div>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-12 q-px-md">
              <h5 class="border-bottom q-my-sm">
                TECNICOMECÁNICA
              </h5>
            </div>
            <q-field 
              class="col-6 col-sm-6 q-px-md">
              <span 
                class="font-weight-bold d-inline-block">
                Fecha de Expedición:
              </span>
              <q-datetime 
              v-model.trim="attributes.tecnomecanica_expedition"
                placeholder="Fecha de Expedición"
                type="date"
                class="q-mb-lg"
                format="YYYY-MM-DD"/>
            </q-field>
            <q-field 
              class="col-6 col-sm-6 q-px-md">
              <span 
                class="font-weight-bold d-inline-block">
                Fecha Fin De Vigencia:
              </span>
              <q-datetime 
                v-model.trim="attributes.tecnomecanica_expiration"
                placeholder="Fecha Fin De Vigencia"
                type="date"
                class="q-mb-lg"
                format="YYYY-MM-DD"/>
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
  import config from 'src/config/index'
  import resources from 'src/services/vehicles.js'

  export default {
  name: 'PageVehicleCreate',
  data () {
    return {
      attributes: {
        service_type: null,
        type_vehicle: null,
        board: null,
        brand: null,
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
        tecnomecanica_expiration: null,
        tecnomecanica_expedition: null,
        user_id: null,
        vin_number: null,
        vehicle_class: null,
      },
      board: '',
      vehicleExist:false,
    }
  },
  validations: {
    attributes: {
      service_type:{ required },
      type_vehicle:{ required },
      brand_id:{required },
      line_id:{ required },
      model:{required },
      color_id:{ required },
      board:{required },
      type_fuel:{ required },
      transit_license:{ required },
      enrollment_date:{ required },
      chasis_number:{ required },
      engine_number:{ required },
      displacement:{ required },
      axes_number:{ required },
      insurance_expedition:{ required },
      insurance_expiration:{ required },
      tecnomecanica_expiration:{ required },
      tecnomecanica_expedition:{ required },
      vin_number:{ required },
      vehicle_class:{ required },
    },
    board:{ required },
  },
  created(){
    this.$store.commit('data/LOAD_FALSE')
  },
  watch:{
    board(val){
      this.attributes.board = val
    }
  },
  methods: {
    submitData () {
      this.$store.commit('data/LOAD_TRUE')
      this.$v.attributes.$touch()
      if (this.$v.attributes.$error) {
        this.$store.commit('data/LOAD_FALSE')
        this.$q.notify({
          message: 'Por favor revise los campos de nuevo.',  
          position: 'top-right', 
          closeBtn: true})
        return
      } else {
        var attributes = {}
        Object.keys(this.attributes).filter((element) => {
          if (this.attributes[element] != null) {
            attributes[element] = this.attributes[element]
          }
        });
        resources.createVehicle(attributes)
        .then(response => {
          if (response.data) {
            this.$router.push({ 
              name: 'vehicles.index' 
            })
          }else {
            this.$q.notify({
              message: 'Ocurrio algo inesperado.',  
              position: 'top-right', 
              closeBtn: true})
          }
        }).catch(error => {
          this.$q.notify({
            message: 'Ocurrio algo inesperado.',  
            position: 'top-right', 
            closeBtn: true})
        })
        .then(() => {
          this.$store.commit('data/LOAD_FALSE')
        })
      }
    },
    searchBoard(){
      this.vehicleExist  = false
      this.$store.commit('data/LOAD_TRUE')
      this.$v.board.$touch()
      if (this.$v.board.$error) {
        this.$store.commit('data/LOAD_FALSE')
        this.$q.notify({
          message: 'Por favor revise los campos de nuevo.',
          position: 'top-right', 
          closeBtn: true})
        return
      } else {
        resources.vehicle(this.board)
        .then(response=>{
          if(response.data == ''){
            this.vehicleExist = true
          }else{
            this.$q.notify({
              icon:'error', 
              message: 'La placa ya se encuentra registrada',
              position: 'top-right', 
              closeBtn: true})
          }
          this.$store.commit('data/LOAD_FALSE')
        })
        .catch(error=>{
          this.$q.notify({
            icon:'error', 
            message: 'Ha ocurrido un Error Inesperado',
            position: 'top-right', 
            closeBtn: true})
          this.$store.commit('data/LOAD_FALSE')
        })
      }
    },
  }
}
</script>
