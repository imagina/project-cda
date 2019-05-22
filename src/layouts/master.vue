<template>
  <q-layout view="lHh LpR lFr">
    <q-layout-header class="shadow-1">
      <div class="row bg-primary align-items-center q-py-sm">
        <div class="col-4 col-md-5 q-px-sm">
          <a href="javascript:void(0)" @click="leftDrawerOpen = !leftDrawerOpen">
            <img src="../assets/logo.svg" height="101px" class="header-logo">
          </a>
        </div>
        <div class="col">
          <div class="row align-items-center">
            <div class="col header-col q-px-sm text-center" v-show="$store.state.orden.timeEntry">
              <p class="font-weight-bold">Hora de ingreso:</p>
              <p class="font-weight-bold q-mb-xs">{{$store.state.orden.timeEntry}}</p>
            </div>
            <div class="col header-col q-px-sm text-center" v-show="$store.state.orden.dateEntry">
              <p class="font-weight-bold">Fecha de ingreso:</p>
              <p class="font-weight-bold q-mb-xs">{{$store.state.orden.dateEntry}}</p>
            </div>
            <div class="col-12 col-md-4 order-col q-px-sm text-center" v-show="$store.state.orden.id">
              <p class="font-weight-bold mb-0">ORDEN DE SERVICIO</p>
              <p class="font-weight-bold q-mb-xs h4">{{$store.state.orden.id}}</p>
            </div>
          </div>
        </div>
      </div>
      <q-progress indeterminate color="warning" v-show="load"/>
    </q-layout-header>

    <!-- === MENU === -->
    <q-layout-drawer id="menu_master" v-model="leftDrawerOpen" :content-class="'bg-grey-2'" >
      <q-list no-border link inset-delimiter>
        <!-- === LOGO === -->
        <q-list-header class="text-center">
          <a href="javascript:void(0)" @click="leftDrawerOpen = !leftDrawerOpen">
            <img src="../assets/logo.svg" height="101px" class="header-logo">
          </a>
        </q-list-header>

        <!--= MENU =-->
        <widget-menu></widget-menu>
      </q-list>
    </q-layout-drawer>

    <!-- === ROUTER VIEW === -->
    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-inner-loading :visible="$store.state.data.load_inner">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>
  </q-layout>
</template>

<script>
  import WidgetUser from "@imagina/quser/_components/widget-user";
  import WidgetUserDepartment from "@imagina/quser/_components/widget-user-department";
  import widgetMenu from "src/components/menu/widget-menu";

  import resources from 'src/services/resources.js'

  export default {
    components: {
      widgetMenu,
      WidgetUserDepartment,
      WidgetUser,
    },
    watch:{
      $route (to, from){
        this.leftDrawerOpen = false
      },
    },
    data() {
      return {
        leftDrawerOpen: false,
        drawerState: true,
        load: false,
      }
    },
    created() {
      
      this.getTypesVehicles()
      this.getTypesInspections()
      this.getTypesInspectionStatues()
      this.getTypesServices()
      this.getTypesFuels()
      this.getTypesBrands()
      this.getTypesColors()
      this.getTypesLines()
      this.getTypesModels()
      this.getClassVehicles()
    },
    methods: {
      PadLeft(value, length) {
        value = value + "";
        return (value.toString().length < length) ? this.PadLeft("0" + value, length) : value
      },

      //
      getTypesVehicles(){
        this.$q.loading.show()
        resources.getTypesVehicles()
        .then(response=>{
          let typesVehicles = []
          for(let element in response.data.data){
            typesVehicles.push({ label: response.data.data[element], value: parseInt(element) })
          }
          this.$store.commit('data/SET_TYPES_VEHICLES',typesVehicles)
          this.$q.loading.hide()
        })
        .catch(error=>{
          this.$q.loading.hide()
        })
      },
      getTypesInspections(){
        this.$q.loading.show()
        resources.getTypesInspections()
        .then(response=>{
          let typesInspections = response.data.data.map((color) => { return { label: color.name, value: color.id }})
          this.$store.commit('data/SET_TYPES_INSPECTIONS',typesInspections)
          this.$q.loading.hide()
        })
        .catch(error=>{
          this.$q.loading.hide()
        })
      },
      getTypesInspectionStatues(){
        this.$q.loading.show()
        resources.getTypesInspectionStatues()
        .then(response=>{
          let data = []
          for(let element in response.data.data){
            data.push({ label: response.data.data[element], value: parseInt(element) })
          }
          this.$store.commit('data/SET_TYPES_INSPECTIONS_STATUES',data)
          this.$q.loading.hide()
        })
        .catch(error=>{
          this.$q.loading.hide()
        })
      },
      getTypesServices(){
        this.$q.loading.show()
        resources.getTypesServices()
        .then(response=>{
          let data = []
          for(let element in response.data.data){
            data.push({ label: response.data.data[element], value: parseInt(element) })
            this.$q.loading.hide()
          }
          this.$store.commit('data/SET_TYPES_SERVICES',data)
        })
        .catch(error=>{
          this.$q.loading.hide()
        })
      },
      getTypesFuels(){
        this.$q.loading.show()
        resources.getTypesFuels()
        .then(response=>{
          let data = []
          for(let element in response.data.data){
            data.push({ label: response.data.data[element], value: parseInt(element) })
          }
          this.$store.commit('data/SET_TYPES_FUELS',data)
          this.$q.loading.hide()
        })
        .catch(error=>{
          this.$q.loading.hide()
        })
      },
      getTypesBrands(){
        this.$q.loading.show()
        resources.getTypesBrands()
        .then(response=>{
          let data = response.data.data.map((color) => { return { label: color.name, value: color.id }})
          this.$store.commit('data/SET_TYPES_BRANDS', data)
          this.$q.loading.hide()
        })
        .catch(error=>{
          this.$q.loading.hide()
        })
      },
      getTypesColors(){
        this.$q.loading.show()
        resources.getTypesColors()
        .then(response=>{
          let colors = response.data.data.map((color) => { return { label: color.name, value: color.id }})
          this.$store.commit('data/SET_TYPES_COLORS', colors)
          this.$q.loading.hide()
        })
        .catch(error=>{
          this.$q.loading.hide()
        })
      },
      getTypesLines(){
        this.$q.loading.show()
        resources.getTypesLines()
        .then(response=>{
          let data = response.data.data.map((color) => { return { label: color.name, value: color.id }})
          this.$store.commit('data/SET_TYPES_LINES', data)
          this.$q.loading.hide()
        })
        .catch(error=>{
          this.$q.loading.hide()
        })
      },
      getTypesModels(){
        this.$q.loading.show()
        let data = resources.getTypesModels()
        this.$store.commit('data/SET_TYPES_MODELS', data)
      },
      getClassVehicles(){
        this.$q.loading.show()
        resources.getClassVehicles()
        .then(response=>{
          let data = []
          for(let element in response.data.data){
            data.push({ label: response.data.data[element], value: (element) })
          }
          this.$store.commit('data/SET_CLASS_VEHICLES',data)
          this.$q.loading.hide()
        })
        .catch(error=>{
          this.$q.loading.hide()
        })
      },
      //

      
    }
  }
</script>
