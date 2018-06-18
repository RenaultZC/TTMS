<template>
  <div class="file">
    <div class="background" :style="{backgroundImage: 'url('+movie.movie_pic+')'}">
      <div class="background-intro">
        <div class="content">
          <div class="movie-pic">
            <img :src="movie.movie_pic" :alt="movie.movie_name">
          </div>
          <div class="movie-info">
            <h4>{{movie.movie_name}}</h4>
            <p>导演: {{movie.movie_director}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主演: {{movie.movie_main_actor}}</p>
            <p>电影时长: {{movie.movie_duration}}分钟</p>
            <p class="movie-description" :title="movie.movie_description">剧情: {{movie.movie_description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="schedule">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>放映时间</th>
            <th>放映厅</th>
            <th>剩余座位</th>
            <th>售价（元）</th>
            <th>选座售票</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in schedule">
            <td class="time">
              <p>开始时间:{{item.schedule_begin_time}}</p>
              <p style="color: #999;">结束时间:{{item.schedule_end_time}}</p>
            </td>
            <td>
              <p>{{item.hall_name}}</p>
            </td>
            <td>
              <p>{{item.rest_seat_cnt}}</p></td>
            <td>
              <p>{{item.schedule_price}}</p>
            </td>
            <td>
              <router-link tag="p" :to="{name:'buy',params:{id:item.schedule_id,data:item}}" class="btn">选座购票</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="schedule.length===0" style="text-align: center">目前还未安排影片，请耐心等待</p>
    </div>
  </div>
</template>

<script>

    export default {
        name: "file",
        data(){
          return {
            movie:{},
            schedule:[]
          }
        },
        beforeCreate(){
          axios.post('http://47.100.6.42/ttms/public/index.php/admin/movie/findmovie')
            .then((res)=>{
              for(let item of res.data.data){
                if(item.movie_id == this.$route.params.id){
                  this.movie = item;
                }
              }
              axios.post('http://47.100.6.42/ttms/public/index.php/index/ticket/findMoiveSche',{movie_id:this.movie.movie_id})
                .then((res)=>{
                  this.$parent.loading();
                  this.schedule = res.data.data;
                });
            });
        },
        mounted(){
          this.$parent.loading();
        }
    }
</script>

<style scoped>
  .file{
    width: 900px;
    left:0;
    right: 0;
    margin: 1rem auto 0 auto;
  }
  .background{
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position:center top;
  }
  .background-intro{
    background: rgba(0,0,0,.8);
  }
  .content{
    width: 70%;
    min-width: 720px;
    padding: 20px;
    margin-left: 183px;
    color: white;
  }
  .content h4{
    margin-bottom: 2rem;
  }
  .movie-pic img{
    width: 182px;
    height: 252px;
    display: block;
    float: left;
    margin-left: -192px;
  }
  .movie-info p{
    width: 100%;
    overflow: hidden;
    height: 16px;
    margin-bottom: 13px;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .movie-info .movie-description{
    white-space: normal;
    height: 7rem;
  }
  .table th{
    text-align: center;
  }
  .table td p{
    text-align: center;
    margin-top: 10px;
  }
  .table .time p {
    margin: 0;
  }
  .table td .btn{
    display: inline-block;
    width: 80px;
    height: 30px;
    color: #fff;
    background-color: #f03d37;
    font-size: 14px;
    margin-left: 25%;
    border-radius: 100px;
    text-align: center;
    box-shadow: 0 2px 10px -2px #f03d37;
    margin-top: 4px;
  }
  .table td .btn:hover{
    background-color: #ff5e59;
  }
</style>
