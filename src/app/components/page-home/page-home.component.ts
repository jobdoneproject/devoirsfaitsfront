import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../user';
import { USERS } from '../../mock-user';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';


// this.router.navigateByUrl('/login');

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  currentUser: User;
  users: User[];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser()
      .subscribe(user => this.currentUser = user);
  }

  getAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe(users => this.users = users);
  }

  goToEditUser(id) {
    this.router.navigate(['/edition-utilisateur', id]);
  }

}
