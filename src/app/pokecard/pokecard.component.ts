import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
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
  @ViewChild('pokeType') pokeType: ElementRef;
  @ViewChild('pokeBackgroundCard') pokeBackgroundCard: ElementRef;
  position = { left: 0, top: 0 };
  constructor() {}

  async ngOnInit() {
    // console.log('Pokemon is', this.pokemon);
    this.pokemon.name = capitalizeFirstLetter(this.pokemon.name);
    let resp = await fetch(this.pokemon.url);
    this.pokemonInfo = await resp.json();
    console.log(this.pokemonInfo);
    let type = this.pokemonInfo.types[0]['type']['name'];
    // console.log(type);
    this.bgColor = this.getColorByType(type);
    this.updateCardPosition();
  }

  @HostListener('window:scroll', ['$event'])
  updateCardPosition() {
    if (!this.pokemonIsOpen) {
      this.position = this.pokemonCard.nativeElement.getBoundingClientRect();
      const left = this.position.left - 12;
      const top = this.position.top - 12;
      this.pokemonCardCopy.nativeElement.style = `left: ${left}px; top: ${top}px;`;
    }
  }

  ngAfterViewInit() {}

  getFirstType() {
    let type = '';
    try {
      type = this.pokemonInfo['types'][0].type['name'];
    } catch (e) {}

    return type;
  }
  open() {
    this.updateCardPosition();
    //console.log('open');
    this.pokeBackgroundCard.nativeElement.style.height = '0%';
    this.pokemonCard.nativeElement.style.opacity = '0';
    this.pokemonCardCopy.nativeElement.style.display = 'flex';
    this.pokemonCardCopy.nativeElement.style.backgroundColor = this.bgColor;
    this.pokemonIsOpen = true;
    setTimeout(() => {
      if (window.innerWidth < 1000) {
        this.openMobileView();
      } else {
        this.openDesktopView();
      }
    }, 10);
  }

  openMobileView() {
    this.pokemonCardCopy.nativeElement.style.width = '100%';
    this.pokemonCardCopy.nativeElement.style.top = '0px';
    this.pokemonCardCopy.nativeElement.style.left = '0%';
    this.pokemonCardCopy.nativeElement.style.right = '0%';
    this.pokemonCardCopy.nativeElement.style.height = '100vh';
    this.pokemonCardCopy.nativeElement.style.margin = '0';
    this.pokemonCardCopy.nativeElement.style.margin = '0';
    this.pokemonCardCopy.nativeElement.style.borderRadius = '0';

    this.pokeBackgroundCard.nativeElement.style.height = '80%';

    this.pokeType.nativeElement.style.top = '10%';
  }

  openDesktopView() {
    this.pokemonCardCopy.nativeElement.style.width = '35%';
    this.pokemonCardCopy.nativeElement.style.top = '24px';
    this.pokemonCardCopy.nativeElement.style.left = '50%';
    this.pokemonCardCopy.nativeElement.style.right = '15%';
    this.pokemonCardCopy.nativeElement.style.height = '90vh';
    this.pokeType.nativeElement.style.top = '10%';
    this.pokeBackgroundCard.nativeElement.style.height = '80%';
  }

  closeCard() {
    this.pokemonIsOpen = false;
    //console.log('Closing', this.position);
    this.pokemonCardCopy.nativeElement.style.width =
      this.position['width'] - 12 + 'px';
    this.pokemonCardCopy.nativeElement.style.top =
      this.position.top - 12 + 'px';
    this.pokemonCardCopy.nativeElement.style.left =
      this.position.left - 12 + 'px';
    this.pokemonCardCopy.nativeElement.style.right =
      this.position['right'] - 12 + 'px';
    this.pokemonCardCopy.nativeElement.style.height =
      this.position['height'] - 12 + 'px';
    this.pokeType.nativeElement.style.top = '25%';
    this.pokeBackgroundCard.nativeElement.style.height = '0%';
    this.pokeBackgroundCard.nativeElement.style.margin = '12px';
    this.pokemonCardCopy.nativeElement.style.borderRadius = '8px';


    setTimeout(() => {
      this.pokemonCard.nativeElement.style.opacity = '1';
      this.pokemonCardCopy.nativeElement.style.display = 'none';
    }, 225);
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
