import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import {TodosComponent} from './todos.component';
import {TodoService} from './todo.service';
import {observable} from 'rxjs/symbol/observable';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  describe('OnInit', () => {
    it('should set todos to data returned from service', () => {
      const todos = [1, 2, 3];
      spyOn(service, 'getTodos').and.callFake(() => {
        return Observable.from([todos]);
      });

      // OR:
      // spyOn(service, 'getTodos').and.returnValue(Observable.from([todos]));

      component.ngOnInit();

      expect(component.todos).toBe(todos);
    });
  });

  describe('addTodo', () => {
    it('should call add method of service when new todo is added', () => {
      const spy = spyOn(service, 'add').and.returnValue(Observable.empty());

      component.add();

      expect(spy).toHaveBeenCalled();
    });

    it('should add newly added todo to todos array', () => {
      const todo = {id: 1};
      spyOn(service, 'add').and.returnValue(Observable.from([todo]));

      component.add();

      expect(component.todos).toContain(todo);
    });

    it('should set message to error message if error occured', () => {
      const error = 'error message';
      spyOn(service, 'add').and.returnValue(Observable.throw(error));

      component.add();

      expect(component.message).toContain(error);
    });
  });

  describe('on delete', () => {
    it('should call delete if user confirms removing todo', () => {
      const todoId = 1;
      spyOn(window, 'confirm').and.returnValue(true);
      const spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

      component.delete(todoId);

      expect(spy).toHaveBeenCalledWith(todoId);
    });

    it('should not call delete if user declines removing todo', () => {
      const todoId = 1;
      spyOn(window, 'confirm').and.returnValue(false);
      const spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

      component.delete(todoId);

      expect(spy).not.toHaveBeenCalled();
    });
  });

});
