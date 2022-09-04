<template>
  <div id="cabins">
    <div class="card-body">
      <div class="card-header">
        <h4>Cabins</h4>
      </div>

      <form class="form-inline" id="search">
        <label>Start</label>
        <input type="datetime-local" v-model="searchQuerry.start" />
        <label>Days</label>
        <input type="number" v-model="searchQuerry.days" />
        <label>People</label>
        <input type="number" v-model="searchQuerry.people" />
        <label>Address</label>
        <input type="text" v-model="searchQuerry.address" />

        <button type="button" @click="search(searchQuerry)">Search</button>
      </form>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>

            <th>Rating</th>
            <th>Guests</th>

            <th>Price</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="cabin.id" v-for="cabin in cabins">
            <td>{{ cabin.name }}</td>
            <td>{{ cabin.address }}</td>

            <td>{{ cabin.rating }}</td>
            <td>{{ cabin.people }}</td>

            <td>{{ cabin.price }}</td>
            <td>{{ cabin.cost }}</td>

            <td>
              <button @click="reserve(cabin.id)">Reserve</button>
            </td>

            <td>{{ new Date(cabin.availabilityStart * 1000) }}</td>
            <td>{{ new Date(cabin.availabilityEnd * 1000) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Cabins",
  data() {
    return {
      searchQuerry: {
        name: "",
        address: "",
        people: "",
        start: "",
        days: "",
      },
      filterQuerry: {},
      cabins: [],
    };
  },
  methods: {
    search: function (searchQuerry) {
      console.log(searchQuerry);
      axios
        .post("http://localhost:8080/cabin/search", {
          name: searchQuerry.name,
          address: searchQuerry.address,
          people: searchQuerry.people,
          start: Date.parse(searchQuerry.start) / 1000,
          days: searchQuerry.days,
        })
        .then((Response) => (this.cabins = Response.data));
    },
    filter: function (filterQuerry) {
      console.log(filterQuerry);
    },
    reserve: function (id) {
      this.$router.push("/cabin/" + id + "/reservation");
    },
  },
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