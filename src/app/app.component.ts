import { Component } from '@angular/core';
import { Todo } from 'src/models/Todo';
import { ThrowStmt } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public title = 'Minhas Tarefas';
  public todos: Todo[]=[];
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
   
    
    this.form = this.formBuilder.group({
      title:['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.required
      ])]
    });
    
    this.load();

  }

  markAsDone(todo: Todo){
      const index = this.todos.indexOf(todo);
      this.todos[index].done = true;
      this.save();
  }
  markAsUndone(todo: Todo){
    const index = this.todos.indexOf(todo);
    this.todos[index].done=false;
    this.save();   
  }
  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
   if(index>=0){
     this.todos.splice(index,1);
   } 
   this.save();

  }
  add(){
   const id = this.todos.length+1;
   const title = this.form.controls['title'].value;
   this.todos.push(new Todo(id, title, false));    
   this.clear();
   this.save();
   this.changeMode('list');
  }
  save(){
    const todos = JSON.stringify(this.todos);
    localStorage.setItem('todos',todos);
  }
  load(){
    const todos = JSON.parse(localStorage.getItem('todos'));
    if(todos){
      this.todos = todos;
    }
    else{
      this.todos = [];
    }
  }
  clear(){
    this.form.reset();
  }
  changeMode(mode:string){
    this.mode=mode;
  }

}
