<template>
  <div>
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
      <tr v-for="(value,key) in movieList" v-cloak>
          <th>{{key+1}}</th>
          <td>{{value.movieName}}</td>
          <td>{{value.sumBoxInfo}}</td>
          <td>{{value.boxInfo}}</td>
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
        name: "now-ticket",
        data(){
          return {
            movieList:[],
          }
        },
        beforeCreate(){
          axios.get("http://ttms.zhangchaoweb.xin/api/searchList")
            .then((res)=>{
              this.movieList =  res.data.data.list;
            })
        }
    }
</script>

<style scoped>
  .table th{
    text-align: center;
  }
  .table{
    font-size: 1.5rem;
    font-family: 华文楷体;
  }
</style>
