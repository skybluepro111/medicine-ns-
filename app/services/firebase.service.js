"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Card } from './../models/card.model';
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var utils_service_1 = require("./utils.service");
require("rxjs/add/operator/share");
var FirebaseService = (function () {
    function FirebaseService(ngZone, utils) {
        this.ngZone = ngZone;
        this.utils = utils;
        this.profiles = [];
        this.items = new BehaviorSubject_1.BehaviorSubject([]);
        this._allItems = [];
    }
    FirebaseService.prototype.add = function (items) {
        // console.log("fname", items.meal, items.day)   
        // console.log("date", items.startTime, items.startTime.getTime());
        return firebase.push('/cards', {
            id: items.id,
            name: items.name,
            type: items.type,
            dosage: items.dosage,
            count: items.count,
            note: items.note,
            startDate: items.startDate.getTime(),
            endDate: items.endDate.getTime(),
            startTime: items.startTime.getTime(),
            meal: items.meal,
            isDay: items.isDay,
            selectedDay: items.day
        }).then(function (result) {
            console.log("RESULT key", result.key);
            return 'card added to your item';
        }, function (errorMessage) {
            console.log("Ferror", errorMessage);
        });
    };
    FirebaseService.prototype.getMyCards = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var onValueEvent = function (snapshot) {
                console.log(JSON.stringify(snapshot));
                _this.ngZone.run(function () {
                    var results = _this.handleSnapshot(snapshot.value);
                    console.log(JSON.stringify(results));
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, "/cards");
        }).share();
    };
    FirebaseService.prototype.getMyCard = function (id) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            observer.next(_this._allItems.filter(function (s) { return s.id === id; })[0]);
        }).share();
    };
    FirebaseService.prototype.handleSnapshot = function (data) {
        this._allItems = [];
        if (data) {
            for (var id in data) {
                var result = Object.assign({ id: id }, data[id]);
                this._allItems.push(result);
            }
            this.publishUpdates();
        }
        return this._allItems;
    };
    FirebaseService.prototype.publishUpdates = function () {
        // here, we sort must emit a *new* value (immutability!)
        this._allItems.sort(function (a, b) {
            if (a.startTime < b.startTime)
                return -1;
            if (a.startTime > b.startTime)
                return 1;
            return 0;
        });
        this.items.next(this._allItems.slice());
    };
    FirebaseService.prototype.editCard = function (id, startTime, meal, name, note) {
        console.log("time", startTime, new Date(startTime));
        this.publishUpdates();
        return firebase.update("/cards/" + id + "", {
            startTime: new Date(startTime).getTime(),
            meal: meal,
            name: name,
            note: note
        })
            .then(function (result) {
            return 'You have successfully edited this card!';
        }, function (errorMessage) {
            console.log(errorMessage);
        });
    };
    FirebaseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone,
            utils_service_1.UtilsService])
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFDakQsc0NBQW1EO0FBQ25ELHVEQUEwRDtBQUMxRCw4Q0FBNkM7QUFDN0Msd0RBQXVEO0FBQ3ZELGlEQUErQztBQUMvQyxtQ0FBaUM7QUFJakM7SUFDRSx5QkFDVSxNQUFjLEVBQ2QsS0FBbUI7UUFEbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWM7UUFHckIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUMzQixVQUFLLEdBQWtDLElBQUksaUNBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RCxjQUFTLEdBQWlCLEVBQUUsQ0FBQztJQUpqQyxDQUFDO0lBTUwsNkJBQUcsR0FBSCxVQUFJLEtBQVU7UUFDWixpREFBaUQ7UUFDakQsbUVBQW1FO1FBQ25FLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQixRQUFRLEVBQ1I7WUFDRSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDWixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDaEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2hCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtZQUNwQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDbEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2hCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNwQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEMsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3BDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDbEIsV0FBVyxFQUFF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QUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsa0NBQVEsR0FBUixVQUFTLEVBQVMsRUFBRSxTQUFlLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZO1FBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1FBQ25ELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUMsRUFBRSxHQUFDLEVBQUUsRUFBQztZQUNuQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3hDLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7YUFDRCxJQUFJLENBQ0gsVUFBVSxNQUFVO1lBQ2xCLE1BQU0sQ0FBQyx5Q0FBeUMsQ0FBQztRQUNuRCxDQUFDLEVBQ0QsVUFBVSxZQUFnQjtZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQWpHVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBR08sYUFBTTtZQUNQLDRCQUFZO09BSGxCLGVBQWUsQ0FtRzNCO0lBQUQsc0JBQUM7Q0FBQSxBQW5HRCxJQW1HQztBQW5HWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IENhcmQgfSBmcm9tICcuLy4uL21vZGVscy9jYXJkLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcbmltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4vdXRpbHMuc2VydmljZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xyXG5pbXBvcnQge0l0ZW1zfSBmcm9tIFwiLi4vYWRkaXRlbS9pdGVtLm1vZGVsXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgdXRpbHM6IFV0aWxzU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIHByaXZhdGUgcHJvZmlsZXM6IGFueSA9IFtdO1xyXG4gIGl0ZW1zOiBCZWhhdmlvclN1YmplY3Q8QXJyYXk8SXRlbXM+PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG4gIHByaXZhdGUgX2FsbEl0ZW1zOiBBcnJheTxJdGVtcz4gPSBbXTtcclxuXHJcbiAgYWRkKGl0ZW1zOiBhbnkpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiZm5hbWVcIiwgaXRlbXMubWVhbCwgaXRlbXMuZGF5KSAgIFxyXG4gICAgLy8gY29uc29sZS5sb2coXCJkYXRlXCIsIGl0ZW1zLnN0YXJ0VGltZSwgaXRlbXMuc3RhcnRUaW1lLmdldFRpbWUoKSk7XHJcbiAgICByZXR1cm4gZmlyZWJhc2UucHVzaChcclxuICAgICAgICAnL2NhcmRzJyxcclxuICAgICAgICB7IFxyXG4gICAgICAgICAgaWQ6IGl0ZW1zLmlkLFxyXG4gICAgICAgICAgbmFtZTogaXRlbXMubmFtZSxcclxuICAgICAgICAgIHR5cGU6IGl0ZW1zLnR5cGUsXHJcbiAgICAgICAgICBkb3NhZ2U6IGl0ZW1zLmRvc2FnZSxcclxuICAgICAgICAgIGNvdW50OiBpdGVtcy5jb3VudCxcclxuICAgICAgICAgIG5vdGU6IGl0ZW1zLm5vdGUsXHJcbiAgICAgICAgICBzdGFydERhdGU6IGl0ZW1zLnN0YXJ0RGF0ZS5nZXRUaW1lKCksXHJcbiAgICAgICAgICBlbmREYXRlOiBpdGVtcy5lbmREYXRlLmdldFRpbWUoKSxcclxuICAgICAgICAgIHN0YXJ0VGltZTogaXRlbXMuc3RhcnRUaW1lLmdldFRpbWUoKSxcclxuICAgICAgICAgIG1lYWw6IGl0ZW1zLm1lYWwsXHJcbiAgICAgICAgICBpc0RheTogaXRlbXMuaXNEYXksXHJcbiAgICAgICAgICBzZWxlY3RlZERheTogaXRlbXMuZGF5XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgKS50aGVuKFxyXG4gICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFU1VMVCBrZXlcIiwgcmVzdWx0LmtleSk7XHJcbiAgICAgICAgICByZXR1cm4gJ2NhcmQgYWRkZWQgdG8geW91ciBpdGVtJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uIChlcnJvck1lc3NhZ2U6YW55KSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkZlcnJvclwiLGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7IFxyXG4gIH1cclxuICBnZXRNeUNhcmRzKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcclxuICAgICAgbGV0IG9uVmFsdWVFdmVudCA9IChzbmFwc2hvdDogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoc25hcHNob3QpKTtcclxuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5oYW5kbGVTbmFwc2hvdChzbmFwc2hvdC52YWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdHMpKVxyXG4gICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHRzKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgXCIvY2FyZHNcIik7XHJcbiAgICB9KS5zaGFyZSgpOyAgICAgICAgICAgICAgXHJcbiAgfVxyXG5cclxuICBnZXRNeUNhcmQoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcclxuICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLl9hbGxJdGVtcy5maWx0ZXIocyA9PiBzLmlkID09PSBpZClbMF0pO1xyXG4gICAgfSkuc2hhcmUoKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVNuYXBzaG90KGRhdGE6IGFueSkge1xyXG4gICAgdGhpcy5fYWxsSXRlbXMgPSBbXTtcclxuICAgIGlmIChkYXRhKSB7XHJcbiAgICAgIGZvciAobGV0IGlkIGluIGRhdGEpIHsgICAgICAgIFxyXG4gICAgICAgIGxldCByZXN1bHQgPSAoPGFueT5PYmplY3QpLmFzc2lnbih7aWQ6IGlkfSwgZGF0YVtpZF0pO1xyXG4gICAgICAgICAgdGhpcy5fYWxsSXRlbXMucHVzaChyZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucHVibGlzaFVwZGF0ZXMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9hbGxJdGVtcztcclxuICB9XHJcblxyXG4gIHB1Ymxpc2hVcGRhdGVzKCkge1xyXG4gICAgLy8gaGVyZSwgd2Ugc29ydCBtdXN0IGVtaXQgYSAqbmV3KiB2YWx1ZSAoaW1tdXRhYmlsaXR5ISlcclxuICAgIHRoaXMuX2FsbEl0ZW1zLnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgaWYoYS5zdGFydFRpbWUgPCBiLnN0YXJ0VGltZSkgcmV0dXJuIC0xO1xyXG4gICAgICAgIGlmKGEuc3RhcnRUaW1lID4gYi5zdGFydFRpbWUpIHJldHVybiAxO1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH0pXHJcbiAgICB0aGlzLml0ZW1zLm5leHQoWy4uLnRoaXMuX2FsbEl0ZW1zXSk7XHJcbiAgfVxyXG5cclxuICBlZGl0Q2FyZChpZDpzdHJpbmcsIHN0YXJ0VGltZTogRGF0ZSwgbWVhbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIG5vdGU6IHN0cmluZyl7XHJcbiAgICBjb25zb2xlLmxvZyhcInRpbWVcIiwgc3RhcnRUaW1lLCBuZXcgRGF0ZShzdGFydFRpbWUpKVxyXG4gICAgdGhpcy5wdWJsaXNoVXBkYXRlcygpO1xyXG4gICAgcmV0dXJuIGZpcmViYXNlLnVwZGF0ZShcIi9jYXJkcy9cIitpZCtcIlwiLHtcclxuICAgICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKHN0YXJ0VGltZSkuZ2V0VGltZSgpLCBcclxuICAgICAgICBtZWFsOiBtZWFsLFxyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgbm90ZTogbm90ZVxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbihcclxuICAgICAgICBmdW5jdGlvbiAocmVzdWx0OmFueSkge1xyXG4gICAgICAgICAgcmV0dXJuICdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZWRpdGVkIHRoaXMgY2FyZCEnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZTphbnkpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7ICBcclxuICB9XHJcblxyXG59Il19