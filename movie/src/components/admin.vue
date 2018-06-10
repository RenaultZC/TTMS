<template>
  <div id="body">
    <div class="head">
        <ul class="nav nav-tabs">
          <router-link to="/manageMovie" tag="li"><a>管理电影</a></router-link>
          <router-link to="/manageShow" tag="li"><a>管理演出厅</a></router-link>
          <router-link to="/managePlan" tag="li"><a>管理演出计划</a></router-link>
          <router-link to="/ticket" tag="li"><a>分析营业额</a></router-link>
          <router-link to="/nowTicket" tag="li"><a>查看当前票房</a></router-link>
        </ul>
    </div>
    <div class="body">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
    import store from'@/vuex/store';
    export default {
        name: "admin",
        store,
        beforeCreate(){
          // if(this.$store.state.user.authority !== 1){
          //     this.$router.push({path:'/home'})
          // }
        }
    }
</script>

<style scoped>
  #body{
    overflow: hidden;
    min-width: 720px;
  }
  .head{
    padding-top: 1rem;
  }
</style>
