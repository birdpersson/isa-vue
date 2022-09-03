<script>
import axios from "axios";
export default {
  name: "CabinUpdate",
  data() {
    return {
      id: this.$route.params.id,
      amenity: {
        name: "",
        price: null,
      },
      cabin: {
        name: "",
        address: "",
        description: "",
        availableFrom: "",
        availableTo: "",
        amenities: [],
        images: [],
        people: null,
        price: null,
        cost: null,
        rules: "",
      },
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
    addAmenity() {
      axios
        .post(`http://localhost:8080/cabin/${this.id}/amenity`, this.amenity)
        .then((Response) => (this.cabin.amenities = Response.data.amenities));
    },
    update(cabin) {
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
            <h2>Update Cabin</h2>
          </div>
          <div class="py-5">
            <div class="container">
              <div class="row">
                <div class="mx-auto">
                  <div class="container" id="main">
                    <b-form @submit="update">
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
                      <b-button type="submit" variant="primary">
                        Update
                      </b-button>
                    </b-form>
                    <br />
                    <h4>Availability:</h4>
                    <b-form inline>
                      <b-form-input
                        type="datetime-local"
                        v-model="cabin.availableFrom"
                        class="mb-2 mr-sm-2 mb-sm-0"
                      ></b-form-input>
                      <b-form-input
                        type="datetime-local"
                        v-model="cabin.availableTo"
                        class="mb-2 mr-sm-2 mb-sm-0"
                      ></b-form-input>
                    </b-form>
                    <br />
                    <h4>Pricelist</h4>
                    <b-form inline>
                      <b-input-group append="$" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input
                          type="number"
                          v-model="cabin.price"
                        ></b-form-input>
                      </b-input-group>
                      <b-input-group prepend="+" append="$">
                        <b-form-input
                          type="number"
                          v-model="cabin.cost"
                        ></b-form-input>
                      </b-input-group>
                    </b-form>
                    <br />
                    <h4>Add Amenity:</h4>
                    <b-form inline @submit="addAmenity">
                      <b-form-input
                        v-model="amenity.name"
                        class="mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Name"
                      ></b-form-input>
                      <b-input-group
                        prepend="+"
                        append="$"
                        class="mb-2 mr-sm-2 mb-sm-0"
                        ><b-form-input
                          type="number"
                          v-model="amenity.price"
                          placeholder="Price"
                        ></b-form-input>
                      </b-input-group>
                      <b-button type="submit" variant="primary">
                        Save
                      </b-button>
                    </b-form>
                    <br />
                    <h4>Aditional Options:</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Amenity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="amenity in this.cabin.amenities"
                          :key="amenity.id"
                        >
                          <td>{{ amenity.name }}</td>
                          <td>+{{ amenity.price }}$</td>
                        </tr>
                      </tbody>
                    </table>
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