import { Component} from '@angular/core';
import { BaseDate } from 'src/app/models/base-date';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  basedates!:BaseDate[];
  basedatesRandom! : BaseDate[];
  

  constructor() {
      this.getBaseDate().then((data) => {
          this.basedates = data;
          this.random(data)
        });
      
  }

random(data:[])  {
 // Mescola l'array casualmente
 data.sort(() => Math.random() - 0.5);
  
 // Estrai i primi due elementi dall'array casualmente mescolato
 this.basedatesRandom = data.slice(0, 2);

}

  async getBaseDate() {
    
     const response = await fetch('../../assets/db.json');
      const data = await response.json();
      return data; 
    
  }
}




