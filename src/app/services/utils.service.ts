import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class UtilsService {

  constructor() { }

  findById(source, id) {
    for (let i = 0; i < source.length; i++) {
      if (source[i].id === id) {
        // console.log(source[i]);
        return source[i];
      }
    }
    return null;
  }
}


