import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse} from '@angular/common/http';
import { catchError, Observable ,throwError,map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  REST_API:string="https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";

  constructor(private httpClient:HttpClient) { }


  getAllData():Observable<any>{
    
    return this.httpClient.get(`${this.REST_API}`,{}).pipe(map((res:any)=>{
      return res||{}
     }),
     catchError(this.handleEroor)
     )
  }

  handleEroor(error:HttpErrorResponse){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      //handel client error
      errorMessage=error.error.message;
    }else{
      //server error
      errorMessage=`Error Code: ${error.status}\nMessage:${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {     
      return errorMessage;
    });
  }
}
