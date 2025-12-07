export interface Puzzle {
    id: string;
    title: string;
    brand: string;
    pieceCount: number;
    review?: string;
    rating?: number; // 1-5
    imageUrl: string;
    status: 'completed' | 'wishlist' | 'in-progress';
}
