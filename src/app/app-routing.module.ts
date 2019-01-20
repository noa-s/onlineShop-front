import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ShopComponent } from "./components/shop/shop.component";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "shop", component: ShopComponent },
  { path: "admin", component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
