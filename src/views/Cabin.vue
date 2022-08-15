<template>
  <div id="cabin">
    


    <div class="card-body">
      <div class="card-header">
        <h4>Details</h4>
      </div>

      <h3 class="card-title">
        {{cabin.name}}
      </h3>

    </div>



  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Cabin",
  data() {
    return {
      id: this.$route.params.id,
      cabin: {
        name: "",
        address: "",
        description: "",

        images: [],
        rooms: "",
        beds: "",

        rules: "",
        priceList: ""
      }
    }
  },
  methods: {
    
  },
  created() {
    axios
      .get(`http://localhost:8080/cabin/${this.$route.params.id}`)
      .then((Response) => {
        console.log(Response.data);
        this.cabin = Response.data;
      })
  },
}
</script>

<style>

</style>