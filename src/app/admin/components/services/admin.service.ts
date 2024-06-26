import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASE_URL = "http://localhost:9595/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor (private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASE_URL + `api/admin/category`, categoryDto, {
      headers: this.createAuthorizationHeader(),
    });
  }


  getAllCategories(): Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/categories', {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/admin/product', productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = UserStorageService.getToken();
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

}