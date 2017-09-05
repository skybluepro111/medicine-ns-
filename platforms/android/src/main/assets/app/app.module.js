"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var medicinebox_component_1 = require("./medicinebox/medicinebox.component");
var calendar_component_1 = require("./calendar/calendar.component");
var additem_component_1 = require("./additem/additem.component");
var angular_1 = require("nativescript-telerik-ui-pro/calendar/angular");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var date_component_1 = require("./date/date.component");
var time_component_1 = require("./time/time.component");
var angular_2 = require("nativescript-checkbox/angular");
var angular_3 = require("nativescript-radiobutton/angular");
var card_component_1 = require("./medicinebox/card/card.component");
var nativescript_ng2_fonticon_1 = require("nativescript-ng2-fonticon");
var services_1 = require("./services");
var forms_1 = require("nativescript-angular/forms");
var AppModule = (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent,
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_1.AppRoutingModule,
                angular_1.NativeScriptUICalendarModule,
                angular_2.TNSCheckBoxModule,
                angular_3.RadioButtonModule,
                forms_1.NativeScriptFormsModule,
                nativescript_ng2_fonticon_1.TNSFontIconModule.forRoot({
                    'mdi': 'material-design-icons.css'
                })
            ],
            declarations: [
                app_component_1.AppComponent,
                medicinebox_component_1.MedicineboxComponent,
                calendar_component_1.CalendarComponent,
                additem_component_1.AdditemComponent,
                date_component_1.DateComponent,
                time_component_1.TimeComponent,
                card_component_1.CardComponent
            ],
            providers: [
                modal_dialog_1.ModalDialogService,
                services_1.FirebaseService,
                services_1.UtilsService,
            ],
            entryComponents: [date_component_1.DateComponent, time_component_1.TimeComponent],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0MsNkVBQTJFO0FBQzNFLG9FQUFrRTtBQUNsRSxpRUFBK0Q7QUFDL0Qsd0VBQTRGO0FBQzVGLGtFQUEwRjtBQUMxRix3REFBc0Q7QUFDdEQsd0RBQXNEO0FBQ3RELHlEQUFrRTtBQUNsRSw0REFBb0U7QUFDcEUsb0VBQWtFO0FBQ2xFLHVFQUE4RDtBQUM5RCx1Q0FBMkQ7QUFDM0Qsb0RBQXFFO0FBdUNyRTtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUFyQ3JCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsOEJBQWdCO2dCQUNoQixzQ0FBNEI7Z0JBQzVCLDJCQUFpQjtnQkFDakIsMkJBQWlCO2dCQUNqQiwrQkFBdUI7Z0JBQ3ZCLDZDQUFpQixDQUFDLE9BQU8sQ0FBQztvQkFDdEIsS0FBSyxFQUFFLDJCQUEyQjtpQkFDckMsQ0FBQzthQUNMO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLDRDQUFvQjtnQkFDcEIsc0NBQWlCO2dCQUNqQixvQ0FBZ0I7Z0JBQ2hCLDhCQUFhO2dCQUNiLDhCQUFhO2dCQUNiLDhCQUFhO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGlDQUFrQjtnQkFDbEIsMEJBQWU7Z0JBQ2YsdUJBQVk7YUFDZjtZQUNELGVBQWUsRUFBRSxDQUFDLDhCQUFhLEVBQUUsOEJBQWEsQ0FBQztZQUMvQyxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztRQUNGOztVQUVFO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTWVkaWNpbmVib3hDb21wb25lbnQgfSBmcm9tIFwiLi9tZWRpY2luZWJveC9tZWRpY2luZWJveC5jb21wb25lbnRcIjtcbmltcG9ydCB7IENhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSBcIi4vY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBZGRpdGVtQ29tcG9uZW50IH0gZnJvbSBcIi4vYWRkaXRlbS9hZGRpdGVtLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlDYWxlbmRhck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vY2FsZW5kYXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi9kYXRlL2RhdGUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBUaW1lQ29tcG9uZW50IH0gZnJvbSBcIi4vdGltZS90aW1lLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVE5TQ2hlY2tCb3hNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhcic7XG5pbXBvcnQgeyBSYWRpb0J1dHRvbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1yYWRpb2J1dHRvbi9hbmd1bGFyJ1xuaW1wb3J0IHsgQ2FyZENvbXBvbmVudCB9IGZyb20gXCIuL21lZGljaW5lYm94L2NhcmQvY2FyZC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFROU0ZvbnRJY29uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nMi1mb250aWNvbic7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UsIFV0aWxzU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlDYWxlbmRhck1vZHVsZSxcbiAgICAgICAgVE5TQ2hlY2tCb3hNb2R1bGUsXG4gICAgICAgIFJhZGlvQnV0dG9uTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgVE5TRm9udEljb25Nb2R1bGUuZm9yUm9vdCh7XG4gICAgICAgICAgICAnbWRpJzogJ21hdGVyaWFsLWRlc2lnbi1pY29ucy5jc3MnXG4gICAgICAgIH0pXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBNZWRpY2luZWJveENvbXBvbmVudCxcbiAgICAgICAgQ2FsZW5kYXJDb21wb25lbnQsXG4gICAgICAgIEFkZGl0ZW1Db21wb25lbnQsXG4gICAgICAgIERhdGVDb21wb25lbnQsXG4gICAgICAgIFRpbWVDb21wb25lbnQsXG4gICAgICAgIENhcmRDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIEZpcmViYXNlU2VydmljZSxcbiAgICAgICAgVXRpbHNTZXJ2aWNlLFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbRGF0ZUNvbXBvbmVudCwgVGltZUNvbXBvbmVudF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbi8qXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXG4qL1xuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==