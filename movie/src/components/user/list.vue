<template>
  <div id="list">
    <div class="list-head">
      <h3>今日大盘({{movies.queryDate}})</h3>
      <div class="details">
        <div class="left-num">
          <p style="color:#ff3caf"><span style="font-size: 38px">{{movies.totalBoxInfo}}</span>万</p>
          <p>截至{{movies.updateInfo}}</p>
          <p>票房预测:{{movies.totalBoxUnit}}</p>
        </div>
        <ul class="three-num">
          <li>
            <p><span>{{movies.splitTotalBox}}</span>{{movies.splitTotalBoxUnit}}</p>
            <p>分账票房信息</p>
          </li>
          <li>
            <p><span>{{movies.crystal.viewInfo}}</span>万</p>
            <p>已售票数</p>
          </li>
          <li>
            <p><span>{{movies.totalBox}}</span>万</p>
            <p>综合票房信息</p>
          </li>
        </ul>
      </div>
    </div>
    <h3>影片明细</h3>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>榜单</th>
        <td>电影名称</td>
        <td>总票房</td>
        <td>综合票房</td>
        <td>票房占比</td>
        <td>排片场次</td>
        <td>排片占比</td>
        <td>场均人次</td>
        <td>上座率</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value,key) in movies.list" v-cloak>
        <th>{{key+1}}</th>
        <td>{{value.movieName}}</td>
        <td>{{value.sumBoxInfo}}</td>
        <td style="color: #fc4486">{{value.boxInfo}}万</td>
        <td>{{value.boxRate}}</td>
        <td>{{value.showInfo}}</td>
        <td>{{value.showRate}}</td>
        <td>{{value.avgShowView}}</td>
        <td>{{value.avgSeatView}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        name: "list",
      data(){
          return{
            movies:{crystal:{viewInfo:null}},
            interval:null,
          }
      },
      beforeCreate(){
        axios.post('http://ttms.zhangchaoweb.xin/api/searchList')
          .then((res)=>{
            this.movies = res.data.data;
            this.$parent.loading();
          });
      },
      mounted(){
          this.$parent.loading();
          this.interval = setInterval(()=>{
            axios.post('http://ttms.zhangchaoweb.xin/api/searchList')
              .then((res)=>{
                this.movies = res.data.data;
              });
          },60000)
      },
      beforeDestroy(){
          clearInterval(this.interval);
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
  .details{
    height: 178px;
    width: inherit;
    border: 1px solid #ececec;
    position: relative;
  }
  .left-num{
    width: 40%;
    position: absolute;
    left: 0;
    bottom: 42px;
    text-align: center;
  }
  .left-num p {
    line-height: 20px;
    color: #666;
    font-size: 14px;
  }
  .three-num{
    padding-bottom: 39px;
    font-size: 14px;
    position: absolute;
    right: 0;
    bottom: 28px;
    width: 60%;
    list-style: none;
    text-align: center;
  }
  .three-num li{
    width: 33%;
    height: 40px;
    float: left;
    position: relative;
    border-left: 1px solid #ececec;
  }
  .three-num li span{
    font-size: 38px;
  }
</style>
