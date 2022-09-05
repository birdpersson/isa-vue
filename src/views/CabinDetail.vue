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
        promotions: [],
        reviews: [],
        images: [],
        people: null,
        price: null,
        cost: null,
        rules: "",
      },
    };
  },
  methods: {
    reserve(id) {
      axios
        .put(`http://localhost:8080/reservation/${id}/claim`)
        .then((Response) => console.log(Response));
    },
    follow() {},
    unfollow() {},
  },
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

<template>
  <div id="cabin-detail">
    <div class="container" id="main">
      <div class="card-header">
        <h3>Details</h3>
      </div>
      <h5>Cabin: {{ cabin.name }}</h5>
      <h5>Address: {{ cabin.address }}</h5>
      <h5>Max Occupants: {{ cabin.people }} people</h5>
      <h5>Base Price &#40;for one person&#41;: ${{ cabin.price }}</h5>
      <h5>
        Added cost &#40;per each additional person&#41;: ${{ cabin.cost }}
      </h5>

      <b-button @click="follow">Follow</b-button>
      <b-button @click="unfollow">Unfollow</b-button>

      <div class="card-header">
        <h4>Cabin Promotions</h4>
      </div>
      <table class="table">
        <thead>
          <th>Price</th>
          <th>People</th>
          <th>Start</th>
          <th>End</th>
          <th>Expires</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="promotion in cabin.promotions" :key="promotion.id">
            <td>${{ promotion.price }}</td>
            <td>#{{ promotion.people }}</td>
            <td>{{ new Date(promotion.start * 1000) }}</td>
            <td>{{ new Date(promotion.end * 1000) }}</td>
            <td>{{ new Date(promotion.expiry * 1000) }}</td>
            <td><b-button @click="reserve(promotion.id)">Reserve</b-button></td>
          </tr>
        </tbody>
      </table>

      <div class="card">
        <div class="card-header">
          <h4>Cabin Reviews</h4>
        </div>

        <div v-for="review in cabin.reviews" :key="review.id">
          <div style="margin-bottom: 10px">
            <p>{{ review.rating }} Stars</p>
          </div>
          <p>{{ review.comment }}</p>
          <small class="text-muted">Posted by {{ review.username }}</small>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>