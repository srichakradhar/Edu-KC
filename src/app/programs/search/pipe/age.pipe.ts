import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: String): String {
    const [num1, num2] = value.split(',')
    if (num1 && num2) {
      return value.replace(',', '-');
    }
    else return '> ' + num2;
  }

}
