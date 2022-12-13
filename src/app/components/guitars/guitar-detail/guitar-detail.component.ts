import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Basket } from 'src/app/models/basket.model';
import { Guitar } from 'src/app/models/guitar.model';
import { User } from 'src/app/models/user.model';
import { BasketService } from 'src/app/services/basket.service';
import { GuitarService } from 'src/app/services/guitar.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-guitar-detail',
  templateUrl: './guitar-detail.component.html',
  styleUrls: ['./guitar-detail.component.css']
})
export class GuitarDetailComponent implements OnInit, OnDestroy {


  public guitar!: Guitar;
  private user!: User;
  public isLoading: boolean = true;
  private sub!: Subscription;

  constructor(private guitarService: GuitarService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private basketService: BasketService,
    private spinner: NgxSpinnerService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {

    this.sub = this.userService.loggedUser.subscribe(

      response => {
        this.spinner.show();
        this.user = response!;
        this.spinner.hide();
      }
    )

    this.route.params.subscribe(
      (params: Params) => {
        this.spinner.show();

        this.guitarService.getGuitarByID(+params['id']).subscribe(
          response => {
            this.guitar = response;
            this.spinner.hide();
          }
        )

      }
    )


  }

  OnAddToBasket() {
    if (this.user) {
      var basket: Basket = { "user": this.user, "guitar": this.guitar };
      this.basketService.addToBasket(basket);


    } else {
      this.router.navigate(['/auth'],
        { queryParams: { pathBack: 'guitarItem', id: this.guitar.id } });
    }
  }

  OnSeeMore() {
    this.router.navigate(['/guitarItem', this.guitar.id]);
  }

}
