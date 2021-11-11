import {Component} from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Goals} from "../../shared/goals";
import { Login} from "../../shared/login";
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
/** Error when invalid control is dirty, touched, or submitted. */


@Component({
  selector: 'app-goals',
  templateUrl: './goals-create.component.html',
  styleUrls: ['./goals-create.component.css']
})
export class GoalsCreateComponent {

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

  displayedColumns: string[] = ['descritption'];
  data: Goals[] = [];
  isLoadingResults = true;


  description = '';
  constructor(private router: Router, private api: ApiService) { }

  onAddPost(){
    /*console.log('enteredValue = ' + this.enteredValue);
    this.newPost = this.enteredValue;
    this.isLoadingResults = true;
    let addedGoal = "{ \"description:\" : "+ "\"" + this.newPost + "\""  + "}";
    console.log('addedGoal = ' + addedGoal);

    this.api.addArticle(addedGoal)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });*/


    this.isLoadingResults = true;
    const simpleObject = {} as Goals;
    simpleObject.description= this.enteredValue;

    this.api.addArticle(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });

    this.data.push(simpleObject);

  }

  onDeleteGoal(){
    this.newPost = this.enteredValue;
  }


  ngOnInit() {
    this.api.getArticles()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data)
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }







}





