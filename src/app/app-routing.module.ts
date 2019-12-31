import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProjectionPickerComponent } from "./projection-picker/projection-picker.component";


const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "projection/:directive", component: ProjectionPickerComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
