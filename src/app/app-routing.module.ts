import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProjectionPickerComponent } from "./components/projection-picker/projection-picker.component";
import { UnitPickerComponent } from "./components/unit-picker/unit-picker.component";


const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "projection/:directive", component: ProjectionPickerComponent},
    { path: "unit/:directive", component: UnitPickerComponent}

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
