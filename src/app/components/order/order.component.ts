import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  errorMessage = "";
  totalCartPrice: Number;
  orderDone = false;
  constructor(
    private formBuild: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
  
    this.orderForm = this.formBuild.group({
      city: ["", [Validators.required]],
      street: ["", [Validators.required]],
      delieverDate: ["", [Validators.required]],
      payment: [
        "",
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(16)
        ]
      ]
    });
    // this.getTotalPrice();
  }

  autoFillForm() {
    this.orderForm.patchValue(this.auth.currUser);
  }

  getTotalPrice() {
    this.auth.getCartPrice().subscribe(data => (this.totalCartPrice = data));
  }

  dateExiset() {
    const shipDate = this.orderForm.value.delieverDate;
    this.auth.availableDate(shipDate).subscribe(data => {
      if (!data) {
        this.errorMessage = `This Shipping Date is Full, select another date `;
      }
    });
  }

  OrderCart() {
    this.orderDone = true;
    const orderObj = {
      id: this.auth.cart.id,
      userId: this.auth.currUser.id,
      cartId: this.auth.cart.id,
      orderDate: new Date().toISOString().split("T")[0],
      dateToDeliever: null,
      creditCard: "",
      city: "",
      street: "",
      finalPrice: this.totalCartPrice,
      status: "Ordered"
    };
    if (this.orderForm.valid) {
      orderObj.street = this.orderForm.value.street;
      orderObj.city = this.orderForm.value.city;
      orderObj.dateToDeliever = this.orderForm.value.delieverDate;
      orderObj.creditCard = this.orderForm.value.payment;

      this.auth.newOrder(orderObj).subscribe(data => {
        this.auth
          .deleteCartAfterOrder()
          .subscribe(deleted => this.auth.userActions());
      });
    }
  }
}
