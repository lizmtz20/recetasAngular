import { Pipe, PipeTransform } from '@angular/core';
import { NTodo } from '../models/todo.model';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'difficult',
  standalone: true,
  pure: false
})
export class difficultPipe implements PipeTransform {
  constructor(
    private translate: TranslateService
  ){}

  transform(difficult: number): string {    
    switch (difficult) {
      case NTodo.difficult.LOW:
        
        return this.translate.instant('todo.difficult.low');
    
      case NTodo.difficult.MEDIUM:
        
      return this.translate.instant('todo.difficult.medium');
    
      default:
        return this.translate.instant('todo.difficult.high');
    }
  }

}
