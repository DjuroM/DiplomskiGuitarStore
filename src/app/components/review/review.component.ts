import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guitar } from 'src/app/models/guitar.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() user!: User;
  @Input() guitar!: Guitar;
  @Output() postAdded = new EventEmitter<{ added: true }>();

  public formGroup !: FormGroup
  public review: string = '';
  public numberOfCharacters: number = 5000;
  public isOver = false;
  public currentRate = 8;

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      'review': new FormControl(null, [Validators.required, Validators.maxLength(5000)]),
    })
  }

  count() {
    this.numberOfCharacters = 5000 - this.review.length;
    if (this.numberOfCharacters <= 0) {
      this.isOver = true;
    } else {
      this.isOver = false;
    }
  }

  onPost() {
    if (this.formGroup.status === "VALID") {
      let review: Review = { "guitar": this.guitar, "user": this.user, "review": this.formGroup.value['review'], "rating": this.currentRate };
      this.reviewService.store(review);

      this.postAdded.emit();
    }
  }

}
