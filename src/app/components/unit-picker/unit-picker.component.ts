import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DataStorage } from "../../providers/data-storage";
import UnitConfigs from "../../models/unit-configs";

@Component({
    selector: "app-unit-picker",
    templateUrl: "./unit-picker.component.html"
})
export class UnitPickerComponent implements OnInit {
    public form: FormGroup;
    public directive: string;
    public configs: any[];

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private dataStorage: DataStorage) {
            this.directive = this.route.snapshot.params.directive;
        }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            unit: [0, Validators.nullValidator],
        })
        this.form.valueChanges.subscribe(() => console.log(this.form.value))

        this.configs = Object.values(UnitConfigs);
    }

    public unitSelected() {
        console.log("unit selected")
        this.dataStorage.storage.config[`${this.directive}_unit`] = this.configs[this.form.value.unit];
        console.log(this.dataStorage)
        this.router.navigate(["/"])

    }

    public back() {
        this.router.navigate(["/"])
    }
}
