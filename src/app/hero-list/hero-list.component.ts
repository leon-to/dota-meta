import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.less']
})
export class HeroListComponent implements OnInit {
  heroes = [
    {
      name:'Abaddon', 
      img:'assets/gif/heroes/abaddon.gif',
      roles: [
        {name: 'disabler', img: 'assets/img/disabler'},
        {name: 'initiator', img: 'assets/img/initiator'}
      ]
    },
    {name: 'Pudge', img:'assets/gif/heroes/pudge.gif'}
  ];
  enemies = [];
  enemyMap = {};
  selectedHero;

  constructor() { }

  ngOnInit() {
  }

  onSelect(hero){
    this.selectedHero = hero;

    if (this.enemies.includes(hero)){
      this.enemies = this.enemies.filter(item => item !== hero);
    }
    else
      this.enemies.push(hero);
  }
}
