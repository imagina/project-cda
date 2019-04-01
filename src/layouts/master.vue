<template>
  <q-layout view="lHh LpR lFr">
    <q-layout-header>
      <div class="row bg-primary align-items-center q-py-sm">
        <div class="col-6 col-md-5 q-px-sm">
          <a href="javascript:void(0)" @click="leftDrawerOpen = !leftDrawerOpen">
            <img src="../assets/logo.svg" height="101px" class="header-logo">
          </a>
        </div>
        <div class="col">
          <div class="row align-items-center">
            <div class="col header-col q-px-sm text-center">
              <p class="font-weight-bold">Hora de ingreso:</p>
              <p class="font-weight-bold q-mb-xs">{{ getIngresoTime() }}</p>
            </div>
            <div class="col header-col q-px-sm text-center">
              <p class="font-weight-bold">Fecha de ingreso</p>
              <p class="font-weight-bold q-mb-xs">{{ new Date().toJSON().slice(0,10).replace(/-/g,'/') }}</p>
            </div>
            
            <div class="col header-col--orden q-px-sm text-center" v-show="inspection">
              <p class="font-weight-bold q-mb-xs">ORDEN DE SERVICIO</p>
              <p class="font-weight-bold q-mb-xs h4">{{ inspection }}</p>
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
      WidgetUser
    },
    created() {
      this.inspection = this.$route.params.inspection ? this.PadLeft(this.$route.params.inspection,3) : null
    },
    mounted() {
      this.$nextTick(function () {})
    },
    watch:{
      $route (to, from){
        this.inspection = this.$route.params.inspection ? this.PadLeft(this.$route.params.inspection,3) : null
      }
    },
    data() {
      return {
        leftDrawerOpen: false,
        drawerState: true,
        inspection: null,
      }
    },
    methods: {
      PadLeft(value, length) {
        value = value + "";
        return (value.toString().length < length) ? this.PadLeft("0" + value, length) : value
      },
      toggleFullscreen() {
        this.$q.fullscreen.toggle()
      },
      getIngresoTime() {
        let time = new Date();
        return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      }
    }
  }
</script>