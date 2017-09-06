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
            selectedDay: meal,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFDakQsc0NBQW1EO0FBQ25ELHVEQUEwRDtBQUMxRCw4Q0FBNkM7QUFDN0Msd0RBQXVEO0FBQ3ZELGlEQUErQztBQUMvQyxtQ0FBaUM7QUFJakM7SUFDRSx5QkFDVSxNQUFjLEVBQ2QsS0FBbUI7UUFEbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWM7UUFHckIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUMzQixVQUFLLEdBQWtDLElBQUksaUNBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RCxjQUFTLEdBQWlCLEVBQUUsQ0FBQztJQUpqQyxDQUFDO0lBTUwsNkJBQUcsR0FBSCxVQUFJLEtBQVU7UUFDWixpREFBaUQ7UUFDakQsbUVBQW1FO1FBQ25FLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQixRQUFRLEVBQ1I7WUFDRSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDWixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDaEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2hCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtZQUNwQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDbEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2hCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNwQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEMsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3BDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDbEIsV0FBVyxFQUFF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QUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsa0NBQVEsR0FBUixVQUFTLEVBQVMsRUFBRSxTQUFlLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZO1FBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1FBQ25ELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUMsRUFBRSxHQUFDLEVBQUUsRUFBQztZQUNuQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3hDLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO2FBQ0QsSUFBSSxDQUNILFVBQVUsTUFBVTtZQUNsQixNQUFNLENBQUMseUNBQXlDLENBQUM7UUFDbkQsQ0FBQyxFQUNELFVBQVUsWUFBZ0I7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFqR1UsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQUdPLGFBQU07WUFDUCw0QkFBWTtPQUhsQixlQUFlLENBbUczQjtJQUFELHNCQUFDO0NBQUEsQUFuR0QsSUFtR0M7QUFuR1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBDYXJkIH0gZnJvbSAnLi8uLi9tb2RlbHMvY2FyZC5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuL3V0aWxzLnNlcnZpY2UnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3NoYXJlJztcclxuaW1wb3J0IHtJdGVtc30gZnJvbSBcIi4uL2FkZGl0ZW0vaXRlbS5tb2RlbFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIHV0aWxzOiBVdGlsc1NlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBwcml2YXRlIHByb2ZpbGVzOiBhbnkgPSBbXTtcclxuICBpdGVtczogQmVoYXZpb3JTdWJqZWN0PEFycmF5PEl0ZW1zPj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuICBwcml2YXRlIF9hbGxJdGVtczogQXJyYXk8SXRlbXM+ID0gW107XHJcblxyXG4gIGFkZChpdGVtczogYW55KSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImZuYW1lXCIsIGl0ZW1zLm1lYWwsIGl0ZW1zLmRheSkgICBcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiZGF0ZVwiLCBpdGVtcy5zdGFydFRpbWUsIGl0ZW1zLnN0YXJ0VGltZS5nZXRUaW1lKCkpO1xyXG4gICAgcmV0dXJuIGZpcmViYXNlLnB1c2goXHJcbiAgICAgICAgJy9jYXJkcycsXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgIGlkOiBpdGVtcy5pZCxcclxuICAgICAgICAgIG5hbWU6IGl0ZW1zLm5hbWUsXHJcbiAgICAgICAgICB0eXBlOiBpdGVtcy50eXBlLFxyXG4gICAgICAgICAgZG9zYWdlOiBpdGVtcy5kb3NhZ2UsXHJcbiAgICAgICAgICBjb3VudDogaXRlbXMuY291bnQsXHJcbiAgICAgICAgICBub3RlOiBpdGVtcy5ub3RlLFxyXG4gICAgICAgICAgc3RhcnREYXRlOiBpdGVtcy5zdGFydERhdGUuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgZW5kRGF0ZTogaXRlbXMuZW5kRGF0ZS5nZXRUaW1lKCksXHJcbiAgICAgICAgICBzdGFydFRpbWU6IGl0ZW1zLnN0YXJ0VGltZS5nZXRUaW1lKCksXHJcbiAgICAgICAgICBtZWFsOiBpdGVtcy5tZWFsLFxyXG4gICAgICAgICAgaXNEYXk6IGl0ZW1zLmlzRGF5LFxyXG4gICAgICAgICAgc2VsZWN0ZWREYXk6IGl0ZW1zLmRheVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICkudGhlbihcclxuICAgICAgICBmdW5jdGlvbiAocmVzdWx0OmFueSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJSRVNVTFQga2V5XCIsIHJlc3VsdC5rZXkpO1xyXG4gICAgICAgICAgcmV0dXJuICdjYXJkIGFkZGVkIHRvIHlvdXIgaXRlbSc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlOmFueSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJGZXJyb3JcIixlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pOyBcclxuICB9XHJcbiAgZ2V0TXlDYXJkcygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XHJcbiAgICAgIGxldCBvblZhbHVlRXZlbnQgPSAoc25hcHNob3Q6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHNuYXBzaG90KSk7XHJcbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IHRoaXMuaGFuZGxlU25hcHNob3Qoc25hcHNob3QudmFsdWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHRzKSlcclxuICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzdWx0cyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihvblZhbHVlRXZlbnQsIFwiL2NhcmRzXCIpO1xyXG4gICAgfSkuc2hhcmUoKTsgICAgICAgICAgICAgIFxyXG4gIH1cclxuXHJcbiAgZ2V0TXlDYXJkKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XHJcbiAgICAgIG9ic2VydmVyLm5leHQodGhpcy5fYWxsSXRlbXMuZmlsdGVyKHMgPT4gcy5pZCA9PT0gaWQpWzBdKTtcclxuICAgIH0pLnNoYXJlKCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTbmFwc2hvdChkYXRhOiBhbnkpIHtcclxuICAgIHRoaXMuX2FsbEl0ZW1zID0gW107XHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICBmb3IgKGxldCBpZCBpbiBkYXRhKSB7ICAgICAgICBcclxuICAgICAgICBsZXQgcmVzdWx0ID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24oe2lkOiBpZH0sIGRhdGFbaWRdKTtcclxuICAgICAgICAgIHRoaXMuX2FsbEl0ZW1zLnB1c2gocmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnB1Ymxpc2hVcGRhdGVzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fYWxsSXRlbXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaXNoVXBkYXRlcygpIHtcclxuICAgIC8vIGhlcmUsIHdlIHNvcnQgbXVzdCBlbWl0IGEgKm5ldyogdmFsdWUgKGltbXV0YWJpbGl0eSEpXHJcbiAgICB0aGlzLl9hbGxJdGVtcy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgIGlmKGEuc3RhcnRUaW1lIDwgYi5zdGFydFRpbWUpIHJldHVybiAtMTtcclxuICAgICAgICBpZihhLnN0YXJ0VGltZSA+IGIuc3RhcnRUaW1lKSByZXR1cm4gMTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KVxyXG4gICAgdGhpcy5pdGVtcy5uZXh0KFsuLi50aGlzLl9hbGxJdGVtc10pO1xyXG4gIH1cclxuXHJcbiAgZWRpdENhcmQoaWQ6c3RyaW5nLCBzdGFydFRpbWU6IERhdGUsIG1lYWw6IHN0cmluZywgbmFtZTogc3RyaW5nLCBub3RlOiBzdHJpbmcpe1xyXG4gICAgY29uc29sZS5sb2coXCJ0aW1lXCIsIHN0YXJ0VGltZSwgbmV3IERhdGUoc3RhcnRUaW1lKSlcclxuICAgIHRoaXMucHVibGlzaFVwZGF0ZXMoKTtcclxuICAgIHJldHVybiBmaXJlYmFzZS51cGRhdGUoXCIvY2FyZHMvXCIraWQrXCJcIix7XHJcbiAgICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZShzdGFydFRpbWUpLmdldFRpbWUoKSwgXHJcbiAgICAgICAgc2VsZWN0ZWREYXk6IG1lYWwsXHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBub3RlOiBub3RlXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6YW55KSB7XHJcbiAgICAgICAgICByZXR1cm4gJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBlZGl0ZWQgdGhpcyBjYXJkISc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlOmFueSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9KTsgIFxyXG4gIH1cclxuXHJcbn0iXX0=