import { Injectable } from "@angular/core";
import ProjectionTransformer from "./projection-transformer";

@Injectable({
    providedIn: "root"
})
export class ProjectionService {
    constructor(private readonly transformer: ProjectionTransformer) {
    }

    public convert(coords: number[], from: string, to: string): string[] {
        return this.transformer.transform(from, to, coords);
    }
}
