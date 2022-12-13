import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-off',
  templateUrl: './log-off.component.html',
  styleUrls: ['./log-off.component.css']
})
export class LogOffComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

   
    // if (!this.userService.getLoggedUser()) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'You are not logged in!',

    //   })
    //   this.router.navigate(['/']);
    // } else {
      Swal.fire({
        title: 'Are you sure you want to log out?',

        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.logout().subscribe(
            response => {
            this.userService.loggedUser.next(undefined);
            },
            error => {
              console.log(error);
            }
          );
      
          Swal.fire(
            'Logged out!',
            'You are logged out!',
            'success'
          )
          localStorage.clear();
          this.router.navigate(['/']);
        }
      })
    // }

  }

}
