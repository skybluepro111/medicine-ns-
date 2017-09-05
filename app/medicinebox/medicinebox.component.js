"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var services_1 = require("../services");
var MedicineboxComponent = (function () {
    function MedicineboxComponent(page, RouterExtensions, firebaseService) {
        this.page = page;
        this.RouterExtensions = RouterExtensions;
        this.firebaseService = firebaseService;
        // page.actionBarHidden = true;
    }
    MedicineboxComponent.prototype.ngOnInit = function () {
        this.cards$ = this.firebaseService.getMyCards();
    };
    MedicineboxComponent.prototype.onTap = function () {
        this.RouterExtensions.navigate(["/additem"], { clearHistory: false });
    };
    MedicineboxComponent.prototype.editItem = function (id) {
        console.log("ID", id);
        this.RouterExtensions.navigate(["/additem", id]);
    };
    MedicineboxComponent = __decorate([
        core_1.Component({
            selector: 'medicinebox',
            moduleId: module.id,
            templateUrl: './medicinebox.component.html',
            styleUrls: ['./medicinebox.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_extensions_1.RouterExtensions,
            services_1.FirebaseService])
    ], MedicineboxComponent);
    return MedicineboxComponent;
}());
exports.MedicineboxComponent = MedicineboxComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNpbmVib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVkaWNpbmVib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGdDQUErQjtBQUMvQixtRkFBaUY7QUFDakYsd0NBQTRDO0FBVzVDO0lBTUMsOEJBQXFCLElBQVUsRUFDdEIsZ0JBQWtDLEVBQ2xDLGVBQWdDO1FBRnBCLFNBQUksR0FBSixJQUFJLENBQU07UUFDdEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDeEMsK0JBQStCO0lBQy9CLENBQUM7SUFFRix1Q0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLE1BQU0sR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRixvQ0FBSyxHQUFMO1FBQ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELHVDQUFRLEdBQVIsVUFBUyxFQUFVO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBdkJXLG9CQUFvQjtRQVBoQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDMUMsQ0FBQzt5Q0FRMEIsV0FBSTtZQUNKLG9DQUFnQjtZQUNqQiwwQkFBZTtPQVI3QixvQkFBb0IsQ0F3QmhDO0lBQUQsMkJBQUM7Q0FBQSxBQXhCRCxJQXdCQztBQXhCWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9ucyc7XG5pbXBvcnQge0ZpcmViYXNlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzXCI7XG5pbXBvcnQge0l0ZW1zfSBmcm9tIFwiLi4vYWRkaXRlbS9pdGVtLm1vZGVsXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ21lZGljaW5lYm94Jyxcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6ICcuL21lZGljaW5lYm94LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vbWVkaWNpbmVib3guY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgTWVkaWNpbmVib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHB1YmxpYyBpdGVtOiBJdGVtcztcblx0XG5cdCAgcHVibGljIGNhcmRzJDogT2JzZXJ2YWJsZTxhbnk+O1xuXG5cdGNvbnN0cnVjdG9yKCBwcml2YXRlIHBhZ2U6IFBhZ2UsXG5cdFx0cHJpdmF0ZSBSb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UpIHtcblx0XHQvLyBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cdCB9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5jYXJkcyQgPSA8YW55PnRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldE15Q2FyZHMoKTtcblx0IH1cblxuXHRvblRhcCgpIHtcblx0XHR0aGlzLlJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2FkZGl0ZW1cIl0sIHtjbGVhckhpc3Rvcnk6IGZhbHNlfSk7XG5cdH1cblxuXHRlZGl0SXRlbShpZDogc3RyaW5nKSB7XG5cdFx0Y29uc29sZS5sb2coXCJJRFwiLCBpZClcblx0XHR0aGlzLlJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2FkZGl0ZW1cIiwgaWRdKTtcblx0fVxufSJdfQ==