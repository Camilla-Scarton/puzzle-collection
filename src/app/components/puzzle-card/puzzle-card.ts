import { Component, Input } from '@angular/core';
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
export class PuzzleCard {
  @Input({ required: true }) puzzle!: Puzzle;
  @Input() layoutMode: LayoutMode = 'grid';
  @Input() isActive = false;

  // Random offset for masonry layout (between -40% and 40%)
  randomOffset = Math.floor(Math.random() * 81) - 40;

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
