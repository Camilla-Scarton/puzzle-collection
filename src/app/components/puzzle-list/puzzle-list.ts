import { Component, computed, inject, signal, effect, untracked } from '@angular/core';
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
  public isScrolling = false;

  // Computed
  visiblePuzzles = computed(() => {
    let result = this.puzzles().filter(p => {
      // Status Filter
      if (this.puzzleService.filterStatus() !== 'all' && p.status !== this.puzzleService.filterStatus()) {
        return false;
      }

      // Brand Filter
      if (this.puzzleService.filterBrand() !== 'all' && p.brand !== this.puzzleService.filterBrand()) {
        return false;
      }

      // Piece Count Filter
      const countFilter = this.puzzleService.filterPieceCount();
      if (countFilter !== 'all' && p.pieceCount !== Number(countFilter)) {
        return false;
      }

      return true;
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
    // Reset highlight when switching to masonry layout
    effect(() => {
      const mode = this.layout.layoutMode();
      if (mode === 'masonry') {
        // Use untracked to avoid triggering this effect when visiblePuzzles changes 
        // We only want to reset when the MODE specifically changes to masonry
        const firstPuzzle = untracked(() => this.visiblePuzzles()[0]);
        this.highlightedPuzzleId.set(firstPuzzle?.id || null);
      }
    }, { allowSignalWrites: true });

    // Auto-scroll Mini Map
    effect(() => {
      const targetId = this.highlightedPuzzleId();

      if (targetId) {
        const miniMapBtn = document.getElementById(`minimap-btn-${targetId}`);
        if (miniMapBtn) {
          // block: 'nearest' handles vertical, inline: 'nearest' handles horizontal
          miniMapBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
      }
    });
  }

  scrollToPuzzle(elementId: string) {
    // Extract ID from "puzzle-123" string
    const puzzleId = elementId.replace('puzzle-', '');
    this.highlightedPuzzleId.set(puzzleId);

    // Lock hover highlights during automated scroll
    this.isScrolling = true;

    requestAnimationFrame(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Unlock after a delay that matches the smooth scroll duration
        setTimeout(() => this.isScrolling = false, 800);
      } else {
        this.isScrolling = false;
      }
    });
  }
  // I will add the import in the top of file edit. 
  // Here only the method logic. 
}
