import { Component, OnInit } from '@angular/core';
import HEROES from '../../assets/json/heroes.json';
import { RestAPIService } from './restapi.service';
import { AssetsService } from './assets.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.less']
})
export class HeroListComponent implements OnInit {
  heroes;
  counters;
  enemies = [];
  filteredHeroes;
  selectedHero;
  searchText;
  locked;

  constructor(
    private RestAPIService: RestAPIService,
    public AssetsService: AssetsService
  ) {}

  ngOnInit() {
    this.locked = false;
    this.counters = {};
    this.heroes = HEROES;
    this.filteredHeroes = this.heroes;
  }
  onSelect(hero){
    this.selectedHero = hero;
    if(this.locked) return;

    if (this.enemies.includes(hero)){
      this.enemies = this.enemies.filter(item => item !== hero);
    }
    else if(this.enemies.length < 5)
      this.enemies.push(hero);

    console.log(this.enemies);
  }
  onReset(){
    this.enemies = [];
    this.locked = false;
    this.filteredHeroes = this.heroes;
  }
  onLock(){
    if(this.locked){
      this.RestAPIService.getCounteringHeroes(this.enemies.map(enemy=>enemy.name)).subscribe(counters => {
        this.counters = counters;
        for(let hero of this.heroes){
          hero.score = 0;
          for(let enemy of this.enemies){
            if (hero.name in counters[enemy.name])
              hero.score += counters[enemy.name][hero.name].length;
          }
        }
        this.filteredHeroes = this.filteredHeroes.filter(hero => !this.enemies.includes(hero));
        this.filteredHeroes = Array.from(this.filteredHeroes).sort((a, b) => (b['score'] - a['score']));
      });
    }else{
      this.filteredHeroes = HEROES;
    }
  }
  onSearch(){
    var tmp = this.heroes.filter(hero => hero.name.toLowerCase().includes(this.searchText.toLowerCase()));
    if(this.locked){
      this.filteredHeroes = Array.from(tmp).sort((a, b) => (b['score'] - a['score']));
    }else{
      this.filteredHeroes = tmp;
    }
  }
}
