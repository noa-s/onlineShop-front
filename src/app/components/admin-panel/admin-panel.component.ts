import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.css"]
})
export class AdminPanelComponent implements OnInit {
  updateForm: FormGroup;
  updateOrSave = false; // update- false, save-true
  errMsg = "";
  message = "";
  productExiset: boolean;
  newCatagory: boolean;
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      name: ["", Validators.required],
      id: ["", Validators.required],
      price: ["", Validators.required],
      imgUrl: ["", Validators.required],
      catagoryName: ["", Validators.required]
    });
    this.auth.selectedProduct.subscribe(data => {
      (this.errMsg = ""), (this.message = "");
      this.updateOrSave = false;
      this.updateForm.patchValue(data);
    });
    this.auth.adminTrigger.subscribe(() => {
      this.message = "Changes Saved";
    });
  }

  addNewProduct() {
    this.message = "";
    this.updateOrSave = true;
    this.updateForm.reset();
  }
  newProduct() {
    const newProductObj = this.updateForm.value;
    debugger
    // we stoped here
      if (!this.productExiset) {
        this.auth.addProduct(newProductObj).subscribe(res=>{
            debugger
            if(res.id){
              this.auth.adminActions();
              this.updateForm.reset()
            }else
            {
              debugger
    
            }
          });
          // .subscribe(data => this.auth.adminActions());
          // this.updateForm.reset();
      }
    

  }
  checkAvailability() {
    this.auth
      .isProductTaken(this.updateForm.value.id)
      .subscribe(answer => {
        if (answer) {
          //need to fill form fields with product related info
          this.productExiset = true;
          this.errMsg = `Product Exiset`;
        } else {
          this.productExiset = false;
          this.errMsg = "";
        }
      });
  }

  updateProduct() {
    const datedProductObj = this.updateForm.value;
    this.auth
      .updateProduct(datedProductObj).subscribe(res=>{
        debugger
        if(res.id){
          this.auth.adminActions();
          this.updateForm.reset()
        }else
        {
          debugger

        }
      });
      
  }

  saveChanges() {
    debugger
    switch (this.updateOrSave) {
      case false:
        this.newProduct();
        break;
      case true:
        this.updateProduct();
        break;
    }
  }
}
