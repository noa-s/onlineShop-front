import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/models/Product";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @Input() product: Product

  showOrderModal = false;
  // private thisProduct:Product

  constructor(private router: Router, private auth: AuthService) {}

  isAdminUser = this.router.isActive("/admin", true);

  ngOnInit() {
    console.log(this)
    console.log(this.product, "this product");
  }

  passProduct() {
    if (this.isAdminUser) {
      this.auth.receiveSelected(this.product);
    }
  }

  toggleOrder(): void {
    if (this.product !== null) {
      this.showOrderModal = !this.showOrderModal;
    }
  }
}
