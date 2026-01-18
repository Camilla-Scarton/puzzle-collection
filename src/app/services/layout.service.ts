import { Injectable, signal } from '@angular/core';

export type LayoutMode = 'grid' | 'masonry';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    layoutMode = signal<LayoutMode>('grid');
    isAtBottom = signal(false);

    toggleLayout() {
        this.layoutMode.update(mode => mode === 'grid' ? 'masonry' : 'grid');
    }

    setLayout(mode: LayoutMode) {
        this.layoutMode.set(mode);
    }
}
