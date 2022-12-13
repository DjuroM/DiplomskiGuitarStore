import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guitar } from 'src/app/models/guitar.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  public reviews !: Review[];

  selected = 0;
  hovered = 0;
  readonly = true;

  constructor(private reviewService: ReviewService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reviewService.getAllByGuitar(this.route.snapshot.params['id']).subscribe(
      response => {
        this.reviews = response;
        console.log(response);

      }
    )
  }

}
