<template>
    <div class="user">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>电影</th>
            <th>演出厅</th>
            <th>开始时间</th>
            <th>总价</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userlist">
            <td>{{item.movie_name}}</td>
            <td>{{item.hall_name}}</td>
            <td>{{new Date(item.schedule_begin_time*1000).toLocaleString()}}</td>
            <td>{{item.order_discount_price}}</td>
            <td>{{item.is_active===-3?'已退票':(item.is_active===-1?'已失效':(item.is_active===0?'正在购票':'购票成功'))}}</td>
            <td><button class="btn" :class="item.is_active===0?'btn-info':(item.is_active===1?'btn-danger':'btn-primary')" @click="perfect(item.is_active,item.order_num)">{{item.is_active===0?'支付':(item.is_active===1?'退票':'')}}</button></td>
          </tr>
        </tbody>
      </table>
      <p style="text-align: center;font-size: 2rem;border-bottom: 1px solid #f5f5f5;">{{userlist.length?'':'暂时没有订单'}}</p>
    </div>
</template>

<script>
  import store from'@/vuex/store';
    export default {
        name: "user-center",
        store,
        beforeCreate(){
          if(this.$store.state.login){
            this.$router.push({path:'/login'});
          }
          axios.post('http://47.100.6.42/ttms/public/index.php/index/ticket/findUserTicket',{customer_id:this.$store.state.user.user_id})
            .then((res)=>{
              this.userlist = res.data.data;
              this.$parent.loading();
            })
        },
        mounted(){
            this.$parent.loading();
        },
        data(){
          return{
            userlist:[]
          }
        },
        methods:{
          perfect(isActive,orderNum){
            if(isActive===1){
              axios.post('http://47.100.6.42/ttms/public/index.php/index/ticket/refundTicket ',{order_num:orderNum})
                .then((res)=>{
                  if(res.data.data.status){
                    this.Popup('退票','退票失败');
                  }
                  else{
                    axios.post('http://47.100.6.42/ttms/public/index.php/index/ticket/findUserTicket',{customer_id:this.$store.state.user.user_id})
                      .then((res)=>{
                        this.userlist = res.data.data;
                        this.$parent.loading();
                      })
                  }
                })
            }else if(isActive === 0){
              axios.get('http://47.100.6.42/ttms/public/index.php/index/ticket/buyticket ',{order_num:orderNum,customer_id:this.$store.state.user.user_id})
                .then((res)=>{
                  if(res.data.data.status){
                    this.Popup('支付','支付失败');
                  }
                  else{
                    axios.post('http://47.100.6.42/ttms/public/index.php/index/ticket/findUserTicket',{customer_id:this.$store.state.user.user_id})
                      .then((res)=>{
                        this.userlist = res.data.data;
                        this.$parent.loading();
                      })
                  }
                });
            }
          }
        }
    }
</script>

<style scoped>
.user{
  width: 900px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
