import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utilisateurDisponibles'
})
export class UtilisateurDisponiblesPipe implements PipeTransform {
  transform(utilisateurs: any, filter: any, filterDisponibles: Array<any>, disponible: boolean): any {
    if (filter && Array.isArray(utilisateurs) && filterDisponibles) {
      let filterKeys = Object.keys(filter);
      let checkedItems = filterDisponibles.filter(filterDisponible => { return filterDisponible.checked; });
      if (!checkedItems || checkedItems.length === 0) { return null; }
      if (disponible) {
        return utilisateurs.filter(filterDisponible =>
            filterKeys.reduce((acc1, keyName) =>
                (acc1 && checkedItems.reduce((acc2, checkedItem) => acc2 && new RegExp(filterDisponible[keyName], '').test(checkedItem.value) || checkedItem.value === "", true))
              , true)
              );
      } else {
        return utilisateurs.filter(filterDisponible => {
          return filterKeys.some((keyName) => {
            return checkedItems.some((checkedItem) => {
              return new RegExp(filterDisponible[keyName], '').test(checkedItem.value) || checkedItem.value === "";
            });
          });
        });
      }
    } 
  }
}
