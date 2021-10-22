import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  product: Product = new Product();
  constructor(private productSerice : ProductService,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(()=>{
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
 const theProductId : number = +this.route.snapshot.paramMap.get('id');
 this.productSerice.getProduct(theProductId).subscribe(
   data => {
     this.product = data;
   }
 )
  }

}
