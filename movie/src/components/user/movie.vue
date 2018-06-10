<template>
  <div class="movie">
    <div class="movie-item" v-for="item in movies">
      <router-link to="file" tag="a"><img :src="item.img" :alt="item.title"><p>{{item.title}}</p></router-link>
    </div>
    <div class="movie-item" v-for="item in movies">
      <router-link to="file" tag="a"><img :src="item.img" :alt="item.title"><p>{{item.title}}</p></router-link>
    </div>
    <div class="movie-item" v-for="item in movies">
      <router-link to="file" tag="a"><img :src="item.img" :alt="item.title"><p>{{item.title}}</p></router-link>
    </div>
    <div class="movie-item" v-for="item in movies">
      <router-link to="file" tag="a"><img :src="item.img" :alt="item.title"><p>{{item.title}}</p></router-link>
    </div>
    <div class="movie-item" v-for="item in movies">
      <router-link to="file" tag="a"><img :src="item.img" :alt="item.title"><p>{{item.title}}</p></router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "movie",
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
            ]
          }
        }
    }
</script>

<style scoped>
  .movie{
    width: 900px;
    overflow: hidden;
    margin: 1rem auto 0 auto;
  }
  .movie-item{
    width: 20%;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .movie-item p:hover{
    background-color:#ef4238 ;
    color: white;
    border: 1px solid gray;
  }
</style>
