import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guitar } from 'src/app/models/guitar.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {

  @Input() user !: User;
  public review!: Review;
  public reviews!: Review[];
  public opensReview!: boolean;
  closeResult = '';



  constructor(private reviewService: ReviewService, private modalService: NgbModal) { }


  ngOnInit(): void {

    this.reviewService.getAllByUser(this.user.id!).subscribe(
      response => {
        this.reviews = response;
      }
    )
  }


  openReview(review: Review, content: any) {
    this.review = review;
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


  postEvent(event: { deleted: boolean, id: number }) {
    if (event.deleted) {
      console.log('zdravo')
      console.log(this.reviews);
      this.reviews.forEach((review, index) => {
        if (review.id === event.id) {

          this.reviews.splice(index, 1);
        }
      });
      console.log(this.reviews);
    }
    this.modalService.dismissAll(this.closeResult);
  }

}
