<script>
import axios from "axios";
export default {
  name: "CabinUpdate",
  data() {
    return {
      id: this.$route.params.id,
      cabin: {
        name: "",
        address: "",
        description: "",

        availableFrom: "",
        availableTo: "",

        images: [],
        people: null,
        price: null,
        cost: null,
        rules: "",
      },
      availableFrom: "",
      availableTo: "",
    };
  },
  created() {
    axios.get(`http://localhost:8080/cabin/${this.id}`).then((Response) => {
      this.cabin = Response.data;
      this.cabin.availableFrom = Response.data.availableFrom.slice(0, -1);
      this.cabin.availableTo = Response.data.availableTo.slice(0, -1);
    });
  },
  methods: {
    test: function () {
      var d = new Date().toISOString;
      console.log(d);
    },
    update: function (cabin) {
      axios
        .put(`http://localhost:8080/cabin/${this.id}`, {
          name: cabin.name,
          address: cabin.address,
          description: cabin.description,
          availableFrom: Date.parse(cabin.availableFrom) / 1000,
          availableTo: Date.parse(cabin.availableTo) / 1000,
          people: cabin.people,
          price: cabin.price,
          cost: cabin.cost,
          rules: cabin.rules,
        })
        .then((Response) => console.log(Response));
    },
    upload() {
      if (this.cabin.images != null) {
        let contentType = {
          Headers: { "Content-Type": "multipart/form-data" },
        };
        axios
          .post(
            "http://localhost:8080/cabin/" + this.id,
            this.cabin.images,
            contentType
          )
          .then((Response) => {
            console.log(Response);
          });
      }
    },
    uploadImage(e) {
      this.cabin.images = e.target.files;
      let formData = new FormData();
      for (let i = 0; i < this.cabin.images.length; i++) {
        formData.append(
          "image",
          this.cabin.images[i],
          this.cabin.images[i].name
        );
      }
      this.cabin.images = formData;
    },
  },
};
</script>

<template>
  <div id="cabin-edit">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="col-md-8 col-lg-6">
          <div class="container" id="page-title">
            <h3>Update Cabin</h3>
          </div>
          <div class="login d-flex alignlogin d-flex align-items-center py-5">
            <div class="container">
              <div class="row">
                <div class="col-md-9 col-lg-8 mx-auto">
                  <div class="container" id="main">
                    <form>
                      <div class="form-group">
                        <label>Name:</label>
                        <input
                          type="text"
                          v-model="cabin.name"
                          class="form-control"
                          placeholder="Enter cabin name"
                        />
                      </div>

                      <div class="form-group">
                        <label>Address:</label>
                        <input
                          type="text"
                          v-model="cabin.address"
                          class="form-control"
                          placeholder="Enter cabin address"
                        />
                      </div>

                      <div class="form-group">
                        <label>Description:</label>
                        <textarea
                          v-model="cabin.description"
                          class="form-control"
                          placeholder="Describe the cabin (rooms, beds...)"
                        ></textarea>
                      </div>

                      <div class="form-group">
                        <label>Occupants:</label>
                        <input
                          type="number"
                          v-model="cabin.people"
                          placeholder="Rooms × Beds (per room)"
                          class="form-control"
                        />
                      </div>

                      <div class="form-group">
                        <label>Base Price:</label>
                        <input
                          type="number"
                          v-model="cabin.price"
                          placeholder="Price for one person (per day)"
                          class="form-control"
                        />
                      </div>

                      <div class="form-group">
                        <label>Additional Cost:</label>
                        <input
                          type="number"
                          v-model="cabin.cost"
                          placeholder="Price for each additional person (per day)"
                          class="form-control"
                        />
                      </div>

                      <div class="form-group">
                        <label>Available From:</label>
                        <input
                          type="datetime-local"
                          v-model="cabin.availableFrom"
                          class="form-control"
                        />
                      </div>

                      <div class="form-group">
                        <label>Available To:</label>
                        <input
                          type="datetime-local"
                          v-model="cabin.availableTo"
                          class="form-control"
                        />
                      </div>

                      <div class="form-group">
                        <label for="RulesArea">House Rules:</label>
                        <textarea
                          v-model="cabin.rules"
                          class="form-control"
                          id="RulesArea"
                        ></textarea>
                      </div>

                      <div class="form-group">
                        <label for="InputFile">Images:</label>
                        <input
                          type="file"
                          @change="uploadImage"
                          class="form-control-file"
                          multiple
                          id="InputFile"
                        />
                      </div>

                      <button
                        type="button"
                        @click="create(cabin)"
                        class="btn btn-primary"
                      >
                        Submit
                      </button>
                    </form>
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
<style>
</style>