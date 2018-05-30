<template>
  <div id="body">
    <div class="left">
      <router-link to="/add" tag="div">影院管理</router-link>
      <router-link to="/ticket" tag="div">票务管理</router-link>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "admin"
    }
</script>

<style scoped>
  #body{
    overflow: hidden;
    height: 700px;
  }
  .left{
    width: 30%;
    height: 100%;
    float: left;
  }
  .left div{
    width: 100%;
    height: 20%;
    margin-top: 20%;
    font-size: 5rem;
    text-align: center;
  }
  .left div:hover{
    cursor: pointer;
  }
  .right{
    width: 70%;
    height: 100%;
    float: right;
  }
</style>
