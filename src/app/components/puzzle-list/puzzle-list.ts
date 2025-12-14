import { Component, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { PuzzleService } from '../../services/puzzle.service';
import { LayoutService } from '../../services/layout.service';
import { PuzzleCard } from '../puzzle-card/puzzle-card';
import { Puzzle } from '../../models/puzzle.model';

type SortOption = 'newest' | 'title' | 'pieces_asc' | 'pieces_desc' | 'rating';
type FilterStatus = 'all' | 'completed' | 'in-progress' | 'wishlist';

@Component({
  selector: 'app-puzzle-list',
  standalone: true,
  imports: [CommonModule, PuzzleCard, FormsModule],
  template: `
    <div *ngIf="layout.layoutMode() === 'grid'" class="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700/50">
      <!-- Filter -->
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <label class="text-sm font-medium text-gray-400 whitespace-nowrap">Status:</label>
        <div class="relative w-full sm:w-48">
          <select 
            [ngModel]="filterStatus()" 
            (ngModelChange)="filterStatus.set($event)"
            class="w-full appearance-none bg-gray-900 border border-gray-700 text-gray-300 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-900 focus:border-indigo-500 transition-colors cursor-pointer text-sm"
          >
            <option value="all">All Puzzles</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="wishlist">Wishlist</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <!-- Sort -->
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <label class="text-sm font-medium text-gray-400 whitespace-nowrap">Sort by:</label>
        <div class="relative w-full sm:w-48">
          <select 
            [ngModel]="sortOption()" 
            (ngModelChange)="sortOption.set($event)"
            class="w-full appearance-none bg-gray-900 border border-gray-700 text-gray-300 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-900 focus:border-indigo-500 transition-colors cursor-pointer text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="title">Title (A-Z)</option>
            <option value="pieces_desc">Pieces (Most)</option>
            <option value="pieces_asc">Pieces (Least)</option>
            <option value="rating">Rating</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div *ngIf="layout.layoutMode() === 'grid'" class="mb-4 text-sm text-gray-400 font-medium">
      Showing {{ visiblePuzzles().length }} puzzles
    </div>

    <div 
      [class.grid]="layout.layoutMode() === 'grid'"
      [class.grid-cols-1]="layout.layoutMode() === 'grid'"
      [class.md:grid-cols-2]="layout.layoutMode() === 'grid'"
      [class.lg:grid-cols-3]="layout.layoutMode() === 'grid'"
      [class.gap-8]="layout.layoutMode() === 'grid'"
      
      [class.columns-1]="layout.layoutMode() === 'masonry'"
      [class.gap-6]="layout.layoutMode() === 'masonry'"
      [class.max-w-3xl]="layout.layoutMode() === 'masonry'"
      [class.mx-auto]="layout.layoutMode() === 'masonry'"
      [class.pb-24]="layout.layoutMode() === 'masonry'"
    >
      <app-puzzle-card 
        *ngFor="let puzzle of visiblePuzzles()" 
        [id]="'puzzle-' + puzzle.id"
        [puzzle]="puzzle"
        [layoutMode]="layout.layoutMode()"
        [isActive]="highlightedPuzzleId() === puzzle.id"
        (mouseenter)="highlightedPuzzleId.set(puzzle.id)"
        class="block break-inside-avoid transition-all duration-500 ease-out"
        [class.h-full]="layout.layoutMode() === 'grid'"
        
        [class.-mt-12]="layout.layoutMode() === 'masonry'"
        [class.first:mt-0]="layout.layoutMode() === 'masonry'"
        [class.hover:z-50]="layout.layoutMode() === 'masonry'"
        [class.relative]="layout.layoutMode() === 'masonry'"
      ></app-puzzle-card>
      
      <!-- Empty State -->
      <div *ngIf="visiblePuzzles().length === 0" class="col-span-full py-12 text-center text-gray-500">
        <div class="mb-2 text-4xl">🧩</div>
        <p>No puzzles found matching your criteria.</p>
      </div>
    </div>

    <!-- Mini Map Sidebar (Masonry Only) -->
    <div *ngIf="layout.layoutMode() === 'masonry' && visiblePuzzles().length > 0" 
         class="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 max-h-[80vh] overflow-y-auto hidden xl:flex p-2 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl">
      <button 
        *ngFor="let puzzle of visiblePuzzles()" 
        (click)="scrollToPuzzle('puzzle-' + puzzle.id)"
        [id]="'minimap-btn-' + puzzle.id"
        class="relative group w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 focus:outline-none focus:border-indigo-500"
        [class.border-transparent]="highlightedPuzzleId() !== puzzle.id"
        [class.border-indigo-500]="highlightedPuzzleId() === puzzle.id"
        title="{{ puzzle.title }}"
      >
        <img [src]="puzzle.imageUrl" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" [alt]="puzzle.title">
      </button>
    </div>
  `,
  styles: ``
})
export class PuzzleList {
  private puzzleService = inject(PuzzleService);
  layout = inject(LayoutService);

  // State
  puzzles = toSignal(this.puzzleService.getPuzzles(), { initialValue: [] });
  filterStatus = signal<FilterStatus>('all');
  sortOption = signal<SortOption>('newest');
  highlightedPuzzleId = signal<string | null>(null);

  // Computed
  visiblePuzzles = computed(() => {
    let result = this.puzzles().filter(p => {
      if (this.filterStatus() === 'all') return true;
      return p.status === this.filterStatus();
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
