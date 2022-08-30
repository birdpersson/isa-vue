<template>
  <div id="cabin-new">
    <div class="container" id='page-title'>
      <h1>Create Cabin</h1>
    </div>

    <div class="container" id='main'>
      
      <form>
        <div class="form-group">
          <label for="NameInput">Name</label>
          <input type="text" v-model="cabin.name" class="form-control" id="NameInput" placeholder="Enter name">
        </div>

        <div class="form-group">
          <label for="AddressInput">Address</label>
          <input type="text" v-model="cabin.address" class="form-control" id="AddressInput" placeholder="Enter address">
        </div>

        <div class="form-group">
          <label for="DescriptionArea">Description</label>
          <input type="text" v-model="cabin.description" class="form-control" id="DescriptionArea" placeholder="Enter description">
        </div>

        <div class="form-group">
          <label for="InputFile">Images</label>
          <input type="file" @change="uploadImage" class="form-control-file" multiple id="InputFile">
        </div>

        <div class="form-group">
          <label for="FromPicker">Available From</label>
          <input type="datetime-local" v-model="cabin.availableFrom" class="form-control" id="FromPicker">
        </div>

        <div class="form-group">
          <label for="ToPicker">Available To</label>
          <input type="datetime-local" v-model="cabin.availableTo" class="form-control" id="ToPicker">
        </div>

        <div class="form-group">
          <label for="RulesArea">Rules</label>
          <textarea v-model="cabin.rules" class="form-control" id="RulesArea" rows="4"></textarea>
        </div>

        <button type="button" @click="create(cabin)" class="btn btn-primary">Submit</button>

      </form>

    </div>
  </div>

</template>

<script>
import axios from 'axios';
export default {
  name: "CabinCreate",
  data() {
    return {
      cabin: {
        name: '',
        address: '',
        description: '',

        availableFrom: '',
        availableTo: '',

        images: [],
        rooms: null,
        beds: null,

        rules: '',
        priceList: ''
      }
    }
  },
  methods: {
    create: function (cabin) {
      console.log(cabin);

      axios
        .post("http://localhost:8080/cabin/", {
          name: cabin.name,
          address: cabin.address,
          description: cabin.description,
          availableFrom: Date.parse(cabin.availableFrom) / 1000,
          availableTo: Date.parse(cabin.availableTo) / 1000,
          priceList: cabin.priceList,
          rules: cabin.rules,
          rooms: cabin.rooms,
          beds: cabin.beds,
        })
        .then((Response) => {
          console.log(Response);
          if (this.cabin.images != null) {
            let contentType = {
              Headers: { "Content-Type": "multipart/form-data" }
            }
            axios
              .post("http://localhost:8080/cabin/" + Response.data.id, this.cabin.images, contentType)
              .then((Response) => {
                console.log(Response);
              });
          }
        });
    },
    uploadImage(e) {
      this.cabin.images = e.target.files;
      let formData = new FormData();
      for (let i = 0; i < this.cabin.images.length; i++) {
        formData.append('image', this.cabin.images[i], this.cabin.images[i].name);
      }
      this.cabin.images = formData;
    }
  },

}
</script>

<style>
#main {
  text-align: left;
}
</style>