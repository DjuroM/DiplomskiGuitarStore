import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  @Input() errTitle!: string;
  @Input() errMsg!: string;
  @Input() btnText !: string;
  @Input() path !: string;

  constructor() { }

  ngOnInit(): void {
  }


}
