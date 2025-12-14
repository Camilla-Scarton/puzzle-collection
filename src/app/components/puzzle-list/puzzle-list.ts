import { Component, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { PuzzleService } from '../../services/puzzle.service';
import { LayoutService } from '../../services/layout.service';
import { PuzzleCard } from '../puzzle-card/puzzle-card';
import { Puzzle } from '../../models/puzzle.model';

type SortOption = 'newest' | 'title' | 'pieces_asc' | 'pieces_desc' | 'rating';

@Component({
  selector: 'app-puzzle-list',
  standalone: true,
  imports: [CommonModule, PuzzleCard, FormsModule],
  templateUrl: './puzzle-list.html',
  styles: ``
})
export class PuzzleList {
  public puzzleService = inject(PuzzleService);
  layout = inject(LayoutService);

  // State
  puzzles = toSignal(this.puzzleService.getPuzzles(), { initialValue: [] });
  sortOption = signal<SortOption>('newest');
  highlightedPuzzleId = signal<string | null>(null);

  // Computed
  visiblePuzzles = computed(() => {
    let result = this.puzzles().filter(p => {
      if (this.puzzleService.filterStatus() === 'all') return true;
      return p.status === this.puzzleService.filterStatus();
    });

    const sort = this.sortOption();
    return result.sort((a, b) => {
      switch (sort) {
        case 'title': return a.title.localeCompare(b.title);
        case 'pieces_asc': return a.pieceCount - b.pieceCount;
        case 'pieces_desc': return b.pieceCount - a.pieceCount;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return 0; // Newest (mock default)
      }
    });
  });

  constructor() {
    // Auto-scroll Mini Map
    effect(() => {
      const targetId = this.highlightedPuzzleId();

      if (targetId) {
        const miniMapBtn = document.getElementById(`minimap-btn-${targetId}`);
        if (miniMapBtn) {
          miniMapBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }

  scrollToPuzzle(elementId: string) {
    // Extract ID from "puzzle-123" string
    const puzzleId = elementId.replace('puzzle-', '');
    this.highlightedPuzzleId.set(puzzleId);

    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  // I will add the import in the top of file edit. 
  // Here only the method logic. 
}
