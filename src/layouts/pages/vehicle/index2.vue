<template>
  <div class="layout-padding">
    <div class="relative-position">
      <div class="col-12">
        <!-- Table -->
        <q-table
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
                    <q-icon name="fas fa-car-side"></q-icon>
                    Lista de Vehículos
                  </h1>
  
                  <!-- Table Search -->
                  <q-search
                    placeholder="Buscar Por Placa"
                    inverted
                    
                    color="white"
                    class="text-dark w-100 uppercase"
                    hide-underline
                    clearable
                    v-model="table.filter.board"
                    @input="getDataTable()"></q-search>
                  
                </div>
              </div>
  
              <!-- Table btn Refresh Data -->
              <div class="col-12 col-md-6 q-mt-sm text-right">
  
                <q-btn
                  :to="{ name: 'vehicles.create'}"
                  icon="add"
                  color="red"
                  round
                  class="q-ml-xs">
                  <q-tooltip :delay="300">Agregar Vehículo</q-tooltip>
                </q-btn>
                
                <q-btn
                  @click="getDataTable()"
                  icon="fas fa-sync-alt"
                  color="info"
                  class="q-ml-xs"
                  rounded flat>
                  <q-tooltip :delay="300">Refrescar Datos</q-tooltip>
                </q-btn>
              </div>
              
            </div>
          </template>
  
          <!-- Table Custom Field -->
          <q-td
            slot="body-cell-datos"
            slot-scope="props"
            :props="props">
            <div class="row">
              <div class="q-mr-md">
                <q-icon name="fas fa-circle"></q-icon>
              </div>
              <div>
  
                <router-link
                  tag="span"
                  :to="{ name:'vehicles.update',params:{board: props.row.board}}"
                  style="cursor: pointer">
                  
                  <p class="q-timeline-subtitle">
                    {{props.row.created_at_date+' '+props.row.created_at_time}}
                  </p>
                  <b class="mb-0">
                    {{props.row.board}} | {{props.row.model}}
                  </b>
                  <p class="mb-0">
                    <b>Marca: </b>
                    {{ props.row.brand ? props.row.brand : 'N/D' }}
                  </p>
                  <p class="mb-0">
                    <b>Tipo de Servicio: </b>
                    {{ props.row.service_type_text ? props.row.service_type_text : 'N/D' }}
                  </p>
                  <p class="mb-0">
                    <b>Tipo de Vehículo: </b>
                    {{ props.row.type_vehicle_text ? props.row.type_vehicle_text : 'N/D' }}
                  </p>
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
  import innerLoading from 'src/components/master/innerLoading'
  
  export default {
    components:{
      innerLoading
    },
    data(){
      return{
        table:{
          data:[],
          columns:[
            {
              name: 'datos', required: true,
              label: '', align: 'left',
              field: 'datos',
            },
          ],
          pagination: {
            page: 1,
            rowsNumber: '',
            rowsPerPage: 10
          },
          filter:{
            board: null
          },
        },
        loading:false,
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.$store.commit('data/LOAD_FALSE')
        this.getDataTable()
      })
    },
    methods:{
      getDataTable() {
        this.getdata({pagination: this.table.pagination, filter:this.table.filter})
      },
      getdata({pagination, filter}) {
        this.loading = true
        this.$resourcesVehicles.index(filter, pagination.rowsPerPage, pagination.page)
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

<style scoped>
  .border-top-color {
    border-top: 3px solid var(--q-color-primary);
  }
</style>
