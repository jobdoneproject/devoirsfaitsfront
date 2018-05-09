import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  currentUser: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

getCurrentUser(): void {
  this.userService.getCurrentUser()
    .subscribe(user => this.currentUser = user);
}

}
