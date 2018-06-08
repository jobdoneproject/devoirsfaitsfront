import { Component, OnInit } from '@angular/core';
import {User} from "../../model/model.user";
import { UserService } from '../../services/user.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-import-eleves',
  templateUrl: './import-eleves.component.html',
  styleUrls: ['./import-eleves.component.scss']
})
export class ImportElevesComponent implements OnInit {

  administrateur: boolean;
  currentUser: User;
  fileContent;

  public uploader: FileUploader;

  constructor(public utilisateurService: UserService) {
   }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.uploader  = new FileUploader({url: this.getUploadUrl()});
    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         alert('Fichier importé avec succès');
     };
  }

  submit() {
    this.uploader.uploadAll()
  }

  getUploadUrl(){
    return this.utilisateurService.getImportStudentsURL(4);
  }

  

}
