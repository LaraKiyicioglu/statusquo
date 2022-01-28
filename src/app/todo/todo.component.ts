import {Component, Input, OnInit} from '@angular/core';
import {Tasks} from "../shared/tasks";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {DeleteTaskDialogComponent} from "./delete-task-dialog/delete-task-dialog.component";
import {GoalsEditComponent} from "../goals/goals-edit/goals-edit.component";
import {TodoEditComponent} from "./todo-edit/todo-edit.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() tasksToOneGoal: Tasks[] = [];
  @Input() tasksToTodo: Tasks[] = [];
  @Input() tasksToDoing: Tasks[] = [];
  @Input() tasksToDone: Tasks[] = [];
  @Input() goalid: string = '';
  @Input() selectedRole: String = "Mitarbeiter_in";

  descriptionDialog: String = "";
  idDialog: String = "";
  task: Tasks = {goalid: '', _id: '', description: '', status: ''};
  description = '';
  isLoadingResults = true;
  status = '';
  editable = false;
  showData: boolean = false;
  editableId: String = '';


  constructor(public dialog: MatDialog, private router: Router, private api: ApiService, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    console.log(this.selectedRole);
  }

  openDialog(id: any, description: any): void {
    this.descriptionDialog = description;
    this.idDialog = id;
    const dialogRef = this.dialog.open(TodoEditComponent, {
      width: '40%',
      data: {'id': this.idDialog, 'description': this.descriptionDialog}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }



  // TODO

  public changeStatusToTodo(): void {
    this.tasksToTodo.forEach((task: Tasks) => {
      if (task.status != 'todo') {
        console.log(task._id);
        task.status = String('todo');
        this.api.updateTaskStatus(task._id, task).subscribe((task: Tasks) => {
        }, error => {
          console.log('hat nicht funktioniert');
        });
      }
    });
  }

  dropInTodo(event: CdkDragDrop<any>) {
    if(this.selectedRole == 'Mitarbeiter_in') {
      console.log('vorher ' + this.tasksToTodo);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        console.log('moveIteminArray aufgerufen');
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        console.log('nachher ' + this.tasksToTodo);
        this.changeStatusToTodo();
      }
    }
  }

  // DOING

  public changeStatusToDoing(): void {
    console.log('changeStatustoDoing augerufen')
    this.tasksToDoing.forEach((task: Tasks) => {
      if (task.status != 'doing') {
        console.log(task._id);
        task.status = String('doing');
        this.api.updateTaskStatus(task._id, task).subscribe((task: Tasks) => {
        }, error => {
          console.log('hat nicht funktioniert');
        });
      }
    });
  }

  dropInDoing(event: CdkDragDrop<any>) {
    if(this.selectedRole == 'Mitarbeiter_in') {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        console.log('moveIteminArray aufgerufen');
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        this.changeStatusToDoing();
      }
    }
  }


  // DONE
  public changeStatusToDone(): void {
    this.tasksToDone.forEach((task: Tasks) => {
      if (task.status != 'done') {
        console.log(task._id);
        task.status = String('done');
        this.api.updateTaskStatus(task._id, task).subscribe((task: Tasks) => {
        }, error => {
          console.log('hat nicht funktioniert');
        });
      }
    });
  }

  dropInDone(event: CdkDragDrop<any>) {
    if(this.selectedRole == 'Mitarbeiter_in') {
      console.log('vorher ' + this.tasksToOneGoal);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        console.log('moveIteminArray aufgerufen');
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        console.log('nachher ' + this.tasksToOneGoal);
        this.changeStatusToDone();
      }
    }
  }

  addTask() {
    this.isLoadingResults = true;
    const simpleObject = {} as Tasks;
    simpleObject.description = "Click to edit";
    simpleObject.status = "todo";
    simpleObject.goalid = this.goalid;

    this.api.addTask(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
    window.location.reload()
  }

  deleteDialog(id: any): void {
    let idDialog = id;
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '40%',
      data: {'_id': idDialog}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  changeEditable() {
    if (this.selectedRole == 'Mitarbeiter_in') {
      this.editable = true;
    }
  }


}
