import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Puzzle } from '../../models/puzzle.model';
import { LayoutMode } from '../../services/layout.service';

@Component({
  selector: 'app-puzzle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puzzle-card.html',
  styles: ``
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
}
