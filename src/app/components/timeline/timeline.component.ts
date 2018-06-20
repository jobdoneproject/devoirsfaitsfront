import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import {User} from "../../model/model.user";
import {Message} from "../../model/model.message";
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Observable, Subscriber, Subscription, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

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
  dateMessage: any;
  newMessage: Message = new Message;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public route: ActivatedRoute,

  ) {
    this.route.params.subscribe(params => {
      this.idEleve = params['id'];
    });
    this.currentUser = this.userService.getCurrentUserLogged();
    
    this.idEtablissement = this.currentUser.idEtablissement;

    this.messageService.getMessages(this.idEleve, this.currentUser.idEtablissement)
                       .subscribe(newMessages => {
                              this.messages$ = new BehaviorSubject<Array<Message>>(newMessages);

    })
  }

  ngOnInit() {
  }

  sendMessage(){
    this.userService.getUser("eleve", this.idEtablissement, this.idEleve).subscribe(user => (this.newMessage.eleve = user));
    this.newMessage.redacteur = this.currentUser;
    this.newMessage.dateMessage = moment().unix();

    this.messageService.postMessage(this.idEtablissement, this.newMessage);
  }
}
