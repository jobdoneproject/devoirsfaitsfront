import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.authService.logIn(this.user).add(console.log('Auth'));
      /*.subscribe(data => {
        this.router.navigate(['/profile']);
        }, err => {
        this.errorMessage = 'error :  Username or password is incorrect';
        }
      );*/
  }
}
