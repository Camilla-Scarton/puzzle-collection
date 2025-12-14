import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Puzzle } from '../../models/puzzle.model';
import { LayoutMode } from '../../services/layout.service';

@Component({
  selector: 'app-puzzle-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Card Container -->
    <div 
      class="group relative overflow-hidden transition-all duration-300 h-full flex flex-col"
      [style.transform]="layoutMode === 'masonry' ? 'translateX(' + randomOffset + '%)' : ''"
      [class.bg-gray-800]="layoutMode === 'grid'"
      [class.rounded-xl]="layoutMode === 'grid'"
      [class.shadow-lg]="layoutMode === 'grid'"
      [class.hover:shadow-xl]="layoutMode === 'grid'"
      [class.hover:shadow-indigo-500/10]="layoutMode === 'grid'"
      [class.border]="layoutMode === 'grid'"
      [class.border-gray-700]="layoutMode === 'grid'"
      
      [class.rounded-lg]="layoutMode === 'masonry'"
      [class.-mt-32]="layoutMode === 'masonry'"
      [class.first:mt-0]="layoutMode === 'masonry'"
      [class.hover:z-50]="layoutMode === 'masonry'"
      [class.z-50]="layoutMode === 'masonry' && isActive"
      [class.relative]="layoutMode === 'masonry'"
    >
      
      <!-- Image Container -->
      <div 
        class="relative overflow-hidden bg-gray-900"
        [class.bg-transparent]="layoutMode === 'masonry'"
        [class.aspect-[4/3]]="layoutMode === 'grid'"
        [class.rounded-t-xl]="layoutMode === 'grid'"
        [class.rounded-lg]="layoutMode === 'masonry'"
        
        [class.w-fit]="layoutMode === 'masonry'"
        [class.mx-auto]="layoutMode === 'masonry'"
      >
        <img 
          [src]="puzzle.imageUrl" 
          [alt]="puzzle.title"
          class="object-cover transform transition-transform duration-700 mx-auto"
          [class.w-full]="layoutMode === 'grid'"
          [class.h-full]="layoutMode === 'grid'"
          
          [class.max-w-full]="layoutMode === 'masonry'"
          [class.w-auto]="layoutMode === 'masonry'"
          [class.h-auto]="layoutMode === 'masonry'"
          [class.max-h-[80vh]]="layoutMode === 'masonry'"
          
          [class.group-hover:scale-105]="layoutMode === 'grid'"
          [class.opacity-90]="layoutMode === 'grid'"
          [class.group-hover:opacity-100]="layoutMode === 'grid'"
          [class.opacity-100]="layoutMode === 'masonry'"
        />

        <!-- Masonry Overlay (Only visible on hover in masonry mode) -->
        <div *ngIf="layoutMode === 'masonry'" 
             class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <h3 class="font-bold text-white text-xl leading-tight mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{{ puzzle.title }}</h3>
          <p class="text-gray-300 text-sm font-medium mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{{ puzzle.brand }} &bull; {{ puzzle.pieceCount }} pcs</p>
          
          <div class="flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
             <span [ngClass]="{
              'bg-green-500/20 text-green-300 border-green-500/30': puzzle.status === 'completed',
              'bg-blue-500/20 text-blue-300 border-blue-500/30': puzzle.status === 'in-progress',
              'bg-purple-500/20 text-purple-300 border-purple-500/30': puzzle.status === 'wishlist'
            }" class="px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wider backdrop-blur-md border">
              {{ formatStatus(puzzle.status) }}
            </span>
            
             <!-- Rating -->
            <div *ngIf="puzzle.rating" class="flex items-center gap-1 text-yellow-400">
              <span class="text-sm font-bold">{{ puzzle.rating }}</span> <span class="text-yellow-400">★</span>
            </div>
          </div>
        </div>

        <!-- Grid Status Badge (Only for grid) -->
        <div *ngIf="layoutMode === 'grid'" class="absolute top-3 right-3">
          <span [ngClass]="{
            'bg-green-950/80 text-green-400 border-green-500/50': puzzle.status === 'completed',
            'bg-blue-950/80 text-blue-400 border-blue-500/50': puzzle.status === 'in-progress',
            'bg-purple-950/80 text-purple-400 border-purple-500/50': puzzle.status === 'wishlist'
          }" class="px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wider backdrop-blur-md border">
            {{ formatStatus(puzzle.status) }}
          </span>
        </div>
      </div>

      <!-- Grid Content (Only for grid) -->
      <div *ngIf="layoutMode === 'grid'" class="p-5 flex flex-col flex-grow">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-gray-100 text-lg leading-tight group-hover:text-indigo-400 transition-colors">
            {{ puzzle.title }}
          </h3>
        </div>
        
        <p class="text-gray-400 text-sm font-medium mb-3">{{ puzzle.brand }} &bull; {{ puzzle.pieceCount }} pcs</p>

        <div *ngIf="puzzle.review" class="mt-auto pt-3 border-t border-gray-700">
          <p class="text-gray-400 text-sm italic line-clamp-2">"{{ puzzle.review }}"</p>
        </div>

        <!-- Rating -->
        <div *ngIf="puzzle.rating" class="mt-3 flex items-center gap-1 text-yellow-400">
          <ng-container *ngFor="let star of [1,2,3,4,5]">
             <span class="text-lg" [class.text-gray-600]="star > (puzzle.rating || 0)">★</span>
          </ng-container>
        </div>
      </div>
    </div>
  `,
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
