<template>
  <div>
    <div id="head">
      <div class="head-left">
        <router-link to="home" tag="a">首页</router-link>
        <router-link to="movie" tag="a">电影</router-link>
        <router-link to="list" tag="a">榜单</router-link>
        <router-link to="hotSpot" tag="a">热点</router-link>
      </div>
      <div class="head-right">
        <div class="head-search">
          <input id="search" type="text" maxlength="10" placeholder="搜索">
          <img class="point" src="../../static/img/search.png" alt="搜索" @click="goSearch">
        </div>
        <router-link to="login" tag="a">登录</router-link>
        <router-link to="register" tag="a">注册</router-link>
      </div>
    </div>
    <router-view> </router-view>
  </div>
</template>

<script>
    export default {
        name: "headed",
        methods:{
            goSearch:function () {
              let value = document.getElementById("search").value;
              this.$router.push({path:'/search',query:{search:value}});
            }
        }
    }
</script>

<style scoped>

  #head{
    width: 900px;
    font-size: 1.5rem;
    font-family: 华文楷体;
    left: 0;
    right: 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .head-left{
    width: 50%;
    float: left;
  }
  .head-right{
    width: 50%;
    float: right;
  }
  #head a {
    width: 25%;
    color:black;
    text-decoration: none;
    text-align: center;
    display: block;
    float: left;
    border-radius: 2rem;
    transition: 0.3s;
  }
  .head-search{
    width: 49%;
    border: 1px solid lightgray;
    overflow: hidden;
    position: relative;
    border-radius:1rem ;
    float: left;
  }
  .head-search input{
    width: 80%;
    border: 0;
    height: 1.5rem;
    float: left;
    font-size: 1rem;
    outline: none;
    margin-left: 0.7rem;
  }
  .head-search img{
    width: 1.5rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
    margin: auto 0;
  }
  #head a:hover{
    color: #ef4238;
  }
  #head .active{
    background-color: #ef4238;
    color: white;
  }
</style>
