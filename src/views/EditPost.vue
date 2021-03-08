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
     <form>
  <div class="container">
    <h2>Edit Post</h2>
    <hr>

    <label for="title"><b>Title:</b></label>
    <input type="text" placeholder="Enter Title" name="title" id="title" required>

    <label for="psw"><b>Description:</b></label>
    <input type="text" placeholder="Enter Description" name="psw" id="psw" required>
    
    
<label for="file-upload"><b>Choose a file:</b></label>
<label class="file">
  <input type="file" id="file" aria-label="File browser example">
  <span class="file-custom"></span>
</label>


    
    <button type="submit" class="submitbtn">POST</button>
  </div>
</form> 
  </div>
</template>

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