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
        inspection: null,
        Echo: null
      }
    },
    created() {
      this.$q.loading.show()
      Promise.all([
        this.$resources.getInspectionStatues(),
        this.$resources.typesVehicles(),
        this.$resources.inspectionsTypes(),
      ]).then((response) => {
        this.$store.commit('data/SET_TYPES_INSPECTIONS_STATUES',response[0])
        this.$store.commit('data/SET_TYPES_VEHICLES',response[1])
        this.$store.commit('data/SET_TYPES_INSPECTIONS',response[2])
      }).catch((err) => {
        this.$q.notify({ message: 'Ups! Ocurrio un error de conexion. Intente de nuevo.', position: 'top-right'})
        console.log('There is an error', err);
      }).then((response) => {
        this.$q.loading.hide()
      });
    },
    mounted() {
      if (this.$auth.hasAccess('icda.inspections.create')) {
        var channel = this.$pusher.subscribe('inspections-list');
        channel.bind('Modules\\Icda\\Events\\RecordListInspections', (data) =>  {
          this.$store.commit('inspections/ADD_INSPECTION_LIST',data.inspection)
          this.$q.notify({
            message: data.message,
            position: 'bottom-left',
            closeBtn: true,
            type: 'positive',
            color: 'blue',
            timeout: 80000,
            actions: [
              {
                label: 'VER',
                noDismiss: true,
                handler: () => {
                  this.$router.push({ name: 'update.inspection', params:{inspection: data.inspection_id} })
                }
              }
            ]
          })
        });
      }

      if (this.$auth.hasAccess('icda.vehicles.create')) {
        var channel = this.$pusher.subscribe('vehicles-list');
        channel.bind('Modules\\Icda\\Events\\RecordListVehicles', (data) =>  {
          this.$store.commit('vehicle/ADD_VEHICLE_LIST',data.vehicle)
          this.$q.notify({
            message: data.message,
            position: 'bottom-right',
            closeBtn: true,
            type: 'positive',
            color: 'blue',
            timeout: 80000,
            actions: [
              {
                label: 'VER',
                noDismiss: true, // optional, v0.15.11+
                handler: () => {
                  this.$router.push({ name: 'vehicles.update', params:{board: data.vehicle.board.toUpperCase()} })
                }
              }
            ]
          })
        });
      }
            // this.$q.loading.show()
    },
    methods: {
      PadLeft(value, length) {
        value = value + "";
        return (value.toString().length < length) ? this.PadLeft("0" + value, length) : value
      }
    }
  }
</script>