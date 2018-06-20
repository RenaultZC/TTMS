<template>
  <div class="registerPage">
    <canvas id="canvas"></canvas>
    <div class="register-form">
      <input id="username" type="text" placeholder="请输入用户名" @keyup.enter="register">
      <input id="email" type="text" placeholder="请输入电子邮箱" @keyup.enter="register">
      <input id="phone" type="text" placeholder="请输入手机号" @keyup.enter="register">
      <input id="password" type="password" placeholder="请输入密码" @keyup.enter="register">
      <input id="register" type="submit" value="注册" @click="register">
    </div>
  </div>
</template>
<script>
  export default {
    name: "register",
    beforeCreate:function () {
      document.getElementById("title").innerText = "注册";
    },
    mounted:function () {
    },
    methods:{
      register:function () {
        let emailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        let phoneReg  = new RegExp("^[0-9]{11}$");
        let passReg  = new RegExp("^[^\\s]{6,16}$");
        let user = document.getElementById("username");
        let email = document.getElementById("email");
        let pass = document.getElementById("password");
        let phone = document.getElementById("phone");
        let username = user.value;
        let password = pass.value;
        let Email = email.value;
        let Phone = phone.value;
        if(username && password && Email && Phone){
          if(!emailReg.test(Email)){
            email.value = "";
            user.className = "";
            pass.className = "";
            email.className = "error";
            phone.className = "";
            user.placeholder = "请输入用户名";
            pass.placeholder = "请输入密码";
            email.placeholder = "请输入正确电子邮箱";
            phone.placeholder = "请输入手机号";
          }else if(!phoneReg.test(Phone)){
            phone.value = "";
            user.className = "";
            pass.className = "";
            email.className = "";
            phone.className = "error";
            user.placeholder = "请输入用户名";
            pass.placeholder = "请输入密码";
            email.placeholder = "请输入电子邮箱";
            phone.placeholder = "请输入正确手机号";
          }else if (!passReg.test(password)){
            pass.value = "";
            user.className = "";
            pass.className = "error";
            email.className = "";
            phone.className = "";
            user.placeholder = "请输入用户名";
            pass.placeholder = "请输入6-16位密码";
            email.placeholder = "请输入电子邮箱";
            phone.placeholder = "请输入手机号";
          }else{
            let that = this;
            axios.post(
              'http://47.100.6.42/ttms/public/index.php/index/user/register',{
              customer_name:username,
              customer_passwd:password,
              customer_email:Email,
              customer_mobile:Phone
            }
            )
              .then(function (res) {
                if(res.data.status){
                  switch (res.data.msg){
                    case 'the server is busy now': that.$parent.Popup("网络繁忙","网络繁忙请求出错，请稍后再请求"); break;
                    case 'The user has already existed':
                                        email.value = "";
                                        user.className = "";
                                        pass.className = "";
                                        email.className = "error";
                                        phone.className = "";
                                        user.placeholder = "请输入用户名";
                                        pass.placeholder = "请输入密码";
                                        email.placeholder = "此邮箱已经被注册";
                                        phone.placeholder = "请输入手机号";
                                        break;
                    case 'customer_mobile格式不符':
                                        phone.value = "";
                                        user.className = "";
                                        pass.className = "";
                                        email.className = "";
                                        phone.className = "error";
                                        user.placeholder = "请输入用户名";
                                        pass.placeholder = "请输入密码";
                                        email.placeholder = "请输入电子邮箱";
                                        phone.placeholder = "请输入正确手机号";
                                        break;
                    case 'customer_email格式不符':
                                        email.value = "";
                                        user.className = "";
                                        pass.className = "";
                                        email.className = "error";
                                        phone.className = "";
                                        user.placeholder = "请输入用户名";
                                        pass.placeholder = "请输入密码";
                                        email.placeholder = "请输入正确电子邮箱";
                                        phone.placeholder = "请输入手机号";
                                        break;
                    default:that.$parent.Popup("未知错误","发生未知错误请稍后再请求");
                  }
                }else{
                  that.$router.push({name:'login',params:{fromPath:true}});
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }else{
          if(!username){
            user.value = "";
            pass.value = "";
            email.value = "";
            phone.value = "";
            user.className = "error";
            pass.className = "";
            email.className = "";
            phone.className = "";
            user.placeholder = "请输入用户名";
            pass.placeholder = "请输入密码";
            email.placeholder = "请输入电子邮箱";
            phone.placeholder = "请输入手机号";
          }else if(!password){
            user.className = "";
            pass.className = "error";
            email.className = "";
            phone.className = "";
            user.placeholder = "请输入用户名";
            pass.placeholder = "请输入密码";
            email.placeholder = "请输入电子邮箱";
            phone.placeholder = "请输入手机号";
          }else if(!Email){
            user.className = "";
            pass.className = "";
            email.className = "error";
            phone.className = "";
            user.placeholder = "请输入用户名";
            pass.placeholder = "请输入密码";
            email.placeholder = "请输入电子邮箱";
            phone.placeholder = "请输入手机号";
          }else if(!Phone){
            user.className = "";
            pass.className = "";
            email.className = "";
            phone.className = "error";
            user.placeholder = "请输入用户名";
            pass.placeholder = "请输入密码";
            email.placeholder = "请输入电子邮箱";
            phone.placeholder = "请输入手机号";
          }
        }
      }
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
  .registerPage{
    width: 100%;
    position: relative;
  }
  .register-form{
    width: 300px;
    right: 0;
    left: 0;
    margin: 5% auto 0 auto;
    position: absolute;
  }
  .register-form input{
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
  #register{
    width: 80%;
    background: #3fbbff;
    border: 0;
    border-radius: 2rem;
    margin-left: 10%;
    transition: 0.4s;
  }
  #regiszter:hover{
    background: rgb(59, 176, 236);

    box-shadow: 0 15px 30px 0 rgba(0,0,0,.15);
  }
  .register-form .error::placeholder{
    color: red;
  }
</style>
