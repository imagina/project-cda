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
  import Echo from "laravel-echo";

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
    mounted() {
      var pusher = new Pusher(env('PUSHER_APP_KEY'), {
        broadcaster: env('BROADCAST_DRIVER', 'pusher'),
        key: env('PUSHER_APP_KEY'),
        id: env('PUSHER_APP_ID'),
        cluster: env('PUSHER_APP_CLUSTER'),
        encrypted: env('PUSHER_APP_ENCRYPTED'),
      });
      if (this.$auth.hasAccess('icda.inspections.create')) {

        var channel = pusher.subscribe('inspections-list');
        channel.bind('Modules\\Icda\\Events\\RecordListInspections', (data) =>  {
          this.$q.notify({message: data.message,  position: 'bottom-left', closeBtn: true, type: 'positive'})
        });

        var channel = pusher.subscribe('vehicles-list');
        channel.bind('Modules\\Icda\\Events\\RecordListVehicles', (data) =>  {
          this.$q.notify({message: data.message,  position: 'bottom-right', closeBtn: true, type: 'positive'})
        });
      }
    },
    methods: {
      PadLeft(value, length) {
        value = value + "";
        return (value.toString().length < length) ? this.PadLeft("0" + value, length) : value
      }
    }
  }
</script>