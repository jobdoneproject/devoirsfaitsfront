import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/model.user'

@Pipe({
  name: 'nomDisponibles'
})
export class NomDisponiblesPipe implements PipeTransform {

    transform(utilisateurs: User[], nom?: any): any {

      //console.log(utilisateur);
  
      var output: User[] = []; 
      if (nom != null && nom != ""){
        for (var i = 0; i < utilisateurs.length; i++) {
          if (utilisateurs[i].nom === nom) { 
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
