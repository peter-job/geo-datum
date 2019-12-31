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

        this.form.controls.from_x.setValue(151.0)
        this.form.controls.from_y.setValue(-33.0)
    }

    public convert() {
        console.log("converting...")
        const coords = [this.form.controls.from_x.value, this.form.controls.from_y.value];
        const results = this.service.convert("AGD66", "WGS84", coords);
        console.log(results);
        this.form.controls.to_x.setValue(results[0])
        this.form.controls.to_y.setValue(results[1])
    }

    public openProjectionPicker(directive: string) {
        this.dataStorage.storage.form = this.form.value;
        this.router.navigate([`projection/${directive}`])
    }
}
