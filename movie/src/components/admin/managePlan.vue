<template>
  <div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>电影名</th>
        <th>放影厅</th>
        <th>电影开始时间</th>
        <th>电影结束时间</th>
        <th>电影票价</th>
        <th>修改</th>
        <th>删除</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value,key) in planList">
        <th>{{value.movie_name}}</th>
        <td>{{value.hall_name}}</td>
        <td>{{value.schedule_begin_time}}</td>
        <td>{{value.schedule_end_time}}</td>
        <td>{{value.schedule_price}}</td>
        <td><button class="btn btn-info" @click="showChange(key)">修改</button></td>
        <td><button class="btn btn-danger" @click="deletePlan(value.schedule_id)">删除</button></td>
      </tr>
      </tbody>
    </table>
    <p><button class="btn btn-primary btn-lg" style="left: 0;right: 0;margin: 0 auto; display: block;" @click="showChange">添加</button></p>

    <div class="changeShowBg" style="display: none" >
      <div class="changeShow">
        <div class="left">
          <p style="text-align: center;font-family: 方正姚体" class="bg-info">已安排演出计划</p>
          <div v-for="item in schedule" v-cloak style="border: 1px solid black;text-align: center">
            <p>电影名:{{item.movie_name}}</p>
            <p>开始时间:{{new Date(item.movie_begin_time*1000).toLocaleString()}}</p>
            <p>结束时间:{{new Date(item.movie_end_time*1000).toLocaleString()}}</p>
          </div>
        </div>
        <div class="right">
          <span style="float: right;cursor: pointer;font-size: 2rem;line-height: 2rem" @click="closeChange">×</span>
          <form>
            <div class="form-group">
              <label>电影名称</label>
              <select class="form-control" v-model="newPlan.movie_name">
                <option v-for="item in movieList">{{item}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>放映厅</label>
              <select class="form-control" v-model="newPlan.hall_name" >
                <option v-for="item in showList">{{item}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>电影开始时间</label>
              <input type="datetime-local" class="form-control" v-model="newPlan.schedule_begin_time" @blur="getSche">
            </div>
            <div class="form-group">
              <label>电影票价</label>
              <input type="number" min="1" class="form-control" v-model="newPlan.schedule_price">
            </div>
            <div>
              <button class="btn btn-default" style="left: 0;right: 0;margin: 0 auto; display: block" @click="addPlan(newPlan.schedule_id)">提交</button>
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
          axios.post('http://47.100.6.42/ttms/public/index.php/admin/schedule/findSche')
            .then((res)=>{
              this.planList = res.data.data;
            });
          axios.post('http://47.100.6.42/ttms/public/index.php/admin/hall/findhall')
            .then((res)=>{
              for(let item of res.data.data){
                this.showList.push(item.hall_name);
              }
            });
          axios.post('http://47.100.6.42/ttms/public/index.php/admin/movie/findmovie')
            .then((res)=>{
              for(let item of res.data.data){
                this.movieList.push(item.movie_name);
              }
            });
        },
        data(){
          return{
            planList:[],
            newPlan:{
              movie_name:'',
              schedule_begin_time:"0001-01-01T01:01",
              hall_name:'',
              schedule_price:0
            },
            movieList:[],
            showList:[],
            schedule:[],
          }
        },
        methods:{
          deletePlan(id){
            let el = event;
            axios.post('http://47.100.6.42/ttms/public/index.php/admin/schedule/deleteSche',{schedule_id:id})
              .then((res)=>{
                  if(res.data.status){
                    this.$parent.Popup('删除失败','请重新操作尝试删除');
                  }else{
                    el.path[2].remove();
                  }
              });
          },
          addPlan(id){
            let newPlan = {...this.newPlan};
            let date = new Date(newPlan.schedule_begin_time);
            newPlan.schedule_begin_time = parseInt(date.getTime()/1000);
            if(id >= 0){
              axios.post('http://47.100.6.42/ttms/public/index.php/admin/schedule/modifysche',newPlan)
                .then((res)=> {
                  if (res.data.status) {
                    this.$parent.Popup("添加失败", '请重复点击提交进行再次尝试');
                  } else {
                    this.closeChange();
                    axios.post('http://47.100.6.42/ttms/public/index.php/admin/schedule/findSche')
                      .then((res)=>{
                        this.planList = res.data.data;
                      });
                  }
                });
            }else{
              axios.post('http://47.100.6.42/ttms/public/index.php/admin/schedule/addSche',newPlan)
                .then((res)=>{
                    if(res.data.status){
                      this.$parent.Popup("添加失败",'请重复点击提交进行再次尝试');
                    }else{
                      this.closeChange();
                      axios.post('http://47.100.6.42/ttms/public/index.php/admin/schedule/findSche')
                        .then((res)=>{
                          this.planList = res.data.data;
                        });
                    }
                });
            }
          },
          closeChange(){
            this.newPlan = {
                movie_name:'',
                schedule_begin_time:'0001-01-01T01:01',
                hall_name:'',
                schedule_price:0
            };
            this.schedule = [];
            document.getElementsByClassName('changeShowBg')[0].style.display = "none";
          },
          showChange(id){
            document.getElementsByClassName('changeShowBg')[0].style.display = "block";
            if(id >= 0 ){
               this.newPlan = this.planList[id];
               this.newPlan.schedule_begin_time = this.newPlan.schedule_begin_time.split(" ").join("T");
            }
          },
          getSche(){
            let newPlan = {...this.newPlan};
            let date = new Date(newPlan.schedule_begin_time);
            newPlan.schedule_begin_time = parseInt(date.getTime()/1000);
            axios.post('http://47.100.6.42/ttms/public/index.php/admin/schedule/findHallScheTime',
              {
                hall_name:newPlan.hall_name,
                date_time:newPlan.schedule_begin_time
              }
            )
              .then((res)=>{
                this.schedule = res.data.data;
              });
          }
        }
    }
</script>

<style scoped>

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
    width: 50%;
    height: 100%;
  }
  .left{
    padding-right: 10px;
    overflow: auto;
  }
  .right{
    padding-left: 10px;
    border-left: 1px solid black;
  }
  .right form{
    margin-top: 100px;
  }
</style>
