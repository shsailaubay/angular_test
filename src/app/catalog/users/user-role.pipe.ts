import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'admin':
        return 'Администратор';
      case 'counter':
        return 'Финансовый контроллер';
      case 'moderator':
        return 'Модератор';
      case 'player':
        return 'Игрок';
      default:
        return '';
    }
  }

}
