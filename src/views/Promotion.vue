<script>
import axios from "axios";
export default {
  name: "Promotion",
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
      promotion: {
        amenities: [],
        expiry: null,
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
      this.promotion.price =
        this.promotion.days *
        (this.cabin.price + (this.promotion.people - 1) * this.cabin.cost);
    },
    adjustAmenities() {
      this.amenities.forEach((amenity) => {
        this.promotion.price = this.promotion.price + amenity.price;
        this.promotion.amenities.push(amenity.name);
      });
    },
    create() {
      this.adjustAmenities();
      console.log(this.promotion);

      axios
        .post(`http://localhost:8080/cabin/${this.id}/promotion`, {
          start: Date.parse(this.promotion.start) / 1000,
          duration: this.promotion.days,
          expiry: Date.parse(this.promotion.expiry) / 1000,
          people: this.promotion.people,
          price: this.promotion.price,

          amenities: this.promotion.amenities,
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
  <div id="cabin-promotion">
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
        <h3>Create Promotion</h3>
      </div>
      <h4>Select Start:</h4>
      <b-form inline @submit="create">
        <b-form-input
          type="datetime-local"
          v-model="promotion.start"
          class="mb-2 mr-sm-2 mb-sm-0"
        ></b-form-input>
        <b-input-group prepend="+" append="days" class="mb-2 mr-sm-2 mb-sm-0"
          ><b-form-input
            type="number"
            @change="adjustPrice"
            v-model="promotion.days"
            placeholder="Stay Duration"
          ></b-form-input>
        </b-input-group>
        <b-input-group prepend="#" class="mb-2 mr-sm-2 mb-sm-0"
          ><b-form-input
            type="number"
            @change="adjustPrice"
            v-model="promotion.people"
            placeholder="People"
          ></b-form-input>
        </b-input-group>
      </b-form>
      <br />
      <h4>Select Expiry:</h4>
      <b-form inline @submit="create">
        <b-form-input
          type="datetime-local"
          v-model="promotion.expiry"
          class="mb-2 mr-sm-2 mb-sm-0"
        ></b-form-input>
        <b-input-group prepend="$" class="mb-2 mr-sm-2 mb-sm-0"
          ><b-form-input
            type="number"
            v-model="promotion.price"
            placeholder="Price"
          ></b-form-input>
        </b-input-group>
        <b-button type="submit" variant="primary">Create</b-button>
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
    <h4>Price &#40;without aditions&#41;: ={{ promotion.price }}$</h4>
  </div>
</template>

<style>
</style>