<template>
<div id="nav">
    <router-link to="/">HOME</router-link>
    <router-link to="/signup">SIGNUP</router-link>
    <router-link to="/login">LOGIN</router-link>
    <router-link to="/createpost">CREATE POST</router-link>
    <router-link to="/editpost">EDIT POST</router-link>
    <a href="javascript:void(0)" @click="submitLogout">LOGOUT</a>
</div>

<div class="background-top">
     <h1>Groupomania</h1>
  </div>

  <div class="create-post">
     <form @submit.prevent="handleSubmit">
  <div class="container">
    <h2>Create Post</h2>
    <hr>

    <label for="title"><b>Title:</b></label>
    <input type="text" placeholder="Enter Title" v-model="title" name="title" id="title" required>

    <label for="psw"><b>Description:</b></label>
    <input type="text" placeholder="Enter Description" v-model="description" name="psw" id="psw" required>
    
    
<label for="file-upload"><b>Choose a file:</b></label>
<label class="file">
  <input type="hidden" v-model="imageUrl">
  <input type="file" id="file" aria-label="File browser example" @change="onFileSelected">
  <span class="file-custom"></span>
</label>


    
    <button type="submit" class="submitbtn">POST</button>
  </div>
</form> 
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data() {
    return {
      title: '',
      description: '',
      imageUrl: '',
      userId: localStorage.getItem('userId')
    }
  },
  methods: {
    onFileSelected: function (event) {
      this.imageUrl = event.target.files[0];
      console.log(this.imageUrl)
    },
    handleSubmit: function () {
      console.log(localStorage.getItem('token'))
      const form = new FormData()
      form.append('title', this.title)
      form.append('description', this.description)
      form.append('image', this.imageUrl)
      form.append('userId', this.userId)
      axios.post('http://localhost:3000/api/posts', form, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        console.log(response)
        if (response.status == 201) {
        window.location = "http://localhost:8080/"
      }
      }) 
    }
  },
  mounted: function () {
    
  }

}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #d0d0d0;
  font-family: sans-serif;
}

.background-top {
  background-color: #232f3e;
  height: 300px;
}

.background-top h1 {
  color: white;
  font-family: sans-serif;
  text-align: center;
  padding-top: 70px;
}

.create-post {
  background-color: white;
  width: 400px;
  border: 1px solid  #e2e0e0;
  border-radius: 7px;
  position: absolute;
  top: 30%;
  left: 35%;
}

.container {
  padding: 16px;
}

input[type=text]{
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.submitbtn {
  background-color: #232f3e;
  color: white;
  padding: 16px 20px;
  margin: 23px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.submitbtn:hover {
  opacity:1;
}

a {
  color: dodgerblue;
}

form h2 {
  font-weight: 500;
}

form label {
  font-weight: 200;
  color: #333;
}

.container h1 {
  color: #333;
}
</style>