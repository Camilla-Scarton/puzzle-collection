export type PuzzleStatus = 'completed' | 'in-progress' | 'wishlist';

export interface Puzzle {
    id: string;
    title: string;
    brand: string;
    pieceCount: number;
    imageUrl: string;
    status: PuzzleStatus;
    rating?: number; // 1-5
    review?: string;
}

export type FilterStatus = 'all' | PuzzleStatus;
