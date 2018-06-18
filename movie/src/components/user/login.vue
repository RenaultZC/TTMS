<template>
  <div class="loginPage">
    <canvas id="canvas"></canvas>
    <div class="login-form">
      <input id="username" type="text" placeholder="请输入电子邮箱" @keyup.enter="login">
      <input id="password" type="password" placeholder="请输入密码" @keyup.enter="login">
      <div class="text">
        <router-link tag="span" to="/forgetPassword" class="text-left" >忘记密码</router-link>
        <router-link tag="span" to="/register" class="text-right">注册账号</router-link>
      </div>
      <input id="login" type="submit" value="登录" @click="login">
    </div>
  </div>
</template>

<script>
  import store from'@/vuex/store';
  import {mapState,mapMutations,mapGetters,mapActions} from'vuex';
  export default {
    name: "login",
    beforeCreate:function(){
      document.getElementById("title").innerText = "登录";
    },
    mounted:function () {
      document.getElementsByClassName("loginPage")[0].style.height = window.innerHeight - 100 + "px";
      // drawcanvas();
    },
    store
    ,
    data(){
      return{

      }
    }
    ,
    methods:{
      login:function () {
        let usernameReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        let passReg  = new RegExp("^[^\\s]{6,16}$");
        let user = document.getElementById("username");
        let pass = document.getElementById("password");
        let username = user.value;
        let password = pass.value;
        if(username && password){
          if(!usernameReg.test(username)){
            user.value = "";
            pass.value = "";
            user.placeholder = "请输入正确邮箱";
            user.className = "error";
            pass.className = "";
          }else if(!passReg.test(password)){
            pass.value = "";
            user.placeholder = "请输入正确密码";
            user.className = "";
            pass.className = "error";
          }else{
            let that = this;
            axios.post('http://47.100.6.42/ttms/public/index.php/index/user/login',{
              customer_email:username,
              customer_passwd:password
            })
              .then(function (res) {
                if(res.data.status){
                  switch (res.data.msg){
                    case "the user doesn't exist.":
                      user.value = "";
                      pass.value = "";
                      user.placeholder = "邮箱不存在";
                      user.className = "error";
                      pass.className = "";
                      break;
                    case 'the username or password is incorrect.':
                      pass.value = "";
                      pass.placeholder = "密码错误";
                      user.className = "";
                      pass.className = "error";
                      break;
                    default:that.$parent.Popup("未知错误",'发生未知错误请稍后再请求');
                  }
                }else{
                  that.setUser(res.data.data);
                  if(res.data.data.authority){
                    // that.$parent.Popup("管理员","是否进入管理员界面，点击确定进入",'/admin');
                  }
                  if(that.$route.params.fromPath)
                    that.$router.push({path:'/home'});
                  else{
                    that.$router.go(-1);
                  }
                }
              })
              .catch(function (err) {
                console.log(err);
              })

          }
        }else{
          if(password){
            user.placeholder = "请输入电子邮箱";
            user.className = "error";
          }else if(username){
            user.placeholder = "请输入电子邮箱";
            user.className = "";
            pass.placeholder = "请输入密码";
            pass.className = "error";
          }else{
            pass.placeholder = "请输入密码";
            pass.className = "error";
            user.placeholder = "请输入电子邮箱";
            user.className = "error";
          }
        }
      },
      ...mapMutations(['setUser']),
    }
  }
</script>

<style scoped>
  #canvas{
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    position: absolute;
  }
  .loginPage {
    width: 100%;
    overflow: hidden;
    /*background-image: url("../../static/img/login.jpg");*/
    background-size:auto 100%;
    background-repeat: no-repeat;
    background-position: right;
    position: relative;
  }
  .login-form{
    width: 300px;
    right: 0;
    left: 0;
    margin: 10% auto 0 auto;
    position: absolute;
  }
  .login-form input{
    border: 0;
    width: 100%;
    border-bottom:2px solid black ;
    outline: none;
    text-align: center;
    margin: 2rem 0;
    background: transparent;
    font-size: 2rem;
    font-family: 华文楷体;
  }
  #login{
    width: 80%;
    background: #3fbbff;
    border: 0;
    border-radius: 2rem;
    margin-left: 10%;
    transition: 0.4s;
  }
  #login:hover{
    background: rgb(59, 176, 236);
    box-shadow: 0 15px 30px 0 rgba(0,0,0,.15);
  }
  .login-form .error::placeholder{
    color: red;
  }
  .text span{
    font-family: 华文楷体;
    font-size: 20px;
    transition: 0.3s;
    border-bottom: 1px solid transparent;
  }
  .text-left{
    float: left;
  }
  .text-right{
    float: right;
  }
  .text span:hover{
    border-bottom: 1px solid skyblue;
    color: darkorange;
    cursor: pointer;
  }
</style>
