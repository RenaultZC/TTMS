<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>影厅名称</th>
          <th>影厅座位数</th>
          <th>座位行数</th>
          <th>座位列数</th>
          <th>不能用的座位</th>
          <th>影厅简介</th>
          <th>修改</th>
          <th>删除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value,key) in showList" class="showList" v-cloak>
          <th>{{value.hall_name}}</th>
          <td>{{value.hall_seats}}</td>
          <td>{{value.seat_rows}}</td>
          <td>{{value.seat_cols}}</td>
          <td>{{value.seat_dis_cnt}}</td>
          <td :title="value.hall_description">{{value.hall_description}}</td>
          <td><button class="btn btn-info" @click="showChange(key)">修改</button></td>
          <td><button class="btn btn-danger" @click="deleteShow(value.hall_id)">删除</button></td>
        </tr>
      </tbody>
    </table>
    <p><button class="btn btn-primary btn-lg" style="left: 0;right: 0;margin: 0 auto; display: block;" @click="showChange">添加</button></p>
    <div class="changeShowBg" style="display: none">
      <div class="changeShow">
        <div class="left">
          <p style="text-align: center;font-family: 方正姚体;border-top: 10px solid #f0f0f0;border-radius: 30%">屏幕中央</p>
          <ul v-for="(item,key) in seat_info">
            <li v-for="(cItem,ckey) in item" class="seat" :class="cItem?'':'red'" :style="{marginLeft:seatPadding}" @click="addSeat(key,ckey)"></li>
          </ul>
        </div>
        <div class="right">
          <form>
            <div>
              <span style="float: right;cursor: pointer;font-size: 2rem;line-height: 2rem" @click="closeChang">×</span>
            </div>
            <div class="form-group">
              <label>影厅名称</label>
              <input type="text" class="form-control" placeholder="影厅名称" id="showName" v-model="cShow.hall_name">
            </div>
            <div class="form-group">
              <label>座位行数</label>
              <input type="number" class="form-control" placeholder="座位行数" min="1" max="15" id="showRow" v-model="cShow.seat_rows">
            </div>
            <div class="form-group">
              <label>座位列数</label>
              <input type="number" class="form-control" placeholder="座位列数" min="1" max="15" id="showCol" v-model="cShow.seat_cols">
            </div>
            <div class="form-group">
              <label>影厅简介</label>
              <textarea class="form-control" placeholder="影厅简介" style="height: 7rem;resize: none"  id="showInfo" v-model="cShow.hall_description"></textarea>
            </div>
            <div class="form-group">
              <label>不可用座位数</label>
              <span v-model="cShow.seat_dis_cnt">{{cShow.seat_dis_cnt}}</span>
            </div>
            <div>
              <button class="btn btn-default" style="left: 0;right: 0;margin: 0 auto; display: block" @click="addShow(cShow.hall_id)">提交</button>
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
          axios.post('http://47.100.6.42/ttms/public/index.php/admin/hall/findhall')
            .then((res)=>{
              if(!res.data.msg){
                this.showList = res.data.data;
              }
            });
        },
        data(){
          return {
            showList:[],
            cShow:{
              hall_description:"",
              hall_name:"",
              hall_seats:0,
              seat_cols:0,
              seat_dis_cnt:0,
              seat_rows:0},
            seat_info:[],
            errorSeat:[],
            seatPadding:''
          }
        },
        methods:{
          deleteShow(id){
            let el = event;
            axios.post('http://47.100.6.42/ttms/public/index.php/admin/hall/deletehall',{hall_id:id})
              .then((res)=>{
                if(res.data.status){
                  console.log(id);
                  this.$parent.Popup('未知错误','删除失败');
                }else{
                  el.path[2].remove();
                }
              });
          },
          showChange(key){
            if(key >= 0){
              this.cShow = {...this.showList[key]};
              axios.post('http://47.100.6.42/ttms/public/index.php/admin/hall/findseat',{hall_id:this.cShow.hall_id})
                .then((res)=>{
                  let data  = res.data;
                  if(!data.status){
                    for(let i = 0;i < this.cShow.seat_rows;i++){
                      let arr=[];
                      for(let j = 0;j < this.cShow.seat_cols;j++){
                        arr.push(1);
                      }
                      this.seat_info.push(arr);
                    }
                    for(let i = 0;i < data.data.length;i++){
                      this.seat_info[data.data[i][0]][data.data[i][1]] = 0;
                    }
                    this.errorSeat = data.data;
                    this.seatPadding = 400/this.cShow.seat_cols-24+"px";
                  }
                });
            }
            document.getElementsByClassName('changeShowBg')[0].style.display = "block";
          },
          closeChang(){
            this.cShow = {
              hall_description:"",
              hall_name:"",
              hall_seats:0,
              seat_cols:0,
              seat_dis_cnt:0,
              seat_rows:0};
            this.seat_info = [];
            document.getElementsByClassName('changeShowBg')[0].style.display = "none";
          },
          addShow(id){
            let cShow = this.cShow;
            cShow['seat_info'] = [];
            cShow.seat_rows = parseInt(cShow.seat_rows);
            cShow.seat_cols = parseInt(cShow.seat_cols);
            cShow.hall_seats = parseInt(cShow.seat_rows)*parseInt(cShow.seat_cols)-cShow.seat_dis_cnt;
            if(typeof id === 'number' && !isNaN(id)){
              cShow.seat_info = this.errorSeat;
              console.log(this.errorSeat);
              axios.post('http://47.100.6.42/ttms/public/index.php/admin/hall/modifyhall',cShow)
                .then((res)=>{
                  if(res.data.status){
                    this.$parent.Popup("修改失败",'请重复点击提交进行再次尝试');
                  }else{
                    this.closeChang();
                    axios.post('http://47.100.6.42/ttms/public/index.php/admin/hall/findhall')
                      .then((res)=>{
                        console.log(!res.data.status);
                        if(!res.data.status){
                          this.showList = res.data.data;
                        }
                        else{
                          console.log('请求失败');
                        }
                      });
                  }
                });
              console.log(cShow);
            }else{
              axios.post('http://47.100.6.42/ttms/public/index.php/admin/hall/addhall',cShow)
                .then((res)=>{
                  if(res.data.status){
                    this.$parent.Popup("添加失败",'请重复点击提交进行再次尝试');
                  }else{
                    this.closeChang();
                    axios.post('http://47.100.6.42/ttms/public/index.php/admin/hall/findhall')
                      .then((res)=>{
                        console.log(!res.data.status);
                        if(!res.data.status){
                          this.showList = res.data.data;
                        }
                        else{
                          console.log('请求失败');
                        }
                      });
                  }
                });
              console.log(cShow);
            }
          },
          addSeat(row,col){
            let ev = event.target;
            if(ev.className==="seat red"){
              ev.className = "seat";
              let arr=[];
              for(let i = 0;i < this.errorSeat.length;i++){
                if(this.errorSeat[i][0] !== row || this.errorSeat[i][1] !== col){
                  arr.push(this.errorSeat[i]);
                }
              }
              this.errorSeat = [...arr];
              this.cShow.seat_dis_cnt--;
            }else{
              ev.className += " red";
              this.errorSeat.push([row,col]);
              this.cShow.seat_dis_cnt++;
            }
          }
        }
    }
</script>

<style scoped>
  .showList{
    white-space: nowrap;
  }
  .showList td{
    max-width: 750px;
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
    width: 60%;
    overflow: auto;
  }
  .right{
    width: 40%;
    padding-left: 10px;
    border-left: 1px solid black;
  }
  ul .red {
    background-image: url("../../../static/img/red.png");
  }
  .left ul{
    overflow: hidden;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .seat{
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.5rem;
    float: left;
    background-image: url("../../../static/img/black.png");
    background-size: 100%;
  }
  .seat:hover{
    cursor: pointer;
  }
</style>
