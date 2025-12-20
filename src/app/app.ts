import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PuzzleList } from './components/puzzle-list/puzzle-list';
import { LayoutService } from './services/layout.service';
import { PuzzleService } from './services/puzzle.service';
import { FilterStatus } from './models/puzzle.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PuzzleList, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('puzzle-collection');
  layout = inject(LayoutService);
  puzzleService = inject(PuzzleService);
  showScrollTop = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop.set(window.scrollY > 300);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setFilter(status: FilterStatus) {
    this.puzzleService.filterStatus.set(status);
    this.puzzleService.filterBrand.set('all');
    this.puzzleService.filterPieceCount.set('all');
    this.scrollToTop();
  }

  toggleLayout() {
    this.layout.toggleLayout();
    this.scrollToTop();
  }
}
