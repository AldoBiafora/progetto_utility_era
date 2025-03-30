import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isDarkTheme: boolean = false;
  @Input() sidenav!: MatSidenav;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.isDarkTheme().subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }
} 