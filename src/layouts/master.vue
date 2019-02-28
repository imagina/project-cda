<template>
  <q-layout view="lHh LpR lFr">
    <q-layout-header>
      <div class="row bg-primary align-items-center q-py-sm">
        <div class="col-3 col-md-5 q-px-sm">
          <a href="javascript:void(0)" @click="leftDrawerOpen = !leftDrawerOpen">
            <img src="../assets/logo.svg" height="101px" class="header-logo">
          </a>
        </div>
        <div class="col">
          <div class="row align-items-center">
            <div class="col header-col q-px-sm text-center">
              <p class="font-weight-bold">Hora de ingreso:</p>
              <p class="font-weight-bold q-mb-xs">9:30px</p>
            </div>
            <div class="col header-col q-px-sm text-center">
              <p class="font-weight-bold">Fecha de ingreso</p>
              <p class="font-weight-bold q-mb-xs">29/12/2018</p>
            </div>
            <div class="col header-col--orden q-px-sm text-center">
              <p class="font-weight-bold q-mb-xs">ORDEN DE SERVICIO</p>
              <p class="font-weight-bold q-mb-xs h4">001</p>
            </div>
          </div>
        </div>
      </div>
    </q-layout-header>
    <!-- === MENU === -->
    <q-layout-drawer id="menu_master" v-model="leftDrawerOpen" :content-class="'bg-grey-2'">
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
      WidgetUser},
    mounted() {
      this.$nextTick(function () {})
    },
    data() {
      return {
        leftDrawerOpen: false,
        drawerState: true,
      }
    },
    methods: {
      toggleFullscreen() {
        this.$q.fullscreen.toggle()
      },
    }
  }
</script>