/*angualr5 中使用socket.io

1.新建一个服务   （注入  和引入）


2、安装socket.io-client

  cnpm  install socket.io-client --save

3、引入 注意

  import * as io from 'socket.io-client';


  4、建立连接

  public socket=io('http://a.itying.com?roomid=a001');



  5、广播this.socket.emit('addcart','addcart')


  
  6、接收广播this.socket.on('addcart',function(){


  })
*/



import { Injectable } from "@angular/core";

import * as io from 'socket.io-client';

@Injectable()

//angualr中的服务使用的是单例设计模式

export class SocketioService {


  //建立连接  共有属性
  private socket='';

  constructor() {

  }

  setSocketio(roomid){
    this.socket=io('http://a.itying.com?roomid='+roomid);

  }
  getSocketio(){

    return this.socket;
  }

}
