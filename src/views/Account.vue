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

<div class="posts">
    <h2>Account</h2><br>
    <button @click="deleteUser( form.userId )">delete user</button>

    
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return { 
      posts: [],
      user: {},
      form: {
        like: 0,
        dislike: 0,
        userId: localStorage.getItem('userId')
      },
      comment: {
        comment: '',
        user: this.user,
        postId: ''
      }
    }
  },
  methods: {
    retrieveUser: function(id) {
      axios.get('http://localhost:3000/api/user/' + id, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        console.log(response)
        this.user = response.data
        console.log(this.user)
      }) 
    },

    deleteUser: function(id) {
      axios.delete('http://localhost:3000/api/user/' + id, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        console.log(response)
        this.user = response.data
        console.log(this.user)
      }) 
    },

    submitLogout: function() {
      localStorage.clear
      this.$router.push('http://localhost:3000/api/login')
    },

  },
  mounted: function () {
    let userId = localStorage.getItem('userId');
    this.retrieveUser(userId)
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

.background-top p {
  color: white;
  font-size: 20px;
  font-family: sans-serif
}

.background-top h1 {
  color: white;
  font-family: sans-serif;
  text-align: center;
  padding-top: 70px;
}

.posts {
  background-color: white;
  width: 800px;
  height: 100px;
  border-radius: 7px;
  position: absolute;
  top: 30%;
  left: 23%;
}

.posts h2 {
  color:  #313131;
  padding-left: 8px;
  padding-top: 10px;
}

.message {
  margin: 8px 0 0px 0;
  font-size: 14px;
  line-height: 18px;
  padding: 8px;
  border-top: 1px solid #E9E9E9;
  border-bottom: 1px solid #E9E9E9;
  background: #FDFDFD;
}
  
.message-header {
  padding-bottom: 8px;
  }
    
.message-author-picture {
  width: 40px;
  height: 40px;
  background-color: lightgrey;
  float: left;
  }
    
.message-author, .message-time {
  line-height: 20px;
  margin-left: 48px;
  }

.message-author .user-options {
  display: inline-block;
}
    
.message-time {
  color: #b4b4b4;
  }

.message-title {
  padding-top: 15px;
  padding-bottom: 8px;
  color: #2e2e2e;
}

.message-image img {
  margin-top: 30px;
  max-width: 782px;
}

</style>