import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectionService, Conversion } from "../services/projection-service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public easting: string;
    public form: FormGroup;

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

        this.form.controls.easting.setValue("420400")
        this.form.controls.northing.setValue("849900")
    }

    public convert() {
        console.log("converting...")
        const coords = [this.form.controls.easting.value, this.form.controls.northing.value];
        const conversion = Conversion.utm_wgs84
        const results = this.service.convert(coords, conversion);
        console.log(results);
        this.form.controls.latitude.setValue("lat")
        this.form.controls.longitude.setValue("long")
    }
}
