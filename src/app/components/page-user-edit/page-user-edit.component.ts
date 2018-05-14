import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-page-user-edit',
  templateUrl: './page-user-edit.component.html',
  styleUrls: ['./page-user-edit.component.css']
})
export class PageUserEditComponent implements OnInit {

  id: number;
  calledId: number;
  private sub: any;
  editedUser: User;


  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.calledId = +params['id'];
      console.log('calledId : ' + this.calledId);
      this.getUserById(this.calledId);
   });
  }

  getUserById(id): void {
    this.userService.getUserById(id)
      .subscribe(user => this.editedUser = user);
  }

  /*ngOnDestroy() {
    this.sub.unsubscribe();
  }*/
}
