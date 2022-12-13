import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  public signupForm !: FormGroup;
  @Input() path!:number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'surname': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required),

    });
  }

  onSubmit() {
    if (this.signupForm.status === 'VALID') {
      let name = this.signupForm.value.name;
      let surname = this.signupForm.value.surname;
      let username = this.signupForm.value.username;
      let email = this.signupForm.value.email;
      let password = this.signupForm.value.password;

      // let user: User = { "name": name, "surname": surname, "username": username, "email": email, "password": password };

      // this.userService.addUser(user, '/guitarItem/'+this.path);
      // Swal.fire(
      //   'Welcome ' + user.username,
      //   'Glad to have you on board! Have fun shopping!',
      //   'success'
      // )
      

    } else {
      console.log('h')
    }
  }

}
