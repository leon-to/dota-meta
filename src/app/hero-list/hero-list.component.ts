import { Component, OnInit } from '@angular/core';
import HEROES from './heroes.json';
import { RestAPIService } from './restapi.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.less']
})
export class HeroListComponent implements OnInit {
  heroesLookup = {};
  counterLookup = {};
  heroes;
  roles;
  counteringHeroes;
  enemies = [];
  enemyMap = {};
  filteredHeroes;
  selectedHero;
  searchText;
  locked;

  constructor(private RestAPIService: RestAPIService) { }

  ngOnInit() {
    this.locked = false;
    this.filteredHeroes = HEROES;
    this.RestAPIService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      // this.filteredHeroes = heroes;
      this.heroes.map((hero, i)=>{
        this.heroesLookup[hero.name] = {'id': i, 'img': hero.img};
      });
    });
    this.RestAPIService.getRoles().subscribe(roles => (this.roles = roles), ()=>{}, ()=>{console.log('done')});
    // console.log(this.heroes);
    // console.log(this.roles);
    // console.log(this.heroesLookup);
  }

  onSelect(hero){
    // console.log(this.counterLookup);
    // console.log(this.heroes);
    this.selectedHero = hero;
    console.log(this.locked);
    if(this.locked) return;

    if (this.enemies.includes(hero)){
      this.enemies = this.enemies.filter(item => item !== hero);
    }
    else if(this.enemies.length < 5)
      this.enemies.push(hero);
  }
  onLockClick(){
    if(this.locked){
      let idArr = this.enemies.map((hero, i) => this.heroesLookup[hero.name]['id']);
      let idStr = idArr.toString();
      this.RestAPIService.getCounteringHeroes(idStr).subscribe(counterLookup => {
        this.counterLookup = counterLookup;
        for(let hero of this.heroes){
          let countering = counterLookup[hero.name];
          if(countering.length === 0)
            hero['score'] = 0;
          else{
            hero['score'] = countering.length * 2;
            for(let c of countering)
              hero['score'] += c.content.length;
          }
        }
        this.filteredHeroes = Array.from(this.heroes).sort((a, b) => (b['score'] - a['score']));
        console.log(this.filteredHeroes);
      });

    }else{
      this.filteredHeroes = this.heroes;
    }
  }
  search(){
    var tmp = this.heroes.filter(hero => hero.name.toLowerCase().includes(this.searchText.toLowerCase()));
    if(this.locked){
      this.filteredHeroes = Array.from(tmp).sort((a, b) => (b['score'] - a['score']));
    }else{
      this.filteredHeroes = tmp;
    }
  }
}
