import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//引入组件
import { StartComponent } from './components/start/start.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { SearchComponent } from './components/search/search.component';
import { HotComponent } from './components/hot/hot.component';
import { PcontentComponent } from './components/pcontent/pcontent.component';
import { EditpeopleinfoComponent } from './components/editpeopleinfo/editpeopleinfo.component';
import { SuccessComponent } from './components/success/success.component';

const routes: Routes = [

  {
    
      path:'start',
      component:StartComponent
  },
  {

    path:'home',
    component:HomeComponent
  }
  ,
  {

    path:'cart',
    component:CartComponent
  },
  {

    path:'order',
    component:OrderComponent
  }
  ,
  {

    path:'search',
    component:SearchComponent
  },
  {

    path:'hot',
    component:HotComponent
  },
  {

    path:'editpeopleinfo',
    component:EditpeopleinfoComponent
  },
  {

    path:'pcontent/:id',
    component:PcontentComponent
  },
  {

    path:'success',
    component:SuccessComponent
  },
  {
    
    path:'**',
    redirectTo:'/start'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
