
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Basket } from 'src/app/models/basket.model';
import { Guitar } from 'src/app/models/guitar.model';
import { User } from 'src/app/models/user.model';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  providers: [DatePipe]
})
export class BasketComponent implements OnInit, OnDestroy {

  public baskets!: Basket[];
  public user !: User;
  public totalPrice: number = 0;
  private sub!: Subscription;
  public guitars: Guitar[] = [];

  constructor(private basketService: BasketService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService) { }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.sub = this.userService.loggedUser.subscribe(
      Response => {
        this.user = Response!;
        if (!Response) {
          this.spinner.hide();
        }
      }
    )


    if (this.user) {
      this.basketService.get(this.user.id!).subscribe(
        response => {
          this.baskets = response;
          console.log(this.baskets);
          response.forEach(element => {
            this.totalPrice += parseInt(element.guitar.price);
            this.guitars.push(element.guitar);
          });

          this.spinner.hide();
        }
      );
    }
  }

  onDelete(id: number) {
    this.basketService.delete(id);
    console.log(id);
    this.baskets.forEach((basket, index) => {
      if (basket.id === id) {

        this.baskets.splice(index, 1);
        this.totalPrice -= parseInt(basket.guitar.price);
      }
    });
  }

  chechkOut() {
    this.router.navigate(['/checkout']);
  }

}
