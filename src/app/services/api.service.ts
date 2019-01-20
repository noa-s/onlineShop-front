import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User, LoginUser, RegisteredUser } from "src/models/User";
import { CartProduct } from "src/models/CartProduct";
import { Product } from "src/models/Product";
import { Order } from "src/models/Order";
import { Cart } from "src/models/Cart";
@Injectable({
  providedIn: "root"
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) {}

  isUserExists(checkUser: String, checkEmail: String): Observable<Boolean> {
    return this.http.post<Boolean>(
      "api/auth/idEmailTaken",
      { id: checkUser, email: checkEmail },
      this.httpOptions
    );
  }
  register(userObj: RegisteredUser): Observable<RegisteredUser> {
    debugger;
    console.log(userObj, "User-Object");
    return this.http.post<RegisteredUser>(
      "api/auth/register",
      userObj,
      this.httpOptions
    );
  }
  logOut(): Observable<any> {
    // logout
    return this.http.get<any>("api/auth/logout");
  }
  isUserLogged(): Observable<User> {
    // isLogged
    return this.http.get<User>("api/auth");
  }
  logIn(logUser: LoginUser): Observable<any> {
    console.log(logUser);
    // Login
    return this.http.post<any>("api/auth/login", logUser, this.httpOptions);
  }

  addCartProduct(cartProductObj): Observable<CartProduct> {
    return this.http.post<CartProduct>(
      "api/shop/addCartProduct",
      cartProductObj,
      this.httpOptions
    );
  }

  isTaken(id): Observable<boolean> {
    return this.http.post<boolean>(
      "api/admin/isTaken/",
      { id: id },
      this.httpOptions
    );
  }
  addProduct(productObj): Observable<Product> {
    return this.http.post<Product>("api/admin/", productObj, this.httpOptions);
  }
  updateProduct(productObj): Observable<Product> {
    return this.http.put<Product>(
      `api/admin/${productObj.id}`,
      productObj,
      this.httpOptions
    );
  }
  getAllProducts(): Observable<Number> {
    return this.http.get<Number>("api/shop/allProducts");
  }
  getAllOrders(): Observable<Number> {
    return this.http.get<Number>("api/shop/allOrders");
  }
  getCartPrice(cartId): Observable<number> {
    return this.http.post<number>(
      "api/shop/totalPrice",
      { cartId: cartId },
      this.httpOptions
    );
  }
  availableDeliveryDate(delieverDate): Observable<boolean> {
    return this.http.post<boolean>(
      "api/shop/dateExiset",
      { dateToDeliver: delieverDate },
      this.httpOptions
    );
  }
  availableCart(): Observable<any> {
    return this.http.post<any>("api/shop/isThereCart", this.httpOptions);
  }
  // before Build, change this to 'Get' function, getting the userid from the session.
  checkAvailableOrder(): Observable<any> {
    // return this.http.post<any>('/shop/isLastOrder', {id: id}, this.httpOptions);
    return this.http.post<any>("api/shop/isLastOrder", this.httpOptions);
  }
  newCart(): Observable<Cart> {
    return this.http.post<Cart>("api/shop/newCart", this.httpOptions);
  }
  deleteCartProducts(cartId): Observable<any> {
    return this.http.request<any>("delete", `api/shop/deleteAllCart`, {
      body: { cartId: cartId },
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });
  }
  newOrder(orderObj): Observable<Order> {
    return this.http.post<Order>("/shop/orderCart", orderObj, this.httpOptions);
  }
  deleteCartAfterOrder(id): Observable<Cart> {
    return this.http.request<Cart>("delete", "api/shop/deleteCart", {
      body: { id: id },
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });
  }
  getAllCatagories(): Observable<any> {
    return this.http.get<any>("api/shop/allCatagories");
  }
  getCatagoryProducts(catagoryName): Observable<Product[]> {
    return this.http.get<Product[]>(`api/shop/${catagoryName}`);
  }
  searchProduct(productName): Observable<any> {
    return this.http.get<any>(`api/shop/search/${productName}`);
  }
  getAllCartProducts(cartId): Observable<CartProduct[]> {
    return this.http.post<CartProduct[]>(
      "api/shop/cartProducts",
      { cartId: cartId },
      this.httpOptions
    );
  }
  deleteProduct(id, cartId): Observable<CartProduct> {
    return this.http.request<CartProduct>("delete", `/shop/${id}`, {
      body: { cartId: cartId },
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });
  }
}
