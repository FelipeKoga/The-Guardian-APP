import { FilterPage } from './../filter/filter.page';
import { News } from './../models/news';
import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { ModalController, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public news: News[];
  public isSearching: boolean;
  public emptyNews: boolean;
  public loading: boolean;
  public enable = false;
  public habilita = 'Desabilitar';
  public section = 'News';
  public sectionId = '';
  public orderBy = '';
  public publicationDate: '';
  public filter: any;


  constructor(
    private newsService: NewsService,
    private modal: ModalController,
    private menu: MenuController,
    private route: ActivatedRoute
  ) {
    this.publicationDate = '';
    this.filter = {};
    this.orderBy = '';
    this.news = [];
    this.isSearching = false;
    this.emptyNews = false;
    this.route.queryParams.subscribe(params => {
      this.section = '';
      this.sectionId = '';
      if (params.id) {
        this.section = params.title;
        this.sectionId = params.id;
        this.getNews(this.sectionId);
      } else {
        this.section = 'News';
        this.getNews(null);
      }

    });
  }

  toggleMenu() {
    this.menu.enable(this.enable, 'menu');
    this.habilita = !this.enable ? 'Habilitar' : 'Desabilitar';
    this.enable = !this.enable;
  }

  abrir() {
    this.menu.open();
  }

  private async getNews(section) {
    this.loading = true;
    this.news = [];
    let data;
    if (section) {
      data = await this.newsService.getNewsSection(section).toPromise();
    } else {
      data = await this.newsService.getAllNews().toPromise();
    }
    this.news = data.response.results;
    this.loading = false;
  }

  async searchNews(event) {
    this.emptyNews = false;
    if (event.target.value) {
      this.isSearching = true;
      this.news = [];
      let data;
      if (this.sectionId) {
        data = await this.newsService.searchNews(event.target.value, this.sectionId).toPromise();
      } else {
        data = await this.newsService.searchNews(event.target.value).toPromise();
      }
      this.isSearching = false;
      this.news = data.response.results;
      if (this.news.length === 0) {
        this.emptyNews = true;
      }
    } else {
      if (this.sectionId) {
        this.getNews(this.sectionId);
      } else {
        this.getNews(null);
      }
    }
  }

  async showFilters() {
    const pagina = await this.modal.create({
      component: FilterPage,
      componentProps: { }
    });
    await pagina.present();

    const { data } = await pagina.onDidDismiss();
    if (data) {
      this.loading = true;
      this.news = [];
      this.filter = data;
      let newsData;
      if (this.sectionId) {
        newsData = await this.newsService.filterNews(data, this.sectionId).toPromise();
      } else {
        newsData = await this.newsService.filterNews(data).toPromise();
      }
      this.publicationDate = data.date;
      this.orderBy = data.orderBy;

      this.loading = false;
      this.news = newsData.response.results;
    }
  }

  async closeFilter(filter) {
    if (filter === 2 && this.filter[this.orderBy] !== 'undefined') {
      delete this.filter.orderBy;
      this.orderBy = '';
    } else if (filter === 1 && this.filter[this.publicationDate] !== 'undefined') {
      delete this.filter.date;
      this.publicationDate = '';
    }

    console.log(this.filter);
    if (this.filter !== {}) {
      let newsData;
      if (this.sectionId) {
        newsData = await this.newsService.filterNews(this.filter, this.sectionId).toPromise();
      } else {
        newsData = await this.newsService.filterNews(this.filter).toPromise();
      }
      this.news = newsData.response.results;
    } else {
      if (this.sectionId) {
        this.getNews(this.sectionId);
      } else {
        this.getNews(null);
      }
    }
  }


}
