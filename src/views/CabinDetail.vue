<template>
  <div id="cabin-detail">

    <!-- <header class="container">
      <div id="carousel-images" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="carousel-images" data-slide-to="0" class="active"></li>
          <li data-target="carousel-images" data-slide-to="1"></li>
          <li data-target="carousel-images" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
          <div class="carousel-item active" :style="{'background-image': 'url(' + this.cabin.images[0] + ')'}"></div>
        </div>
      </div>
    </header> -->

    <div>
      <b-carousel>
        <!-- <b-carousel-slide :key="img" v-for="img in this.cabin.images"></b-carousel-slide> -->
        <b-carousel-slide caption="Test" img-src="https://picsum.photos/1024/480/?image=12"></b-carousel-slide>
        <b-carousel-slide img-src="http://localhost:8080/uploads/6cca220d-3b5b-41f3-ab61-2e6fa82ee996.png"></b-carousel-slide>

      </b-carousel>
    </div>

    <div class="card-body">
      <div class="card-header">
        <h4>Details</h4>
      </div>

      <h3 class="card-title">Cabin:
        {{ cabin.name }}
      </h3>
      <h3 class="card-title">Address:
        {{ cabin.address }}
      </h3>
      <h3 class="card-title">About:
        {{ cabin.description }}
      </h3>

      <h3 class="card-title">Rooms:
        {{ cabin.rooms }}
      </h3>
      <h3 class="card-title">Beds Per Room:
        {{ cabin.beds }}
      </h3>
      
      <h3 class="card-title">House Rules:
        {{ cabin.rules }}
      </h3>
      <h3 class="card-title">Price List:
        {{ cabin.priceList }}
      </h3>

    </div>
  </div>
</template>

<script>
import axios from "axios";
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
        priceList: "",
      },
    };
  },
  methods: {},
  created() {
    axios
      .get(`http://localhost:8080/cabin/${this.$route.params.id}`)
      .then((Response) => {
        console.log(Response.data);
        this.cabin = Response.data;
      });
  },
};
</script>

<style>
</style>