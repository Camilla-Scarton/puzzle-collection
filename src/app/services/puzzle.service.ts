import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Puzzle } from '../models/puzzle.model';

@Injectable({
    providedIn: 'root'
})
export class PuzzleService {

    private puzzles: Puzzle[] = [
        {
            id: '1',
            title: 'The Starry Night',
            brand: 'Ravensburger',
            pieceCount: 1000,
            review: 'Classic image, high quality pieces. A bit challenging with all the blues.',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            status: 'completed'
        },
        {
            id: '2',
            title: 'Cinque Terre',
            brand: 'Clementoni',
            pieceCount: 1500,
            review: 'Beautiful colors, but the sky was tricky.',
            rating: 4,
            imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            status: 'completed'
        },
        {
            id: '3',
            title: 'Tropical Rainforest',
            brand: 'Educa',
            pieceCount: 2000,
            rating: 0,
            imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            status: 'wishlist'
        },
        {
            id: '4',
            title: 'Neuschwanstein Castle',
            brand: 'Ravensburger',
            pieceCount: 1000,
            rating: 3,
            review: 'Missing one piece :(',
            imageUrl: 'https://images.unsplash.com/photo-1599587216694-850d906169a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            status: 'completed'
        },
        {
            id: '5',
            title: 'Underwater World',
            brand: 'Heye',
            pieceCount: 1000,
            status: 'in-progress',
            imageUrl: 'https://images.unsplash.com/photo-1582967788606-a171f1080ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
            id: '6',
            title: 'Mountain Lake',
            brand: 'Schmidt',
            pieceCount: 500,
            status: 'completed',
            imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Landscape
        },
        {
            id: '7',
            title: 'Abstract Art',
            brand: 'Cloudberries',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80', // Portrait
        },
        {
            id: '8',
            title: 'Coffee Shop',
            brand: 'Galison',
            pieceCount: 500,
            status: 'completed',
            rating: 4,
            imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Landscape
        },
        {
            id: '9',
            title: 'Space Explorer',
            brand: 'Mudpuppy',
            pieceCount: 1000,
            status: 'in-progress',
            imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80', // Square
        },
        {
            id: '10',
            title: 'Vintage Maps',
            brand: 'Cavallini & Co.',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=900&q=80', // Vertical
        },
        {
            id: '11',
            title: 'Succulent Garden',
            brand: 'Buffalo Games',
            pieceCount: 750,
            status: 'completed',
            rating: 5,
            review: 'So satisfying to put together!',
            imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Landscape
        },
        {
            id: '12',
            title: 'Japanese Garden',
            brand: 'Eurographics',
            pieceCount: 1000,
            status: 'in-progress',
            imageUrl: 'https://images.unsplash.com/photo-1588667822007-6bcef39df9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80', // Landscape
        },
        {
            id: '13',
            title: 'Colorful Spices',
            brand: 'Ravensburger',
            pieceCount: 1500,
            status: 'wishlist',
            imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Landscape
        },
        {
            id: '14',
            title: 'Winter Cabin',
            brand: 'Falcon',
            pieceCount: 1000,
            status: 'completed',
            rating: 3,
            imageUrl: 'https://images.unsplash.com/photo-1518182170546-07fa6ee32bd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80', // Portrait
        },
        {
            id: '15',
            title: 'Retro Camera',
            brand: 'Heye',
            pieceCount: 1000,
            status: 'in-progress',
            imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Landscape
        },
        {
            id: '16',
            title: 'Wild Flowers',
            brand: 'EeBoo',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=900&q=80', // Portrait
        },
        {
            id: '17',
            title: 'City Lights',
            brand: 'Clementoni',
            pieceCount: 2000,
            status: 'completed',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Landscape
        }
    ];

    constructor() { }

    getPuzzles(): Observable<Puzzle[]> {
        return of(this.puzzles);
    }

    getPuzzleById(id: string): Observable<Puzzle | undefined> {
        return of(this.puzzles.find(p => p.id === id));
    }
}
