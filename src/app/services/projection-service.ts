import { Injectable } from "@angular/core";

@Injectable({	
    providedIn: "root"	
})
export class ProjectionService {
    public convert(coords: string[], conversion: Conversion): string[] {
        return coords;
    }
}

export enum Conversion {
    "utm_wgs84" = "UTM to WGS84"
}