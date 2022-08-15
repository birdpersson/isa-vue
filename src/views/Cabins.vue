<template>
  <div id="cabins">
    <div class="card-body">
      <div class="card-header">
        <h4>Cabins</h4>
      </div>

      <h3 class="card-title">
        <table class="table">
          <thead>
            <tr>
              Cabins
            </tr>
          </thead>
          <tbody>
            <tr :key="cabin.id" v-for="cabin in cabins">
              <td>{{ cabin.name }}</td>
              <td>{{ cabin.availableFrom }}</td>
            </tr>
          </tbody>
        </table>

      </h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Cabins",
  data() {
    return {
      cabins: [],
      // cabin: {
      //   name: "",
      //   address: "",
      //   description: "",

      //   images: [],
      //   rooms: "",
      //   beds: "",

      //   rules: "",
      //   priceList: "",
      // },
    };
  },
  methods: {},
  created() {
    axios.get("http://localhost:8080/cabin/").then((Response) => {
      console.log(Response.data);
      this.cabins = Response.data;
    });
  },
};
</script>

<style>
</style>