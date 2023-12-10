import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'taskDate',
})
export class TaskDatePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string | null {
    if (date == null) {
      return 'Без даты';
    }

    date = new Date(date);
    const currentDate = new Date()

    if (date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()) {
      return 'Сегодня';
    }
    if (date.getDate() === currentDate.getDate() - 1 &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()) {
      return 'Вчера';
    }
    if (date.getDate() === currentDate.getDate() + 1 &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()) {
      return 'Завтра';
    }

    return new DatePipe('ru-RU').transform(date, format);
  }

}
