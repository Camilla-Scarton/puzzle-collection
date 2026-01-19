import { Component, inject, signal, HostListener, AfterViewInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PuzzleList } from './components/puzzle-list/puzzle-list';
import { LayoutService } from './services/layout.service';
import { PuzzleService } from './services/puzzle.service';
import { FilterStatus } from './models/puzzle.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PuzzleList, CommonModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('puzzle-collection');
  layout = inject(LayoutService);
  puzzleService = inject(PuzzleService);
  showScrollTop = signal(false);

  constructor() {
    // Re-check bottom state whenever layout changes
    effect(() => {
      this.layout.layoutMode();
      // Use small timeout to let masonry calculate its layout after mode switch
      setTimeout(() => this.checkScrollBottom(), 100);
    });

    // Also re-check when filters change as they affect page height
    effect(() => {
      this.puzzleService.filterStatus();
      this.puzzleService.filterBrand();
      this.puzzleService.filterPieceCount();
      setTimeout(() => this.checkScrollBottom(), 100);
    });
  }

  ngAfterViewInit() {
    // Initial check
    setTimeout(() => this.checkScrollBottom(), 200);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop.set(window.scrollY > 300);
    this.checkScrollBottom();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScrollBottom();
  }

  private checkScrollBottom() {
    // Detect if user is at the bottom of the page
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    // Use offsetHeight of body/html or scrollHeight to be robust
    const documentHeight = document.documentElement.scrollHeight;

    // A small threshold (20px) to consider "at bottom"
    const atBottom = (windowHeight + scrollY) >= (documentHeight - 20);
    this.layout.isAtBottom.set(atBottom);
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
