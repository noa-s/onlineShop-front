import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/models/CartProduct';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  constructor(private auth: AuthService, private router: Router) { }

  flag = this.router.isActive('/shop', true);
  @Input() sBarproduct: CartProduct;

  ngOnInit() {
    console.log(this.sBarproduct,"side-bar-prod")
  }

  deleteProduct(e) {
    this.auth.deleteProduct(this.sBarproduct.productId).subscribe( data => this.auth.userActions());
  }
}
