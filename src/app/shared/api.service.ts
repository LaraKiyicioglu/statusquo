import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Goals} from "./goals";
import { Login} from "./login";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/goals';
const apiUrlLogin = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }


  getArticles(): Observable<Goals[]> {
    return this.http.get<Goals[]>(apiUrl)
      .pipe(
        tap(goal => console.log('fetched articles')),
        catchError(this.handleError('getGoals', []))
      );
  }

  getUsers(): Observable<Login[]> {
    return this.http.get<Login[]>(apiUrlLogin)
      .pipe(
        tap(goal => console.log('fetched Users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  addArticle(goal: Goals): Observable<Goals> {
    return this.http.post<Goals>(apiUrl, goal, httpOptions).pipe(
      tap((goal: Goals) => console.log(`added goal w/ id=${goal.id}`)),
      catchError(this.handleError<Goals>('addGoal'))
    );
  }
}


