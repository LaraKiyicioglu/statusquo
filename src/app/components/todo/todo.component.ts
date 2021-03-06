import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tasks } from '../../models/tasks';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoginData } from '../../models/loginData';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() tasksToOneGoal: Tasks[] = [];
  @Input() tasksToTodo: Tasks[] = [];
  @Input() tasksToDoing: Tasks[] = [];
  @Input() tasksToDone: Tasks[] = [];
  @Input() goalid: string = '';
  @Input() selectedRole: String = 'Mitarbeiter_in';
  @Input() currentUrl = '';
  @Input() idTeamMember = '';
  @Output() showTasksClicked = new EventEmitter<Tasks[]>();
  descriptionDialog: String = '';
  idDialog: String = '';
  task: Tasks = { goalid: '', _id: '', description: '', status: '' };
  description = '';
  isLoadingResults = true;
  status = '';
  _id = '';
  editable = false;
  readOnly = true;
  value = 'Clear me';
  idloggedInUser: String = '';
  dataUsers: LoginData[] = [];
  showTasksToOneUser = false;
  edit = false;
  addPost = false;
  enteredContent = '';
  todoForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required),
  });
  decision: String = '';
  @Input() idls: String = '';
  @Output() newTodo = new EventEmitter<Tasks>();
  @Output() deleteTodo = new EventEmitter<String>();
  @Output() result = new EventEmitter<String>();
  @Output() changedOrder = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private api: ApiService,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.api.getUsers().subscribe(
      (res: any) => {
        this.dataUsers = res;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.idloggedInUser = this.auth.getUserDetails()._id;
    if (this.selectedRole != 'Vorgesetzte_r') {
      this.getTodoDetails(this.idloggedInUser);
    }
  }

  getTodoDetails(id: any) {
    this.api.getTasksToGoal(id).subscribe(
      (data: any) => {
        this.tasksToOneGoal = data;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.showTasksToOneUser = true;
  }

  addTask(id: any) {
    if (this.selectedRole == 'Mitarbeiter_in') {
      this.isLoadingResults = true;
      const simpleObject = {} as Tasks;
      simpleObject.description = this.enteredContent;
      simpleObject.status = 'todo';
      simpleObject.goalid = id;
      this.api.addTask(simpleObject).subscribe(
        (res: any) => {
          this.isLoadingResults = false;
        },
        (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
      this.addPost = false;
      window.location.reload();
    }
  }

  addPostForm() {
    this.addPost = !this.addPost;
  }

  onFormSubmit(id: any) {
    this.isLoadingResults = true;
    this.api.updateTask(id, this.todoForm.value).subscribe(
      (res: any) => {
        const id = res._id;
        console.log(id);
        this.isLoadingResults = false;
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  openDialog(id: any, description: any): void {
    this.descriptionDialog = description;
    this.idDialog = id;
    const dialogRef = this.dialog.open(TodoEditComponent, {
      width: '50%',
      data: { id: this.idDialog, description: this.descriptionDialog },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  // TODO
  changeStatusToTodo(): void {
    this.tasksToTodo.forEach((task: Tasks) => {
      if (task.status != 'todo') {
        task.status = String('todo');
        this.api
          .updateTaskStatus(task._id, task)
          .subscribe((task: Tasks) => {});
      }
    });
    this.changedOrder.emit(true);
    window.location.reload();
  }

  dropInTodo(event: CdkDragDrop<any>) {
    if (this.selectedRole == 'Mitarbeiter_in') {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.changeStatusToTodo();
      }
    }
  }

  // DOING
  changeStatusToDoing(): void {
    this.tasksToDoing.forEach((task: Tasks) => {
      if (task.status != 'doing') {
        task.status = String('doing');
        this.api
          .updateTaskStatus(task._id, task)
          .subscribe((task: Tasks) => {});
      }
    });
    this.changedOrder.emit();
    window.location.reload();
  }

  dropInDoing(event: CdkDragDrop<any>) {
    if (this.selectedRole == 'Mitarbeiter_in') {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        this.changedOrder.emit(true);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.changeStatusToDoing();
      }
    }
  }

  // DONE
  public changeStatusToDone(): void {
    this.tasksToDone.forEach((task: Tasks) => {
      if (task.status != 'done') {
        task.status = String('done');
        this.api
          .updateTaskStatus(task._id, task)
          .subscribe((task: Tasks) => {});
      }
    });
    this.changedOrder.emit(true);
    window.location.reload();
  }

  dropInDone(event: CdkDragDrop<any>) {
    if (this.selectedRole == 'Mitarbeiter_in') {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        this.changedOrder.emit(true);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.changeStatusToDone();
      }
    }
  }

  deleteDialog(id: any): void {
    this.deleteTodo.emit(id);
    let idDialog = id;
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '50%',
      data: { _id: idDialog },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Delete') {
        this.decision = 'yes';
        this.result.emit(this.decision);
      }
      if (result.event != 'Close') {
        this.decision = 'no';
        this.result.emit(this.decision);
      }
    });
  }

  isVorgesetzte_r(): boolean {
    this.currentUrl = this.router.url;
    if (this.currentUrl != '/') {
      return true;
    }
    return this.selectedRole == 'Vorgesetzte_r';
  }

  geklickt() {
    console.log('geklickt');
  }
}
