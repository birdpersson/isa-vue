<script>
import axios from "axios";
export default {
  name: "Cabins",
  data() {
    return {
      searchQuery: {
        name: "",
        address: "",
        people: "",
        start: "",
        days: null,
      },
      query: "?",
      filterQuery: {},
      cabins: [],
    };
  },
  methods: {
    search() {
      console.log(this.searchQuery);
      axios
        .post("http://localhost:8080/cabin/search", {
          start: Date.parse(this.searchQuery.start) / 1000,
          days: this.searchQuery.days,
          people: this.searchQuery.people,
        })
        .then((Response) => (this.cabins = Response.data));
    },
    filter: function (filterQuerry) {
      console.log(filterQuerry);
    },
    reserve: function (id) {
      this.$router.push("/cabin/" + id + "/reservation");
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
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

<template>
  <div id="cabins">
    <div class="card-body">
      <div class="card-header">
        <h4>Cabins</h4>
      </div>

      <b-form inline @submit="search">
        <b-form-input
          type="datetime-local"
          v-model="searchQuery.start"
          class="mb-2 mr-sm-2 mb-sm-0"
        ></b-form-input>
        <b-input-group prepend="+" append="days" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input
            type="number"
            v-model="searchQuery.days"
            placeholder="Stay Duration"
          ></b-form-input>
        </b-input-group>
        <b-input-group prepend="#" class="mb-2 mr-sm-2 mb-sm-0"
          ><b-form-input
            type="number"
            v-model="searchQuery.people"
            placeholder="People"
          ></b-form-input>
        </b-input-group>
        <b-button type="submit">Search</b-button>
      </b-form>

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
              <b-button @click="reserve(cabin.id)">Reserve</b-button>
            </td>

            <td>{{ cabin.availableFrom }}</td>
            <td>{{ cabin.availableTo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>