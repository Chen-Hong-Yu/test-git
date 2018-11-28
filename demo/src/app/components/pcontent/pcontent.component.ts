import { Component, OnInit } from '@angular/core';


import { HttpClientService } from "../../services/httpclient.service";

//引入ActivatedRoute
import { ActivatedRoute,Router } from "@angular/router";


import { SocketioService } from "../../services/socketio.service";



import { StorageService } from "../../services/storage.service";


@Component({
  selector: "app-pcontent",
  templateUrl: "./pcontent.component.html",
  styleUrls: ["./pcontent.component.scss"]
})
export class PcontentComponent implements OnInit {

  public list:any=[];
  public api='';
  public num=1;
  public uid=''; /*桌号*/

  constructor(
    public route: ActivatedRoute,
    public httpservice: HttpClientService,
    public router:Router,
    public socketio:SocketioService,
    public storage:StorageService

  ) {

    this.api = httpservice.api;
    this.uid=this.storage.get('roomid');

  }

  ngOnInit() {
    //获取动态路由传值
    // console.log(this.route.params["_value"]);

    //获取get传值
    // console.log(this.route.queryParams)

    var id = this.route.params["_value"].id;

    this.requestData(id);
  }

  requestData(id) {

    var api = "api/productcontent?id=" + id;
    this.httpservice.get(api).then((data:any)=>{

       console.log(data);
        this.list = data.result[0];
    });
  }

  //减少数量
  decNum(){
    if(this.num>1){
      --this.num;   
    } 

  }
  //增加数量
  incNum(){
    ++this.num;

  }
  //加入购物车
  addCart(){

      //桌号回头是扫描二维码获取的，刚开始写一个固定值

      var uid=this.uid;

      var title=this.list.title;

      var product_id=this.list._id;

      var price=this.list.price;

      var num=this.num;

      var img_url=this.list.img_url;


      //执行提交数据

      var api='api/addcart';
      this.httpservice.doPost(api,{
        uid,title,product_id,price,num,img_url
      }).then((data:any)=>{
        console.log(data);
        if(data.success){
          //给服务器广播数据
          var socket:any=this.socketio.getSocketio()
          socket.emit('addcart','addcart');
          
          //js跳转路由
          this.router.navigate(['/home']);
        }        
     });


  }
}
