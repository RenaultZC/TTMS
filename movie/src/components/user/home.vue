<template>
  <div id="home">
    <div class="swiper-container" style="width: 900px;height: 375px;z-index: 0">
      <div class="swiper-wrapper">
        <div class="swiper-slide " style="background-image: url('http://p1.meituan.net/movie/7a95170d9f1fa7b728d7a18b5e1ae348612023.jpg@750w_1l');background-repeat: no-repeat;background-size: 100%"></div>
        <div class="swiper-slide " style="background-image: url('http://p1.meituan.net/movie/c4cec8c250e43c081fbc7666c6704bfe281866.jpg@750w_1l');background-repeat: no-repeat;background-size: 100%"></div>
        <div class="swiper-slide " style="background-image: url('http://p0.meituan.net/movie/fbcb6cff6df1b8b106c457be2fd68f762734901.jpg');background-repeat: no-repeat;background-size: 100%"></div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

    </div>
    <div class="main">
        <div class="content">
          <div class="panel">
            <div class="panel-head">
              <span>所有电影</span>
              <router-link to="/movie" tag="a">全部></router-link>
            </div>
            <div class="panel-content">
              <div class="movie-item" v-for="item in movies">
                <router-link :to="{name:'file',params:{id:item.movie_id}}" tag="a"><img :src="item.movie_pic" :alt="item.movie_name"  class="img-thumbnail"  ><p class="btn">购票</p></router-link>
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
                    <span class="content-title">{{item.movieName}}</span>
                    <i class="content-num">{{item.boxInfo}}万</i>
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
        axios.get('http://ttms.zhangchaoweb.xin/api/searchList')
          .then((res)=>{
            this.list = res.data.data.list.slice(0,10);
            this.$parent.loading();

            let mySwiper = new Swiper ('.swiper-container', {
              loop: true,
              autoplay:{
                delay:3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
              },
              effect : 'cube',

              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
                type : 'bullets',
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            })
          });
        axios.post('http://47.100.6.42/ttms/public/index.php/admin/movie/findmovie')
          .then((res)=>{
            this.movies = res.data.data.slice(0,6);
          });
      },
      mounted(){
        this.$parent.loading();
      },
      data(){
        return{
          movies:[],
          list:[],
          auto:null
        }
      }
    }
</script>

<style  scoped>
  #home{
    width: 900px;
    margin: 10px auto;
    background-color: white;
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
    width: 160px;
    margin: 0 auto 5px auto;
    padding: 1rem 0;
    background-color:white ;
    color: #ef4238;
    border: 1px solid #ddd;
    border-top: 0;
    transition: 0.2s;
    border-radius: 0 0 4px 4px;
  }
  .movie-item p:hover{
    background-color:#ef4238 ;
    color: white;
    border: 1px solid #ddd;
    border-top: 0;
  }
  .movie-item img{
    width: 160px;
    height: 220px;
  }
  .aside{
    width: 30%;
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
    margin:8px 3px 0 0 ;
   }
  .aside-content ul li .content-title{
    padding-left: 10px;
    font-family: 华文楷体;
  }
</style>
