import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  sections = [];

  constructor(private newsService: NewsService, private router: Router) {
    this.getSections();
  }

  private async getSections() {
    const data = await this.newsService.sections().toPromise();
    this.sections = data.response.results;
  }

  navigate(section) {
    console.log(section);
    if (section) {
      this.router.navigate(['/menu/home'], {queryParams: {id: section.id, title: section.webTitle }});
    } else {
      this.router.navigate(['/menu/home']);
    }
  }



}
