import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { User } from "../../model/model.user";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {UserService} from "../../services/user.service";



@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  currentUser: User;


  constructor(private userService: UserService, public authService: AuthService) { 

    this.currentUser = this.userService.getCurrentUserLogged();

     
    
  }

  ngOnInit() { }


}
