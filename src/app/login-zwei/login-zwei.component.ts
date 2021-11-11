import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {Goals} from "../shared/goals";
import {Login} from "../shared/login";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-login-zwei',
  templateUrl: './login-zwei.component.html',
  styleUrls: ['./login-zwei.component.css']
})
export class LoginZweiComponent implements OnInit {

  @Output() setLoggedIn: EventEmitter<any> = new EventEmitter()
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;
  public loggedIn = false;
  data: Login[] = [];
  isLoadingResults = true;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private api: ApiService,


  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  /*async ngOnInit(): Promise<void> {
    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }
  }*/

  ngOnInit() {
    this.api.getUsers()
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


  async onSubmit(): Promise<void> {

    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        await this.authService.login(username, password);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }


  onClick(){
    this.loggedIn=true;
    this.setLoggedIn.emit(this.loggedIn);
  }
}

