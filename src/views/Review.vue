<template>
  <div id="review">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="col-md-8 col-lg-6">
          <div class="container" id="page-title">
            <h2>Leave Review</h2>
          </div>
          <div class="py-5">
            <div class="container">
              <div class="row">
                <div class="col-md-9 col-lg-8 mx-auto">
                  <div class="container" id="main">
                    <b-form @submit="create">
                      <b-form-group label="Rating:">
                        <b-form-rating v-model="review.rating"></b-form-rating>
                      </b-form-group>
                      <b-form-group label="Comment: ">
                        <b-form-textarea v-model="review.comment">
                        </b-form-textarea>
                      </b-form-group>
                      <b-button type="submit" variant="primary"
                        >Submit
                      </b-button>
                    </b-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Review",
  data() {
    return {
      id: this.$route.params.id,
      review: {
        rating: null,
        comment: "",
      },
    };
  },
  methods: {
    create() {
      axios
        .post(`http://localhost:8080/cabin/${this.id}/review`, this.review)
        .then((Response) => console.log(Response));
    },
  },
};
</script>

<style>
</style>