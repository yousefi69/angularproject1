import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "https://localhost:44312/api/User";
  constructor(private http: HttpClient) { }

  postuser(data:any) {
    return this.http.post<any>(this.baseurl + "/addUser",data);                
  }
  getuser() {
    return this.http.get<any>(this.baseurl +"/getUserList"); 
  }
  putuser(data: any, id: number) {
    return this.http.put<any>(this.baseurl +"/updateUser"+ id, data);
  }
  deleteuser( id: number) {
    return this.http.delete<any>(this.baseurl +"/Delete" + id);
  }
}
