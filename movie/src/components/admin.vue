<template>
  <div id="body">
    <div class="head">
        <ul class="nav nav-tabs">
          <router-link to="/manageMovie" tag="li"><a>管理电影</a></router-link>
          <router-link to="/manageShow" tag="li"><a>管理演出厅</a></router-link>
          <router-link to="/managePlan" tag="li"><a>管理演出计划</a></router-link>
          <!--<router-link to="/ticket" tag="li"><a>分析营业额</a></router-link>-->
          <router-link to="/nowTicket" tag="li"><a>查看当前票房</a></router-link>
          <button class="loginOut btn btn-primary" @click="loginOut">退出登录</button>
          <router-link tag="button" to="/home" class="btn btn-primary loginOut">退回首页</router-link>
        </ul>
    </div>
    <div class="body">
      <router-view> </router-view>
    </div>
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
    export default {
        name: "admin",
        store,
        beforeCreate(){
          document.getElementById('title').innerText = '管理员界面';
          if(this.$store.state.user.authority !== 1){
              this.$router.push({path:'/home'})
          }
        },
       methods:{
          loginOut(){
            window.location.href = window.location.origin;
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
           }
       },
      data(){
          return{
            link:''
          }
      }
    }
</script>

<style scoped>
  #body{
    /*overflow: hidden;*/
    min-width: 720px;
  }
  .head{
    padding-top: 1rem;
  }
  .loginOut{
    float: right;
    margin-right: 2rem;
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
</style>
