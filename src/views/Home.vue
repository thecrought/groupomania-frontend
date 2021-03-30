<template>
<div id="nav">
    <router-link to="/">HOME</router-link>
    <span v-if="userId != undefined"><router-link to="/signup">SIGNUP</router-link></span>
    <span v-if="userId != undefined"><router-link to="/login">LOGIN</router-link></span>
    <router-link to="/createpost">CREATE POST</router-link>
    <router-link to="/account">ACCOUNT</router-link>
    <a href="javascript:void(0)" @click="submitLogout">LOGOUT</a>
</div>

 <div class="background-top">
     <h1>Groupomania</h1>
     <h3>Hello back, {{ user.firstName + ' ' + user.lastName }}</h3> 
  </div>

<div class="posts">
    <h2>News Feed</h2>
<div class="message" v-for="post in posts">
    <div class="message-header"></div>
      <div class="message-author-picture"></div>
      <div class="message-author">{{ retrieveUser(post.userId).firstName  + ' ' + retrieveUser(post.userId).lastName }}</div>
      <div class="message-time">1 minutes</div>
      <div class="message-title"><b>{{ post.title }}</b></div>
       <p>{{ post.description }}</p>
       <div class="message-image"><img :src="post.imageUrl"></div>
       <hr>
      <div class="feedback">
        <button class="like" @click="userLike( post.id, post.likes, post )"><i class="far fa-thumbs-up"></i> <span v-if="post.likes != 0">{{ post.likes }}</span></button>
        <button class="dislike" @click="userDislike( post.id, post.dislikes, post )"><i class="far fa-thumbs-down"></i> <span v-if="post.dislikes != 0"> {{ post.dislikes }}</span></button>
        <button class="read" @click="readRedirect( post.id, post )">Read <span v-if="JSON.parse(post.userRead).length != 0">{{ JSON.parse(post.userRead).length}}</span></button>
        
        
      </div>
    </div>
    
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

  beforeMount() {
      if (!localStorage.getItem('userId')) {
        window.location.href = '/login'
      }
    this.loadPosts()
    let userId = localStorage.getItem('userId');
    console.log('It working')
    console.log(userId)
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
    this.posts.map(  (post)=> {
      post.user = this.retrieveUser(post.userId)
    })
    console.log(this.posts)
    },

  mounted() {
    
  },

  methods: {
    userLike: function(id, like, post) {
      if (like == null || like == 0) {
          this.form.like = 1
          //post.usersLiked = JSON.stringify(post.usersLiked)
          //post.usersLiked = JSON.parse(post.usersLiked)
          } else {
            post.usersLiked = JSON.stringify(post.usersLiked)
            post.usersLiked = JSON.parse(post.usersLiked)
            if (post.usersLiked.includes(this.form.userId)) {
              this.form.like = 0
            } else {
              this.form.like = 1
            }
          } 
      
      //console.log(this.form.userId)
      axios.post('http://localhost:3000/api/posts/' + id + '/like', this.form, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        console.log(response)
        this.loadPosts();
      }) 
    },

    userDislike: function(id, dislike, post) {
      if (dislike == null || dislike == 0) {
          this.form.dislike = 1
          } else {
            post.usersDisliked = JSON.stringify(post.usersDisliked)
            post.usersDisliked = JSON.parse(post.usersDisliked)
            if (post.usersDisliked.includes(this.form.userId)) {
              this.form.dislike = 0
            } else {
              this.form.dislike = 1
            }
          } 
      axios.post('http://localhost:3000/api/posts/' + id + '/dislike', this.form, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        console.log(response)
        this.loadPosts();
      }) 
    },

    retrieveUser: async function(id) {
      await axios.get('http://localhost:3000/api/user/' + id, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        //console.log(response)
        //this.user = response.data
        //console.log(this.user)
        //console.log(this.form.userId);
        console.log(response.data)
        return response.data
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

    readRedirect: function(id, post) {
      post.userRead = JSON.parse(post.userRead);
      if (!post.userRead.includes(this.user.userId)) {
        axios.post('http://localhost:3000/api/posts/' + id + '/read', this.form, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        console.log(response)
      }) 
      }
      window.location.href = '/singlepost/' + id
    },

    submitLogout: function() {
      localStorage.clear()
      this.$router.push('http://localhost:3000/api/login')
    },

    loadPosts: function () {
      console.log(localStorage.getItem('token'))
      axios.get('http://localhost:3000/api/posts', { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        //console.log(response)
        this.posts = response.data
        console.log(this.posts)
      }) 
    },

    makeComment: function(id) {
      this.comment.postId = id;
      axios.post('http://localhost:4000/api/comments/', this.comment, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        console.log(response)
      }) 
    }

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
  width: 100%;
  display: block;
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

h3 {
  text-align: center;
  padding-top: 10px;
  font-size: 17px;
  color: white;
}

.posts {
  background-color: white;
  width: 800px;
  height: 100px;
  border-radius: 7px;
  margin: -100px auto;
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

.message hr {
  border-top: 1px solid #d3d3d3;
	border-bottom: 1px solid #fff;
}

.feedback {
  padding-top: 10px;
}

.feedback .like {
  width: 40px;
  margin-right: 5px;
}

.feedback .delete {
  margin-left: 5px;
}

.feedback .edit {
  margin-left: 5px;
}

.feedback .dislike {
  width: 40px;
  margin-right: 5px;
}

.feedback .read {
  margin-left: 5px;
  margin-right: 5px;
}

@media only screen and (max-width: 1000px) {
  .background-top {
    width: 1024px;
  }
}
</style>