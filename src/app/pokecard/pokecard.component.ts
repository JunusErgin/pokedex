import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.scss']
})
export class PokecardComponent implements OnInit {
  @Input() pokemon = { name: 'Loading', url: 'https://pokeapi.co/api/v2/pokemon/1/' };
  pokemonInfo: any = {};
  bgColor = '#94C9AD';

  constructor() { }

  async ngOnInit() {
    // console.log('Pokemon is', this.pokemon);
    this.pokemon.name = capitalizeFirstLetter(this.pokemon.name);
    let resp = await fetch(this.pokemon.url);
    this.pokemonInfo = await resp.json();
    console.log(this.pokemonInfo);
    let type = this.pokemonInfo.types[0]['type']['name'];
    console.log(type);
    this.bgColor = this.getColorByType(type); 
  }


  getColorByType(type) {
    if (type == 'normal') return '#F2F2F2';
    if (type == 'grass') return '#94C9AD';
    if (type == 'fire') return '#F7786B';
    if (type == 'water') return '#58ABF6';
    if (type == 'bug') return '#0bba1c';




    return 'rgb(227 109 16)';
  }
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}