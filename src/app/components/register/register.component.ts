import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

import { UserService } from '../../user.service';
import { User } from '../../user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(public accountService: AccountService, public router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.accountService.createAccount(this.user).subscribe(data => {
        this.router.navigate(['/administrateur']);
      }, err => {
        console.log(err);
        this.errorMessage = "username already exist";
      }
    )
  }
}
