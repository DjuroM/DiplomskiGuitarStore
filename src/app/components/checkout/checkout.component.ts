import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Basket } from 'src/app/models/basket.model';
import { Country } from 'src/app/models/country.model';
import { Guitar } from 'src/app/models/guitar.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { BasketService } from 'src/app/services/basket.service';
import { CountryService } from 'src/app/services/country.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() guitars: Guitar[] = [];
  @Input() totalPrice: number = 0;
  public user !: User;
  public basket !: Basket[];
  public countries !: Country[];

  public firstFormGroup !: FormGroup;
  public checkoutFormGroup !: FormGroup;
  public secondFormGroup !: FormGroup;

  constructor(private userService: UserService,
    private basketService: BasketService,
    private orderService: OrderService,
    private countryService: CountryService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.spinner.show();
    this.countryService.getAll().subscribe(
      response => {
        this.countries = response
      }
    )

    this.userService.loggedUser.subscribe(
      res => {
        this.user = res!;
      }
    );

    this.basketService.get(this.user.id!).subscribe(
      response => {
        this.basket = response;
        response.forEach(element => {
          this.totalPrice += parseInt(element.guitar.price);
          this.guitars.push(element.guitar);
          this.spinner.hide();
        });
      }
    );

    this.checkoutFormGroup = new FormGroup({
      'name': new FormControl(this.user.name, Validators.required),
      'surname': new FormControl(this.user.surname, Validators.required),
      'username': new FormControl(this.user.username, Validators.required),
      'address': new FormControl(null, Validators.required),
      'city': new FormControl("", Validators.required),
      'email': new FormControl(this.user.email, [Validators.email, Validators.required]),
      'postalcode': new FormControl(null, [Validators.required, Validators.maxLength(5)]),
      'country': new FormControl(null, Validators.required),
      'expiration': new FormControl(null, Validators.required),
      'cardName': new FormControl(null, Validators.required),
      'cardNumber': new FormControl(null, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      'cvv': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),

    });



  }

  checkValidity(control: string) {
    if (this.checkoutFormGroup.controls[control].invalid || this.checkoutFormGroup.controls[control].value == "") {
      var elment = document.getElementById("invalid" + control);
      elment!.style.display = "block";
      var inputEl = document.getElementById(control);
      inputEl!.style.border = "1px solid red";
    } else {
      var elment = document.getElementById("invalid" + control);
      elment!.style.display = "none";
      var inputEl = document.getElementById(control);
      inputEl!.style.border = "1px solid green";
    }
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      for (const control in this.checkoutFormGroup.controls) {
        this.checkValidity(control);
      }
    } else {
      this.order();
    }
  }

  private order() {
    let countryID = this.checkoutFormGroup.value['country'];
    let country = this.countries[countryID - 1];
    this.orderService.storeWithCountry({
      "order_date": new Date(),
      "country": country, "guitars": this.guitars,
      "user": this.user, "address": `${this.checkoutFormGroup.value['address']},${this.checkoutFormGroup.value['city']}, ${country.country}`, "price": this.totalPrice.toString()
    });
  }

}
