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
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-page-user-edit',
  templateUrl: './page-user-edit.component.html',
  styleUrls: ['./page-user-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PageUserEditComponent implements OnInit {
   
  editedUser: User;

   currentUser: User;
   administrateur: boolean;
   typeUtilisateur:string;
   idUtilisateur: number;
   editUserForm: FormGroup;
   //utilisateurs: Observable<User>;

  constructor(
    public authService: AuthService, 
    public router: Router,
    public http: Http,
    public route: ActivatedRoute,
    public userService: UserService,
    private formBuilder: FormBuilder,
  ) {

    // Vérif user Administrateur :
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }


    this.route.params.subscribe(params => {
      this.typeUtilisateur = params['type'];
      this.idUtilisateur = params['id'];
    }); 
    if (this.idUtilisateur != null){
      this.initUser();
    } else {
      this.newUser();
      console.log('new user')
    }


  }

  ngOnInit() {

  }

  initUser(){
    this.userService.getUser( this.typeUtilisateur, this.idUtilisateur)
      .map((value: User) => {this.editedUser = value;})
      .subscribe();
  }
  
  newUser(){
    this.editedUser = new User();
    this.editedUser.idEtablissement = this.currentUser.idEtablissement;
    this.editedUser.nom = null;
    this.editedUser.prenom = null;
    this.editedUser.mail = null;
    this.editedUser.classe = null;
    this.editedUser.password = null;
    this.editedUser.telephone = null;
  }

  onReset() {
    if (this.idUtilisateur != null){
      this.initUser();
    } else {
      this.newUser();
      console.log('new user')
    }
  }

  onSubmit() {
    if (this.idUtilisateur != null){
      this.userService.putUser(this.typeUtilisateur, this.editedUser);
    } else {
      this.userService.postUser(this.typeUtilisateur, this.editedUser);
    }
      console.log("Form Submitted!");
      //this.router.navigate(['liste/' + this.typeUtilisateur]);
  }

  onSupress() {
    if(confirm("Voulez-vous vraiment supprimer "+ this.editedUser.nom + " " + this.editedUser.prenom + " ?")){
      this.userService.deleteUser(this.typeUtilisateur, this.idUtilisateur);
      console.log("Form Suppress!");
      this.router.navigate(['liste/' + this.typeUtilisateur]);
    }
}
}
