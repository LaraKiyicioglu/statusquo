import {Component, OnInit} from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Goals} from "../../shared/goals";
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GoalsEditComponent} from "../goals-edit/goals-edit.component";
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog';
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-goals',
  templateUrl: './goals-create.component.html',
  styleUrls: ['./goals-create.component.css']
})
export class GoalsCreateComponent implements OnInit{

  drop(event: CdkDragDrop<Goals[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  enteredValue = '';
  newPost = '';
  idDialog: any = '';
  data: Goals[] = [];
  isLoadingResults = true;
  goal: Goals = { id: '', description: ''};
  description = '';

  constructor(public dialog: MatDialog, private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  onAddPost(){
    this.isLoadingResults = true;
    const simpleObject = {} as Goals;
    simpleObject.description = this.enteredValue;

    this.api.addGoal(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;

      });
    window.location.reload()
  }

  onDeleteGoal(){
    this.newPost = this.enteredValue;
  }

  ngOnInit() {
    this.api.getGoals()
      .subscribe((res: any) => {
        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.getGoalDetails(this.route.snapshot.params.id);   //route stimmt hier nicht? id wird nicht übergeben--> undefined
  }

  getGoalDetails(id: any) {
    this.api.getGoal(id)
      .subscribe((data: any) => {
        this.goal = data;
        this.isLoadingResults = false;
      });
  }

  openDialog(id: any): void {
    this.idDialog= id;
    const dialogRef = this.dialog.open(GoalsEditComponent, {
      width: '40%',
      data :{'id': this.idDialog, 'description': this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteDialog(id: any): void {

    this.idDialog= id;
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '40%',
      data :{'id': this.idDialog }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });


  }

  sendMessage() {
    this.enteredValue = '';
  }
}





