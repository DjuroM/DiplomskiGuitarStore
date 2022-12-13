import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  public loginForm!: FormGroup;
  public emailError!: string;
  public passwordError!: string;
  @Input() path!: number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {


    if (this.loginForm.status === "INVALID") {
      if (this.loginForm.controls['email'].status === "INVALID") {

        this.emailError = 'Email is not valid'
      } else {
        this.emailError = '';
      }

      if (this.loginForm.controls['password'].status === "INVALID") {

        this.passwordError = 'Password is required';
      } else {
        this.passwordError = '';
      }
    } else if (this.loginForm.status === "VALID") {
      this.passwordError = '';
      this.emailError = '';

      const email = this.loginForm.value['email'];
      const password = this.loginForm.value['password']

      this.userService.getUser(email, password).subscribe(
        response => {
          if (response) {
            this.userService.setUser(response);
            Swal.fire(
              'Welcome back ' + response.username,
              'Have fun shopping!',
              'success'
            )
            this.router.navigate(['/guitarItem/' + this.path]);

          }

        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      )


    }



  }
}
