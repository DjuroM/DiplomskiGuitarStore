import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public user !: User;
  public formGroup !: FormGroup;
  public showReviews: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loggedUser.subscribe(
      response => {
        console.log(response);
        this.user = response!;
      }
    )
    if (this.user) {
      this.formGroup = new FormGroup({
        'name': new FormControl(this.user.name, Validators.required),
        'surname': new FormControl(this.user.surname, Validators.required),
        'username': new FormControl(this.user.username, Validators.required),
        'email': new FormControl(this.user.email, [Validators.email, Validators.required]),
        'password': new FormControl(null),
      })
    }
  }


  onEdit() {
    if (this.formGroup.status === 'VALID') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You are going to update your user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          let name = this.formGroup.value.name;
          let surname = this.formGroup.value.surname;
          let username = this.formGroup.value.username;
          let email = this.formGroup.value.email;
          let password = this.formGroup.value.password;

          let userUpdated;
          if (password) {

            userUpdated = { "id": this.user.id, "name": name, "surname": surname, "username": username, "email": email, "password": password };
          } else {
            userUpdated = { "id": this.user.id, "name": name, "surname": surname, "username": username, "email": email };
          }


          this.userService.updateUser(userUpdated);

          Swal.fire(
            'Updated!',
            'Your user has been updated.',
            'success'
          )


        }
      })
    }
  }

}
