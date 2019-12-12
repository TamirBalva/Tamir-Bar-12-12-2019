import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private vision:string = "vision_clear";

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  }

  
  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
      this.vision = "vision_clear";
    } else {
      this.themeService.setDarkTheme();
      this.vision = "vision_tinted";
    }
  }

}
