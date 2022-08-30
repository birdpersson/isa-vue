<template>
  <div id="cabin-reservation">
    <h1>Create Reservation</h1>
    <div class="card-body">
      <div class="card-header">
        <h4>Details</h4>
      </div>

      <h3 class="card-title">
        Cabin:
        {{ cabin.name }}
      </h3>
      <h3 class="card-title">
        Address:
        {{ cabin.address }}
      </h3>
      <h3 class="card-title">
        About:
        {{ cabin.description }}
      </h3>

      <h3 class="card-title">
        Rooms:
        {{ cabin.rooms }}
      </h3>
      <h3 class="card-title">
        Beds Per Room:
        {{ cabin.beds }}
      </h3>

      <h3 class="card-title">
        House Rules:
        {{ cabin.rules }}
      </h3>
      <h3 class="card-title">
        Price List:
        {{ cabin.priceList }}
      </h3>

      <form>
        <div class="form-group">
          <label>Select Checkin Date</label>
          <input type="datetime-local" v-model="reservation.start" />
        </div>
        <div class="form-group">
          <label>Select Stay Duration</label>
          <input type="number" v-model="reservation.days" />
        </div>
        <div class="form-group">
          <label>People</label>
          <input type="number" v-model="reservation.people" />
        </div>

        <button @click="create(reservation)" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

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

        rooms: "",
        beds: "",

        rules: "",
        priceList: "",
      },
      reservation: {
        people: "",
        price: "",
        start: "",
        days: "",
      },
    };
  },
  methods: {
    create(reservation) {
      console.log(reservation);

      axios
        .post(`http://localhost:8080/cabin/${this.id}/reservation`, {
          people: reservation.people,
          price: reservation.price,
          start: Date.parse(reservation.start) / 1000,
          days: reservation.days,
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

<style>
</style>