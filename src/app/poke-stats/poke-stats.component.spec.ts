import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeStatsComponent } from './poke-stats.component';

describe('PokeStatsComponent', () => {
  let component: PokeStatsComponent;
  let fixture: ComponentFixture<PokeStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
