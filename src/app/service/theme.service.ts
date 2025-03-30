import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false);

  constructor() {
    // Controlla se c'è un tema salvato nel localStorage
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme) {
      this.darkTheme.next(JSON.parse(savedTheme));
      this.applyTheme(JSON.parse(savedTheme));
    }
  }

  toggleTheme() {
    const currentTheme = this.darkTheme.value;
    this.darkTheme.next(!currentTheme);
    this.applyTheme(!currentTheme);
    localStorage.setItem('darkTheme', JSON.stringify(!currentTheme));
  }

  isDarkTheme() {
    return this.darkTheme.asObservable();
  }

  private applyTheme(isDark: boolean) {
    document.body.classList.toggle('dark-theme', isDark);
  }
} 