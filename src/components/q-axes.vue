<template>
  <div>
    <div class="row q-mb-lg" v-if="!type">
      <div class="col-12">
        <div class="row">
          <div class="col px-0" style="max-width: 150px;padding-right: 0px !important;padding-left: 0px !important;"> <span class="font-weight-bold">Eje Trasero:</span> </div>
          <div class="col">
            <q-btn-group class="bg-white">
              <q-btn label="SENCILLO" @click="type_vehicle = 1" :class="{'bg-primary ' : type_vehicle==1}"/>
              <q-btn label="DOBLE LLANTA" @click="type_vehicle = 2" :class="{'bg-primary ' : type_vehicle==2}"/>
            </q-btn-group>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col" style="max-width: 150px"> <span class="font-weight-bold">Llantas</span> </div>
      <div class="col">
        <div class="row" v-for="(eje,item) in axes">
          <div class="col" style="max-width: 200px">
            <p class="font-weight-bold">Eje  {{ item + 1 }}</p>
            <p class="font-weight-bold q-mr-lg q-my-lg">Presión Inicial:</p>
            <p class="font-weight-bold q-mr-lg q-my-lg">Ajuste:</p>
          </div>
          <div class="col q-mx-sm" v-for="(llanta,key) in eje" style="max-width: 130px">
            <div class="text-center d-block"> <span v-if="!type">{{ llanta.type|axes }}</span> <span v-else>&nbsp;</span> </div>
            <q-input v-model="llanta.pressure_init" type="text" class="bg-white q-py-sm q-my-md" @input="$emit('update-value-by-child', axes)"/>
            <q-input v-model="llanta.adjustment" type="text" class="bg-white q-py-sm q-my-md" @input="$emit('update-value-by-child', axes)"/>
          </div>
          <hr class="col-12 q-mb-lg" v-if="axes.length - 1 > item">
        </div>
        <div v-if="!type">
          <q-btn round color="primary" size="sm" @click="addAxes = true">
            <q-icon name="add"/>
          </q-btn>
          <span class="q-ml-sm font-weight-bold cursor-pointer" @click="addAxes"> Agregar Eje</span>
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
    created() {
      if(!this.type) {
        this.axes.push([{
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
        this.axes.push([{
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
    },
    filters: {
        axes: function (axe) {
          return axe == 'R'? 'D' : 'I'
        }
    },
    methods: {
      addAxes() {
        if (this.type_vehicle == 1) {
          this.axes.push([{
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
          this.axes.push([{
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
      }
    }
  }
</script>