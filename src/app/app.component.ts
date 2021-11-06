import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  pokemonList = [];
  pokemonListFiltered = [];
  pokemonAmount = 6;
  query = new FormControl();

  async ngOnInit() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${this.pokemonAmount}`;
    let resp = await fetch(url);
    this.pokemonList = this.pokemonListFiltered = (await resp.json())[
      'results'
    ];
    console.log(this.pokemonList);

    this.subscribeQuery();
  }

  subscribeQuery() {
    this.query.valueChanges.subscribe((update: string) => {
      console.log('update', update, this.pokemonListFiltered);
      this.pokemonListFiltered = this.pokemonList.filter((p) =>
        p.name.toLowerCase().includes(update.toLowerCase())
      );
    });
  }
}
