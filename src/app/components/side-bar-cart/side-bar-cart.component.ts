import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/models/CartProduct';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar-cart',
  templateUrl: './side-bar-cart.component.html',
  styleUrls: ['./side-bar-cart.component.css']
})
export class SideBarCartComponent implements OnInit {

  allProducts: CartProduct[];
  totalCartPrice: Number;
  minTrigger = false;
  flag = this.router.isActive('/shop', true);

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.cart) {
      this.getCartProducts();
      this.getTotalPrice();
    }
    this.auth.userTrigger.subscribe( () => {
      this.getCartProducts();
      this.getTotalPrice();
    });

  }

  getCartProducts() {
    this.auth.getAllCartProducts(this.auth.cart.id).subscribe(data => this.allProducts = data );
  }
  getTotalPrice() {
    this.auth.getCartPrice().subscribe( data => this.totalCartPrice = data);
  }
  ngOnDestroy() {
  }

  changeTrigger() {
    this.minTrigger = ! this.minTrigger ;
  }
}
