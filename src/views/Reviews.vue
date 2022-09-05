<script>
import axios from "axios";
export default {
  name: "Reviews",
  data() {
    return {
      reviews: [],
    };
  },
  methods: {
    accept: function (id) {
      axios
        .put(`http://localhost:8080/review/${id}/accept`)
        .then((Response) => console.log(Response));
    },
    reject: function (id) {
      axios
        .put(`http://localhost:8080/review/${id}/reject`)
        .then((Response) => console.log(Response));
    },
  },
  created() {
    axios.get("http://localhost:8080/review/").then((Response) => {
      console.log(Response.data);
      this.reviews = Response.data;
    });
  },
};
</script>

<template>
  <div id="reviews">
    <div class="card-header">
      <h4>Reviews</h4>
    </div>
    <div class="container" id="main">
      <table>
        <thead>
          <th>Rating</th>
          <th>Comment</th>
          <th>Cabin Name</th>
          <th>Username</th>
          <th>Accept</th>
          <th>Reject</th>
        </thead>
        <tbody>
          <tr :key="review.id" v-for="review in reviews">
            <td>{{ review.rating }}</td>
            <td>{{ review.comment }}</td>
            <td>{{ review.cabinName }}</td>
            <td>{{ review.username }}</td>
            <td><button @click="accept(review.id)">Accept</button></td>
            <td><button @click="reject(review.id)">Reject</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>