import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RegisterUser} from '../model/model.registerUser';
import {AccountService} from '../services/account.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = new RegisterUser();
  errorMessage: string;

  constructor(public accountService: AccountService, public router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.accountService.createAccount(this.registerUser)
    .subscribe(data => {
        this.router.navigate(['/register']);
      }, err => {
        console.log(err);
        this.errorMessage = "username already exist";
      }
    )
  }
}
