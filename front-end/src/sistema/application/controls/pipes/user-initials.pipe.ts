import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'userInitials'})
export class UserInitialsPipe implements PipeTransform {

  /**
   *
   * @param value
   */
  transform(value: any): any {
    if (!value)
      return;

    const splittedName = value.split(' ');
    const firstLetter = splittedName[0].charAt();

    let lastLetter = '';

    if (splittedName.length > 1) {
      lastLetter = splittedName[splittedName.length - 1].charAt();
    }

    const initials = `${firstLetter}${lastLetter}`;

    return initials.toUpperCase();
  }
}
