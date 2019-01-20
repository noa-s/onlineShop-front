import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginUser } from "../../../models/user";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  logForm: FormGroup;
  totalProducts: number;
  totalOrders: number;
  errorMessage = "";
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.createLogin();
  }

  private async createLogin() {
    this.logForm = new FormGroup({
      id: new FormControl("", [Validators.required]),
      pass: new FormControl("", Validators.required)
    });
    await this.getProducts();
    await this.getOrders();
  }

  logIn(): void {
    this.errorMessage = "";
    console.log("clicked");
    if (this.logForm.valid) {
      this.auth.checkIfUserExist(this.logForm.value).subscribe((res)=>{
        if(res[0].id){
          debugger
          //res[0]= aprroved user details
          console.log("approved ", res[0]);
          this.router.navigate(["/admin"]);
        }else{
          debugger
          console.log("denied!!!")
          this.errorMessage = "wrong details please try again or register"
        }
      });
      // this.auth.login(this.logForm.value);
    } else {
      this.errorMessage = "please fill out the form";
    }
    
  }

  getProducts(): void {
    this.auth
      .getAllProducts()
      .subscribe(
        data => (this.totalProducts = typeof data === "number" ? data : 0)
      );
  }

  getOrders(): void {
    this.auth
      .getAllOrders()
      .subscribe(data =>
        typeof data === "number"
          ? (this.totalOrders = data)
          : (this.totalOrders = 0)
      );
  }
}
