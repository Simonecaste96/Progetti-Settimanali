import { Component } from '@angular/core';
import { BaseDate } from 'src/app/models/base-date';
@Component({
  selector: 'app-ford',
  templateUrl: './ford.component.html',
  styleUrls: ['./ford.component.scss']
})
export class FordComponent {
  basedates!:BaseDate[];
  

  constructor() {
      this.getBaseDate().then((data) => {
          this.basedates = data;
      for (let i = 0; i < data.length; i++) {
        let brand = this.basedates[i].brand;
        let brandLogo = this.basedates[i].brandLogo;
        let model = this.basedates[i].model;
        let modelImage = this.basedates[i].modelImage;
        let year = this.basedates[i].year;
        let price = this.basedates[i].price;
        let avaible = this.basedates[i].available;
        
      }
      
        });
      
  }

  async getBaseDate() {
    
     const response = await fetch('../../assets/db.json');
      const data = await response.json();
      return data; 
    
  }
}
