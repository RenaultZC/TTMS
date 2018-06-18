<template>
  <div class="movie">
    <div class="movie-item">
      <div class="movie-info" v-for="item in movies" v-cloak>
        <router-link :to="{name:'file',params:{id:item.movie_id}}" tag="a">
          <img class="img-thumbnail" :src="item.movie_pic" :alt="item.movie_name">
          <span class="tag" :style="{background:item.is_active?'#ef4238':'#56b2fd'}">{{item.is_active?'正在热映':'即将上映'}}</span>
        </router-link>
          <router-link tag="p" :to="{name:'file',params:{id:item.movie_id}}" class="movie-name center-block">{{item.movie_name}}</router-link>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "movie",
        data(){
          return{
            movies:[]
          }
        },
        beforeCreate(){
          axios.post('http://47.100.6.42/ttms/public/index.php/admin/movie/findmovie')
            .then((res)=>{
              this.movies = res.data.data;
              this.$parent.loading();
            });
        },
        mounted(){
          this.$parent.loading();
        }
    }
</script>

<style scoped>
  .movie{
    width: 900px;
    overflow: hidden;
    margin: 1rem auto 0 auto;
    background-color: white;
  }
  .movie-item{
    margin-top: 30px;
    overflow: hidden;
  }
  .movie-info{
    overflow: hidden;
    max-width:160px;
    margin-right: 20px;
    float: left;
  }
  .movie-name{
    cursor: pointer;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    float: left;
    height: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
   }
  .movie-info a{
    position: relative;
    overflow: hidden;
    display: block;
    float: left;
  }
  .movie-info img{
    width: 160px;
    height: 220px;
  }
  .tag{
    background-color: #56b2fd;
    position: absolute;
    top: 14px;
    left: -26px;
    width: 100px;
    height: 21px;
    font-size: 14px;
    color: #fff;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    text-align: center;
    line-height: 21px;
  }
</style>
