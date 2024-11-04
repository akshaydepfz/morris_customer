import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {


  productService = inject(ProductService)

  categoryTitle = ''
  subcategory = ''
  products :any[] = []

  ngOnInit() {
  this.productService.getproduct("2").subscribe((response)=>{

    // console.log("data",response)
    this.products = response.products,
    this.categoryTitle = response.Category,
    this.subcategory = response.subcategory
  })
  };


}
