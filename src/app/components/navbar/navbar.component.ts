import { Component, OnDestroy, OnInit } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  collapsed = true;

  public user?: User;


  readonly myMatchOptions: IsActiveMatchOptions = {
    queryParams: 'ignored',
    matrixParams: 'ignored',
    paths: 'subset',
    fragment: 'ignored',
  };
  public userSub !: Subscription;



  constructor(private userService: UserService) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


  ngOnInit(): void {
    this.userSub = this.userService.loggedUser.subscribe(
      response => {
        this.user = response
      }
    )
    // this.user = this.userService.getLoggedUser();
  }

}
