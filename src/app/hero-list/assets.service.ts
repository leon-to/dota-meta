import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AssetsService{
    of(assetName){
        return `./assets/webp/${assetName}.webp`;
    }
}