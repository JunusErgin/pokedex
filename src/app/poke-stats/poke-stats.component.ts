import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poke-stats',
  templateUrl: './poke-stats.component.html',
  styleUrls: ['./poke-stats.component.scss'],
})
export class PokeStatsComponent implements OnInit {
  @Input() pokemonInfo = {};

  constructor() {
  }

  ngOnInit(): void {
  }
}
