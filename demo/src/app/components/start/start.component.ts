import { Component, OnInit } from '@angular/core';

import { HttpClientService } from "../../services/httpclient.service";

import { Router,ActivatedRoute } from "@angular/router";

import { SocketioService } from "../../services/socketio.service";


import { StorageService } from "../../services/storage.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public p_num='1人'; //用餐人数

  public p_mark='';  //备注信息

  public uid='';  /*桌号*/

  public hasLoading=true;

  constructor(
    public httpservice: HttpClientService,
    public router:Router,   /*js跳转路由*/
    public route: ActivatedRoute,   /*get传值 动态路由的获取*/
    public socketio:SocketioService,
    public storage:StorageService) {   

    //获取get传值  获取桌号

    // console.log(this.route.queryParams['_value'].roomid);

    var roomid=this.route.queryParams['_value'].roomid;

    //建立连接
    this.socketio.setSocketio(roomid);
    //保存桌号
    this.storage.set('roomid',roomid);

    this.uid=roomid;



    //请求用餐人数接口  判断用餐信息是否存在

    this.getPeopleInfo();
    

  }

  ngOnInit() {

    this.addEvent();
  }

  addEvent(){

    // 保存this

    var that:any=this;

    //人数的选择

    var lisDom:any=document.querySelectorAll('.user_list li');
     
    for(var i=0;i<lisDom.length;i++){

      lisDom[i].onclick=function(){

          //去掉所有li的 active class ，给当前元素加上active

          for(var j=0;j<lisDom.length;j++){

            lisDom[j].className='';
          }

          this.className='active';

          // console.log(this.querySelector('span').innerHTML);

          that.p_num=this.querySelector('span').innerHTML.trim()
          
      }
    }



    //口味的选择

    var markLisDom:any=document.querySelectorAll('.mark_list li');
    // alert(lisDom);

    for(var i=0;i<markLisDom.length;i++){

      markLisDom[i].onclick=function(){

          //去掉所有li的 active class ，给当前元素加上active

          for(var j=0;j<markLisDom.length;j++){

            markLisDom[j].className='';
          }
          this.className='active';

          that.p_mark=that.p_mark+' '+this.querySelector('span').innerHTML.trim()
          
      }
    }

  }

  //用餐人数信息发到服务器
  addPeopleInfo(){

    console.log(this.p_num,this.p_mark);

    var api='api/addPeopleInfo';
    this.httpservice.doPost(api,{
      'uid':this.uid,
      'p_num':this.p_num,
      'p_mark':this.p_mark      

    }).then((data:any)=>{
        console.log(data);     
        //js跳转路由
        this.router.navigate(['/home']);
   });

  }
  //获取用餐人数信息
  getPeopleInfo(){


    var api='api/peopleInfoList?uid='+this.uid;
    this.httpservice.get(api).then((response:any) => {
        console.log(response);


        this.hasLoading=false;
        if(response.result.length>0){
            //js跳转路由
             this.router.navigate(['/home']);

        }
    });
  }

}
