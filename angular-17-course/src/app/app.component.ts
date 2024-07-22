import { ChangeDetectorRef, Component, DoCheck, EffectRef, OnInit, computed, effect, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { NTodo } from './models/todo.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';
import { HighlightedDirective } from './directives/highlighted.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { I18nService } from './services/i18n.service';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodoComponent,
    CommonModule,
    HeaderComponent,
    FormsModule,
    HighlightedDirective,
    FilterPipe,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit, DoCheck {
  todos: NTodo.TodoData[] = [];

  // counter = signal(0);

  counter = 0;


  derivedCounter = computed(() => {
    // return this.counter() ** 2;
    return 0;
  });

  // newCounter = this.counter.asReadonly;

  isLoaded = false;

  searchText = '';

  onPrefetch = false;

  onButtonCliked = true;


  constructor(
    private readonly apiService: ApiService,
    private readonly cd: ChangeDetectorRef,
    private translate: TranslateService,
    private i18nService: I18nService,
    public counterService: CounterService
  ) {
    sessionStorage.setItem('lang', 'es');  
    this.translate.setTranslation('es', this.i18nService.getSpanishData);
  }


  ngOnInit(): void {
    this.getTodos();
    this.translate.onLangChange.subscribe(val => {
      console.log(val);
      this.getTodos();
    });
  }

  ngDoCheck(): void {}

  // incrementCounter() {
  //   this.counterService.setCounter();
  //   // this.counter.update(val => val + 1);
  // }

  private getTodos() {
    this.apiService.get<NTodo.TodosResponse>().subscribe(val => {
      this.todos = val.data;
      this.isLoaded = true;
    });
  }

  


  deleteTodo(item: NTodo.TodoData) {
    this.apiService.delete<NTodo.TodosResponse>(item.id).subscribe(todos => this.todos = todos.data);
  }

  
  // put(evt: Event, item:NTodo.TodoData){
  //   this.apiService.put<NTodo.TodosResponse>(item, item.id).subscribe(todos => this.todos = todos.data);
  // }

  updateTodo(evt: Event, item : NTodo.TodoData) {
    const todoCopy = {... this.todos[0], description: 'Nuevo valor'};
    const todos = [...this.todos];
    todos[0] = todoCopy;

    this.todos = [];
    this.todos = todos;
    // this.apiService.put(item, item.id).subscribe(console.log);
    // this.apiService.patch({ description: item.description}, item.id).subscribe(console.log);
  }

  addTodo() {
    this.apiService.post({
      "title": "Leer documentación técnica",
      "description": "Investigar y leer la documentación de una nueva tecnología o herramienta relevante para el proyecto.",
      "status": "Por hacer",
      "difficult": 3,
      "hidden": false,
      "id": 1,
      "deadLine": "2024-04-07T03:25:54.898Z",
      "color": {
        "status": "#ed4040",
        "difficult": "#68db68"
      },
      "class": {
        "status": "to-do",
        "difficult": "low"
      },
      "progress": 0.2
    }).subscribe(() => this.getTodos());
  }
}



