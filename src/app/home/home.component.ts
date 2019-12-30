import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectionService } from "../services/projection-service";
import { Router } from "@angular/router";
import { DataStorage } from "../providers/data-storage";

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
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private dataStorage: DataStorage) { }

    ngOnInit(): void {
        console.log("TEXT");

        this.form = this.formBuilder.group({
            from: ["", Validators.nullValidator],
            easting: ["", Validators.nullValidator],
            northing: ["", Validators.nullValidator],
            longitude: ["", Validators.nullValidator],
            latitude: ["", Validators.nullValidator]
        })
        console.log("logging dataStorage")
        console.log(this.dataStorage)

        if (this.dataStorage.storage) {
            this.form.patchValue(this.dataStorage.storage)
        }

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

    public openProjectionPicker() {
        this.router.navigate(["projection/from"])
    }
}
