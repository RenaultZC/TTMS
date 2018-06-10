<template>
  <div class="file">
    <div id="content">
      <div id="jieshao">
        <img id="thispho" src="http://p1.meituan.net/movie/266d24fe8567632e078b3717a096d104359095.jpg@160w_220h_1e_1c">
        <div id="detail">
          <span class="big">复仇者联盟3：无限战争</span><br>
          <span class="small">Avengers:Infinity War</span><br><br>
          <span class="small">动作,冒险,科幻</span><br><br>
          <span class="small">美国 / 150分钟</span><br><br>
          <span class="small">2018-05-11大陆上映</span><br><br><br><br>
          <a class="s1" href="#">想看</a>
          <a class="s1" href="#">评分</a><br><br>
          <router-link tag="a" to="buy" class="s2">特惠购票</router-link>
        </div>
        <div id="pingjia">
          <span class="ss">点映评分</span><br>
          <span style="color:yellow;font-size: 30px;">8.6</span><br>
          <span class="ss">累计票房</span><br>
          <span style="color:white;font-size: 30px;">14.91亿</span><br>
        </div>

      </div>


      <div id="wenzi">
        <span class="jianjie">剧情简介</span>
        <p>&nbsp;&nbsp;漫威电影宇宙10周年的历史性集结，将为影迷们带来史诗版的终极对决。
          面对灭霸突然发起的闪电袭击，复仇者联盟及其所有超级英雄盟友必须全力以赴，才能阻止
          他对全宇宙造成毁灭性的打击。</p>
      </div>
      <div id="tuijian">
        <span class="jianjie">推荐电影</span><br>
        <div class="demo">
          <img src="http://p0.meituan.net/movie/8c0af864aa72c46eb15c003d46ebfdc8602165.jpg@160w_220h_1e_1c"><br>
          <a class="ming" href="#">后来的我们</a><br>
          <a class="fen" href="#">3.0</a>
        </div>
        <div class="demo">
          <img src="http://p0.meituan.net/movie/f193e43ca706aa6bc6a26d6f53f0115a5315542.jpg@160w_220h_1e_1c"><br>
          <a class="ming" href="#">超时空同居</a><br>
          <a class="fen" href="#">8.8</a>
        </div>
        <div class="demo">
          <img src="http://p0.meituan.net/movie/b248c2280256886f37396e1b028bc9bc3892761.jpg@160w_220h_1e_1c"><br>
          <a class="ming" href="#">我是你妈</a><br>
          <a class="fen" href="#">8.3</a>
        </div>
        <div class="demo">
          <img src="http://p1.meituan.net/movie/dc07682883ccbcdfb3ae532e2a90d4ff1342251.jpg@160w_220h_1e_1c"><br>
          <a class="ming" href="#">寂静之地</a><br>
          <a class="fen" href="#">暂无评分</a>
        </div>
        <div class="demo">
          <img src="http://p0.meituan.net/movie/90c0d962d127ce8b11ec616795e91b0e6893141.jpg@160w_220h_1e_1c"><br>
          <a class="ming" href="#">幕后玩家</a><br>
          <a class="fen" href="#">8.1</a>
        </div>
        <div class="demo">
          <img src="http://p1.meituan.net/movie/9eff40739c403e7725b2cf0bbb2b7d121421673.jpg@160w_220h_1e_1c"><br>
          <a class="ming" href="#">战犬瑞克斯</a><br>
          <a class="fen" href="#">8.2</a>
        </div>
      </div>
    </div>
    <div id="bottom">
      <span>违法和不良信息举报电话: 18765432123 举报邮箱: jubao.movie&copy;movie.com</span><br/>
      <span id="friendhref" >友情链接 : <a href="#">美团网</a>  <a href="#">美团下载</a></span><br/>
      <span>&copy;2018 好莱坞电影 movie.com 京ICP证160733号 京ICP备16022489号-1 京公网安备 11010502030881号 网络文化经营许可证 电子公告服务规则</span><br/>
      <span>西安邮电大学好莱坞电影有限公司</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "file"
    }
</script>

