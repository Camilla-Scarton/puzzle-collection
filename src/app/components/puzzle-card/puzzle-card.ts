import { Component, Input, ElementRef, AfterViewInit, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Puzzle } from '../../models/puzzle.model';
import { LayoutMode } from '../../services/layout.service';

@Component({
  selector: 'app-puzzle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puzzle-card.html',
  styles: `
    .star-half {
      background: linear-gradient(90deg, #facc15 50%, #4b5563 50%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `
})
export class PuzzleCard implements AfterViewInit {
  @Input({ required: true }) puzzle!: Puzzle;
  @Input() layoutMode: LayoutMode = 'grid';
  @Input() isActive = false;
  @Input() isFirst = false;

  // Random factor between -0.8 and 0.8
  randomFactor = (Math.random() * 1.6) - 0.8;
  maxSafeShiftPx = signal<number>(0);

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.calculateSafeShift();

    // Robust tracking of container size changes
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => this.calculateSafeShift());
      const container = this.el.nativeElement.querySelector('.group');
      if (container) observer.observe(container);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateSafeShift();
  }

  public calculateSafeShift() {
    if (this.layoutMode !== 'masonry') return;

    const img = this.el.nativeElement.querySelector('img');

    if (img && img.complete) {
      const screenWidth = window.innerWidth;
      const imgWidth = img.offsetWidth;
      // Use the actual window width to allow more scatter on large screens
      const edgeSlack = (screenWidth - imgWidth) / 2 - 30;
      // Also constraint the scatter to prevent images from being "disconnected"
      const imageConstraint = imgWidth / 2;

      this.maxSafeShiftPx.set(Math.max(0, Math.min(edgeSlack, imageConstraint)));
    } else if (img && !img.complete) {
      img.onload = () => this.calculateSafeShift();
    }
  }

  formatStatus(status: string): string {
    return status.replace('-', ' ');
  }

  getStarClass(star: number, rating: number): string {
    const r = rating || 0;
    if (r >= star) return 'text-yellow-400';
    if (r > star - 1) return 'star-half';
    return 'text-gray-600';
  }
}
