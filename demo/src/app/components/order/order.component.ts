import { Component, OnInit } from '@angular/core';

import { HttpClientService } from "../../services/httpclient.service";

import { StorageService } from "../../services/storage.service";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public uid='';

  public list:any=[];

  constructor(public httpservice: HttpClientService,public storage:StorageService) {


    this.uid=this.storage.get('roomid');
   }

  ngOnInit() {

      this.getOrder();
  }

  getOrder(){

    var uid=this.uid; 
    var api='api/getOrder?uid='+uid;
    this.httpservice.get(api).then((response:any)=>{
      
        console.log(response);       

        this.list=response.result[0];

    })

  }

  doPay(){


    var uid=this.uid; 

    var order_id=this.list.order_id;

    var total_price=this.list.total_price;
    var return_url=this.httpservice.return_url+'success';
    
    
    var api='api/doPay';
      this.httpservice.doPost(api,{
        uid,order_id,total_price,return_url
      }).then((response:any)=>{        
          console.log(response.result.data);

          location.href=response.result.data;

    });


  }

  doWeixinPay(){

    var order_id=this.list.order_id;

    location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bf3787c783116e4&redirect_uri=http://b.itying.com?order_id='+order_id+'&response_type=code&scope=snsapi_base#wechat_redirect';



    //  http://b.itying.com?order_id='+order_id&code=xxxx

  }

}
