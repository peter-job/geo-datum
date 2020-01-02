import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectionService } from "../../services/projection-service";
import { Router } from "@angular/router";
import { DataStorage } from "../../providers/data-storage";
import UnitConfigs from "../../models/unit-configs";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public easting: string;
    public form: FormGroup;
    public config: any;

    constructor(
        private readonly service: ProjectionService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private dataStorage: DataStorage) { }

    ngOnInit(): void {
        console.log("TEXT");

        this.form = this.formBuilder.group({
            from_datum: ["", Validators.nullValidator],
            from_x: ["", Validators.nullValidator],
            from_y: ["", Validators.nullValidator],
            to_datum: ["", Validators.nullValidator],
            to_x: ["", Validators.nullValidator],
            to_y: ["", Validators.nullValidator],
        })
        console.log("logging dataStorage")
        console.log(this.dataStorage)

        if (this.dataStorage.storage.form) {
            this.form.patchValue(this.dataStorage.storage.form)
        }

        if (!this.dataStorage.storage.config) {
            this.config = {
                to_unit: UnitConfigs.lat_long_degrees,
                from_unit: UnitConfigs.lat_long_degrees
            };
        }

        else {
            this.config = this.dataStorage.storage.config;
        }

        this.form.controls.from_x.setValue(151.0)
        this.form.controls.from_y.setValue(-33.0)
    }

    public convert() {
        console.log("converting...")
        const coords = [this.form.value.from_x, this.form.value.from_y];
        const from_datum = this.form.value.from_datum;
        const to_datum = this.form.value.to_datum;
        const results = this.service.convert(from_datum, to_datum, coords);
        console.log(results);
        this.form.controls.to_x.setValue(results[0])
        this.form.controls.to_y.setValue(results[1])
    }

    public openProjectionPicker(directive: string) {
        this.saveFormToStorage();
        this.router.navigate([`projection/${directive}`])
    }

    public openUnitPicker(directive: string) {
        this.saveFormToStorage();
        this.router.navigate([`unit/${directive}`])
    }

    private saveFormToStorage() {
        this.dataStorage.storage.config = this.config;
        this.dataStorage.storage.form = this.form.value;
    }
}
