import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.scss'],
})
export class PokecardComponent implements OnInit, AfterViewInit {
  @Input() pokemon = {
    name: 'Loading',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  };
  pokemonInfo: any = {};
  bgColor = '#94C9AD';
  @ViewChild('pokemonCard') pokemonCard: ElementRef;
  @ViewChild('pokemonCardCopy') pokemonCardCopy: ElementRef;
  position = { left: 0, top: 0 };
  constructor() {}

  async ngOnInit() {
    // console.log('Pokemon is', this.pokemon);
    this.pokemon.name = capitalizeFirstLetter(this.pokemon.name);
    let resp = await fetch(this.pokemon.url);
    this.pokemonInfo = await resp.json();
    // console.log(this.pokemonInfo);
    let type = this.pokemonInfo.types[0]['type']['name'];
    // console.log(type);
    this.bgColor = this.getColorByType(type);
    console.log(
      '-----',
      this.pokemonCard.nativeElement.getBoundingClientRect()
    );
    this.position = this.pokemonCard.nativeElement.getBoundingClientRect();
    this.pokemonCardCopy.nativeElement.style = `left: ${this.position.left - 12}px; top: ${this.position.top - 12}px;`;
  }

  ngAfterViewInit() {}

  open(){
    console.log('open');
    this.pokemonCardCopy.nativeElement.style.display = 'flex';
    this.pokemonCardCopy.nativeElement.style.backgroundColor = this.bgColor;
    setTimeout( () => {
      this.pokemonCardCopy.nativeElement.style.width = '70%';
      this.pokemonCardCopy.nativeElement.style.top = '24px';
      this.pokemonCardCopy.nativeElement.style.left = '15%';
      this.pokemonCardCopy.nativeElement.style.right = '15%';
      this.pokemonCardCopy.nativeElement.style.height = '90vh';
    }, 10);
    
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
