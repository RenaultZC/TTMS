<template>
  <table class="table table-hover">
    <thead>
    <tr>
      <th>榜单</th>
      <th>电影名称</th>
      <th>上映首日票房</th>
      <th>综合票房</th>
      <th>票房占比</th>
      <th>排片场次</th>
      <th>场均人次</th>
      <th>上座率</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(key,value) in movieList" v-cloak>

      </tr>
    </tbody>
  </table>
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
          axios.post("http://" ,(res)=>{
            console.log(res);
          })
        }
    }
</script>

<style scoped>
  .table th{
    text-align: center;
  }
</style>
