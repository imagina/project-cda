<template>
  <div class="">
    <div class="row">
      <div class="col-md-12">
        <h5 class="text-center">{{title | uppercase}}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 flex flex-center">

        <q-scroll-area style="width: 400px; height: 800px;">
          <div class="flex flex-center">
          <q-card
            class="shadow-0"
            style="width:95%"
            inline
            v-for="(order, index) in orders"
            :key="index">
            <q-card-title>
              Matricula: <b>{{ order.vehicle.board  | uppercase  }}</b> <br>
              <div slot="right" class="row items-center">
                <q-icon name="style" /> {{ order.inspection_status }}
              </div>
            </q-card-title>
            <q-card-main>
              <p>
                <b>
                  {{ order.vehicle.user.fullname | uppercase }}
                </b>
              </p>
              <div class="text-faded">
                <div class="row">
                  <div class="col-md-6">
                    Tipo de Servicio:
                  </div>
                  <div class="col-md-6">
                    <b>{{ order.vehicle.service_type_text  }}</b>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    Tipo de Vehiculo:
                  </div>
                  <div class="col-md-6">
                    <b>{{ order.vehicle.type_vehicle_text  }}</b>
                  </div>
                </div>
              </div>
            </q-card-main>
            <q-card-separator />
            <q-card-actions>
              <q-btn
                :to="{
                  name: 'update.inspection',
                  params: {
                    inspection: order.id
                  }
                }"
                rounded
                color="primary"
                label="VER"
                class="full-width"/>
            </q-card-actions>
          </q-card>
        </div>
        </q-scroll-area>
      </div>
    </div>
    <q-inner-loading :visible="visible">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>
    <notificationComponent @newInspection="handlenewInspection()"/>
  </div>
</template>

<script>
  import notificationComponent from 'src/components/inspection/notification'
  import service from 'src/services/inspections'
  import config from 'src/config/index'
  export default {
    components:{
      notificationComponent
    },
    props:{
      filter:{
        type:Object,
        default:{}
      },
      title:{
        type:String,
        default:'Default'
      }
    },
    data(){
      return{
        visible: false,
        orders:[]
      }
    },
    filters: {
    	img: function(gallery) {
    		return gallery ? config('api.base_url') +'/'+ gallery[0]  : 'assets/imagen.png';
    	}
    },
    created(){
      this.$root.$on("newInspection", this.getOrders);
    },
    mounted(){
      this.getOrders()
    },
    methods:{
      getOrders(){
        this.visible = true
        service.index(this.filter)
        .then(response=>{
          this.orders = response.data
          this.visible = false
        })
        .catch(error=>{
          console.warn(error)
          this.visible = false
        })
      },
      handlenewInspection(){
        this.getOrders()
      }
    }
  }
</script>
