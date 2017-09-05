import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

// import { ItemsComponent } from "./item/items.component";
// import { ItemDetailComponent } from "./item/item-detail.component";
import { MedicineboxComponent } from "./medicinebox/medicinebox.component";
import { AdditemComponent } from "./additem/additem.component";

const routes: Routes = [
    { path: "", redirectTo: "/medicinebox", pathMatch: "full" },
    { path: "medicinebox", component: MedicineboxComponent },
    { path: "additem", component: AdditemComponent },
    { path: "additem/:id", component: AdditemComponent },
    // { path: "items", component: ItemsComponent },
    // { path: "item/:id", component: ItemDetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }