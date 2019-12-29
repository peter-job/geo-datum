import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectionService } from "../services/projection-service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public easting: string;
    public form: FormGroup;
    public projections = ["AGD66 TO WGS84", "OTHER"]

    constructor(
        private readonly service: ProjectionService,
        private readonly formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            easting: ["", Validators.nullValidator],
            northing: ["", Validators.nullValidator],
            longitude: ["", Validators.nullValidator],
            latitude: ["", Validators.nullValidator]
        })

        this.form.controls.easting.setValue(151.0)
        this.form.controls.northing.setValue(-33.0)
    }

    public convert() {
        console.log("converting...")
        const coords = [this.form.controls.easting.value, this.form.controls.northing.value];
        const results = this.service.convert("AGD66", "WGS84", coords);
        console.log(results);
        this.form.controls.latitude.setValue(results[0])
        this.form.controls.longitude.setValue(results[1])
    }
}
