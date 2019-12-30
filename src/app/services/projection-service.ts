import { Injectable } from "@angular/core";
import ProjectionTransformer from "./projection-transformer";

@Injectable({
    providedIn: "root"
})
export class ProjectionService {
    constructor(private readonly transformer: ProjectionTransformer) {
    }

    public convert(from: string, to: string, coords: number[]): number[] {
        return this.transformer.transform(from, to, coords);
    }
}
