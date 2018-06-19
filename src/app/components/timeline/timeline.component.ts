import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import {User} from "../../model/model.user";
import {Message} from "../../model/model.message";
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Observable, Subscriber, Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  currentUser: User;
  idEleve: number;
  idEtablissement: number;
  messages: Message[];
  messages$: BehaviorSubject<Message[]>;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public route: ActivatedRoute,

  ) {
    this.currentUser = this.userService.getCurrentUserLogged();
    this.idEtablissement = this.currentUser.idEtablissement;
    
    this.route.params.subscribe(params => {
      this.idEleve = params['id'];
    });
    this.messageService.getMessages(this.idEleve, this.currentUser.idEtablissement)
                       .subscribe(newMessages => {
                              this.messages$ = new BehaviorSubject<Array<Message>>(newMessages);
    })
  }

  ngOnInit() {
  }

}
