import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [
  {path:'' ,component:HomeComponent, title:"Home",},
  {path:'about' ,component:AboutComponent, title:"About"},
  {path:'contact' ,component:ContactComponent, title:"Contact"},
  {path:'products' ,component:ProductsComponent, title:"Products"},
  {path:'products-details' ,component:ProductDetailsComponent, title:"Product"},
];
