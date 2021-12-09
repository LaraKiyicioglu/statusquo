import {Component, Input, OnInit} from '@angular/core';
import {Tasks} from "../shared/tasks";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() tasksToOneGoal: Tasks[] = [];
  @Input() tasksToDoing: Tasks[] = [];
  @Input() tasksToDone: Tasks[] = [];


  task: Tasks = { goalid: '', _id: '', description: '', status: ''};
  description = '';
  status = '';
  showData: boolean = false;

  constructor(public dialog: MatDialog, private router: Router, private api: ApiService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }

    fillArrays() {
    console.log("vorher " + this.tasksToOneGoal);
    console.log("Doing " + this.tasksToDoing);
    for(let task of this.tasksToOneGoal) {
      if (task.status == "doing") {
        let index = this.tasksToOneGoal.indexOf(task);
        this.tasksToOneGoal.splice(index,1);
        this.tasksToDoing.push(task);
      } else if(task.status == "done") {
        let index = this.tasksToOneGoal.indexOf(task);
        this.tasksToOneGoal.splice(index,1);
        this.tasksToDone.push(task);
      }
    }
    console.log("nachher " + this.tasksToOneGoal);
    console.log("Doing nachher " + this.tasksToDoing);
    this.ngOnInit();
  }

  /*TODO*/

  public changeStatusToTodo(): void {
    this.tasksToOneGoal.forEach((task: Tasks) => {
      if(task.status != 'todo') {
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
      this.changeStatusToTodo();
    }
  }




  /*DOING*/

  public changeStatusToDoing(): void {
        this.tasksToDoing.forEach((task: Tasks) => {
          if(task.status != 'doing') {
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
      this.changeStatusToDoing();
    }
  }





  /*DONE*/

  public changeStatusToDone(): void {
    this.tasksToDone.forEach((task: Tasks) => {
      if(task.status != 'done') {
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
