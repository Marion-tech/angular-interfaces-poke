import { Component, VERSION } from '@angular/core';
import { take } from 'rxjs';
import { PokeService } from './shared/services/poke.services';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(private pokeService: PokeService) {
    // this.pokeService
    //   .getAnObjectWithUrl('wartortle')
    //   .pipe(take(1))
    //   .subscribe((val) => console.log('getAnObjectWithUrl', val));
    // this.pokeService
    //   .getAnObjectWithUrlRandom('wartortle')
    //   .pipe(take(1))
    //   .subscribe((val) => console.log('getAnObjectWithUrlRandom', val));
    // this.pokeService
    //   .getAListByUrl()
    //   .pipe(take(1))
    //   .subscribe((val) => console.log('getAListByUrl', val));
  }
}
