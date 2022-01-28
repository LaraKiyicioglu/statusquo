import {Component, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Login, Team} from "../shared/login";
import {ApiService} from "../services/api.service";
import {Tasks} from "../shared/tasks";


@Component({
  selector: 'app-responsive-header',
  templateUrl: './responsive-header.component.html',
  styleUrls: ['./responsive-header.component.css']
})
export class ResponsiveHeaderComponent {
  public loggedIn = false;
  isLogin = false;
  loginForm: FormGroup
  submitted = false;
  data: Login[] = [];
  isLoadingResults = true;
  firstNameloggedInUser: String = "";
  lastNameloggedInUser: String = "";
  roleLoggedInUser: String = "";
  selectedRole: String = "Mitarbeiter_in";
  idLoggedInUser: String = "";
  teamVorgesetze: Team[] = [];
  goalid: string = "";
  @Output() idTeamMember = "";
  tasksToOneGoal: Tasks[] = [];
  tasksToDoing: Tasks[] = [];
  tasksToDone: Tasks[] = [];
  panelOpenState = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver,
              private auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private api: ApiService,

  ) {

    this.loginForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required)
    });
  }

  setLoggedIn(data: boolean) {
    this.loggedIn = data;
  }

  goToTeamview(userid: any, selectedRole: any, surname: any, firstname: any): void {
    this.router.navigate(['/teamview/' + userid], {state: {data: {userid, selectedRole, surname, firstname}}});
  }

  goToGoals(userid: any, selectedRole: any): void {
    this.router.navigate(['/ziele'], {state: {data: {userid, selectedRole}}});
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isUserLogin();
    this.api.getUsers()
      .subscribe((res: any) => {
        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.firstNameloggedInUser = this.auth.getUserDetails().user_info.firstname;
    this.lastNameloggedInUser = this.auth.getUserDetails().user_info.surname;
    this.roleLoggedInUser = this.auth.getUserDetails().user_info.role;
    this.idLoggedInUser = this.auth.getUserDetails().user_info._id;
    this.roleLoggedInUser = this.auth.getUserDetails().user_info.role;

    this.api.getUser(this.idLoggedInUser)
      .subscribe((res: Login) => {
        console.log('get user ' + res.firstname);
        this.teamVorgesetze = res.team;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  get f(): any {
    return this.loginForm.controls;
  }

  isUserLogin(): void {
    if (this.auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  logout(): void {
    this.auth.clearStorage();
    window.location.reload()
  }

  onSelectVorgesetzte_r() {
    this.selectedRole = "Vorgesetzte_r";
    this.tasksToOneGoal = [];
  }


  changeRoleToMitarbeiter_in(){
    console.log("geklickt");
    this.selectedRole ="Mitarbeiter_in";
    this.router.navigate(['/']);
     }

  onClickVorgesetzter() {
    this.api.getUser(this.idLoggedInUser)
      .subscribe((res: Login) => {
        console.log('get user ' + res.firstname);
        this.teamVorgesetze = res.team;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  setGoalsid(id: string) {
    this.goalid = id;
  }


  reloadPage() {
    this.router.navigate(['/']);

  }

  clickProtokoll() {
  }

}
