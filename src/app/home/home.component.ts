import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(
  ) { 
  }

  ngOnInit() {
    //this.handleSplitScreen();
  }

  /*
  handleSplitScreen() {
    //document.addEventListener('DOMContentLoaded', function() {
      const container = document.querySelector(".container");
      const left = container.querySelector(".left");
      const right = container.querySelector(".right");
      

      left.addEventListener("mouseenter", () => {
        container.classList.add("hover-left");
      });

      left.addEventListener("mouseleave", () => {
        container.classList.remove("hover-left");
      });

      right.addEventListener("mouseenter", () => {
        container.classList.add("hover-right");
      });
      
      right.addEventListener("mouseleave", () => {
        container.classList.remove("hover-right");
      });
    //});
     
  }*/
}
