<template>
  <q-layout view="lHh LpR lFr">
    <q-layout-header>
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
        load: true,
      }
    },
    created() {
      this.$q.loading.show()
      Promise.all([
        this.$resources.getTypesVehicles(),
        this.$resources.getTypesInspections(),
        this.$resources.getTypesInspectionStatues(),
        this.$resources.getTypesServices(),
        this.$resources.getTypesFuels(),
        this.$resources.getTypesBrands(),
        this.$resources.getTypesColors(),
        this.$resources.getTypesLines(),
        this.$resources.getTypesModels()
      ]).then((response) => {
        this.$store.commit('data/SET_TYPES_VEHICLES',response[0])
        this.$store.commit('data/SET_TYPES_INSPECTIONS',response[1])
        this.$store.commit('data/SET_TYPES_INSPECTIONS_STATUES',response[2])
        this.$store.commit('data/SET_TYPES_SERVICES',response[3])
        this.$store.commit('data/SET_TYPES_FUELS',response[4])
        this.$store.commit('data/SET_TYPES_BRANDS',response[5])
        this.$store.commit('data/SET_TYPES_COLORS',response[6])
        this.$store.commit('data/SET_TYPES_LINES',response[7])
        this.$store.commit('data/SET_TYPES_MODELS',response[8])
        this.$q.loading.hide()
      }).catch((err) => {
        this.$q.notify({ message: 'Ups! Ocurrio un error de conexion. Intente de nuevo.', position: 'top-right'})
        console.log('There is an error', err);
      }).then(() => {
        this.load = false
        this.$store.commit('data/LOAD_FALSE')
        this.$q.loading.hide()
      });
    },
    methods: {
      PadLeft(value, length) {
        value = value + "";
        return (value.toString().length < length) ? this.PadLeft("0" + value, length) : value
      }
    }
  }
</script>