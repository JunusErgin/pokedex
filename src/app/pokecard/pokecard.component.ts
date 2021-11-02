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
  pokemonIsOpen = false;
  pokemonInfo: any = {};
  bgColor = '#94C9AD';
  @ViewChild('pokemonCard') pokemonCard: ElementRef;
  @ViewChild('pokemonCardCopy') pokemonCardCopy: ElementRef;
  position = { left: 0, top: 0 };
  constructor() { }

  async ngOnInit() {
    // console.log('Pokemon is', this.pokemon);
    this.pokemon.name = capitalizeFirstLetter(this.pokemon.name);
    let resp = await fetch(this.pokemon.url);
    this.pokemonInfo = await resp.json();
    console.log(this.pokemonInfo);
    let type = this.pokemonInfo.types[0]['type']['name'];
    // console.log(type);
    this.bgColor = this.getColorByType(type);

    this.position = this.pokemonCard.nativeElement.getBoundingClientRect();
    this.pokemonCardCopy.nativeElement.style = `left: ${this.position.left - 12}px; top: ${this.position.top - 12}px;`;
  }

  ngAfterViewInit() { }


  getFirstType() {
    let type = '';
    try {
      type = this.pokemonInfo['types'][0].type['name']
    } catch (e) {

    }

    return type;
  }
  open() {
    //console.log('open');
    this.pokemonCardCopy.nativeElement.style.display = 'flex';
    this.pokemonCardCopy.nativeElement.style.backgroundColor = this.bgColor;
    this.pokemonIsOpen = true;
    setTimeout(() => {
      this.pokemonCardCopy.nativeElement.style.width = '35%';
      this.pokemonCardCopy.nativeElement.style.top = '24px';
      this.pokemonCardCopy.nativeElement.style.left = '50%';
      this.pokemonCardCopy.nativeElement.style.right = '15%';
      this.pokemonCardCopy.nativeElement.style.height = '90vh';
    }, 10);

  }

  closeCard() {
    this.pokemonIsOpen = false;
    //console.log('Closing', this.position);
    this.pokemonCardCopy.nativeElement.style.width = this.position['width'] - 12 + 'px';
    this.pokemonCardCopy.nativeElement.style.top = this.position.top - 12 + 'px';
    this.pokemonCardCopy.nativeElement.style.left = this.position.left - 12 + 'px';
    this.pokemonCardCopy.nativeElement.style.right = this.position['right'] - 12 + 'px';
    this.pokemonCardCopy.nativeElement.style.height = this.position['height'] - 12 + 'px';

    setTimeout(() => {
      this.pokemonCardCopy.nativeElement.style.display = 'none';
    }, 5000);
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
