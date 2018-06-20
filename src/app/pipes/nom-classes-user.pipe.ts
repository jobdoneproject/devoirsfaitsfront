import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/model.user'

@Pipe({
  name: 'nomAndClasses'
})
export class NomAndClassesPipe implements PipeTransform {

    //utilisateurs:User[] = [];

    transform(utilisateurs: User[], nom?: any): any {

      if(utilisateurs){
      var output: User[] = []; 
      if (nom != null && nom != ""){
        for (var i = 0; i < utilisateurs.length; i++) {
          if (utilisateurs[i].nom.toLowerCase().includes(nom.toLowerCase()) || utilisateurs[i].classe.toLowerCase().includes(nom.toLowerCase())) { 
            output.push(utilisateurs[i]); 
          } 
        } 
        return output;
      } else {
        for (var i = 0; i < utilisateurs.length; i++) {
          output.push(utilisateurs[i]);
        } 
        return output;
      }
    } 
  }
}
