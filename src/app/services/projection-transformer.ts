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
        return proj4(from, to, coords);
    }

    private addProjDefs() {
        proj4.defs(
            "AGD66",
            `+proj=longlat +ellps=aust_SA +towgs84=${this.addDrift(
                projParameters.AGD66
            )} +no_defs +datum=none`
        );

        proj4.defs(
            "GDA94",
            `+proj=longlat +ellps=GRS80 +towgs84=${this.addDrift(
                projParameters.GDA94
            )} +no_defs +datum=none`
        );

        proj4.defs(
            "ANG",
            `+proj=longlat +a=6378339.78 +rf=294.26 +towgs84=${this.addDrift(
                projParameters.ANG)} +no_defs`
        );
    }

    private get epoch(): number {
        /*https://d28rz98at9flks.cloudfront.net/71433/71433.pdf*/
        const date = new Date();
        return Math.round(100 * (date.getFullYear() + date.getDay() / 365)) / 100;
    }

    private addDrift(params) {
        return driftRateParameters.DRIFT_RATE
            .map((d, i) => (d * (this.epoch - 2000) + params[i]).toFixed(3))
            .toString();
    }

}
