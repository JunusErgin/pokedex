import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pokemonList = [];
  pokemonAmount = 151;


  async ngOnInit() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${this.pokemonAmount}`;
    let resp = await fetch(url);
    this.pokemonList = (await resp.json())['results'];
    console.log(this.pokemonList);
  }


}
