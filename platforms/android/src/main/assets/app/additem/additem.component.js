"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var date_component_1 = require("../date/date.component");
var time_component_1 = require("../time/time.component");
var page_1 = require("ui/page");
var item_model_1 = require("./item.model");
var services_1 = require("../services");
var router_1 = require("@angular/router");
var RadioOption = (function () {
    function RadioOption(text) {
        this.selected = false;
        this.text = text;
    }
    return RadioOption;
}());
var AdditemComponent = (function () {
    function AdditemComponent(modalService, vcRef, routerExtensions, page, firebaseService, route, ngZone) {
        this.modalService = modalService;
        this.vcRef = vcRef;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.firebaseService = firebaseService;
        this.route = route;
        this.ngZone = ngZone;
        this.resetDates();
    }
    AdditemComponent.prototype.getStartDate = function () {
        var _this = this;
        this.createModelView().then(function (result) {
            console.log("RESULT", result);
            if (_this.validate(result)) {
                _this.startDate = result;
            }
        }).catch(function (error) { return _this.handleError(error); });
    };
    AdditemComponent.prototype.getEndDate = function () {
        var _this = this;
        this.createModelView().then(function (result) {
            if (_this.validate(result)) {
                _this.endDate = result;
            }
        }).catch(function (error) { return _this.handleError(error); });
    };
    AdditemComponent.prototype.createTimeView = function () {
        var date = new Date();
        console.log("date", date);
        var time = date.getHours() + date.getMinutes();
        var options = {
            viewContainerRef: this.vcRef,
            context: date.toDateString(),
            fullscreen: false,
        };
        return this.modalService.showModal(time_component_1.TimeComponent, options);
    };
    AdditemComponent.prototype.getTime = function () {
        var _this = this;
        this.createTimeView().then(function (result) {
            _this.startTime = result;
            console.log("timeRES", _this.startTime);
        });
    };
    AdditemComponent.prototype.createModelView = function () {
        var today = new Date();
        var options = {
            viewContainerRef: this.vcRef,
            context: today.toDateString(),
            fullscreen: false,
        };
        return this.modalService.showModal(date_component_1.DateComponent, options);
    };
    AdditemComponent.prototype.goBack = function () {
        // console.log("test", this.test) 
        this.routerExtensions.backToPreviousPage();
    };
    AdditemComponent.prototype.resetDates = function () {
        this.startDate = new Date();
        this.endDate = new Date();
        this.startTime = new Date();
    };
    AdditemComponent.prototype.validate = function (result) {
        return !!result;
    };
    AdditemComponent.prototype.handleError = function (error) {
        this.resetDates();
        alert("Please try again!");
        console.dir(error);
    };
    AdditemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.radioOptions = [
            new RadioOption("Sun"),
            new RadioOption("Mon"),
            new RadioOption("Tue"),
            new RadioOption("Wed"),
            new RadioOption("Thu"),
            new RadioOption("Fri"),
            new RadioOption("Sat")
        ];
        this.mealOptions = [
            new RadioOption("Before Meal"),
            new RadioOption("After Meal"),
        ];
        console.log("MEAL", this.radioOptions);
        this.isDay = false,
            this.day = '';
        this.meal = '';
        //   console.log("IDA", this.id)
        this.flag = false;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.firebaseService.getMyCard(_this.id).subscribe(function (item) {
                _this.ngZone.run(function () {
                    for (var prop in item) {
                        _this.flag = true;
                        if (prop === "id") {
                            _this.id = item[prop];
                            console.log("addID", _this.id);
                        }
                        if (prop === "name") {
                            _this.name = item[prop];
                            console.log("addID", _this.name);
                        }
                        if (prop === "startTime") {
                            _this.startTime = item[prop];
                        }
                        if (prop === "meal") {
                            _this.meal = item[prop];
                        }
                        if (prop === "count") {
                            _this.count = item[prop];
                        }
                        if (prop === "dosage") {
                            _this.dosage = item[prop];
                        }
                        if (prop === "startDate") {
                            _this.startDate = item[prop];
                        }
                        if (prop === "endDate") {
                            _this.endDate = item[prop];
                        }
                        if (prop === "selectedDay") {
                            _this.day = item[prop];
                        }
                        if (prop === "type") {
                            _this.type = item[prop];
                        }
                        if (prop === "isDay") {
                            _this.isDay = item[prop];
                        }
                        if (prop === "note") {
                            _this.note = item[prop];
                        }
                    }
                });
            });
        });
        console.log("FLAG", this.flag);
    };
    AdditemComponent.prototype.checkDay = function () {
        this.isDay = true,
            console.log('checked prop value1 = ' + this.isDay); // will return true of false
    };
    AdditemComponent.prototype.changeCheckedRadio = function (radioOption) {
        var _this = this;
        radioOption.selected = !radioOption.selected;
        if (!radioOption.selected) {
            return;
        }
        // uncheck all other options
        this.radioOptions.forEach(function (option) {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
            else
                _this.day = option.text;
        });
    };
    AdditemComponent.prototype.changeCheckedMeal = function (mealOption) {
        var _this = this;
        mealOption.selected = !mealOption.selected;
        if (!mealOption.selected) {
            return;
        }
        // uncheck all other options
        this.mealOptions.forEach(function (option) {
            if (option.text !== mealOption.text) {
                option.selected = false;
            }
            else
                _this.meal = option.text;
        });
    };
    AdditemComponent.prototype.addItem = function () {
        console.log("IDEddddd", this.day, this.meal);
        this.items = new item_model_1.Items(this.id, this.name, this.type, this.dosage, this.count, this.note, this.startDate, this.endDate, this.startTime, this.day, this.isDay, this.meal);
        this.firebaseService.add(this.items).then(function (message) {
            console.log("add");
            alert(message);
        });
        this.routerExtensions.navigate(["/medicinebox"], { clearHistory: false });
    };
    AdditemComponent.prototype.editCard = function (id) {
        this.firebaseService.editCard(id, this.startTime, this.meal, this.name, this.note).then(function (result) {
            alert(result);
        }, function (error) {
            alert(error);
        });
        this.routerExtensions.navigate(["/medicinebox"], { clearHistory: false });
    };
    AdditemComponent = __decorate([
        core_1.Component({
            selector: 'additem',
            moduleId: module.id,
            providers: [modal_dialog_1.ModalDialogService],
            templateUrl: './additem.component.html',
            styleUrls: ['./additem.component.css']
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogService,
            core_1.ViewContainerRef,
            router_extensions_1.RouterExtensions,
            page_1.Page,
            services_1.FirebaseService,
            router_1.ActivatedRoute,
            core_1.NgZone])
    ], AdditemComponent);
    return AdditemComponent;
}());
exports.AdditemComponent = AdditemComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRpdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0RTtBQUM1RSxrRUFBMkY7QUFDM0YsbUZBQWlGO0FBQ2pGLHlEQUFzRDtBQUN0RCx5REFBc0Q7QUFFdEQsZ0NBQStCO0FBRy9CLDJDQUFtQztBQUNuQyx3Q0FBNEM7QUFDNUMsMENBQXVEO0FBR3ZEO0lBSUMscUJBQVksSUFBWTtRQUZ4QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBR3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBWUQ7SUF1QkMsMEJBQXFCLFlBQWdDLEVBQzNDLEtBQXVCLEVBQ3ZCLGdCQUFrQyxFQUNsQyxJQUFVLEVBQ1YsZUFBZ0MsRUFDaEMsS0FBcUIsRUFDckIsTUFBYztRQU5ILGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUMzQyxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUd2QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHVDQUFZLEdBQVo7UUFBQSxpQkFPSTtRQU5HLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMs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QUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBelBXLGdCQUFnQjtRQVQ1QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLGlDQUFrQixDQUFDO1lBQy9CLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdEMsQ0FBQzt5Q0EwQmtDLGlDQUFrQjtZQUNwQyx1QkFBZ0I7WUFDTCxvQ0FBZ0I7WUFDNUIsV0FBSTtZQUNPLDBCQUFlO1lBQ3pCLHVCQUFjO1lBQ2IsYUFBTTtPQTdCWixnQkFBZ0IsQ0EwUDVCO0lBQUQsdUJBQUM7Q0FBQSxBQTFQRCxJQTBQQztBQTFQWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UsIE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnMnO1xuaW1wb3J0IHsgRGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9kYXRlL2RhdGUuY29tcG9uZW50XCJcbmltcG9ydCB7IFRpbWVDb21wb25lbnQgfSBmcm9tIFwiLi4vdGltZS90aW1lLmNvbXBvbmVudFwiXG5pbXBvcnQgeyBDaGVja0JveCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jaGVja2JveCc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBSYWRpb0J1dHRvbiwgUmFkaW9Hcm91cCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1yYWRpb2J1dHRvbidcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7SXRlbXN9IGZyb20gXCIuL2l0ZW0ubW9kZWxcIjtcbmltcG9ydCB7RmlyZWJhc2VTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXNcIjtcbmltcG9ydCB7Um91dGVyLCBBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuXG5jbGFzcyBSYWRpb09wdGlvbiB7XG5cdHRleHQ6IHN0cmluZztcblx0c2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgXG5cdGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZykge1xuXHQgIHRoaXMudGV4dCA9IHRleHQ7XG5cdH1cbn1cblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdhZGRpdGVtJyxcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0cHJvdmlkZXJzOiBbTW9kYWxEaWFsb2dTZXJ2aWNlXSxcblx0dGVtcGxhdGVVcmw6ICcuL2FkZGl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9hZGRpdGVtLmNvbXBvbmVudC5jc3MnXVxufSlcblxuXG5leHBvcnQgY2xhc3MgQWRkaXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0aWQ6IHN0cmluZztcblx0c3RhcnREYXRlOiBEYXRlO1xuXHRlbmREYXRlOiBEYXRlO1xuXHRzdGFydFRpbWU6IERhdGU7XG5cdHJhZGlvT3B0aW9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcblx0bWVhbE9wdGlvbnM/OiBBcnJheTxSYWRpb09wdGlvbj47XG5cdGlzRGF5OmJvb2xlYW47XG5cdG5hbWU6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG5cdGRvc2FnZTogc3RyaW5nO1xuXHRjb3VudDogc3RyaW5nO1xuXHRub3RlOnN0cmluZztcblx0ZGF5OiBzdHJpbmc7XG5cdG1lYWw6IHN0cmluZztcblx0cHVibGljIGl0ZW1zOiBJdGVtcztcblx0cHJpdmF0ZSBzdWI6IGFueTtcblx0Ly8gcHVibGljIHRlc3Q6IHN0cmluZ1xuXHRwdWJsaWMgaXRlbTogT2JzZXJ2YWJsZTxhbnk+O1xuXHRwdWJsaWMgbWVzc2FnZSQ6IE9ic2VydmFibGU8YW55Pjtcblx0cHVibGljIGZsYWc6IGJvb2xlYW5cblx0XG5cdGNvbnN0cnVjdG9yKCBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuXHRcdFx0cHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcblx0XHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcblx0XHRcdHByaXZhdGUgcGFnZTogUGFnZSxcblx0XHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXG5cdFx0XHRwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcblx0XHRcdHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG5cdFx0KSBcblx0e1xuXHRcdHRoaXMucmVzZXREYXRlcygpO1xuXHR9XG5cblx0Z2V0U3RhcnREYXRlKCkge1xuICAgICAgICB0aGlzLmNyZWF0ZU1vZGVsVmlldygpLnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiUkVTVUxUXCIsIHJlc3VsdClcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnJvcikpO1xuICAgIH1cblxuICAgIGdldEVuZERhdGUoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9kZWxWaWV3KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGUocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnJvcikpO1xuXHR9XG5cdFxuXHRwcml2YXRlIGNyZWF0ZVRpbWVWaWV3KCk6IFByb21pc2U8YW55PiB7XG5cdFx0Y29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc29sZS5sb2coXCJkYXRlXCIsIGRhdGUpXG5cdFx0Y29uc3QgdGltZSA9IGRhdGUuZ2V0SG91cnMoKSArIGRhdGUuZ2V0TWludXRlcygpXG5cdCAgICBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuXHRcdFx0Y29udGV4dDogZGF0ZS50b0RhdGVTdHJpbmcoKSxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoVGltZUNvbXBvbmVudCwgb3B0aW9ucyk7XG5cdH1cblxuXHRnZXRUaW1lKCkge1xuXHRcdHRoaXMuY3JlYXRlVGltZVZpZXcoKS50aGVuKHJlc3VsdCA9PiB7XG5cdFx0XHR0aGlzLnN0YXJ0VGltZSA9IHJlc3VsdFxuXHRcdFx0Y29uc29sZS5sb2coXCJ0aW1lUkVTXCIsIHRoaXMuc3RhcnRUaW1lKVxuXHRcdH0pXG5cdH1cblx0XG5cdHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3KCk6IFByb21pc2U8YW55PiB7XG5cdFx0Y29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXHQgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgICAgICAgIGNvbnRleHQ6IHRvZGF5LnRvRGF0ZVN0cmluZygpLFxuICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChEYXRlQ29tcG9uZW50LCBvcHRpb25zKTtcbiAgICB9XG5cblx0IHB1YmxpYyBnb0JhY2soKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJ0ZXN0XCIsIHRoaXMudGVzdCkgXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuXHR9XG5cdFxuXHRwcml2YXRlIHJlc2V0RGF0ZXMoKSB7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0gbmV3IERhdGUoKTtcblx0XHR0aGlzLmVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdHRoaXMuc3RhcnRUaW1lPSBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmFsaWRhdGUocmVzdWx0OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xuICAgICAgICB0aGlzLnJlc2V0RGF0ZXMoKTtcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgdHJ5IGFnYWluIVwiKTtcbiAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgIH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLnJhZGlvT3B0aW9ucyA9IFtcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIlN1blwiKSxcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIk1vblwiKSxcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIlR1ZVwiKSxcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIldlZFwiKSxcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIlRodVwiKSxcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkZyaVwiKSxcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIlNhdFwiKVxuXHRcdCAgXTtcblxuXHRcdCAgdGhpcy5tZWFsT3B0aW9ucyA9IFtcblx0XHRcdG5ldyBSYWRpb09wdGlvbihcIkJlZm9yZSBNZWFsXCIpLFxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiQWZ0ZXIgTWVhbFwiKSxcblx0XHQgIF07XG5cdFx0ICBjb25zb2xlLmxvZyhcIk1FQUxcIiwgdGhpcy5yYWRpb09wdGlvbnMpXG5cdFx0XG5cdFx0ICB0aGlzLmlzRGF5ID0gZmFsc2UsXG5cdFx0ICB0aGlzLmRheT0nJztcblx0XHQgIHRoaXMubWVhbD0nJztcblx0XHQvLyAgIGNvbnNvbGUubG9nKFwiSURBXCIsIHRoaXMuaWQpXG5cdFx0dGhpcy5mbGFnPWZhbHNlO1xuXHRcdHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKChwYXJhbXM6IGFueSkgPT4ge1xuXHRcdFxuXHRcdFx0dGhpcy5pZCA9IHBhcmFtc1snaWQnXTtcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldE15Q2FyZCh0aGlzLmlkKS5zdWJzY3JpYmUoKGl0ZW0pID0+IHtcblx0XHRcdCAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcblx0XHRcdFxuXHRcdFx0XHRmb3IgKGxldCBwcm9wIGluIGl0ZW0pIHtcblx0XHRcdFx0XHR0aGlzLmZsYWcgPSB0cnVlO1xuXHRcdFx0XHQgIGlmIChwcm9wID09PSBcImlkXCIpIHtcblx0XHRcdFx0XHR0aGlzLmlkID0gaXRlbVtwcm9wXTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImFkZElEXCIsIHRoaXMuaWQpXG5cdFx0XHRcdCAgfVxuXHRcdFx0XHQgIGlmIChwcm9wID09PSBcIm5hbWVcIikge1xuXHRcdFx0XHRcdHRoaXMubmFtZSA9IGl0ZW1bcHJvcF07XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJhZGRJRFwiLCB0aGlzLm5hbWUpXG5cdFx0XHRcdCAgfVxuXHRcdFx0XHQgIGlmIChwcm9wID09PSBcInN0YXJ0VGltZVwiKSB7XG5cdFx0XHRcdFx0dGhpcy5zdGFydFRpbWUgPSBpdGVtW3Byb3BdO1xuXHRcdFx0XHQgIH1cblx0XHRcdFx0ICBpZiAocHJvcCA9PT0gXCJtZWFsXCIpIHtcblx0XHRcdFx0XHR0aGlzLm1lYWwgPSBpdGVtW3Byb3BdO1xuXHRcdFx0XHQgIH1cblx0XHRcdFx0ICBpZiAocHJvcCA9PT0gXCJjb3VudFwiKSB7XG5cdFx0XHRcdFx0dGhpcy5jb3VudCA9IGl0ZW1bcHJvcF07XG5cdFx0XHRcdCAgfVxuXHRcdFx0XHQgIGlmIChwcm9wID09PSBcImRvc2FnZVwiKSB7XG5cdFx0XHRcdFx0dGhpcy5kb3NhZ2UgPSBpdGVtW3Byb3BdO1xuXHRcdFx0XHQgIH1cblx0XHRcdFx0ICBpZiAocHJvcCA9PT0gXCJzdGFydERhdGVcIikge1xuXHRcdFx0XHRcdHRoaXMuc3RhcnREYXRlID0gaXRlbVtwcm9wXTtcblx0XHRcdFx0ICB9XG5cdFx0XHRcdCAgaWYgKHByb3AgPT09IFwiZW5kRGF0ZVwiKSB7XG5cdFx0XHRcdFx0dGhpcy5lbmREYXRlID0gaXRlbVtwcm9wXTtcblx0XHRcdFx0ICB9XG5cdFx0XHRcdCAgaWYgKHByb3AgPT09IFwic2VsZWN0ZWREYXlcIikge1xuXHRcdFx0XHRcdHRoaXMuZGF5ID0gaXRlbVtwcm9wXTtcblx0XHRcdFx0ICB9XG5cdFx0XHRcdCAgaWYgKHByb3AgPT09IFwidHlwZVwiKSB7XG5cdFx0XHRcdFx0dGhpcy50eXBlID0gaXRlbVtwcm9wXTtcblx0XHRcdFx0ICB9XG5cdFx0XHRcdCAgaWYgKHByb3AgPT09IFwiaXNEYXlcIikge1xuXHRcdFx0XHRcdHRoaXMuaXNEYXkgPSBpdGVtW3Byb3BdO1xuXHRcdFx0XHQgIH1cblx0XHRcdFx0ICBpZiAocHJvcCA9PT0gXCJub3RlXCIpIHtcblx0XHRcdFx0XHR0aGlzLm5vdGUgPSBpdGVtW3Byb3BdO1xuXHRcdFx0XHQgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdFx0fVxuXHRcdFx0ICB9KTtcblx0XHRcdH0pO1xuXHRcdCAgfSk7ICBcblx0XHQgIGNvbnNvbGUubG9nKFwiRkxBR1wiLCB0aGlzLmZsYWcpXG5cdCB9XG5cblx0XG5cblx0Y2hlY2tEYXkoKSB7XG5cdFx0dGhpcy5pc0RheSA9IHRydWUsXG5cdFx0Y29uc29sZS5sb2coJ2NoZWNrZWQgcHJvcCB2YWx1ZTEgPSAnICsgdGhpcy5pc0RheSk7IC8vIHdpbGwgcmV0dXJuIHRydWUgb2YgZmFsc2Vcblx0fVxuXG5cdGNoYW5nZUNoZWNrZWRSYWRpbyhyYWRpb09wdGlvbjogUmFkaW9PcHRpb24pOiB2b2lkIHtcblx0XHRyYWRpb09wdGlvbi5zZWxlY3RlZCA9ICFyYWRpb09wdGlvbi5zZWxlY3RlZDtcblx0XG5cdFx0aWYgKCFyYWRpb09wdGlvbi5zZWxlY3RlZCkge1xuXHRcdCAgcmV0dXJuO1xuXHRcdH1cblx0XG5cdFx0Ly8gdW5jaGVjayBhbGwgb3RoZXIgb3B0aW9uc1xuXHRcdHRoaXMucmFkaW9PcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcblx0XHRpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcblx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRlbHNlIHRoaXMuZGF5PW9wdGlvbi50ZXh0XG5cdFx0fSk7XG5cdH1cblxuXHRjaGFuZ2VDaGVja2VkTWVhbChtZWFsT3B0aW9uOiBSYWRpb09wdGlvbik6IHZvaWQge1xuXHRcdG1lYWxPcHRpb24uc2VsZWN0ZWQgPSAhbWVhbE9wdGlvbi5zZWxlY3RlZDtcblx0XG5cdFx0aWYgKCFtZWFsT3B0aW9uLnNlbGVjdGVkKSB7XG5cdFx0ICByZXR1cm47XG5cdFx0fVxuXHRcblx0XHQvLyB1bmNoZWNrIGFsbCBvdGhlciBvcHRpb25zXG5cdFx0dGhpcy5tZWFsT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG5cdFx0aWYgKG9wdGlvbi50ZXh0ICE9PSBtZWFsT3B0aW9uLnRleHQpIHtcblx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0XG5cdFx0ICB9XG5cdFx0ICBlbHNlIHRoaXMubWVhbD1vcHRpb24udGV4dFxuXHRcdH0pO1xuXHR9XG5cblx0YWRkSXRlbSgpIHtcblx0XHRjb25zb2xlLmxvZyhcIklERWRkZGRkXCIsIHRoaXMuZGF5LCB0aGlzLm1lYWwpXG5cdFx0dGhpcy5pdGVtcyA9IG5ldyBJdGVtcyhcblx0XHRcdHRoaXMuaWQsXG5cdFx0XHR0aGlzLm5hbWUsXG5cdFx0XHR0aGlzLnR5cGUsXG5cdFx0XHR0aGlzLmRvc2FnZSxcblx0XHRcdHRoaXMuY291bnQsXG5cdFx0XHR0aGlzLm5vdGUsXG5cdFx0XHR0aGlzLnN0YXJ0RGF0ZSxcblx0XHRcdHRoaXMuZW5kRGF0ZSxcblx0XHRcdHRoaXMuc3RhcnRUaW1lLFxuXHRcdFx0dGhpcy5kYXksXG5cdFx0XHR0aGlzLmlzRGF5LFxuXHRcdFx0dGhpcy5tZWFsKVxuXG5cdFx0ICB0aGlzLmZpcmViYXNlU2VydmljZS5hZGQodGhpcy5pdGVtcykudGhlbigobWVzc2FnZTphbnkpID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coXCJhZGRcIilcblx0XHRcdGFsZXJ0KG1lc3NhZ2UpO1xuXHRcdCAgfSlcblx0XHQgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbWVkaWNpbmVib3hcIl0sIHtjbGVhckhpc3Rvcnk6IGZhbHNlfSk7XG5cdH1cblx0XHQgIFxuXHRlZGl0Q2FyZChpZDogc3RyaW5nKSB7XG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UuZWRpdENhcmQoaWQsdGhpcy5zdGFydFRpbWUsIHRoaXMubWVhbCwgdGhpcy5uYW1lLCB0aGlzLm5vdGUpLnRoZW4oKHJlc3VsdDphbnkpID0+IHtcblx0XHRcdGFsZXJ0KHJlc3VsdClcblx0XHQgIH0sIChlcnJvcjogYW55KSA9PiB7XG5cdFx0XHQgIGFsZXJ0KGVycm9yKTtcblx0XHQgIH0pO1xuXHRcdCAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9tZWRpY2luZWJveFwiXSwge2NsZWFySGlzdG9yeTogZmFsc2V9KTtcblx0fVxufSJdfQ==