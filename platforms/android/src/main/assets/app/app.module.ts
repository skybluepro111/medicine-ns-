import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { MedicineboxComponent } from "./medicinebox/medicinebox.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { AdditemComponent } from "./additem/additem.component";
import { NativeScriptUICalendarModule } from "nativescript-telerik-ui-pro/calendar/angular";
import { ModalDialogService, ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DateComponent } from "./date/date.component";
import { TimeComponent } from "./time/time.component";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { RadioButtonModule } from 'nativescript-radiobutton/angular'
import { CardComponent } from "./medicinebox/card/card.component";
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';
import { FirebaseService, UtilsService } from "./services";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUICalendarModule,
        TNSCheckBoxModule,
        RadioButtonModule,
        NativeScriptFormsModule,
        TNSFontIconModule.forRoot({
            'mdi': 'material-design-icons.css'
        })
    ],
    declarations: [
        AppComponent,
        MedicineboxComponent,
        CalendarComponent,
        AdditemComponent,
        DateComponent,
        TimeComponent,
        CardComponent
    ],
    providers: [
        ModalDialogService,
        FirebaseService,
        UtilsService,
    ],
    entryComponents: [DateComponent, TimeComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
