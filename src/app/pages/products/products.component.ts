import { Cateogory } from './../../core/models/product';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductService);

  cateogories :any[] = []


  Cateogory =[
    {
      "categroy" :"Perkins",
      "categoryId" :"1",
      "items":[
        {
          "title" :"Parts",
          "id":1,
          "image" : "assets/categroy/cat1.png"
        },
        {
          "title" :"Engine",
          "id":2,
          "image" : "assets/categroy/cat1.png"
        },
        {
          "title" :"catalogs",
          "id":3,
          "image" : "assets/categroy/cat1.png"
        }
      ]
    },

    {
      "categroy" :"FG wilson",
      "categoryId" :"2",
      "items":[
        {
          "title" :"Parts",
          "id":1,
          "image" : "assets/categroy/cat1.png"
        },
        {
          "title" :"Engine",
          "id":2,
          "image" : "assets/categroy/cat1.png"
        },
        {
          "title" :"catalogs",
          "id":3,
          "image" : "assets/categroy/cat1.png"
        }
      ]
    },
  ]



  getcategories()  {
    this.productService.getCategories().subscribe((data)=>{

      this.cateogories =data.cateogories;
      console.log("data",data)
    })
  }

  ngOnInit(): void {
    this.getcategories()

  }
}
