import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { ProductFormClothesComponent } from './product-form-clothes/product-form-clothes.component';
import { ProductFormFoodComponent } from './product-form-food/product-form-food.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: ProductListComponent
  },
  {
    path: 'show/:id',
    component: ProductShowComponent
  },
  {
    path: 'create/clothes/:id',
    component: ProductFormClothesComponent
  },
  {
    path: 'create/food/:id',
    component: ProductFormFoodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