<style scoped>
  #top{
    margin-top:-10px;
    width:100%;
    height:90px;
    border-bottom: 1px solid gray;
  }
  #a{

    width:200px;
    height:70px;
    float:left;

    padding-left: 350px;
    padding-right: 50px;
    padding-top: 20px;
  }
  #name{
    color:#ef4238;
    font-weight: bold;
    font-size: 25px;
    letter-spacing: 0px;
    font-family: 微软雅黑;
  }
  #bottom{
    text-align:center;
    color:white;
    height:100px;
    width:100%;
    background-color: #262426;
    margin-left: -10px;
    padding-top:50px;
    padding-bottom:80px;
    padding-right: 20px;
    line-height:28px;
    float: left;
  }
  #friendhref a{
    color:#ef4238;
    text-decoration: none;
  }
  #mid{
    width:400px;
    height:90px;
    float:left;

  }
  #mid a{
    text-decoration: none;
  }
  #homehref a{
    color:black;
  }
  .otherhref{
    width:80px;
    height:60px;
    float: left;
    font-weight: bold;
    text-align: center;
    padding-top: 30px;
  }
  .otherhref a{
    color:black;
  }
  #search{
    font-weight: bold;
    padding-top: 25px;
    padding-left:20px;
    padding-right:20px;
    height:60px;
    float: left;

    margin-left: 200px;
  }
  #user{
    font-weight:bold;
    height:60px;
    float: left;
    padding-left:20px;
    padding-top: 30px;
    padding-right:20px;
  }
  #user a{
    color:#ef4238;
    text-decoration: none;
  }
  #input{
    height:25px;
    font-size: 18px;
  }
  #button{
    height:30px;
    width:50px;
    font-weight: bold;
  }
  #homehref{
    width:80px;
    height:60px;
    float: left;
    font-weight: bold;
    text-align: center;
    padding-top: 30px;
  }
  #content{

    margin-left:-20px;
    padding-right:30px;
    width:100%;


  }
  #jieshao{
    padding-right:50px;
    margin-left:-20px;
    margin-bottom:50px;
    height:380px;
    width:100%;
    border: 1px solid;
    background-image: url(https://ms0.meituan.net/mywww/banner_bg.f7fd103e3b8c16b6f449cce43fc57f45.png);
    background-size: cover;

  }
  #thispho{
    width:240px;
    height:330px;
    margin-top: 80px;
    margin-left:400px;
    border: 3px solid white;
    float:left;
  }
  #detail{
    margin-top:82px;
    margin-left:30px;
    float:left;
    color:white;
    font-family: 黑体;
  }
  .big{
    font-size: 30px;
  }
  .small{
    font-size: 18px;
  }
  .s1{
    float:left;
    margin-top:-15px;
    margin-right:8px;
    background-color:gray;
    color:white;
    border:1px solid;
    opacity:0.6;
    text-decoration:none;
    padding: 8px 40px;
  }
  .s2{
    margin-top:5px;
    color:white;
    background-color:red;
    text-decoration:none;
    padding: 8px 85px;
  }
  #pingjia{
    font-weight: bold;
    font-family: 黑体;
    margin-top: 250px;
    margin-left: 100px;
    float: left;
  }
  .ss{
    color:white;
    font-size: 13px;
  }
  #wenzi{
    padding-top:50px;
    margin-left:400px;
    width:730px;
    float: left;
  }
  #wenzi p{
    font-family:黑体;
    line-height: 28px;
  }
  .jianjie{
    border-left: 4px solid red;
    padding-left: 5px;
    font-weight: bold;
    font-family: 黑体;
    font-size: 20px;

  }
  #tuijian{
    width:510px;
    margin-left:100px;
    margin-top:50px;
    float: right;
  }
  .demo{
    margin:10px;
    text-align:center;
    float: left;
  }
  .demo img{
    width:150px;
    height:200px;
  }
  .fen{
    font-family:黑体;
    font-size:18px;
    color:red;
    font-style: italic;
    text-decoration: none;
  }
  .ming{
    font-family:黑体;
    font-size:18px;
    color:black;
    text-decoration: none;
  }
</style>
