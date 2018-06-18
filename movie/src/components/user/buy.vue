<template>
  <div class="buy">
    <div class="widget-common-steps">
      <ul class="step-list clearfix">
        <li>1.选择影片场次<span class="arrow"><em class="arrow-in"></em></span></li>
        <li style="color: #ff318c;">2. 选座并填手机号<span class="arrow"><em class="arrow-in"></em></span></li>
        <li>3. 提交并支付订单<span class="arrow"><em class="arrow-in"></em></span></li>
        <li>4. 影院终端取票</li>
      </ul>
    </div>
    <div class="buy-seat">
      <div class="seat-table">
        <div class="select-example">
          <div>
            <span class="seat use-seat"></span>
            <span>可选座位</span>
          </div>
          <div>
            <span class="seat sale-seat"></span>
            <span>已售座位</span>
          </div>
          <div>
            <span class="seat choose-seat"></span>
            <span>已选座位</span>
          </div>
        </div>
        <div v-for="(item,key) in seatTable" class="seat-table-list">
          <span style="width: 2rem;display: block;float: left ">{{key+1}}</span>
          <span v-for="(citem,ckey) in item" :class="citem" class="seat" @click="chooseSeat(key,ckey)"></span>
        </div>
      </div>
      <div class="seat-info">
        <div class="area-cinema">
          <p>
            <span style="color: #999;">影片:</span>
            <span>{{seatData.movie_name}}</span>
          </p>
          <p>
            <span style="color: #999;">影厅:</span>
            <span>{{seatData.schedule_begin_time}}</span>
          </p>
          <p>
            <span style="color: #999;">票价:</span>
            <span>{{seatData.schedule_price}}</span>
          </p>
        </div>
        <div class="area-seat">
          座位：
          <ul><li v-for="item in buyList"><p>{{item[0]+1}}排{{item[1]+1}}列</p></li>
          </ul>
        </div>
        <div class="area-price">
          <p>
            <span style="color: #999;">票数:</span>
            <span style="color: #fc4984;">{{buyList.length}}张</span>
          </p>
          <p>
            <span style="color: #999;">总价:</span>
            <span style="color: #fc4984;">{{buyList.length*seatData.schedule_price}}</span>
          </p>
        </div>
        <p class="btn" @click="buy">确认提交</p>
      </div>
    </div>
    <div class="boxbg" style="display:none;">
      <div class="box">
        <p style="text-align: center">扫码支付 <span style="position: absolute;right: 10px;">剩余时间:<time style="font-size: 24px; color:#fc4984 ">{{new Date(time).getMinutes()}}:{{new Date(time).getSeconds()}}</time></span></p>
        <img class="pay" :src="'http://bshare.optimix.asia/barCode?site=weixin&url='+this.url" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import store from'@/vuex/store';
    export default {
        name: "buy",
        store
        ,
        beforeCreate(){
          if(this.$store.state.login){
            this.$router.push({path:'/login'});
            this.$parent.loading();
          }
          axios.post('http://47.100.6.42/ttms/public/index.php/index/ticket/findticket',{schedule_id:this.$route.params.id})
            .then((res)=>{
              let data = res.data.data;
              this.seatList = data;
              for(let i = 0;i < data.hall_rows;i++){
                  let arr = [];
                  for(let j = 0;j < data.hall_cols;j++){
                    arr.push("use-seat");
                  }
                  this.seatTable.push(arr);
              }
              for(let item of data.sold_seat){
                this.seatTable[item.row][item.col] = "sale-seat";
              }
              for(let item of data.unavail_seat){
                this.seatTable[item.row][item.col] = " ";
              }
              this.$parent.loading();
            });
        },
        created(){

        },
        data(){
          return{
            seatList:{},
            buyList:[],
            seatTable:[],
            seatData:{},
            url:'',
            time:0,
            interval:null,
            order_num:''
          }
        },
        mounted(){
          this.$parent.loading();
          this.seatData = {...this.$route.params.data};
          this.seatData.id = this.$route.params.id;
        },
        methods:{
          chooseSeat(row,col){
            let el = event.target;
            if(el.className === "seat use-seat"){
              if(this.buyList.length < 5){
                    el.className = "seat choose-seat";
                    this.buyList.push([row,col]);
              }else{
                this.$parent.Popup('购票','一次最多购买五张票');
              }
            }else if(el.className === "seat choose-seat"){
              el.className = "seat use-seat";
              let arr = [];
              for(let item of this.buyList){
                if(item[0] !== row || item[1] !== col){
                  arr.push(item);
                }
              }
              this.buyList = arr;
            }
          },
          buy(){
            if(this.buyList.length){
              let data={
                schedule_id:this.seatData.id,
                seat_info:this.buyList,
                customer_id:this.$store.state.user.user_id
              };
                axios.post('http://47.100.6.42/ttms/public/index.php/index/ticket/inpayment',data)
                  .then((res)=>{
                      if(res.data.status){
                          if(res.data.msg === "the seat has been bought"){
                            this.$parent.Popup("购票失败","票已经被购买","/file/"+this.seatData.movie_id);
                          }else if(res.data.msg === "excessive number of tickets"){
                            this.$parent.Popup("购票失败","一个场次最多购买五张","/home");
                          }else{
                            this.$parent.Popup("购票失败","请重新进行操作","/file/"+this.seatData.movie_id);
                          }
                      }else{
                          this.order_num = res.data.data[0].order_num;
                          this.url = 'http://47.100.6.42/ttms/public/index.php/index/ticket/buyticket?order_num='+this.order_num+"&is_paid=1&customer_id="+this.$store.state.user.user_id;
                          this.url = encodeURIComponent(this.url);
                          document.getElementsByClassName('boxbg')[0].style.display = "block";
                          this.time = 15*60000;
                          let interval = setInterval(()=>{
                            axios.post("http://47.100.6.42/ttms/public/index.php/index/ticket/findticketstat",{order_num:this.order_num})
                              .then((res)=>{
                                if(res.data.data == 1){
                                  this.$parent.Popup("购票","购票成功点击确定返回首页",'/home');
                                  clearInterval(interval);
                                }
                                this.time-=1000;
                              });
                            if(this.time < 1000){
                              clearInterval(interval);
                              this.$router.push({path:'/home'});
                              this.$parent.Popup("购票失败",'已超购票时限');
                            }
                          },1000);
                          this.interval = interval;
                      }
                  });

            }else{
              this.$parent.Popup('购票','请选座后进行购票');
            }
          }
        },
      beforeDestroy(){
          clearInterval(this.interval);
      }
    }
