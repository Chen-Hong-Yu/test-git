import { Component, OnInit } from '@angular/core';

import { HttpClientService } from "../../services/httpclient.service";

import { Router } from "@angular/router";


import { StorageService } from "../../services/storage.service";


@Component({
  selector: 'app-editpeopleinfo',
  templateUrl: './editpeopleinfo.component.html',
  styleUrls: ['./editpeopleinfo.component.scss']
})
export class EditpeopleinfoComponent implements OnInit {
  public api='';
  public peopleInfoList:any=[];
  public userlist=[];

  public p_num='1人'; //用餐人数

  public p_mark='';  //备注信息

  public uid=''; /*桌号*/

  constructor(public httpservice: HttpClientService,public router:Router,public storage:StorageService) { 
    this.api=this.httpservice.api;

    this.uid=this.storage.get('roomid')
  }

  ngOnInit() {

    this.getPeopleInfoList();
    //循环12条数据

    for(var i=0;i<12;i++){

      this.userlist.push(i+1+'人');
    }


    // vue   $nextTick  表示dom加载完成触发的事件


    //事件委托  动态创建的节点没法直接绑定事件  用事件委托
    this.addEvent();
   
  }

  //获取用餐人数 以及口味接口
  getPeopleInfoList(){


    var uid=this.uid; 
    var api='api/PeopleInfoList?uid='+uid;
    this.httpservice.get(api).then((response:any)=>{
      
        console.log(response);

        this.peopleInfoList=response.result[0];

        this.peopleInfoList.p_num=parseInt(this.peopleInfoList.p_num);


        this.p_mark= this.peopleInfoList.p_mark;


        

    })
  }

  addEvent(){

    // 保存this

    var that:any=this;

    //事件委托绑定事件

    var userListDom:any=document.querySelector('#user_list');

    
    // alert(lisDom);

    userListDom.onclick=function(e){
      // e.srcElement    子元素
        console.log(e.target.tagName);  

        if(e.target.tagName=='SPAN'){
          // e.target.parentNode  span的父亲   li

          //让所有的li的class =‘’

          var lisDom=document.querySelectorAll('#user_list li');

          for(var j=0;j<lisDom.length;j++){

              lisDom[j].className='';
          }

          e.target.parentNode.className='active';

          that.p_num=e.target.innerHTML.trim();  
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


    var api='api/addPeopleInfo';
    this.httpservice.doPost(api,{
      'uid':'a002',
      'p_num':this.p_num,
      'p_mark':this.p_mark      

    }).then((data:any)=>{
      console.log(data);     

          //js跳转路由
          this.router.navigate(['/cart']);
    });

  }

  cancel(){
    this.router.navigate(['/cart']);

  }

}
