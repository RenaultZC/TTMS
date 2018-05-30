<template>
  <div id="list">
    <div class="list" v-for="item in movies">
      <img class="list-img" :src="item.img">
      <span class="list-title">{{item.title}}</span>
      <i class="list-num">{{item.num}}</i>
    </div>
  </div>
</template>

<script>
    export default {
        name: "list",
      data(){
          return{
            movies:[
              {
                img:"http://p0.meituan.net/movie/a547dd7f6851d7ced67ec1b6c8b7f3b2447754.jpg@160w_220h_1e_1c",
                title:"头号玩家",
                num:9.1,
              },
              {
                img:"http://p0.meituan.net/movie/d414df29b364e010976c4be97d5ee907290840.jpg@160w_220h_1e_1c",
                title:"狂暴巨兽",
                num:9.0,
              },
              {
                img:"http://p0.meituan.net/movie/3e42788f6f6283f430e74ac2381dd6ad151806.jpg@160w_220h_1e_1c",
                title:"巴霍巴利王2：终结",
                num:8.7,
              }
            ]
          }
      }
    }
</script>

<style scoped>
  #list{
    width: 900px;
    margin: 10px auto 0 auto;
  }
  .list{
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-top: 2rem ;
    border-bottom: 1px solid black;
  }
  .list-img{
    float: left;
  }
  .list-title{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 8rem;
    height: 2rem;
    font-size: 2rem;
    position: absolute;
  }
  .list-num{
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    position: absolute;
    width: 8rem;
    height: 2rem;
    font-size: 2rem;
    color: #ef4238;
  }
</style>
