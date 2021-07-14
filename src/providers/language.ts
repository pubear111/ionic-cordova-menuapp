import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/storage";
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class LanguageService {

	language: string = 'en';

  constructor(
    private storage: Storage,
    private translate: TranslateService,
    public events: Events
    ) {
  	storage.ready().then(()=> {
  		storage.get('language').then(language => {
        this.language = language;
      }).catch(console.log);
  	});
  }

  setLanguage(language){
  	this.language = language;
  	this.storage.set('language', language);
    this.translate.use(language);
    this.events.publish('language:change');
  }

  getLanguage(){
  	return this.storage.get('language').then(language => {
      this.language = language;
      return this.language;
    }).catch(console.log);
  }

}
