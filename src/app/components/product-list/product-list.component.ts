import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
 templateUrl : './product-list-grid.component .html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
currentCategoryId: number;
searchMode : boolean;
  constructor(private productService: ProductService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();

    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProduct();
    }
  }
  handleSearchProducts() {
 const keyword : string = this.route.snapshot.paramMap.get('keyword');

 this.productService.searchProducts(keyword).subscribe(
   data=>{
     this.products = data;
   }
 )
  }

  handleListProduct(){
 //check if id is avalible
 const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
 if(hasCategoryId){
// get the id and convert a string to a nulber using '+'
this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

 }
 else{
   this.currentCategoryId = 1;
 }
 this.productService.getProductList(this.currentCategoryId).subscribe(
   data => {
     this.products = data;
   }
 )
  }

}
