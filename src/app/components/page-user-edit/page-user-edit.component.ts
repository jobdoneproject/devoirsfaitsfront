import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User} from "../../model/model.user";
import { Router} from "@angular/router";
import { AppComponent} from "../../app.component";
import { AuthService} from "../../services/auth.service";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { UserService } from '../../services/user.service';
import { USERS } from '../../mock-user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-page-user-edit',
  templateUrl: './page-user-edit.component.html',
  styleUrls: ['./page-user-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [UserService]
})
export class PageUserEditComponent implements OnInit {
  //public editedUser: User;
  public editedUser: Observable<User>;

  public edited: User;

  private calledId: number;
  id: number;
  private sub: any;
  private currentUser: User;
  private administrateur: boolean;
  private errorMessage:string;
  private idEtablissement: number;
  private url: string;
  public listEleve: Observable<User>;
  public edUser: User;

  

  constructor(
    public authService: AuthService, 
    public router: Router,
    // private http: Http,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {

    // Vérif user Administrateur :
    /*this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idEtablissement = this.currentUser.idEtablissement;
    console.log("this.currentUser : " + JSON.stringify(this.currentUser));
    console.log("this.currentUser.privilege : " + this.currentUser.privilege);
    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }*/



    // Récupération editedUser
    // https://symbiotics.co.za/using-observables-in-angular-4-to-get-data-from-an-api-service/
    // getUserById(id): void {
    // }

    // this.url = AppComponent.API_URL+"/eleve/etablissement/"+this.currentUser.idEtablissement;
    // this.listEleve = this.http.get(this.url).map((res: Response) => res.json());

    /*this.sub = this.route.params.subscribe(params => {
      this.calledId = +params['id'];
      console.log('calledId : ' + this.calledId);
      // this.getUserById(this.calledId);
      this.url = AppComponent.API_URL+"/eleve/"+this.calledId;
      console.log("this.url : " + this.url);
      // this.editedUser = this.http.get(this.url).map((res: Response) => res.json());
    });

    this.url = AppComponent.API_URL+"/eleve/"+this.calledId;
    this.editedUser = this.http.get(this.url).map((res: Response) => res.json());
    // console.log('this.editedUser' + JSON.parse(this.editedUser));*/

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idEtablissement = this.currentUser.idEtablissement;
    
    console.log("this.currentUser.privilege : " + this.currentUser.privilege);
    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }

    this.url = AppComponent.API_URL+"/eleve/12";
    // CORRIGER URL

     this.editedUser =this.http.get<User>(this.url).pipe(map(
      resp => resp
    ));
    console.log('this.editedUser : ' + this.editedUser);
    //pipe(map((res: Response) => res.json())).subscribe;











    // Inutile TEST : 
    /*this.listEleve = this.http.get(this.url).pipe(map((resp: Response)=>
    resp.json()));
    console.log('this.listEleve : ' + this.listEleve);
    */

  }

  ngOnInit() {
    console.log('Init');
    // this.sub = this.route.params.subscribe(params => {
    //   this.calledId = +params['id'];
    //   console.log('calledId : ' + this.calledId);
    //   this.getUserById(this.calledId);
    // });


    // this.editedUser = this.userService.getUserById(this.calledId);
    // console.log("editedUser : " + JSON.stringify(this.editedUser));

    // getUserByIdSecond(id)

    // this.http.get(AppComponent.API_URL + 'eleve/' + this.calledId )
    // .subscribe(json => console.log(json));
  }

  

  // getUserById(id): void {
  //   this.userService.getUserById(id)
  //     .subscribe(user => this.editedUser = user);


    // this.url = AppComponent.API_URL+"/eleve/"+this.calledId;
    // this.editedUser = this.http.get(this.url).map((res: Response) => res.json());
    
  // }

  // getEditedUser() : Observable<User> {
  //   this.url = AppComponent.API_URL+"/eleve/"+this.calledId;
  //   let response = this.http.get(this.url)
  //   // ...and calling .json() on the response to return data
  //   .map((response: Response) => response.json());
  //   return response;
  // }

  getUserById(id): void {
    // this.userService.getUserById(id)
    //   .subscribe(user => this.editedUser = user);
  }

  removeGroup(id): void {
    console.log(id);
  }

  /*ngOnDestroy() {
    this.sub.unsubscribe();
  }*/

  onSubmit(){
    console.log(this.edUser);
  }

  submitForm(value: any) {
    console.log(value);
  }

    // // EDIT USER
    // editUser(user: User){
    //   console.log("Edited user : " )
    // }



}
