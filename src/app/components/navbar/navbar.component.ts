import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  guestName = "Guest";

  ngOnInit() {
    this.auth.logIn.subscribe(data => (this.guestName = data));
  }

  ngOnChanges() {
    this.getUserName();
  }

  logOut(): void {
    this.auth.logOut();
    this.router.navigate(["/login"]);
  }

  getUserName(): void {
    this.guestName = this.auth.currUser.firstName
      ? this.auth.currUser.firstName
      : "Guest";
  }
}
