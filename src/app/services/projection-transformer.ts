import driftRateParameters from "../models/drift-rate-parameters";
import projParameters from "../models/proj-parameters";
import { Injectable } from "@angular/core";
import proj4 from "proj4";

@Injectable({
    providedIn: "root"
})
export default class ProjectionTransformer {
    constructor() {
        this.addProjDefs();
    }

    public transform(from: string, to: string, coords: number[]) {
        let point = proj4.Point(coords[0], coords[1]);
        let source = proj4.Proj(from);
        let dest = proj4.Proj(to);
        return proj4(from, to, coords);
    }

    private addProjDefs() {
        proj4.defs(
            "AGD66",
            `+proj=longlat +ellps=aust_SA +towgs84=${this.addDrift(
                projParameters.AGD66, 2000
            )} +no_defs +datum=none`
        );

        proj4.defs(
            "GDA94",
            `+proj=longlat +ellps=GRS80 +towgs84=${this.addDrift(
                projParameters.GDA94, 2000
            )} +no_defs +datum=none`
        );

        proj4.defs(
            "ANG",
            `+proj=longlat +a=6378339.78 +rf=294.26 +towgs84=${this.addDrift(
                projParameters.ANG, 1950)} +no_defs`
        );

        proj4.defs(
            "GDA2020",
            `+proj=longlat +ellps=GRS80 +towgs84=${this.addDrift(
                projParameters.GDA2020, 2020
            )} +no_defs +datum=none`
        );

        proj4.defs("EPSG:28356",
            "+proj=utm +zone=56 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
        )

        proj4.defs("ANG_CART", 
            "+proj=tmerc +lat_0=-34 +lon_0=151 +a=6378339.78 +rf=294.26 +to_meter=0.91439841 +x_0=365759.36 +y_0=731518.73"
        )
    }

    private get epoch(): number {
        /*https://d28rz98at9flks.cloudfront.net/71433/71433.pdf*/
        const date = new Date();
        return Math.round(100 * (date.getFullYear() + date.getDay() / 365)) / 100;
    }

    private addDrift(params, fromEpoch) {
        return driftRateParameters.DRIFT_RATE
            .map((d, i) => (d * (this.epoch - fromEpoch) + params[i]).toFixed(3))
            .toString();
    }
}
