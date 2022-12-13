import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Basket } from 'src/app/models/basket.model';
import { Guitar } from 'src/app/models/guitar.model';
import { User } from 'src/app/models/user.model';
import { BasketService } from 'src/app/services/basket.service';
import { GuitarService } from 'src/app/services/guitar.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-guitar-item',
  templateUrl: './guitar-item.component.html',
  styleUrls: ['./guitar-item.component.css']
})
export class GuitarItemComponent implements OnInit {

  public guitar!: Guitar;
  public user!: User;
  public writesReview = false;
  closeResult = '';

  public selectedSample: string = "../assets/LoFiZaCola.mp3";

  constructor(private guitarService: GuitarService, private route: ActivatedRoute
    , private userService: UserService,
    private modalService: NgbModal,
    private basketService: BasketService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.userService.loggedUser.subscribe(
      response => {
        this.user = response!;
      }
    )
    this.guitarService.getGuitarByID(this.route.snapshot.params['id']).subscribe(
      response => {
        this.guitar = response;
        this.spinner.hide();
      }
    )
  }

  onAddToBasket() {
    if (this.user) {
      var basket: Basket = { "user": this.user, "guitar": this.guitar };
      this.basketService.addToBasket(basket);


    } else {
      this.router.navigate(['/auth'],
        { queryParams: { pathBack: 'guitarItem', id: this.guitar.id } });
    }
  }

  writeReview(content: any) {
    if (this.user) {
      this.writesReview = !this.writesReview;
    } else {
      this.modalService.open(content, { fullscreen: true });
    }
  }
  openReview(guitar: Guitar, content: any) {
    this.guitar = guitar;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




}
