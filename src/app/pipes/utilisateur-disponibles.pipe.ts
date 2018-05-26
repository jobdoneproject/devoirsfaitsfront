import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utilisateurDisponibles'
})
export class UtilisateurDisponiblesPipe implements PipeTransform {
    transform(eleves: any, filter: any, filterItems: Array<any>, disponible: boolean): any {
      console.log('Filtering ..');
      if (filter && Array.isArray(eleves) && filterItems) {
        let filterKeys = Object.keys(filter);
        let checkedItems = filterItems.filter(eleve => { return eleve.checked; });
        if (!checkedItems || checkedItems.length === 0) { return null; }
        if (disponible) {
          return eleves.filter(eleve =>
              filterKeys.reduce((acc1, keyName) =>
                  (acc1 && checkedItems.reduce((acc2, checkedItem) => acc2 && new RegExp(eleve[keyName], '').test(checkedItem.value) || checkedItem.value === "", true))
                , true)
                );
        } else {
          return eleves.filter(eleve => {
            return filterKeys.some((keyName) => {
              return checkedItems.some((checkedItem) => {
                return new RegExp(eleve[keyName], '').test(checkedItem.value) || checkedItem.value === "";
              });
            });
          });
        }
      } 
    }
}
