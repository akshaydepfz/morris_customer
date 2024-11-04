import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SubproductsComponent } from './pages/subproducts/subproducts.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Morris | Home' },
  { path: 'about', component: AboutComponent, title: 'Morris | About' },
  { path: 'contact', component: ContactComponent, title: 'Morris | Contact' },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Morris | Products',
  },
  {
    path: 'product',
    component: ProductListComponent,
    title: 'Morris | Product',
  },
  {
    path: 'sub-product',
    component: SubproductsComponent,
    title: 'Morris | Product',
  },

  // {path:'products-details' ,component:ProductDetailsComponent, title:"Product"},
];
