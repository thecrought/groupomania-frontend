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

<div class="posts">
    <h2>News Feed</h2>
<div class="message">
    <div class="message-header"></div>
      <div class="message-author-picture"></div>
      <div class="message-author">{{ post.firstName + post.lastName }}</div>
      <div class="message-time">3 minutes ago</div>
      <div class="message-title"><b>{{ post.title }}</b></div>
       <p>{{ post.description }}</p>
       <div class="message-image"><img :src="post.imageUrl"></div>
       <hr>
      <div class="feedback">
        <button class="like">Like</button>
        <button class="dislike">Dislike</button>
        <button class="edit" @click="editPost( post._id, post )">Edit</button>
        <button @click="deletePost( post._id )" class="delete">Delete</button>
      </div>
    </div>
    <input type="comment" v-model="comment.comment" placeholder="Write a comment" name="comment" id="comment">
        <button class="comment" @click="makeComment( post._id )">Send</button>
      <p class="commentStyle" v-for="comment in comments" :key="comment._id"> {{ comment.comment }} by {{ comment.user.lastName }}</p>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SinglePost',
  data() {
    return { 
      post: {},
      form: {
        like: 0,
        userId: localStorage.getItem('userId')
      },
      comment: {
        comment: '',
        user: JSON.parse(localStorage.getItem('user')),
        postId: ''
      },
      comments: {}
    }
  },
  methods: {
    editPost: function(id, post) {
      window.location.href = '/editpost/' + id
    },

    submitLogout: function() {
      localStorage.removeItem('token')
      this.$router.push('http://localhost:3000/api/login')
    },

    loadPost: function (id) {
      console.log(localStorage.getItem('token'))
      axios.get('http://localhost:3000/api/posts/' + id, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        console.log(response)
        this.post = response.data
        console.log(this.post)
      }) 
    },

    deletePost: function (id) {
      axios.delete('http://localhost:3000/api/posts/' + id, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        window.location = "http://localhost:8080/"
      })
    },

    makeComment: function(id) {
      this.comment.postId = id;
      axios.post('http://localhost:3000/api/comments/', this.comment, { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        console.log(response)
        this.loadComments( this.$route.params.id )
      }) 
    },

    loadComments: function(id) {
      axios.get('http://localhost:3000/api/comments/', { headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((response) => {
        this.comments = response.data;
        let arr = [];
        this.comments.forEach( (item)=> {
          if(item.postId == id) {
            arr.push(item)
          }
        })
        this.comments = arr;
        console.log(id)
        console.log(this.comments)
      }) 
    }



  },
  mounted: function () {
    this.loadPost( this.$route.params.id ),
    this.loadComments( this.$route.params.id )
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
  height: 300px;
  border: 1px solid  #e2e0e0;
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

.message hr {
  border-top: 1px solid #d3d3d3;
	border-bottom: 1px solid #fff;
}

.feedback {
  padding-top: 10px;
}

.feedback .like {
  margin-right: 5px;
}

.feedback .delete {
  margin-left: 5px;
}

.feedback .edit {
  margin-left: 5px;
}

.commentStyle {
  background-color: rgb(235, 235, 235);
  padding: 3px;
}
</style>