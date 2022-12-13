import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guitar } from 'src/app/models/guitar.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-user-review-edit',
  templateUrl: './user-review-edit.component.html',
  styleUrls: ['./user-review-edit.component.css']
})
export class UserReviewEditComponent implements OnInit {


  @Input() review !: Review;
  public formGroup !: FormGroup;
  public reviewText: string = '';
  public numberOfCharacters: number = 5000;
  public isOver = false;
  @Input() user!: User;
  @Output() postAdded = new EventEmitter<{ deleted: boolean, id: number }>();

  constructor(private reviewService: ReviewService, private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.reviewText = this.review.review;
    this.numberOfCharacters = 5000 - this.reviewText.length;
    this.formGroup = new FormGroup({
      'review': new FormControl(this.review.review, [Validators.required, Validators.maxLength(5000)])
    })


  }


  count() {
    this.numberOfCharacters = 5000 - this.reviewText.length;
    if (this.numberOfCharacters <= 0) {
      this.isOver = true;
    } else {
      this.isOver = false;
    }
  }

  onPost() {
    if (this.formGroup.status === "VALID") {
      this.review.review = this.formGroup.value['review'];

      this.reviewService.updateReview(this.review);
      this.postAdded.next({ deleted: false, id: -1 });


    }
  }

  onDelete(id: number) {
    this.reviewService.deleteReview(id);
    this.postAdded.next({ deleted: true, id: id });
  }

}
