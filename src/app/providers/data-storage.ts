import { Injectable } from '@angular/core';

@Injectable()
export class DataStorage {

    public storage: any;

    public constructor() { 
        this.storage = {}
    }

}