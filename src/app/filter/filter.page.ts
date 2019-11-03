import { NewsService } from './../services/news.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  public orderBy = [
    { name: 'Newest', value: 'newest' },
    { name: 'Oldest', value: 'oldest' },
    { name: 'Relevance', value: 'relevance' }
  ];
  public selectedOrderBy = {};
  public selectedDate = '';

  constructor(private modal: ModalController, private newsService: NewsService) { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

  filter() {
    const date = this.selectedDate.split('T');
    this.modal.dismiss({
      orderBy: this.selectedOrderBy,
      date: date[0]
    });
  }
}
