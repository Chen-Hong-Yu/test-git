import { Component, OnInit } from '@angular/core';

import { HttpClientService } from "../../services/httpclient.service";

import { SocketioService } from "../../services/socketio.service";


import { Router } from "@angular/router";

import { StorageService } from "../../services/storage.service";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public api='';
  public list:any=[];

  public peopleInfoList:any=[];

  public allPrice=0;

  public allNum=0;
  public uid='';//桌号

  constructor(public httpservice: HttpClientService,public socketio:SocketioService,public storage:StorageService,  public router:Router,   /*js跳转路由*/) {
      this.api=this.httpservice.api;



      //监听服务器广播的数据 监听到广播以后更新购物车数量
      var socket:any=this.socketio.getSocketio();
   
      //通知服务器      
      socket.on('addcart',()=>{
          //用到this注意this指向
          this.getCartList();
      })
      this.uid=this.storage.get('roomid');

   }

  ngOnInit() {

    this.getCartList();

    this.getPeopleInfoList();
  }

  getCartList(){
    //a002 桌号  扫描二维码获取

    var api='api/cartlist?uid='+this.uid;
    
    this.httpservice.get(api).then((response:any)=>{
      console.log(response);

      this.list=response.result;      

      this.getTotalResult();

    })

  }

  decNum(item,key){

    var uid=this.uid;
    var product_id=item.product_id;

    var num=item.num;

    var api='api/decCart?uid='+uid+'&product_id='+product_id+'&num='+num;
    this.httpservice.get(api).then((response:any)=>{
        if(item.num>1){
          --item.num;
        }else{
          this.list.splice(key,1);  //todolist
        }
        this.getTotalResult();

        //通知服务器
        var socket:any=this.socketio.getSocketio();
   
        //通知服务器
        socket.emit('addcart','addcart');

    })
  }

  incNum(item){

    var uid=this.uid;
    var product_id=item.product_id;

    var num=item.num;

    var api='api/incCart?uid='+uid+'&product_id='+product_id+'&num='+num;
    this.httpservice.get(api).then((response:any)=>{
      
         ++item.num;

         this.getTotalResult();


         var socket:any=this.socketio.getSocketio();
   
         //通知服务器
         socket.emit('addcart','addcart');
    })
    

  }
  //获取用餐人数 以及口味接口
  getPeopleInfoList(){


    var uid=this.uid;
    var api='api/PeopleInfoList?uid='+uid;
    this.httpservice.get(api).then((response:any)=>{
      
        console.log(response);

        this.peopleInfoList=response.result[0];

    })
  }
  //计算数量和总价

  getTotalResult(){

      var allPrice=0;

      var allNum=0;


      for(var i=0;i<this.list.length;i++){

        allPrice+=this.list[i].price*this.list[i].num;


        allNum+=this.list[i].num;

      }


      this.allPrice=allPrice;

      this.allNum=allNum;




  }
  //提交订单
  addOrder(){ 

  

    var uid=this.uid;
  
    var p_num=this.peopleInfoList.p_num;

    var p_mark=this.peopleInfoList.p_mark;

    var total_price=this.allPrice;

    var total_num=this.allNum;
    
    var order=JSON.stringify(this.list);  /*数组   对象  序列化*/


      var api='api/addOrder';
      this.httpservice.doPost(api,{
        uid,p_num,p_mark,total_price,total_num,order
      }).then((data:any)=>{        
        console.log(data);

        if(data.success){
          //js跳转路由
          this.router.navigate(['/order']);
        }else{
          alert('提交数据失败')
        }
     });

    

  }

}
