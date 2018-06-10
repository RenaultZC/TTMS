<template>
  <div id="home">
    <div class="main">
        <div class="content">
          <div class="panel">
            <div class="panel-head">
              <span>正在放映</span>
              <router-link to="/movie" tag="a">全部></router-link>
            </div>
            <div class="panel-content">
              <div class="movie-item" v-for="item in movies">
                <router-link to="buy" tag="a"><img :src="item.img" :alt="item.title"><p>购票</p></router-link>
              </div>
            </div>
          </div>
          <div class="aside">
              <div class="aside-head">
                今日票房
              </div>
              <div class="aside-content">
                <ul>
                  <li v-for="(item,index) in list">
                    <i class="content-number">{{index+1}}</i>
                    <span class="content-title">{{item.title}}</span>
                    <i class="content-num">{{item.num}}万</i>
                  </li>
                </ul>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "home",
      beforeCreate:function () {
        document.title = "天霸剧院";
      },
      data(){
        return{
          movies:[
            {
              id:1,
              title:"超时空同居",
              img:"http://p0.meituan.net/movie/f193e43ca706aa6bc6a26d6f53f0115a5315542.jpg@160w_220h_1e_1c"
            },
            {
              id:2,
              title:"复仇者联盟",
              img:"http://p1.meituan.net/movie/266d24fe8567632e078b3717a096d104359095.jpg@160w_220h_1e_1c"
            },
            {
              id:3,
              title:"寂静之地",
              img:"http://p1.meituan.net/movie/dc07682883ccbcdfb3ae532e2a90d4ff1342251.jpg@160w_220h_1e_1c"
            },
            {
              id:4,
              title:"游侠索罗：星球大战外传",
              img:"http://p0.meituan.net/movie/eed84f84bdc14294c84d9b1671925a9b4594458.jpg@160w_220h_1e_1c"
            },
            {
              id:5,
              title:"后来的我们",
              img:"http://p0.meituan.net/movie/8c0af864aa72c46eb15c003d46ebfdc8602165.jpg@160w_220h_1e_1c"
            },
            {
              id:6,
              title:"完美陌生人",
              img:"http://p0.meituan.net/movie/42f04235cd6a27d343a3a1ef045a0662528503.jpg@160w_220h_1e_1c"
            }
          ],
          list:[
            {
              id:1,
              title:'超时空同居',
              num:'1240.98'
            },{
              id:2,
              title:'复仇者联盟3:无限战争',
              num:'1013.76'
            },{
              id:3,
              title:'寂静之地',
              num:'404.74'
            },{
              id:4,
              title:'青年马克思',
              num:'104.72'
            },{
              id:5,
              title:'后来的我们',
              num:'58.81'
            },{
              id:6,
              title:'昼颜',
              num:'53.83'
            },{
              id:7,
              title:'狂暴巨兽',
              num:'16.70'
            },{
              id:8,
              title:'我是你妈',
              num:'12.07'
            },{
              id:9,
              title:'巴霍比利王2:终结',
              num:'9.97'
            },{
              id:10,
              title:'幕后玩家',
              num:'7.53'
            },
          ],
          auto:null
        }
      }
    }
</script>

<style  scoped>
  #home{
    width: 900px;
    margin: 0 auto;
  }
  .main{
    width: 900px;
    margin: 0 auto;
  }
  .panel{
    width: 70%;
    float: left;
  }
  .panel span{
    font-size: 2rem;
  }
  .panel a{
    text-decoration: none;
    color: red;
    margin-top: 1rem;
    float: right;
  }
  .panel-content{
    overflow: hidden;
  }
  .movie-item{
    width: 33.3%;
    overflow: hidden;
    float: left;
    text-align:center;
  }
  .movie-item a{
    margin: 0;
    padding: 0;
    display: block;
    float: none;
    text-decoration: none;
  }
  .movie-item p{
    width: 158px;
    margin: -4px auto 5px auto;
    padding: 1rem 0;
    background-color:white ;
    color: #ef4238;
    border: 1px solid gray;
    transition: 0.2s;
  }
  .movie-item p:hover{
    background-color:#ef4238 ;
    color: white;
    border: 1px solid gray;
  }
  .aside{
    width: 29%;
    float: left;
    margin-top: 20%;
  }
  .content{
    overflow: hidden;
  }
  .aside-head{
    font-size:2rem ;
    color: #ef4238;
  }
  .aside-content ul{
    list-style: none;
    margin: 0;
    padding: 0;
    overflow:hidden;
  }
  .aside-content ul li:hover{
    background-color: #f7f7f7;
    cursor: pointer;
  }
  .aside-content ul li .content-number{
    font-size: 20px;
    font-family: Microsoft YaHei,Helvetica,Arial,sans-serif;
  }
  .aside-content ul li .content-number{
    color: #ef4238;
  }
  .aside-content ul li .content-title{
    font-size: 1rem;
  }
  .aside-content ul li .content-num{
     float: right;
    margin-right: 3px;
   }
  .aside-content ul li .content-title{
    padding-left: 10px;
    font-family: 华文楷体;
  }
</style>
