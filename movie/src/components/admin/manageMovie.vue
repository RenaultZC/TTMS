<template>
  <div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>影片名</th>
        <th>影片主演</th>
        <th>影片导演</th>
        <th>影片时长</th>
        <th>电影图片</th>
        <th>影片简介</th>
        <th>放映状态</th>
        <th>修改</th>
        <th>删除</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value,key) in movieList" v-cloak>
          <th>{{value.movie_name}}</th>
          <td style="max-width: 100px" :title="value.movie_main_actor">{{value.movie_main_actor}}</td>
          <td>{{value.movie_director}}</td>
          <td>{{value.movie_duration}}分钟</td>
          <td :title="value.movie_pic">{{value.movie_pic}}</td>
          <td :title="value.movie_description">{{value.movie_description}}</td>
          <td>{{value.is_active?'正在热映':'即将上映'}}</td>
          <td><button class="btn btn-info btn-sm" @click="showChange(key)">修改</button></td>
          <td><button class="btn btn-danger btn-sm" @click="deleteMovie(value.movie_id)">删除</button></td>
      </tr>
      </tbody>
    </table>
    <p><button class="btn btn-primary btn-lg" style="left: 0;right: 0;margin: 0 auto; display: block;" @click="showChange">添加</button></p>
    <div class="changeShowBg" style="display: none;">
      <div class="changeShow">
          <div class="left">
            <img :src="newMovie.movie_pic" alt="请重新设置电影图片" class="movie-pic">
          </div>
          <div class="right">
            <span style="cursor: pointer;font-size: 1.5rem;float: right" @click="closeChange">×</span>
            <form>
              <div class="form-group">
                <label>影片名称</label>
                <input type="text" class="form-control" placeholder="影片名称" v-model="newMovie.movie_name">
              </div>
              <div class="form-group">
                <label>影片主演</label>
                <input type="text" class="form-control" placeholder="影片主演" v-model="newMovie.movie_main_actor">
              </div>
              <div class="form-group">
                <label>影片导演</label>
                <input type="text" class="form-control" placeholder="影片名称" v-model="newMovie.movie_director">
              </div>
              <div class="form-group">
                <label>影片时长</label>
                <input type="number" min="1" max="240" class="form-control" placeholder="影片时长" v-model="newMovie.movie_duration">
              </div>
              <div class="form-group">
                <label>电影图片地址</label>
                <input type="url" class="form-control" placeholder="电影图片地址" v-model="newMovie.movie_pic">
              </div>
              <div class="form-group">
                <label>影片简介</label>
                <textarea  style="height: 3rem;resize: none"  class="form-control" placeholder="影片简介" v-model="newMovie.movie_description"></textarea>
              </div>
              <div>
                <button class="btn btn-default" style="left: 0;right: 0;margin: 0 auto; display: block" @click="addMovie(newMovie.movie_id)">提交</button>
              </div>
            </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "manage-movie",
        beforeCreate(){
          axios.post("http://47.100.6.42/ttms/public/index.php/admin/movie/findmovie",{option:0})
            .then((res)=>{
              if(!res.data.status)
                this.movieList = res.data.data;
              else{
                console.log('请求失败');
              }
            })
        }
        ,
        data(){
          return{
            movieList:[],
            newMovie:{
              movie_name:'',
              movie_main_actor:'',
              movie_director:'',
              movie_duration:'',
              movie_pic:null,
              movie_description:''
            },

          }
        },
        methods:{
          deleteMovie(id){
            let el = event;
            axios.post('http://47.100.6.42/ttms/public/index.php/admin/hall/deletehall',{movie_id:id})
              .then((res)=>{
                if(res.data.status){
                  this.$parent.Popup("删除失败",'请重复点击删除进行再次尝试');
                }else{
                  el.path[2].style.display = 'none';
                }
              });
          },
          showChange(key){
            document.getElementsByClassName("changeShowBg")[0].style.display = "block";
            if(key >= 0){
              this.newMovie = {...this.movieList[key]};
            }
          },
          closeChange(){
            document.getElementsByClassName("changeShowBg")[0].style.display = "none";
            this.newMovie = {
              movie_name:'',
              movie_main_actor:'',
              movie_director:'',
              movie_duration:'',
              movie_pic:null,
              movie_description:''
            };
          },
          addMovie(id){
            if(id >= 0){
              axios.post('http://47.100.6.42/ttms/public/index.php/admin/movie/modifymovie',this.newMovie)
                .then((res)=>{
                  if(res.data.status){
                    this.$parent.Popup("修改失败",'请重复点击提交进行再次尝试');
                  }else{
                    this.closeChange();
                  }
                })
            }else{
              axios.post('http://47.100.6.42/ttms/public/index.php/admin/movie/addmovie',this.newMovie)
                .then((res)=>{
                  if(res.data.status){
                    this.$parent.Popup("添加失败",'请重复点击提交进行再次尝试');
                  }else{
                    this.closeChange();
                  }
                })
            }
            axios.post("http://47.100.6.42/ttms/public/index.php/admin/movie/findmovie",{option:0})
              .then((res)=>{
                if(!res.data.status)
                  this.movieList = res.data.data;
                else{
                  console.log('请求失败');
                }
              })
        }
        }
    }
</script>

<style scoped>
.table td{
  min-width: 100px;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.changeShowBg{
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position: fixed;
    background-color: rgba(0,0,0,0.5);
   }
.changeShow{
  width: 720px;
  height: 540px;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
  background-color: white;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  position: absolute;
}
.left,.right{
  float: left;
  height: 100%;
}
.left{
  width: 40%;
  overflow: auto;
  position: relative;
}
.right{
  width: 60%;
  padding-left: 10px;
  border-left: 1px solid black;
}
  .movie-pic{
    width: 240px;
    height: 330px;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
  }
</style>
