<template>
    <div>
      <table class="table table-hover">
        <thead>
        <tr>
          <th>ID</th>
          <th>电影名</th>
          <th>已售票数</th>
          <th>演出厅</th>
          <th>上映日期</th>
          <th>修改</th>
          <th>删除</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in movies">
          <th scope="row">{{item.id}}</th>
          <td>{{item.title}}</td>
          <td>{{item.ticket}}</td>
          <td>{{item.home}}</td>
          <td>{{item.date}}</td>
          <td><button type="button" class="btn btn-info" @click="display">修改</button></td>
          <td><button type="button" class="btn btn-danger" @click="remove($event)">删除</button></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td><button type="button" class="btn btn-success" @click="display">添加</button></td>
        </tr>
        </tbody>
      </table>
      <div id="formbk">
        <form id="form">
          <div class="form-group">
            <label for="exampleInputEmail1">电影名</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="电影名">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">演出厅</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="演出厅">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">上映日期</label>
            <input type="password" class="form-control" id="exampleInputPassword2" placeholder="上映日期">
          </div>
          <div class="checkbox">
            <label>
              <span  @click="none"> Check me out</span>
            </label>
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "add",
      data(){
          return{
            movies:[
              {
                id:1,
                title:"复仇者联盟",
                ticket:20,
                home:'3DMAX',
                date:"2018-05-11"
              },
              {
                id:2,
                title:"超时空同居",
                ticket:20,
                home:'演出厅1',
                date:"2018-05-18"
              },
              {
                id:3,
                title:"寂静之地",
                ticket:20,
                home:'演出厅2',
                date:"2018-05-18"
              },
              {
                id:4,
                title:"青年马克思",
                ticket:20,
                home:'演出厅1',
                date:"2018-05-05"
              },
              {
                id:5,
                title:"游侠索罗",
                ticket:20,
                home:'演出厅2',
                date:"2018-05-25"
              },
              {
                id:6,
                title:"昼颜",
                ticket:20,
                home:'演出厅1',
                date:"2018-05-18"
              },
              {
                id:7,
                title:"后来的我们",
                ticket:20,
                home:'演出厅2',
                date:"2018-04-28"
              },
            ]
          }
      },
      methods:{
          none:function () {
            document.getElementById("formbk").style.display = "none";
          },
          display:function () {
            document.getElementById("formbk").style.display = "block";
          },
          remove:function (el) {
            el.path[2].style.display = 'none';
          }
      }
    }
</script>

<style scoped >
  #formbk{
    display: none;
    width: 70%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    top: 0;
    margin: auto;
    position: absolute;
  }
  #form{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
    background-color: rgba(255,255,255,0.8);
    width: 40%;
    height: 40%;
    text-align: center;
  }
</style>
