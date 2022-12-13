import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  public path!: { pathBack: string, id: string };

  public signInForm!: FormGroup;
  public signUpForm!: FormGroup;
  public emailError!: string;
  public passwordError!: string;
  public nameError!: string;
  public surnameError!: string;
  public usernameError!: string;
  public error!: string;
  public showError: boolean = false;



  @ViewChild('container', { static: false }) public container!: ElementRef;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.userService.getLoggedUser()) {
      Swal.fire('You are already logged in!');
      this.router.navigate(['/orders']);
    }
    this.path = { pathBack: this.route.snapshot.queryParams['pathBack'], id: this.route.snapshot.queryParams['id'] };


    //signIn
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });

    //signUp
    this.signUpForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'surname': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required),

    });

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSignUpButtonClick() {
    this.showError = false;
    this.container!.nativeElement.classList.add("right-panel-active");

  }

  onSignInButtonClick() {
    this.showError = false;
    this.container!.nativeElement.classList.remove("right-panel-active");
  }



  //Sign in 
  onSignIn() {
    // console.log(this.loginForm)


    if (this.signInForm.status === "INVALID") {
      if (this.signInForm.controls['email'].status === "INVALID") {
        this.emailError = 'Email is not valid'
      } else {
        this.emailError = '';
      }

      if (this.signInForm.controls['password'].status === "INVALID") {
        this.passwordError = 'Password is required';
      } else {
        this.passwordError = '';
      }
      this.showError = true;
    }
    else {

      const email = this.signInForm.value['email'];
      const password = this.signInForm.value['password'];

      this.userService.login(email, password).subscribe(
        response => {
          let user = new User(response.data.user.name, response.data.user.surname, response.data.user.username, email, response.data.user.id, response.data.token);
          this.userService.loggedUser.next(user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', user.name);
          localStorage.setItem('surname', user.surname);
          localStorage.setItem('username', user.username);
          localStorage.setItem('email', user.email);
          localStorage.setItem('id', user.id.toString());


          Swal.fire(
            'Welcome back ' + user.username,
            'Have fun shopping!',
            'success'
          ).then(() => {
            this.showError = false;
            if (this.path.pathBack === 'orders' || this.path.pathBack == undefined) {
              this.router.navigate(['/orders']);
            } else {
              this.router.navigate(['/guitarItem/' + this.path.id]);
            }
          })




        },
        error => {
          this.error = error.error.message;
          Swal.fire({
            icon: 'error',
            title: error.error.status,
            text: error.error.message,
          })

        }
      );
    }


  }


  //signUp

  onSignUp() {

    if (this.signUpForm.status === "INVALID") {
      if (this.signUpForm.controls['email'].status === "INVALID") {
        this.emailError = 'Email is not valid'
      } else {
        this.emailError = '';
      }
      if (this.signUpForm.controls['name'].status === "INVALID") {
        this.nameError = 'Name is requiered'
      } else {
        this.nameError = '';
      }

      if (this.signUpForm.controls['surname'].status === "INVALID") {
        this.surnameError = 'Surname is requiered'
      } else {
        this.surnameError = '';
      }

      if (this.signUpForm.controls['username'].status === "INVALID") {
        this.usernameError = 'Username is requiered'
      } else {
        this.usernameError = '';
      }

      if (this.signUpForm.controls['password'].status === "INVALID") {
        this.passwordError = 'Password is required';
      } else {
        this.passwordError = '';
      }
      this.showError = true;
    } else {


      let name = this.signUpForm.value.name;
      let surname = this.signUpForm.value.surname;
      let username = this.signUpForm.value.username;
      let email = this.signUpForm.value.email;
      let password = this.signUpForm.value.password;



      this.userService.register(name, surname, username, email, password, password).subscribe(
        response => {
          let user = new User(response.data.user.name, response.data.user.surname, response.data.user.username, email, response.data.user.id, response.data.token);
          console.log(user);
          this.userService.loggedUser.next(user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', user.name);
          localStorage.setItem('surname', user.surname);
          localStorage.setItem('username', user.username);
          localStorage.setItem('email', user.email);
          localStorage.setItem('id', user.id.toString());

          Swal.fire(
            'Welcome ' + user.username,
            'Have fun shopping!',
            'success'
          ).then(() => {

            this.showError = false;
            this.router.navigate([this.path]);
          })

        },
        errorRes => {

          let errorText = '';

          if (errorRes.error.errors['email']) {

            errorText += errorRes.error.errors['email'] + "\n";
          }
          if (errorRes.error.errors['username']) {

            errorText += errorRes.error.errors['username'];
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorText,

          })

        }
      )




    }
  }



}
