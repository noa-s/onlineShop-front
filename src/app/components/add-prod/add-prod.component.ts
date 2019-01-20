import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/models/Product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {

  addProductForm: FormGroup;
  @Input() productInfo: Product;


  constructor(private auth: AuthService ) {
    console.log(this.productInfo ,"prod details")
   }

  ngOnInit() {
    this.buildModalForm();
  }

  private buildModalForm() {
    this.addProductForm = new FormGroup({
      productName : new FormControl(``, [Validators.required]),
      total: new FormControl(``, [Validators.required])
     } );
  }

  orderProduct() {
    const totalPrice = this.productInfo.price * this.addProductForm.value.total;
    const orderProduct = {
                    cartId: this.auth.cart.id,
                    productId: this.productInfo.id,
                    productName: this.productInfo.name,
                    total : this.addProductForm.value.total,
                    totalPrice: totalPrice
                  };
    this.auth.addCartProduct(orderProduct).subscribe(data =>  this.auth.userActions());
  }


}
