<template>
  <div>
    <div class="row q-mb-lg" v-if="!type">
      <div class="col-12">
        <div class="row">
          <div class="col-4 col-md-3 col-lg-2 q-mb-lg"> <span class="font-weight-bold">Eje Trasero:</span> </div>
          <div class="col-8 col-md-9 col-lg-10">
            <q-btn-group class="bg-white">
              <q-btn label="SENCILLO" @click="type_vehicle = 1" :class="{'bg-primary ' : type_vehicle==1}"/>
              <q-btn label="DOBLE LLANTA" @click="type_vehicle = 2" :class="{'bg-primary ' : type_vehicle==2}"/>
            </q-btn-group>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-4 col-md-3 col-lg-2 q-mb-lg"> <span class="font-weight-bold">Llantas</span> </div>
      <div class="col-12 col-sm-8 col-md-9 col-lg-10">
        <div class="row" v-for="(eje,item) in axes.$model">
          <div class="col" style="max-width: 200px">
            <p class="font-weight-bold q-my-md">Eje  {{ item + 1 }}</p>
            <p class="font-weight-bold q-mr-lg q-mt-md q-mb-lg">Presión Inicial:</p>
            <p class="font-weight-bold q-mr-lg q-my-md">Ajuste:</p>
          </div>
          <div class="col q-mx-sm" v-for="(llanta,key) in eje" style="max-width: 130px">
            <div class="text-center d-block q-my-sm"> <span v-if="!type">{{ llanta.type|axes }}</span> <span v-else>&nbsp;</span> </div>
            <q-field :error="axes.$each[item].$each[key].pressure_init.$error">
              <q-input v-model="llanta.pressure_init" type="number" class="bg-white q-py-sm q-my-sm" @input="$emit('update-value-by-child', axes)"/>
            </q-field>
            <q-field :error="axes.$each[item].$each[key].adjustment.$error">
              <q-input v-model="llanta.adjustment" type="number" class="bg-white q-py-sm q-my-sm" @input="$emit('update-value-by-child', axes)"/>
            </q-field>
          </div>
          <hr class="col-12 q-mb-lg" v-if="axes.$model - 1 > item">
        </div>
        <div class="q-mr-md d-inline-block" v-if="!type" @click="addAxes">
          <q-btn round color="primary" size="sm" @click="addAxes = true">
            <q-icon name="add"/>
          </q-btn>
          <span class="q-ml-sm font-weight-bold cursor-pointer"> Agregar Eje</span>
        </div>
        <div class="q-mr-md d-inline-block" v-if="!type && axes.$model.length > 1" @click="removerAxes">
          <q-btn round color="red" size="sm" @click="addAxes = true">
            <q-icon name="remove"/>
          </q-btn>
          <span class="q-ml-sm font-weight-bold cursor-pointer"> Remover Eje</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'q-axes',
    props: {
      'axes': { required: true },
      'type': { required: false, default: 1 }
    },
    data() {
      return {
        type_vehicle: 1,
      }
    },
    watch: {
      type: function(val) {
        this.initial()
      },
    },
    created() {
      this.initial()
    },
    filters: {
        axes: function (axe) {
          return axe == 'R'? 'D' : 'I'
        }
    },
    methods: {
      addAxes() {
        if (this.type_vehicle == 1) {
          this.axes.$model.push([{
            pressure_init: null,
            adjustment: null,
            type: "L"
          },
          {
            pressure_init: null,
            adjustment: null,
            type: "R"
          }])
        }else
          this.axes.$model.push([{
            pressure_init: null,
            adjustment: null,
            type: "L"
          },
          {
            pressure_init: null,
            adjustment: null,
            type: "R"
          },{
            pressure_init: null,
            adjustment: null,
            type: "L"
          },
          {
            pressure_init: null,
            adjustment: null,
            type: "R"
          }])
      },
      removerAxes () {
        this.axes.$model.pop();
      },
      initial() {
        this.axes.$model = []
        if(!this.type) {
          this.axes.$model.push([{
            pressure_init: null,
            adjustment: null,
            type: "L"
          },
          {
            pressure_init: null,
            adjustment: null,
            type: "R"
          }])
        }else {
          this.axes.$model.push([{
            pressure_init: null,
            adjustment: null,
            type: "L"
          }],
          [{
            pressure_init: null,
            adjustment: null,
            type: "R"
          }])
        }
      }
    }
  }
</script>

<style>
    .col-title {
      max-width: 150px
    }
  @media screen and (max-width: 600px) {
    .col-title{
      height: auto;
      width: 100%;
    }
    .col-axis {
      height: auto;
      width: 100%;
    }
  }
</style>