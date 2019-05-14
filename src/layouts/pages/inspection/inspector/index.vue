<template>
  <div class="row q-pt-lg">
    <div class="col-md-4 border-left">
      <ordersComponent 
        title="En Espera"
        :filter="{inspection_status:0,order:{field:created_at,way:desc}}"/>
    </div>
    <div class="col-md-4 border-left">
      <ordersComponent 
        title="Revisado"
        :filter="{inspection_status:1,order:{field:created_at,way:desc}}"/>
    </div>
    <div class="col-md-4 border-left">
      <ordersComponent 
        title="Facturado"
        :filter="{inspection_status:2,order:{field:created_at,way:desc}}"/>
    </div>
  </div>
</template>

<script>
  import ordersComponent from 'src/components/inspection/orders'
  export default {
    components:{
      ordersComponent
    }
  }
</script>
<style>
  .border-left{
    border-right: 1px #c4c4c4 solid;
  }
</style>
