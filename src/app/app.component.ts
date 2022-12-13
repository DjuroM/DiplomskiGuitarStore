import { Component, OnDestroy, OnInit } from '@angular/core';
import { GuitarService } from './services/guitar.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userS: UserService) { }


  ngOnInit(): void {
    console.log(localStorage)
    localStorage.clear();
  }


  title = 'client';


}
