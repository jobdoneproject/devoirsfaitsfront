import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { User } from "../../model/model.user";
import { Http, Response, RequestOptions, Headers } from '@angular/http';



@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  currentUser: User;


  constructor(public authService: AuthService) { 

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

     
    
  }

  ngOnInit() { }


}
