<template>
<div id="nav">
    <router-link to="/">HOME</router-link>
    <router-link to="/signup">SIGNUP</router-link>
    <router-link to="/login">LOGIN</router-link>
    <router-link to="/createpost">CREATE POST</router-link>
    <router-link to="/account">ACCOUNT</router-link>
    <a href="javascript:void(0)" @click="submitLogout">LOGOUT</a>
</div>

  <div class="background-top">
     <h1>Groupomania</h1>
  </div>

  <div class="signup">
     <form @submit.prevent="handleSubmit">
  <div class="container">
    <h2>Signup Form</h2>
    <hr>
    <label for="firstName"><b>First name</b></label>
    <input type="text" placeholder="Enter first name" v-model="form.firstName" name="firstName" id="firstName" required>

    <label for="lastName"><b>Last name</b></label>
    <input type="text" placeholder="Enter last name" v-model="form.lastName" name="lastName" id="lastName" required>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter email" v-model="form.email" name="email" id="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter password" v-model="form.password" name="psw" id="psw" required>

    <label for="pswconfirm"><b>Confirm password</b></label>
    <input type="password" placeholder="Confirm password" v-model="form.passwordConfirm" name="pswconfirm" id="pswconfirm" required>

    <button type="submit" class="registerbtn">SIGNUP</button>
  </div>

  <div class="container signin">
    <p>Already have an account? <router-link to="/login">Login</router-link>.</p>
  </div>
</form> 
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data() {
    return { form: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
    }
  },
  methods: {
    handleSubmit: function () {
      axios.post('http://localhost:3000/api/signup', this.form)
      .then((response) => {
        console.log(response)
        if (response.status == 201) {
        alert('Your account has been activated successfully. You can now login.');
        window.location.href = '/login'
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