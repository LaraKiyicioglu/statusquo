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

  public changeStatus(): void {
        this.tasksToDoing.forEach((task: Tasks) => {
          console.log(task._id);
          task.status = String('doing');
          this.api.updateTaskStatus(task._id, task).subscribe((task: Tasks) => {
          }, error => {
            console.log('hat nicht funktioniert');
          });
      });
  }


  drop(event: CdkDragDrop<any>) {
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

      console.log('transferArrayItem aufgerufen');
      this.changeStatus();
    }
  }


}
