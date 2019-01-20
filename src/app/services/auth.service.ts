import { Injectable, Input, EventEmitter, Output } from "@angular/core";
import { Observable, from } from "rxjs";
import { ApiService } from "./api.service";
import { User, LoginUser, RegisteredUser } from "../../models/User";
import { Router } from "@angular/router";
import { Cart } from "src/models/Cart";
import { Order } from "src/models/Order";
import { Product } from "src/models/Product";
import { Catagory } from "src/models/Catagory";
import { CartProduct } from "src/models/CartProduct";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// send http requests to sever
// import { Headers, RequestOptions, Http } from '@angular/http';
// import { HttpHeaders } from "../../../node_modules/@angular/common/http";
// import { map } from 'rxjs/operators';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  currUser: User;
  cart: Cart;
  order: Order;
  loginMessage: string;
  @Output() userTrigger: EventEmitter<string> = new EventEmitter();
  @Output() adminTrigger: EventEmitter<string> = new EventEmitter();
  @Output() selectedProduct: EventEmitter<Product> = new EventEmitter();
  @Output() searchInCartTrigger: EventEmitter<string> = new EventEmitter();
  @Output() logIn: EventEmitter<string> = new EventEmitter();
  currentUser: User;
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

// send http requests to sever
  // private headers = new Headers({ 'Content-Type': 'application/json' });
  // private options = new RequestOptions({ headers: this.headers });
  // private baseUrl = '/api/auth';
  // httpOptions = {
  //   headers: new HttpHeaders({ "Content-Type": "application/json" })
  // };

  constructor(private apisrv: ApiService, private router: Router ,private http: HttpClient) {
    this.apisrv
      .isUserLogged()
      .subscribe(res =>
        res ? (this.currentUser = res) : console.log("No User Connected")
      );
  }
  addCartProduct(cartProductObj): Observable<CartProduct> {
    return this.apisrv.addCartProduct(cartProductObj);
  }
  availableCart(): void {
    this.apisrv.availableCart().subscribe(data => {
      if (data[0]) {
        this.cart = data[0];
        this.loginMessage = `You have an open Cart from: ${
          data[0].creationDate
        }`;
      } else {
        this.newCart();
        this.checkAvailableOrder();
      }
    });
  }
  checkAvailableOrder(): void {
    this.apisrv.checkAvailableOrder().subscribe(data => {
      if (data) {
        this.order = data;
        this.loginMessage = `Your last Order is from: ${this.order.orderDate}`;
      } else {
        this.loginMessage = `Welcome to your first purchase`;
      }
    });
  }
  newCart(): void {
    this.apisrv.newCart().subscribe(data => {
      if (data) {
        this.cart = data;
      }
    });
  }
  checkIfExist(checkUser, checkEmail): Observable<Boolean> {
    return this.apisrv.isUserExists(checkUser, checkEmail);
  }

  checkIfUserExist(regForm): Observable<any> {
    const user: LoginUser = <LoginUser>regForm;
    return this.http.post<any>("api/auth/login", user, this.httpOptions);
  }


  // login(regForm): void{
  //   const user: LoginUser = <LoginUser>regForm;
  //   this.apisrv.logIn(user).subscribe(data => {
  //     console.log("data-", data, "user-", user);
  //     if (data.id.length > [0]) {
  //       this.currentUser = data;
  //       console.log(data, "current user");
  //       this.logIn.emit(data.firstName);
  //       if (data.isAdmin[0]) {
  //         this.router.navigate(["/admin"]);
  //         this.availableCart();
  //       } else { 
  //         this.router.navigate(["/home"]);
  //       }
  //       //   else {
  //       //      this.loginMessage = data;
  //       // }
  //     }
  //   });
  // }
  userActions(): void {
    this.userTrigger.emit("CHANGE");
  }
  isProductTaken(id): Observable<boolean> {
    return this.apisrv.isTaken(id);
  }

  adminActions(): void {
    this.adminTrigger.emit("CHANGE");
  }
  addProduct(productObj): Observable<Product> {
    return this.apisrv.addProduct(productObj);
  }
  updateProduct(productObj): Observable<Product> {
    console.log(productObj);
    return this.apisrv.updateProduct(productObj);
  }
  getAllProducts(): Observable<Number> {
    return this.apisrv.getAllProducts();
  }
  getAllOrders(): Observable<Number> {
    return this.apisrv.getAllOrders();
  }
  getCartPrice(): Observable<Number> {
    return this.apisrv.getCartPrice(this.cart.id);
  }
  availableDate(shipDate): Observable<boolean> {
    return this.apisrv.availableDeliveryDate(shipDate);
  }
  newOrder(orderObj): Observable<Order> {
    return this.apisrv.newOrder(orderObj);
  }
  deleteCartAfterOrder(): Observable<Cart> {
    return this.apisrv.deleteCartAfterOrder(this.cart.id);
  }
  deleteCartProducts(): any {
    this.apisrv
      .deleteCartProducts(this.cart.id)
      .subscribe(data => console.log(data));
  }
  receiveSelected(product: Product): void {
    this.selectedProduct.emit(product);
  }
  getAllCatagories(): Observable<Catagory[]> {
    return this.apisrv.getAllCatagories();
  }
  getCatagoryProducts(catagoryName): Observable<Product[]> {
    return this.apisrv.getCatagoryProducts(catagoryName);
  }
  searchProduct(searchTerm): Observable<any> {
    return this.apisrv.searchProduct(searchTerm);
  }

  searchInCart(wordToSearch): void {
    this.searchInCartTrigger.emit(wordToSearch);
  }
  getAllCartProducts(cartId): Observable<CartProduct[]> {
    return this.apisrv.getAllCartProducts(cartId);
  }
  deleteProduct(id): any {
    return this.apisrv.deleteProduct(id, this.cart.id);
  }

  logOut(): void {
    this.apisrv.logOut().subscribe(data => {
      debugger
      if(data.loggedOut){
        this.loginMessage = "";
        this.currUser = {} as User;
        this.cart = {} as Cart;
        this.order = {} as Order;
      }
    });
  }

  register(regFormVal): void {
    debugger;
    delete regFormVal.confpass;
    console.log(regFormVal, "register-form-object");
    const user: RegisteredUser = <RegisteredUser>regFormVal;
    this.apisrv.register(user).subscribe(data => (this.currentUser = data));
  }
}
