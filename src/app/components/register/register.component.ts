import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  errorMessage = "";
  regForm: FormGroup;
  nextCheck: boolean = false;
  registerUserData = {};
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.newForm();
  }
  private newForm() {
    this.regForm = new FormGroup({
      id: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      pass: new FormControl("", Validators.required),
      confpass: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required)
    });
  }
  nextFunction(): void {
    console.log("work");
    this.errorMessage = "";
    const checkUser: string = this.regForm.value.id;
    const checkEmail: string = this.regForm.value.email;
    const pass: string = this.regForm.value.pass;
    const confpass: string = this.regForm.value.confpass;
    this.auth.checkIfExist(checkUser, checkEmail).subscribe(res => {
      // if (res[0]) {
      //   this.errorMessage = "Id  already exists";
      // }
      if (res[1]) {
        this.errorMessage = "Email  already exists";
      }
      if (!(pass === confpass)) {
        this.errorMessage = "Password  should Be Same ...";
      }
      this.nextCheck = this.errorMessage.length === 0;
    });
  }
  register(): void {
    debugger;
    console.log(this.regForm.value, "regForm value");
    if (this.regForm.invalid) {
      return;
    }
    this.auth.register(this.regForm.value);
    this.router.navigate(["/login"]);
  }
}
