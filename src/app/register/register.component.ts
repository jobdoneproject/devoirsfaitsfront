import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../model/model.User';
import {AccountService} from '../services/account.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  User: User = new User();
  errorMessage: string;

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.accountService.createAccount(this.User)
    .subscribe(data => {
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
        this.errorMessage = "username already exist";
      }
    )
  }
}
