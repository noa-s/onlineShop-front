import { Component, OnInit } from "@angular/core";
import { Catagory } from "src/models/Catagory";
import { Product } from "src/models/Product";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  allCatagories: Catagory[];
  catagoryProducts: Product[];
  searchTerm: string;
  errMsg: string;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    debugger

    // this.catagoryProducts needs to get catagoryList
    // console.log(this.catagoryProducts, "here is should be products ...");
    this.auth.getAllCatagories().subscribe(data =>{
      debugger
      this.allCatagories = data;
    } );
    console.log(this.allCatagories, "Here the problem");
    this.getSearchedProducts();
  }

  getProductsFromCatagory(e) {
    this.catagoryProducts = [];
    const catagoryName = e.target.innerText;
    const searchTerm = catagoryName.substring(3, 7);
    this.auth
      .getCatagoryProducts(searchTerm)
      .subscribe(
        data => (
          (this.catagoryProducts = data), console.log(data, "here the products")
        )
      );
  }

  getSearchedProducts() {
    this.catagoryProducts = [];
    console.log(this.catagoryProducts, "this.catagoryProduct");
    const search = this.searchTerm;
    this.auth.searchProduct(search).subscribe(data => {
      if (data[0] && data.length > 0) {
        this.catagoryProducts.push(data[0]);
      } else {
        this.catagoryProducts = null;
      }
    });
  }

  SearchOnType() {
    if (this.router.isActive("checkout", true)) {
      const search = this.searchTerm;
      this.auth.searchInCart(search);
    }
  }
}
