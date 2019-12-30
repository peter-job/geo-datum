import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectionService } from "../services/projection-service";
import { Router } from "@angular/router";
import { DataStorage } from "../providers/data-storage";

@Component({
    selector: "app-projection-picker",
    templateUrl: "./projection-picker.component.html"
})
export class ProjectionPickerComponent implements OnInit {
    public form: FormGroup;
    public projections = ["AGD66 TO WGS84", "OTHER"]

    constructor(
        private readonly service: ProjectionService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private dataStorage: DataStorage) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            from: ["", Validators.nullValidator],
        })

        this.form.valueChanges.subscribe(() => console.log(this.form.value))
    }

    public projectionSelected() {
        console.log("projection selected")
        console.log(this.form.value)
        this.dataStorage.storage = { from: this.projections[this.form.value.from] };
        console.log(this.dataStorage)
        this.router.navigate(["/"])

    }

    public back() {
        console.log("back")
        this.router.navigate(["/"])

    }
}
