"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var TimeComponent = (function () {
    function TimeComponent(params, page) {
        var _this = this;
        this.params = params;
        this.page = page;
        this.page.on("unloaded", function () {
            _this.params.closeCallback();
        });
    }
    TimeComponent.prototype.ngOnInit = function () {
    };
    TimeComponent.prototype.onPickerLoaded = function (args) {
        var date = new Date();
        var timePicker = args.object;
        timePicker.hour = date.getHours();
        timePicker.minute = date.getMinutes();
    };
    TimeComponent.prototype.submit = function (args) {
        var timePicker = this.page.getViewById("timePicker");
        console.log("timepicker", timePicker.time);
        this.params.closeCallback(timePicker.time);
    };
    TimeComponent = __decorate([
        core_1.Component({
            selector: 'time',
            moduleId: module.id,
            templateUrl: './time.component.html',
            styleUrls: ['./time.component.css']
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams, page_1.Page])
    ], TimeComponent);
    return TimeComponent;
}());
exports.TimeComponent = TimeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUdsRCxnQ0FBK0I7QUFDL0Isa0VBQXNFO0FBU3RFO0lBRUMsdUJBQW9CLE1BQXlCLEVBQVUsSUFBVTtRQUFqRSxpQkFJQztRQUptQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFO1lBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsZ0NBQVEsR0FBUjtJQUVBLENBQUM7SUFFQSxzQ0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNuQixJQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2xCLElBQUksVUFBVSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVJLDhCQUFNLEdBQWIsVUFBYyxJQUFJO1FBQ2xCLElBQUksVUFBVSxHQUEyQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBYSxZQUFZLENBQUMsQ0FBQztRQUN6RixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUF0QlcsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbkMsQ0FBQzt5Q0FJMkIsZ0NBQWlCLEVBQWdCLFdBQUk7T0FGckQsYUFBYSxDQXVCekI7SUFBRCxvQkFBQztDQUFBLEFBdkJELElBdUJDO0FBdkJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVQaWNrZXIgfSBmcm9tIFwidWkvdGltZS1waWNrZXJcIjtcbmltcG9ydCB7IERhdGVQaWNrZXIgfSBmcm9tIFwidWkvZGF0ZS1waWNrZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3RpbWUnLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogJy4vdGltZS5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3RpbWUuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgVGltZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcblx0XHR0aGlzLnBhZ2Uub24oXCJ1bmxvYWRlZFwiLCAoKSA9PiB7XG5cdFx0XHR0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG5cdFx0fSk7XG5cdH1cblx0bmdPbkluaXQoKSB7XG5cdFx0XG5cdH1cblxuXHQgb25QaWNrZXJMb2FkZWQoYXJncykge1xuXHRcdGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgdGltZVBpY2tlciA9IDxUaW1lUGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aW1lUGlja2VyLmhvdXIgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHRpbWVQaWNrZXIubWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgfVxuXG5cdCBwdWJsaWMgc3VibWl0KGFyZ3MpIHtcblx0XHRsZXQgdGltZVBpY2tlcjogVGltZVBpY2tlciA9IDxUaW1lUGlja2VyPnRoaXMucGFnZS5nZXRWaWV3QnlJZDxUaW1lUGlja2VyPihcInRpbWVQaWNrZXJcIik7XG5cdFx0Y29uc29sZS5sb2coXCJ0aW1lcGlja2VyXCIsIHRpbWVQaWNrZXIudGltZSlcblx0ICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodGltZVBpY2tlci50aW1lKTtcblx0fVxufSJdfQ==