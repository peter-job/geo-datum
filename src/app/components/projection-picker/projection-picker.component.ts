import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectionService } from "../../services/projection-service";
import { Router, ActivatedRoute } from "@angular/router";
import { DataStorage } from "../../providers/data-storage";

@Component({
    selector: "app-projection-picker",
    templateUrl: "./projection-picker.component.html"
})
export class ProjectionPickerComponent implements OnInit {
    public form: FormGroup;
    public directive: string;
    public projections = ["AGD66", "GDA94", "ANG", "WGS84"]

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private dataStorage: DataStorage) {
            this.directive = this.route.snapshot.params.directive;
        }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            projection: [0, Validators.nullValidator],
        })

        this.form.valueChanges.subscribe(() => console.log(this.form.value))
    }

    public projectionSelected() {
        console.log("projection selected")
        this.dataStorage.storage.form[`${this.directive}_datum`] = this.projections[this.form.value.projection];
        console.log(this.dataStorage)
        this.router.navigate(["/"])

    }

    public back() {
        this.router.navigate(["/"])
    }
}
