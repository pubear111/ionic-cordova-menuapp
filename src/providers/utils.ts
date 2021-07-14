import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Utils {

  constructor(
    public http: Http
  ) {
    
  }

  convertHex(givenHex, transparency?){
  	let c;
    let hex = '#'+givenHex;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x'+c.join('');
      if(transparency){
        return 'rgba('+[(c>>16)&255, (c>>8)&255, (c&255)].join(',')+','+transparency+')';
      }else{
        return 'rgba('+[(c>>16)&255, (c>>8)&255, (c&255)].join(',')+',.9)';
      }
    }else{
    	return 'rgba(33, 40, 59, .9)';
    }
  }

}
