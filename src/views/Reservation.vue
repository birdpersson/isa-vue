<script>
import axios from "axios";
export default {
  name: "Reservation",
  data() {
    return {
      id: this.$route.params.id,
      cabin: {
        name: "",
        address: "",
        description: "",
        amenities: [],
        people: null,
        price: null,
        cost: null,
        rules: "",
      },
      reservation: {
        amenities: [],
        people: null,
        price: null,
        start: null,
        days: null,
      },
      amenities: [],
    };
  },
  methods: {
    adjustPrice() {
      this.reservation.price =
        this.reservation.days *
        (this.cabin.price + (this.reservation.people - 1) * this.cabin.cost);
    },
    adjustAmenities() {
      this.amenities.forEach((amenity) => {
        this.reservation.price = this.reservation.price + amenity.price;
        this.reservation.amenities.push(amenity.name);
      });
    },
    create() {
      this.adjustPrice();
      this.adjustAmenities();
      console.log(this.reservation);

      axios
        .post(`http://localhost:8080/cabin/${this.id}/reservation`, {
          start: Date.parse(this.reservation.start) / 1000,
          duration: this.reservation.days,
          people: this.reservation.people,
          price: this.reservation.price,

          amenities: this.reservation.amenities,
        })
        .then((Response) => console.log(Response));
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8080/cabin/${this.$route.params.id}`)
      .then((Response) => (this.cabin = Response.data));
  },
};
</script>

<template>
  <div id="cabin-reservation">
    <div class="card-body" id="main">
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

      <div class="card-header">
        <h3>Create Reservation</h3>
      </div>
      <h4>Select Start:</h4>
      <b-form inline @submit="create">
        <b-form-input
          type="datetime-local"
          v-model="reservation.start"
          class="mb-2 mr-sm-2 mb-sm-0"
        ></b-form-input>
        <b-input-group prepend="+" append="days" class="mb-2 mr-sm-2 mb-sm-0"
          ><b-form-input
            type="number"
            @change="adjustPrice"
            v-model="reservation.days"
            placeholder="Stay Duration"
          ></b-form-input>
        </b-input-group>
        <b-input-group prepend="#" class="mb-2 mr-sm-2 mb-sm-0"
          ><b-form-input
            type="number"
            @change="adjustPrice"
            v-model="reservation.people"
            placeholder="People"
          ></b-form-input>
        </b-input-group>
        <b-button type="submit" variant="primary">Reserve</b-button>
      </b-form>
      <br />
      <h4>Aditional options:</h4>
      <ul v-for="amenity in cabin.amenities" :key="amenity.id">
        <li>
          <input :value="amenity" type="checkbox" v-model="amenities" />
          {{ amenity.name }} +{{ amenity.price }}$
        </li>
      </ul>
    </div>
    <h4>Price &#40;without aditions&#41;: ={{ reservation.price }}$</h4>
  </div>
</template>

<style>
</style>