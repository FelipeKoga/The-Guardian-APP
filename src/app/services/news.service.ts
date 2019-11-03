import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly APIKEY = '';
  private readonly APIGUARDIAN = 'https://content.guardianapis.com/search?page-size=25';

  constructor(private http: HttpClient) { }

  getAllNews(): Observable<any> {
    return this.http.get<any>(`${this.APIGUARDIAN}${this.APIKEY}`);
  }

  getNewsSection(section): Observable<any> {
    return this.http.get<any>(`${this.APIGUARDIAN}${this.APIKEY}&section=${section}`);
  }

  searchNews(search, section?): Observable<any> {
    if (section) {
      return this.http.get<any>(`${this.APIGUARDIAN}${this.APIKEY}&q=${search}&section=${section}`);
    }
    return this.http.get<any>(`${this.APIGUARDIAN}${this.APIKEY}&q=${search}`);
  }

  filterNews(filter, section?) {
    let search = '';
    if (filter.orderBy) {
      search = search + `&order-by=${filter.orderBy}`;
    }
    if (filter.date) {
      search = search + `&from-date=${filter.date}`;
    }


    if (section) {
      return this.http.get<any>(`${this.APIGUARDIAN}${this.APIKEY}${search}&section=${section}`);
    }
    return this.http.get<any>(`${this.APIGUARDIAN}${this.APIKEY}${search}`);
  }

  sections() {
    return this.http.get<any>(`https://content.guardianapis.com/sections?${this.APIKEY}`);
  }

}
