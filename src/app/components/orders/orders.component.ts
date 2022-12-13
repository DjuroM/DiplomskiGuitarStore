import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Guitar } from 'src/app/models/guitar.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  public user !: User;
  public orders !: Order[];
  public opensReview: boolean = false;
  public guitarForReview!: Guitar;
  private sub !: Subscription;
  closeResult = '';


  constructor(private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService) { }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {

    this.spinner.show();

    this.sub = this.userService.loggedUser.subscribe(
      response => {
        this.user = response!;

        if (response) {
          this.orderService.get().subscribe(
            response => {
              this.orders = response;
            }, error => {
            }, () => {
              this.spinner.hide();
            }
          );

        } else {
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      }
    )

  }

  openReview(guitar: Guitar, content: any) {
    this.guitarForReview = guitar;
    this.opensReview = !this.opensReview;
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

  delete(id: number) {
    this.orderService.deleteOrder(id);

    this.orders.forEach((order, index) => {
      if (order.id === id) {

        this.orders.splice(index, 1);

      }
    });
  }

}
