import {Component, Input, OnInit} from '@angular/core';
import {Goals} from "../shared/goals";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Review} from "../shared/review";
import {Users} from "../../../backend/src/users/users.model";

@Component({
  selector: 'app-teamview',
  templateUrl: './teamview.component.html',
  styleUrls: ['./teamview.component.css']
})
export class TeamviewComponent implements OnInit {
  reviewsToOneUser: Review[] = [];
  firstname = "";
  surname = "";
  submitted = false;
  isLoadingResults = true;
  goalid: string = "";
  @Input() idMember: any = "";

  goalsToOneUser: Goals[] = [];
  @Input() selectedRole = "";
  data = {userid: '', selectedRole: '', surname: '', firstname: ''};

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private api: ApiService,
              private route: ActivatedRoute
  ) {}


  loadReviews(userid: string) {
    this.api.getReviewsToUser(userid)
      .subscribe((res: any) => {
        this.reviewsToOneUser = res;
      }, err => {
        console.log(err);
      });


  }



  ngOnInit(): void {

    if(history.state.data != null) {
      this.data = history.state.data;
      this.idMember = this.route.snapshot.paramMap.get('id');
      this.selectedRole = this.data.selectedRole;
      this.surname = this.data.surname;
      this.firstname = this.data.firstname;

      console.log('die aktuelle userid: ' + this.idMember + 'und die Rolle: ' + this.selectedRole);
      this.loadGoals(this.idMember);
      this.loadReviews(this.idMember);
    }

  }


  setGoalsid(id: string) {
    this.goalid = id;
  }


  loadGoals(userid: any) {
    this.api.getGoalsToUser(userid)
      .subscribe((res: any) => {
        this.goalsToOneUser = res;
        console.log('alle goals to user: ' + this.goalsToOneUser);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.idMember = userid;
  }

}
