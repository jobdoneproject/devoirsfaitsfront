import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User} from "../../model/model.user";
import { Router} from "@angular/router";
import { AppComponent} from "../../app.component";
import { AuthService} from "../../services/auth.service";
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { UserService } from '../../services/user.service';
import { USERS } from '../../mock-user';


@Component({
  selector: 'app-page-user-edit',
  templateUrl: './page-user-edit.component.html',
  styleUrls: ['./page-user-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PageUserEditComponent implements OnInit {
  public editedUser: User;

   currentUser: User;
   administrateur: boolean;
   typeUtilisateur:string;
   idUtilisateur: number;

  // private editedUser: Observable<User>;

  constructor(
    public authService: AuthService, 
    public router: Router,
    public http: Http,
    public route: ActivatedRoute,
    public userService: UserService,
  ) {

    // Vérif user Administrateur :
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }


    this.route.params.subscribe(params => {
      this.typeUtilisateur = params['type'];
      this.idUtilisateur = params['id'];}); 

    this.userService.getUser( this.typeUtilisateur, this.idUtilisateur)
      .map((value: User) => this.editedUser = value)
      .subscribe();

  }

  ngOnInit() {}

  /*onCancel() {
    if (this.editUserForm.valid) {
      console.log("Form Submitted!");
      this.editUserForm.reset();
    }
  }*/

}
