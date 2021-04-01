<template>
<div id="nav">
    <router-link to="/signup">SIGNUP</router-link>
    <router-link to="/login">LOGIN</router-link>
</div>

  <div class="background-top">
     <h1>Groupomania</h1>
  </div>

  <div class="signup">
     <form @submit.prevent="handleSubmit">
  <div class="container">
    <h2>Login Form</h2>
    <hr>
    <label for="email"><b>Email</b></label>
    <input type="text" v-model="form.email" placeholder="Enter Email" name="email" id="email">

    <label for="psw"><b>Password</b></label>
    <input type="password" v-model="form.password" placeholder="Enter Password" name="psw" id="psw" required>

    <button type="submit" class="registerbtn" @click="loginUser">LOGIN</button>
  </div>

  <div class="container signin">
    <p>Not registered? <router-link to="/signup">Create an account</router-link>.</p>
  </div>
</form> 
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return { form: {
       email: '',
      password: ''
    }
    }
  },
  methods: {
    handleSubmit: function () {
      axios.post('http://localhost:3000/api/login', this.form)
      .then((response) => {
        console.log(response)
        if (response.status == 200) {
        console.log(response.data.userId)
        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
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
  padding: 0;
  margin: 0;
  }

body {
  background-color: #d0d0d0;
  font-family: sans-serif
}

.background-top {
  background-color: #232f3e;
  width: 100%;
  height: 300px;
}

.background-top h1 {
  color: white;
  font-family: sans-serif;
  text-align: center;
  padding-top: 70px;
}

.signup {
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

input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.registerbtn {
  background-color: #232f3e;
  color: white;
  padding: 16px 20px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity:1;
}

a {
  color: dodgerblue;
}

.signin {
  text-align: center;
}

form h2 {
  font-weight: 500;
  text-align: center;
}

form label {
  font-weight: 200;
  color: #333;
}

.container h1 {
  color: #333;
}
</style>