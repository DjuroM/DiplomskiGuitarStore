import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {

  isLoginMode = true;

  @Input() path!:number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.getLoggedUser()) {
      Swal.fire('You are already logged in!');
      this.router.navigate(['/orders']);
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

}
