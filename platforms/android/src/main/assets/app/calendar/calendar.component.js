"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var calendar_1 = require("nativescript-telerik-ui-pro/calendar");
var CalendarComponent = (function () {
    function CalendarComponent() {
        this._viewMode = calendar_1.CalendarViewMode.Week;
    }
    CalendarComponent.prototype.ngOnInit = function () { };
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'calendar',
            moduleId: module.id,
            templateUrl: './calendar.component.html',
            styleUrls: ['./calendar.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGlFQUFxRjtBQVNyRjtJQUVDO1FBQ0MsSUFBSSxDQUFDLFNBQVMsR0FBRywyQkFBZ0IsQ0FBQyxJQUFJLENBQUM7SUFDdkMsQ0FBQztJQUVGLG9DQUFRLEdBQVIsY0FBYSxDQUFDO0lBTkYsaUJBQWlCO1FBUDdCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUN2QyxDQUFDOztPQUVXLGlCQUFpQixDQU83QjtJQUFELHdCQUFDO0NBQUEsQUFQRCxJQU9DO0FBUFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJhZENhbGVuZGFyLCBDYWxlbmRhclZpZXdNb2RlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9jYWxlbmRhclwiO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdjYWxlbmRhcicsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2NhbGVuZGFyLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0cHJpdmF0ZSBfdmlld01vZGU7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX3ZpZXdNb2RlID0gQ2FsZW5kYXJWaWV3TW9kZS5XZWVrO1xuXHQgfVxuXG5cdG5nT25Jbml0KCkgeyB9XG59Il19