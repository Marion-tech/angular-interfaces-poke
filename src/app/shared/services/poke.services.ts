import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import {
  IAbility,
  IAbilityDetail,
  IAbilityList,
  IAbilityName,
  IAbilityPokemon,
  IExo,
  IPokeList,
  IPokemon,
  IPokemonDetail,
  IPokemonShortDetail,
  IPokemonType,
  IPokemonStat,
  IExo2,
  IIndice,
} from '../models/poke.interface';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private httpClient: HttpClient) {}

  public getAnObjectWithUrl(name: string): Observable<IPokemonStat[]> {
    return this.httpClient
      .get<IPokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(
        map((value: IPokemonDetail) => {
          return {
            ability: value.abilities.map((ability: IAbility) => {
              return ability.name;
            }),
            name: value.name,
            stats: value.stats,
            types: value.types,
            indices: value.game_indices
              .map((val) => val.version.name)
              .join(', '),
          };
        }),
        map((value: IExo) => {
          return {
            stats: value.stats,
            types: value.types.sort((a, b) => a.slot - b.slot),
          };
        }),
        map((value: IExo2) => {
          return value.stats.filter(
            (stat: IPokemonStat) => stat.stat.name === 'hp'
          );
        })
      );
  }

  public getAnObjectWithUrlRandom(name: string): Observable<IExo> {
    return this.httpClient
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(
        map((value: IPokemonDetail) => {
          return {
            ability: value.abilities.map((ability: IAbility) => {
              return ability.name;
            }),
            name: value.name,
            stats: value.stats,
            types: value.types,
            indices: value.game_indices
              .map((val: IIndice) => val.version.name)
              .join(', '),
          } as IExo;
        }),
        map((value: IExo) => {
          return {
            ...value, // héritage de l'interface parent
            types: value.types.sort((a, b: IPokemonType) => a.slot - b.slot),
            stats: value.stats.sort(
              (a, b: IPokemonStat) => a.base_stat - b.base_stat
            ),
          };
        })
      );
  }

  public getAListByUrl(): Observable<IPokemon[]> {
    return this.httpClient
      .get<IPokeList>(`https://pokeapi.co/api/v2/pokemon/`)
      .pipe(
        map((value: IPokeList) => {
          return value.results;
        }),
        map((value: IPokemon[]) => {
          return value.filter((val: IPokemon) => val.name.includes('a'));
        })
      );
  }
}