</script>


<style type="text/css" scoped>
  .buy{
    overflow: hidden;
    width: 900px;
    height: 600px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
  }
  .widget-common-steps .step-list li {
     position: relative;
     float: left;
     width: 25%;
     height: 40px;
     font-size: 14px;
     line-height: 40px;
     text-align: center;
     color: #666;
   }
  .widget-common-steps .step-list {
    background-color: #f9f9f9;
    overflow: hidden;
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: 400;
  }
  .widget-common-steps .step-list .arrow-in {
     position: absolute;
     top: -6px;
     right: -4px;
     width: 0;
     height: 0;
     border-top: 6px solid transparent;
     border-right: 6px solid transparent;
     border-bottom: 6px solid transparent;
     border-left: 6px solid #f9f9f9;
   }
  .widget-common-steps .step-list .arrow {
    position: absolute;
    top: 14px;
    right: -9px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid #666;
  }
  .area-seat ul li{
    float: left;
    height: 23px;
    margin: 0 0 10px 5px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    line-height: 23px;
    text-align: center;
    background: url(https://dianying.nuomi.com/static/buy/widget/seat/info/img/bg_920a972.gif) no-repeat -1px -1px transparent;
    padding: 0;
  }
  .area-seat ul li p{
    margin-right: -4px;
    padding: 0 16px 0 12px;
    border: 0;
    background: url(https://dianying.nuomi.com/static/buy/widget/seat/info/img/bg_920a972.gif) no-repeat right -30px transparent;
  }
  .area-seat ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .seat-table{
    float: left;
    width: 70%;
  }
  .seat-info{
    float: left;
    width: 30%;
    margin-top: 42px;
  }
  .seat{
    display: inline-block;
    font-size: 0;
    width: 30px;
    height: 26px;
    margin: 0 5px;
  }
  .use-seat{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAY9JREFUSA3tVs1qg0AQ3l1/i5eCFC8+QSC0+BQ999QeC32t9lLovac8RQwk6BOUXLzVitFE0/mEDVIiJsbkUgeM7jjzfd/OjpvlrGZhGL6uVqvnsix5zX3yoxBia5rm22g0etkL5vt+WRTFtm8DJrDrpKI+wExJXd3VyzMw/1axf5YDpe6IqRSPUJZlGdQdmN4eBixgAps4nmRGRUyOCTneXddlnHOWJEkv5CAFFjCBTeOP2Wz2CXI+nU7vqZkmnudVAXBuNptKpWVZGHa2OI4ZdTPTNK3CIB42n89TarYHQWpuHcfJoEqaqqqViFNKDhKUV5ICGxy2bQt6d4cfU1EUQ5LKO4KQ3NWQW5+MxAEXCbraNZd8can7QHypSrOh1EOpz1YBtQkZOw+2zK67V1teI7FhGGy9XjfpavWDWNf1xrhGYtpTGa5z2f/6jmkZFPwff0VR1H0xj1yL5XKJhv3hQRDoaZriILClKz8S5+hwIk3ptHNTHTtowBeLxXWe5/2d8vZIoi4X4/H4myZY/AJMWAAq2pF/7QAAAABJRU5ErkJggg==) no-repeat;
    background-position: 0 1px;
  }
  .sale-seat{
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAeRJREFUSA3tlr9Lw0AUx99dmyZtpRbBX6AOoiAG1KF1EXFUcBMEHRX/LV0EFyfBUhwFJwWdXC2CIKKIttU0TXLPd6kJaaFQz3bSB0kud+99P3ePl7swiNjZ4uz+h+PueAgs0v3rZowBpjXtYPXydi8QiwcN+ZTQlbEBFmNd5YKHyM4fXncJEYJ5FCxX2m2o1JearVlsAkcn0et2CD7NmVt6nMPdu0Up97rGrdY9X1NqFxbN7UDYBxfzs0XO4HCqPwVxzuH6uQIVxw18lJ9VWsDNSwU0EpfaQoijYt48kYKskDfXBIri0mgWaNy3Z8uBUtmC3FAm7GuMdH5HBLh4fIPpbBJGUrofKKjv6qlsuQgbHBnMj/cZdgCVHoNJzS8IyxWdk1o8bSFAi/EQKoclYzitySwvcCbQoKJrTCkSnCAvh4JVzaXlGdHVfAtxYDoCJsPiUgWoxv2DVTP347j/VP84ZaoBfy/VTT8C0bQ5KKDmefBiqe1etB+D3JvbWVvwZCYFj582xan9jSCdEhMZox0X2oKzehzk1Sv7Y8WFLMaR48PTZ93pVUpbde8rNaBjuMpuN83EXUnYVEJIx2e91bHb7/SNWOn08KBfslSBrLA8l9WNhNq30+Hs7Fqdr4/OlNnxsfcFxEaatII5mN4AAAAASUVORK5CYII=);
  }
  .choose-seat{
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAoxJREFUSA3Fls9LFGEYx78z7rq7WuEiQqEVi1SHwjrVSU9aghURJYa2UUgd+nEuKAg6dK7cQ6FSCYrdosK/oFupFF46CLkFBZm7s+K4P2benmfGHRx3t5nZXdln2Zl5n3me5/O+z/vMMyNhk0RfY0zL4qrQIW1SV3wpyRA+P8ZfRTGcD+bLX/CZoeF9kMiwqiIEpJXvuEZBLbANwSutNpRXIFH+tmbRBq7qMh2CWeDLoxjgnV1bNlLu4Ob+di5txuTYQ+O4lPc0wEOjmNGAicZmUpMmEQfYoVLhGMmflOo6gGPrGiYHx/CW40oE7dUFZpojPDJR6RTNcgVo2mvuj6n1flxeJGALENy54SuAv0tQJR3nZR042hBGOg9lkwAZcpFRlXuSPY1H4JODho+eoxj0zFhQ1tLCgrsgU5Ufk2kQpIkEthJkSg9VomvparuDeye+4vjuqOFDaYVsVZAtTICYoeK3bHbOg66227hw8AmWlE+Y/T3t7EAWrsFXDk+he//dgqCdrbcI+tSAxuZ7sK4lC2yKKVyD6+UGnG1/jL7IIytOZ+tNXDz0jKCfEZs/CTWXsO45Xdha5v+MXy4M4HrHO5yK3Iegn5L5RdARxFOzBO0hKD0GHsQ1OKurePHlDG50vEdv5IGBiKfmMDLX7RnKzq5TzcYMf07whT8fsJj4iFiZUI7lesVszJLV1wh+2hxUcPS04go4Ba41A5dMNXceLUONnVpfWUJdb6P1F3UvCea3ybpS1MedkvpwKFzatCTYHwL4v11Ssz2uFbiOwT8yCjy+ecvfAJU7q8Cq9PAN6r8ljQ8BQbOgOt5eoZpTD7Sjxah4/u4dnETTDj88vPq9T3A1C/mcH0p/P7R/ODnAZaZCuGEAAAAASUVORK5CYII=");
  }
  .select-example span{
    margin-bottom: -6px;
  }
  .select-example{
    overflow: hidden;
    height: 34px;
  }
  .select-example div{
    width: 30%;
    float: left;
  }
  .seat-table-list{
    overflow: hidden;
  }
  .area-seat{
    height: 86px;
    overflow: hidden;
  }
  .btn{
    display: block;
    width: 100%;
    height: 40px;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background-color: #ff318c;
    margin-top: 35px;
  }
  .boxbg{
    display: none;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    background-color: rgba(0,0,0,0.5);
  }
  .box{
    width: 400px;
    height: 370px;
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
  .pay{
    width: 50%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    z-index: 0;
    position: absolute;
  }
</style>
