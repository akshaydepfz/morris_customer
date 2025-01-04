import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SubproductsComponent } from './pages/subproducts/subproducts.component';
import { AdminportalComponent } from './pages/admin/adminportal/adminportal.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AdminlayoutComponent } from './pages/admin/adminlayout/adminlayout.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { SubcategoriesComponent } from './pages/admin/subcategories/subcategories.component';
import { BannersComponent } from './pages/admin/banners/banners.component';
import { PartsComponent } from './pages/admin/parts/parts.component';
import { CompanyProductsComponent } from './pages/company-products/company-products.component';
import { HomeProductsComponent } from './pages/home-products/home-products.component';
import { EnquiriesComponent } from './pages/admin/enquiries/enquiries.component';
import { authGuard } from './core/services/auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Morris | Home' },
      { path: 'about', component: AboutComponent, title: 'Morris | About' },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Morris | Contact',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Morris | Products',
      },
      {
        path: 'product/:category/:id',
        component: ProductListComponent,
        title: 'Morris | Product',
      },
      {
        path: 'sub-product/:category/:subcategory',
        component: SubproductsComponent,
        title: 'Morris | Product',
      },

      {
        path: 'company-products/:category',
        component: CompanyProductsComponent,
        title: 'Morris | Product',
      },

      {
        path: 'subcategory-products/:subcategoryitem',
        component: HomeProductsComponent,
        title: 'Morris | Product',
      },
    ],
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'admin',
    component: AdminlayoutComponent, canActivate: [authGuard], // Protect admin routes
    children: [
      // { path: '', component: AdminportalComponent, title: 'Admin Portal' },
      { path: '', component: CategoriesComponent, title: 'categories' },
      { path: 'banner', component: BannersComponent, title: 'Banner' },
      {  path: 'subcategories', component: SubcategoriesComponent, title: 'subcategories',},
      { path: 'parts', component: PartsComponent, title: 'Parts' },
      { path: 'enquiries', component: EnquiriesComponent, title: 'Enquiries' },
    ],
  },
];
