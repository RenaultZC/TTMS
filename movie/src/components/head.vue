<template>
  <div>
    <div id="head">
      <div class="head-left">
        <router-link to="home" tag="a">首页</router-link>
        <router-link to="movie" tag="a">电影</router-link>
        <router-link to="list" tag="a">榜单</router-link>
      </div>
      <div class="head-right">
        <div class="head-search">
          <input id="search" type="text" maxlength="10" placeholder="搜索">
          <img class="point" src="../../static/img/search.png" alt="搜索" @click="goSearch">
        </div>
        <div class="userLogin" v-if="this.$store.state.login">
          <router-link to="login" tag="a">登录</router-link>
          <router-link to="register" tag="a">注册</router-link>
        </div>
        <div class="userInfo" v-else="this.$store.state.login">
          <ul>
            <router-link to="userCenter" tag="li">个人中心</router-link>
            <li @click="loginOut">退出</li>
          </ul>
        </div>
      </div>
    </div>
    <router-view> </router-view>
    <div class="alert-background">
      <div class="alert">
        <div class="alert-head">
          <span class="alert-title">错误类型</span>
          <b class="close" @click="PopDisplay">×</b>
        </div>
        <div class="alert-content">
          错误内容
        </div>
        <div class="alert-button">
          <router-link :to="link" @click.native="PopDisplay" tag="div">确定</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import store from'@/vuex/store';
    import {mapState,mapMutations,mapGetters,mapActions} from'vuex';
    export default {
        name: "headed",
        data(){
          return{
            link:'',
            loginList:"none"
          }
        },
        store,
        methods:{
            goSearch:function () {
              let value = document.getElementById("search").value;
              this.$router.push({path:'/search',query:{search:value}});
            },
            Popup:function (type = '错误',content = '点击确定继续操作',link = '') {
              this.link = link;
              let alertType = document.getElementsByClassName("alert-title")[0];
              let alertContent = document.getElementsByClassName("alert-content")[0];
              alertType.innerText = type;
              alertContent.innerText = content;
              document.getElementsByClassName("alert-background")[0].style.display = "block";
            },
            PopDisplay:function (){
              document.getElementsByClassName("alert-background")[0].style.display = "none";
            },
            loginListOn:function () {
              this.loginList = "block";
            },
            loginListOut:function () {
              this.loginList = "none";
            },
            loginOut:function () {
              this.setUser();
              this.$router.push({path:'/home'});
              axios.post('http://47.100.6.42/ttms/public/index.php/index/user/logout').then((res)=>{
                console.log('退出登录');
              });
            },
             ...mapMutations(['setUser']),
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
    height: 2rem;
    float: left;
    font-size: 1.5rem;
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
  #head .active:hover{
    color: white;
  }
  #head .active{
    background-color: #ef4238;
    color: white;
  }
  .alert-background{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    perspective: 1300px;
    display: none;
  }
  .alert-background .alert{
    width: 300px;
    height: 200px;
    top: 50%;
    bottom: 50%;
    left: 50%;
    right: 50%;
    margin: -100px 0 0 -150px;
    padding: 10px;
    position: absolute;
    border: 1px solid black;
    border-radius: 10px;
    animation: alert .7s ease-in-out;
    background-color: white;
  }
  .alert-background .alert-head{
    height: 20%;
    width: 100%;
    font-size: 1.5rem;
    border-bottom: 1px solid black;
  }
  .alert-background .alert-title{
    float: left;
  }
  .alert-background .close{
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;
    float: right;
  }
  .alert-background .alert-content{
    width: 100%;
    height: 50%;
    text-align: center;
    padding-top: 20px;
  }
  .alert-background .alert-button{
    height: 20%;
    width: 100%;
  }
  .alert-button div{
    width: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    font-size: 26px;
    border: 1px solid transparent;
    text-align: center;
    border-radius: 2rem;
    height: 100%;
  }
  .alert-head .close:hover{
    cursor: pointer;
    color: white;
    text-shadow:0 0 5px black;
  }
  .alert-button div:hover{
    cursor: pointer;
    box-shadow: 0 0 10px black;
  }
  @keyframes alert {
    0% {
      transform: translateZ(-1000px) rotateY(80deg);
      opacity: 1;
      animation-timing-function: ease-in;
    }
    40%{
      transform: translateZ(0px) rotateY(80deg);
    }
    100% {
      transform: translateZ(0) rotateY(0deg);
      opacity: 1;
    }
  }
  .userInfo{
    width: 49%;
    height: 2rem;
    float: left;
  }
  .userInfo ul{
    width: 100%;
    list-style: none;
    height: 100%;
    margin: 0;
    padding: 0 0 0 5px;
  }
  .userInfo ul li{
    width: 50%;
    float: left;
    transition: .3s;
    border-radius: 2rem;
    text-align: center;
  }
  .userInfo ul li:hover{
    color: #ef4238;
    cursor: pointer;
  }
</style>
