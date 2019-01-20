import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AuthService } from "./services/auth.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { CartComponent } from "./components/cart/cart.component";
import { RouterModule } from "@angular/router";
import { AddProdComponent } from "./components/add-prod/add-prod.component";
import { ProductsComponent } from "./components/products/products.component";
import { OrderComponent } from "./components/order/order.component";
import { SideBarCartComponent } from "./components/side-bar-cart/side-bar-cart.component";
import { AdminComponent } from "./components/admin/admin.component";
import { ProductComponent } from "./components/product/product.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ShopComponent } from './components//shop/shop.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    AdminPanelComponent,
    CartComponent,

    AddProdComponent,
    ProductsComponent,
    OrderComponent,
    SideBarCartComponent,
    AdminComponent,
    ProductComponent,
    CheckoutComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: "home", component: CheckoutComponent },
      { path: "admin", component: AdminComponent },
      { path: "login", component: LoginComponent },
      { path: "no-access", component: CartComponent }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
