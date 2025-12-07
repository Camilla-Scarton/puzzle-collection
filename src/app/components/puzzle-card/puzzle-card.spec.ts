import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleCard } from './puzzle-card';

describe('PuzzleCard', () => {
  let component: PuzzleCard;
  let fixture: ComponentFixture<PuzzleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
