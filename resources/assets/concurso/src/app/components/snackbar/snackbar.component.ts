import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SnackBarDataModel } from 'src/app/models/snackbar-data.model';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  @Input() showSnacbar?:EventEmitter<SnackBarDataModel>;
  public selectionColor:string='bg-success';
  public seconds:number=3;
  public isShow:boolean=false;
  public isFade:boolean=false;
  public message:string=''

  constructor() { 
    
  }

  ngOnInit(): void {
    if (screen.width <= 768) {
      let el = document.querySelector('.snackbar') as HTMLDivElement;
      if (el) {
        el.style.bottom = '20px';
      }

    }
    this.showSnacbar?.subscribe(
      (value:SnackBarDataModel)=>{
        this.message=value.message;
        this.selectionColor = value.color;
        this.show();
        
      }
    );
    
  }
  show(){
    this.isShow=true;
    setTimeout(()=>{
      this.isShow=false;
      this.isFade=true;
      setTimeout(() => {
        this.isFade=false;
      }, 2000);
    },this.seconds*1000);
  }
  getColor(){
   
  }

}
