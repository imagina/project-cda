<template>
  <div>
    <div v-if="$store.state.auth.userData.permissions['icda.inspections.all']">
      <inspectorComponent/>
    </div>
    <div v-else>
      
      <q-page v-show="!$store.state.data.load_inner">
          <div class="layout-padding q-py-lg">
          <div class="row">
            <div class="col-12">
              <q-timeline  color="black" :responsive="false" class="border-bottom-none">
                <q-timeline-entry heading>
                  <div class="row">
                    <div class="col-md-6">
                      <span>Lista de Ordenes </span>
                    </div>
                    <div class="col-md-6">
                      <q-select
                        placeholder="Seleccionar Orden"
                        v-model="inspection_statues.status"
                        :options="optionsTypesInspectionsStatuesFiltered"
                        class="bg-white q-py-sm q-my-md"/>
                    </div>
                  </div>
                  <hr class="mt-0 q-my-sm">
                </q-timeline-entry>
                <q-timeline-entry
                  :heading="false"
                  v-for="(item, index) in $store.getters['inspections/GET_INSPECTIONS']" :key="index"
                  :subtitle="item.created_at_date + ' ' + item.created_at_time + ' ID-'+item.id+''"
                  side="right">
                  <div class="border-bottom">
                    <router-link  :to="{
                              name: 'update.inspection',
                              params: {
                                inspection: item.id
                              }
                            }"
                            class="link row">

                      <div class="col mx-auto" style="max-width: 100px;">
                        <img :src="item.gallery | img" width="100%">
                      </div>
                      <div class="col px-2">
                        Matricula: <b>{{ item.vehicle.board | uppercase }}</b> <br>
                        Tipo de Servicio: <b>{{ item.vehicle.service_type_text | uppercase }}</b> <br>
                        Tipo de Vehiculo: <b>{{ item.vehicle.type_vehicle_text | uppercase }}</b> <br>
                        Cliente: <b>{{ item.vehicle.user.fullname | uppercase }}</b> <br>
                        Estado: <b>{{ item.inspection_status }}</b> <br>
                      </div>
                    </router-link>
                  </div>
                </q-timeline-entry>

              </q-timeline>
            </div>
                    <div class="col-12 q-px-md" v-show="$store.getters['inspections/GET_INSPECTIONS_LENGTH'] < 1">
                        <q-alert color="red" icon="error" appear class="q-mb-sm">
                            NO SE ENCONTRO ORDENES
                        </q-alert>
                    </div>
            <div class="col-12 d-block q-py-md">
              <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="$store.getters['inspections/GET_PAGE_BUSY']" infinite-scroll-distance="10"></div>
            </div>
          </div>
          </div>
      </q-page>
    </div>
    <notificationComponent @newInspection="handlenewInspection()"/>
  </div>
</template>

<script>
  import config from 'src/config/index'
  import inspectorComponent from 'src/layouts/pages/inspection/inspector/index'
  import notificationComponent from 'src/components/inspection/notification'

  export default {
    components:{
      inspectorComponent,
      notificationComponent
    },
    name: 'PageOrdens',
      data () {
        return {
          inspection_statues: {
            status: 0,
            change: false
          },
        }
      },
      computed:{
        optionsTypesInspectionsStatuesFiltered(){
          let res = []
          this.$store.state.data.types_inspections_statues.forEach(state=>{
            if(this.$store.state.auth.userData.permissions['icda.inspections.register']){
              if(state.value == 0 || state.value == 1 || state.value == 2 || state.value == 3 || state.value == 4 ){
                res.push(state)
              }
            }
            if(this.$store.state.auth.userData.permissions['icda.inspections.checkIn']){
              if(state.value == 1){
                  res.push(state)
              }
            }
            if(this.$store.state.auth.userData.permissions['icda.inspections.all']){
              res.push(state)
            }
          })
          return res
        }
      },
      created() {
        
        if(this.$store.state.auth.userData.permissions['icda.inspections.checkIn']){
          this.inspection_statues.status = 1
        }
        this.$store.commit('data/LOAD_FALSE')
        this.$store.commit('orden/SET_ORDEN',{
          timeEntry: '',
          dateEntry: '',
          id: ''
        })
      },
      beforeDestroy() {
        this.$store.commit('inspections/RESET_INSPECTIONS_LIST')
      },
      watch: {
        'inspection_statues.status': {
          handler(newValue, oldValue) {
            this.$store.commit('inspections/RESET_INSPECTIONS_LIST')
            this.inspection_statues.change = true
            this.loadMore()
          },
          deep: true
        },
      },
      filters: {
        img: function(gallery) {
          return gallery ? config('api.base_url') +'/'+ gallery[0]  : 'assets/imagen.png';
        }
      },
    methods: {
      loadMore () {
        if(!this.$store.getters['inspections/GET_PAGE_BUSY']) {
          this.$store.commit('data/LOAD_TRUE')
          this.$store.commit('inspections/SET_PAGE_BUSY',true)
          this.$resourcesInspections.getInspections(this.$store.getters['inspections/GET_PAGE'],this.inspection_statues.status)
          .then(response => {
            console.log(response)
            response.data.forEach((val)=>{
              this.$store.commit('inspections/ADD_INSPECTION_LIST',val)
            });
            this.$store.commit('inspections/INCREMENT_PAGE')
            let page = response.meta.page;
            let busy = page.lastPage == page.currentPage ? true : false
            this.$store.commit('inspections/SET_PAGE_BUSY',busy)
          }).catch(error => {
            this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
            console.log(error);
          }).then(() => {
            this.$store.commit('data/LOAD_FALSE')
          });
        }
      },
      handlenewInspection(){
        this.loadMore()
      }
    }
  }
</script>
