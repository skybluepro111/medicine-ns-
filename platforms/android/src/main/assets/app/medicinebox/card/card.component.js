"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_ng2_fonticon_1 = require("nativescript-ng2-fonticon");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var services_1 = require("../../services");
var CardComponent = (function () {
    function CardComponent(fonticon, RouterExtensions, firebaseService) {
        this.fonticon = fonticon;
        this.RouterExtensions = RouterExtensions;
        this.firebaseService = firebaseService;
    }
    CardComponent.prototype.ngOnInit = function () {
        this.cards$ = this.firebaseService.getMyCards();
    };
    CardComponent.prototype.editItem = function () {
        this.RouterExtensions.navigate(["/additem"], { clearHistory: false });
    };
    CardComponent = __decorate([
        core_1.Component({
            selector: 'card',
            moduleId: module.id,
            templateUrl: './card.component.html',
            styleUrls: ['./card.component.css']
        }),
        __metadata("design:paramtypes", [nativescript_ng2_fonticon_1.TNSFontIconService,
            router_extensions_1.RouterExtensions,
            services_1.FirebaseService])
    ], CardComponent);
    return CardComponent;
}());
exports.CardComponent = CardComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCx1RUFBK0Q7QUFFL0QsbUZBQWlGO0FBQ2pGLDJDQUErQztBQVcvQztJQU1DLHVCQUFvQixRQUE0QixFQUN2QyxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFGckIsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFDdkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDO0lBRTdDLGdDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsTUFBTSxHQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUNELGdDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBZlcsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbkMsQ0FBQzt5Q0FRNkIsOENBQWtCO1lBQ3JCLG9DQUFnQjtZQUNqQiwwQkFBZTtPQVI3QixhQUFhLENBZ0J6QjtJQUFELG9CQUFDO0NBQUEsQUFoQkQsSUFnQkM7QUFoQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVE5TRm9udEljb25TZXJ2aWNlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nMi1mb250aWNvbic7XG5pbXBvcnQgeyBGbGV4Ym94TGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9mbGV4Ym94LWxheW91dFwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9ucyc7XG5pbXBvcnQge0ZpcmViYXNlU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzXCI7XG5pbXBvcnQge0l0ZW1zfSBmcm9tIFwiLi4vLi4vYWRkaXRlbS9pdGVtLm1vZGVsXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ2NhcmQnLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogJy4vY2FyZC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2NhcmQuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgQ2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0cHVibGljIGl0ZW06IEl0ZW1zO1xuXHRcblx0ICBwdWJsaWMgY2FyZHMkOiBPYnNlcnZhYmxlPGFueT47XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBmb250aWNvbjogVE5TRm9udEljb25TZXJ2aWNlLFxuXHRcdHByaXZhdGUgUm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlKSB7fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuY2FyZHMkID0gPGFueT50aGlzLmZpcmViYXNlU2VydmljZS5nZXRNeUNhcmRzKCk7XG5cdH1cblx0ZWRpdEl0ZW0oKSB7XG5cdFx0dGhpcy5Sb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9hZGRpdGVtXCJdLCB7Y2xlYXJIaXN0b3J5OiBmYWxzZX0pO1xuXHR9XG59Il19