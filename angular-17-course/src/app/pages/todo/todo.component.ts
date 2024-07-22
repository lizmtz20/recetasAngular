import { Attribute, ChangeDetectionStrategy, Component, EventEmitter, LOCALE_ID, Output, ViewEncapsulation, input } from '@angular/core';
import { NTodo } from '../../models/todo.model';
import { CommonModule, registerLocaleData } from '@angular/common';
import spanish from '@angular/common/locales/es';
import { RangePipe } from '../../pipes/range.pipe';
import { difficultPipe } from '../../pipes/difficult.pipe';
import { TranslateModule } from '@ngx-translate/core';

registerLocaleData(spanish);

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RangePipe,
    difficultPipe
  ],
  providers:[
    {
      provide: LOCALE_ID, useValue: 'es'
    }
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {

  constructor(
    @Attribute('sprint') public sprint: string 
  ){
  }

  // @Input({ required: true}) todoData!: NTodo.TodoData;

  todoData = input.required<NTodo.TodoData>({alias: 'todo'});
  

  @Output() onClickIcon = new EventEmitter<NTodo.TodoData>();
  
  
}