import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Puzzle, FilterStatus } from '../models/puzzle.model';

@Injectable({
    providedIn: 'root'
})
export class PuzzleService {
    filterStatus = signal<FilterStatus>('all');
    filterBrand = signal<string>('all');
    filterPieceCount = signal<string | number>('all'); // 'all' or specific number

    private puzzles: Puzzle[] = [
        {
            id: '1',
            title: 'Van Gogh Flowers',
            brand: 'Ravensburger',
            pieceCount: 1000,
            review: 'Classic image, high quality pieces. A bit challenging with all the blues.',
            rating: 5,
            imageUrl: '/puzzles/Van Gogh Flowers.jpg',
            status: 'completed'
        },
        {
            id: '2',
            title: 'Oia',
            brand: 'Clementoni',
            pieceCount: 1500,
            review: 'Beautiful colors, but the sky was tricky.',
            rating: 4.5,
            imageUrl: '/puzzles/Oia.jpg',
            status: 'completed'
        },
        {
            id: '3',
            title: 'Ants and Mountains',
            brand: 'Educa',
            pieceCount: 2000,
            rating: 0,
            imageUrl: '/puzzles/Ants and mountains.jpg',
            status: 'wishlist'
        },
        {
            id: '4',
            title: 'Castle',
            brand: 'Ravensburger',
            pieceCount: 1000,
            rating: 3,
            review: 'Missing one piece :(',
            imageUrl: '/puzzles/Castle.jpg',
            status: 'completed'
        },
        {
            id: '5',
            title: 'Ships',
            brand: 'Heye',
            pieceCount: 1000,
            status: 'in-progress',
            imageUrl: '/puzzles/Ships.jpg',
        },
        {
            id: '6',
            title: 'Mountains and Sea',
            brand: 'Schmidt',
            pieceCount: 500,
            status: 'completed',
            imageUrl: '/puzzles/Mountains and sea.jpg', // Landscape
        },
        {
            id: '7',
            title: 'Amore & Psiche',
            brand: 'Cloudberries',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: '/puzzles/Amore & Psiche.jpg', // Portrait
        },
        {
            id: '8',
            title: 'Kitchen Cupboard',
            brand: 'Galison',
            pieceCount: 500,
            status: 'completed',
            rating: 4,
            imageUrl: '/puzzles/Kitchen cupboard.jpg', // Landscape
        },
        {
            id: '9',
            title: 'Silver Krypto',
            brand: 'Mudpuppy',
            pieceCount: 1000,
            status: 'in-progress',
            imageUrl: '/puzzles/Silver Krypto.jpg', // Square
        },
        {
            id: '10',
            title: 'Butterfly',
            brand: 'Cavallini & Co.',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: '/puzzles/Butterfly.jpg', // Vertical
        },
        {
            id: '11',
            title: 'City Plant',
            brand: 'Buffalo Games',
            pieceCount: 750,
            status: 'completed',
            rating: 5,
            review: 'So satisfying to put together!',
            imageUrl: '/puzzles/City plant.jpg', // Landscape
        },
        {
            id: '12',
            title: 'Waterfall',
            brand: 'Eurographics',
            pieceCount: 1000,
            status: 'in-progress',
            imageUrl: '/puzzles/Waterfall.jpg', // Landscape
        },
        {
            id: '13',
            title: 'Candies',
            brand: 'Ravensburger',
            pieceCount: 1500,
            status: 'wishlist',
            imageUrl: '/puzzles/Candies.jpg', // Landscape
        },
        {
            id: '14',
            title: 'Christmas',
            brand: 'Falcon',
            pieceCount: 1000,
            status: 'completed',
            rating: 3,
            imageUrl: '/puzzles/Christmas.jpg', // Portrait
        },
        {
            id: '15',
            title: 'Hobbies Cupboard',
            brand: 'Heye',
            pieceCount: 1000,
            status: 'in-progress',
            imageUrl: '/puzzles/Hobbies cupboard.jpg', // Landscape
        },
        {
            id: '16',
            title: 'Cat with Flower',
            brand: 'EeBoo',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: '/puzzles/Cat with flower.jpg', // Portrait
        },
        {
            id: '17',
            title: 'Chocolate',
            brand: 'Clementoni',
            pieceCount: 2000,
            status: 'completed',
            rating: 5,
            imageUrl: '/puzzles/Chocolate.jpg', // Landscape
        },
        {
            id: '18',
            title: 'Orange Cat',
            brand: 'Ravensburger',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: '/puzzles/Orange cat.jpg',
        },
        {
            id: '19',
            title: 'Cat & Christmas Lego',
            brand: 'Unknown',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: '/puzzles/Cat & Christmas Lego.jpg',
        },
        {
            id: '20',
            title: 'Cinque Terre',
            brand: 'Unknown',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: '/puzzles/Cinque Terre.jpg',
        },
        {
            id: '21',
            title: 'German Flower',
            brand: 'Unknown',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: '/puzzles/German flower.jpg',
        },
        {
            id: '22',
            title: 'Harry Potter Bus',
            brand: 'Unknown',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: '/puzzles/Harry Potter bus.jpg',
        },
        {
            id: '23',
            title: 'Mountain and Snow',
            brand: 'Unknown',
            pieceCount: 1000,
            status: 'wishlist',
            imageUrl: '/puzzles/Mountain and snow.jpg',
        }
    ];

    constructor() { }

    getPuzzles(): Observable<Puzzle[]> {
        return of(this.puzzles);
    }

    getPuzzleById(id: string): Observable<Puzzle | undefined> {
        return of(this.puzzles.find(p => p.id === id));
    }

    getBrands(): string[] {
        return [...new Set(this.puzzles.map(p => p.brand))].sort();
    }

    getPieceCounts(): number[] {
        return [...new Set(this.puzzles.map(p => p.pieceCount))].sort((a, b) => a - b);
    }
}
