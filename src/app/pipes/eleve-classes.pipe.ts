import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/model.user'

@Pipe({
  name: 'eleveClasses'
})

export class EleveClassesPipe implements PipeTransform {

  transform(utilisateurs: User[], classe?: any): any {

    //console.log(utilisateur);

    var output: User[] = []; 
    if (classe != "Classes"){
      for (var i = 0; i < utilisateurs.length; i++) {
        if (utilisateurs[i].classe === classe) { 
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
