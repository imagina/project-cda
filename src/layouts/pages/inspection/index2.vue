<template>
  <div class="layout-padding">
    <div class="relative-position">
      <div class="col-12">
  
        <!-- Table -->
        <q-table
          no-results-label="No se encontraron Ordenes"
          loading-label="Cargando Datos"
          :data="table.data"
          :columns="table.columns"
          :pagination.sync="table.pagination"
          @request="getdata"
          :filter="table.filter"
          class="shadow-1 border-top-color">
  
          <!-- Table Template Custom Header -->
          <template slot="top" slot-scope="props">
            <div class="row full-width">
      
              <div class="col-12 col-md-6 q-mt-sm">
                <div class="col-12 col-md-6">
                  <!-- Table Title -->
                  <h1 class="q-headline text-dark">
                    Lista de Ordenes
                  </h1>
                  <!-- Table Filter-->
                  <div class="col-12 q-mt-sm">
                    <!--By Estado-->
                    <div class="cont-vue-tree">
                      <q-select
                        @input="getDataTable()"
                        placeholder="Seleccionar Orden"
                        v-model="table.filter.inspection_status"
                        :options="optionsTypesInspectionsStatuesFiltered"
                        class="bg-white q-py-sm q-my-md"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
  
          <!-- Table Custom Field -->
          <q-td
            slot="body-cell-datos"
            slot-scope="props"
            :props="props">
            <div>
              <div>
        
                <router-link
                  tag="div"
                  class="row gutter-x-md"
                  :to="{name: 'update.inspection',params: {inspection: props.row.id}}"
                  style="cursor: pointer">
                  <div class="col-md-0 flex flex-center">
                    <q-icon name="fas fa-circle"></q-icon>
                  </div>
                  <div class="col-md-2">
  
                    <div
                      :style="`background-image: url(${getUrlImage(props.row.gallery)});`"
                      class="img">
                      <q-chip
                        class="text-dark"
                        color="primary"
                        style="position:absolute; bottom: -1px ; border-radius: 0px 0px 5px 5px; width: 100%; text-align: center">
                        <b>{{ props.row.vehicle.board | uppercase }}</b>
                      </q-chip>
                    </div>
                  </div>

                  <div class="col-md-4 q-py-lg">
                    {{props.row.created_at_date+' '+props.row.created_at_time}} <br>
                    Tipo de Servicio: <b>{{ props.row.vehicle.service_type_text | uppercase }}</b> <br>
                    Tipo de Vehiculo: <b>{{ props.row.vehicle.type_vehicle_text | uppercase }}</b> <br>
                    Cliente: <b>{{ props.row.vehicle.user.fullname | uppercase }}</b> <br>
                    Estado: <b>{{ props.row.inspection_status }}</b> <br>
                  </div>
                </router-link>
      
              </div>
            </div>
          </q-td>
          
        </q-table>
      </div>
      
      <!-- Looading -->
      <inner-loading :visible="loading" />
      
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import innerLoading from 'src/components/master/innerLoading'

  import config from 'src/config/index'
  
  export default {
    components:{
      innerLoading
    },
    data(){
      return{
          model:'',
        table:{
          data:[],
          columns:[
            {
              name: 'datos',
              required: true,
              label: '',
              align: 'left',
              field: 'datos',
            },
          ],
          pagination: {
            page: 1,
            rowsNumber: '',
            rowsPerPage: 10
          },
          filter:{
            board: null,
            inspection_status: 0,
          },
        },
        loading:false,
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.$store.commit('data/LOAD_FALSE')
        this.getDataTable()

        if(this.$store.state.auth.userData.permissions['icda.inspections.checkIn']){
          this.inspection_statues.status = 1
        }
        
      })
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
    filters: {
      img: function(gallery) {
        return gallery ? config('api.base_url') +'/'+ gallery[0]  : 'assets/imagen.png';
      }
    },
    methods:{
     getUrlImage(img){
         return img ? config('api.base_url') +'/'+ img[0]  : 'assets/imagen.png'
     },
      getDataTable() {
        this.getdata({pagination: this.table.pagination, filter:this.table.filter})
      },
    getdata({pagination, filter}) {
      this.loading = true
      this.$resourcesInspections.index(filter, pagination.rowsPerPage, pagination.page)
      .then(response => {
        //console.warn(response.data)
        this.table.data = response.data
        this.table.pagination.page = response.meta.page.currentPage
        this.table.pagination.rowsNumber = response.meta.page.total
        this.table.pagination.rowsPerPage = pagination.rowsPerPage
        this.loading = false
      }).catch(error=>{
        this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
        this.loading = false
      })
    },
    }
  }
</script>

<style scoped lang="stylus">
  @import "~variables";
  .img
    position relative
    background #dddddd52
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%
    height 150px
    border: 1px solid #dddddd52
    border-radius 8px
</style>

