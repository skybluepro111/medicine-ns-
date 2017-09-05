"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var page_1 = require("ui/page");
var DateComponent = (function () {
    function DateComponent(params, page) {
        var _this = this;
        this.params = params;
        this.page = page;
        this.currentdate = new Date(params.context);
        this.page.on("unloaded", function () {
            // using the unloaded event to close the modal when there is user interaction
            // e.g. user taps outside the modal page
            _this.params.closeCallback();
        });
    }
    DateComponent.prototype.ngOnInit = function () {
        var datePicker = this.page.getViewById("datePicker");
        datePicker.year = this.currentdate.getFullYear();
        datePicker.month = this.currentdate.getMonth() + 1;
        datePicker.day = this.currentdate.getDate();
        datePicker.minDate = new Date(1975, 0, 29);
        datePicker.maxDate = new Date(2045, 4, 12);
    };
    DateComponent.prototype.submit = function () {
        var datePicker = this.page.getViewById("datePicker");
        console.log("DATEPICK", datePicker.date);
        this.params.closeCallback(datePicker.date);
    };
    DateComponent = __decorate([
        core_1.Component({
            selector: 'date',
            moduleId: module.id,
            templateUrl: './date.component.html',
            styleUrls: ['./date.component.css']
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams, page_1.Page])
    ], DateComponent);
    return DateComponent;
}());
exports.DateComponent = DateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxrRUFBc0U7QUFFdEUsZ0NBQStCO0FBUy9CO0lBSUUsdUJBQW9CLE1BQXlCLEVBQVUsSUFBVTtRQUFqRSxpQkFRQztRQVJtQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFDaEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFO1lBQ3hCLDZFQUE2RTtZQUM3RSx3Q0FBd0M7WUFDeEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0MsSUFBSSxVQUFVLEdBQTJCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFhLFlBQVksQ0FBQyxDQUFDO1FBQ3pGLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqRCxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSw4QkFBTSxHQUFiO1FBQ0MsSUFBSSxVQUFVLEdBQTJCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFhLFlBQVksQ0FBQyxDQUFDO1FBQ3pGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQTNCVSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuQyxDQUFDO3lDQU00QixnQ0FBaUIsRUFBZ0IsV0FBSTtPQUp0RCxhQUFhLENBNEJ4QjtJQUFELG9CQUFDO0NBQUEsQUE1QkYsSUE0QkU7QUE1Qlcsc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInVpL2RhdGUtcGlja2VyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnZGF0ZScsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiAnLi9kYXRlLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vZGF0ZS5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBEYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwdWJsaWMgY3VycmVudGRhdGU6IERhdGU7XG5cdFxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRkYXRlID0gbmV3IERhdGUocGFyYW1zLmNvbnRleHQpO1xuXHRcblx0XHRcdHRoaXMucGFnZS5vbihcInVubG9hZGVkXCIsICgpID0+IHtcblx0XHRcdFx0Ly8gdXNpbmcgdGhlIHVubG9hZGVkIGV2ZW50IHRvIGNsb3NlIHRoZSBtb2RhbCB3aGVuIHRoZXJlIGlzIHVzZXIgaW50ZXJhY3Rpb25cblx0XHRcdFx0Ly8gZS5nLiB1c2VyIHRhcHMgb3V0c2lkZSB0aGUgbW9kYWwgcGFnZVxuXHRcdFx0XHR0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFxuXHRcdG5nT25Jbml0KCkge1xuXHRcdFx0bGV0IGRhdGVQaWNrZXI6IERhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQ8RGF0ZVBpY2tlcj4oXCJkYXRlUGlja2VyXCIpO1xuXHRcdFx0ZGF0ZVBpY2tlci55ZWFyID0gdGhpcy5jdXJyZW50ZGF0ZS5nZXRGdWxsWWVhcigpO1xuXHRcdFx0ZGF0ZVBpY2tlci5tb250aCA9IHRoaXMuY3VycmVudGRhdGUuZ2V0TW9udGgoKSArIDE7XG5cdFx0XHRkYXRlUGlja2VyLmRheSA9IHRoaXMuY3VycmVudGRhdGUuZ2V0RGF0ZSgpO1xuXHRcdFx0ZGF0ZVBpY2tlci5taW5EYXRlID0gbmV3IERhdGUoMTk3NSwgMCwgMjkpO1xuXHRcdFx0ZGF0ZVBpY2tlci5tYXhEYXRlID0gbmV3IERhdGUoMjA0NSwgNCwgMTIpO1xuXHRcdH1cblx0XG5cdFx0cHVibGljIHN1Ym1pdCgpIHtcblx0XHRcdGxldCBkYXRlUGlja2VyOiBEYXRlUGlja2VyID0gPERhdGVQaWNrZXI+dGhpcy5wYWdlLmdldFZpZXdCeUlkPERhdGVQaWNrZXI+KFwiZGF0ZVBpY2tlclwiKTtcblx0XHRcdGNvbnNvbGUubG9nKFwiREFURVBJQ0tcIiwgZGF0ZVBpY2tlci5kYXRlKVxuXHRcdFx0dGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhkYXRlUGlja2VyLmRhdGUpO1xuXHRcdH1cblx0fSJdfQ==