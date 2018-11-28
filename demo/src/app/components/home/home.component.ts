import { Component, OnInit } from '@angular/core';


import { HttpClientService } from "../../services/httpclient.service";

import { SocketioService } from "../../services/socketio.service";

import { StorageService } from "../../services/storage.service";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public list = [];
  public api='';
  public cartNum=0;

  public uid=''; /*桌号*/
  constructor(public httpservice: HttpClientService,public socketio:SocketioService,public storage:StorageService) {
    this.api=this.httpservice.api;

    this.uid=this.storage.get('roomid');



    //监听服务器广播的数据 监听到广播以后更新购物车数量

    var socket:any=this.socketio.getSocketio();
    socket.on('addcart',()=>{
        //用到this注意this指向
       this.getCartNum();
    })
  }

  ngOnInit() {
    this.asideDomInit();

    this.requestData();

    this.getCartNum();
  }

  asideDomInit() {
    //按钮
    var navCate = document.getElementById("nav_cate");
    //分类
    var leftCate = document.getElementById("left_cate");
    //背景
    var bg = document.getElementById("bg");
    var flag = true;
    navCate.onclick = function() {
      if (flag) {
        flag = false;
        leftCate.style.transform = "translate(0,0)";
        bg.style.display = "block";
      } else {
        flag = true;
        leftCate.style.transform = "translate(-100%,0)";
        bg.style.display = "none";
      }
    };
  }
  requestData() {
    var api = "api/productlist";
    this.httpservice.get(api).then((response:any) => {
      this.list = response.result;
    });
  }
  changeList(key){
                   // alert(key);

    var itemCateDom: any = document.querySelectorAll(".item_cate");

    document.documentElement.scrollTop = itemCateDom[key].offsetTop;
    //分类
    var leftCate = document.getElementById("left_cate");
    //背景
    var bg = document.getElementById("bg");

    leftCate.style.transform = "translate(-100%,0)";
    bg.style.display = "none";
  }


  getCartNum(){
    //桌号回头是扫描二维码获取的，刚开始写一个固定值
    var api = "api/cartCount?uid="+this.uid;
    this.httpservice.get(api).then((response:any) => {
      this.cartNum = response.result;
    });
  }
}
