import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for *ngIf on toggle button
import { RouterOutlet } from '@angular/router';
import { PuzzleList } from './components/puzzle-list/puzzle-list';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PuzzleList, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('puzzle-collection');
  layout = inject(LayoutService);
  showScrollTop = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop.set(window.scrollY > 300);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
