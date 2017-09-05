"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
var color_1 = require("tns-core-modules/color");
var MaterialCalendar = com.prolificinteractive.materialcalendarview, MaterialCalendarView = MaterialCalendar.MaterialCalendarView, MaterialCalendarOnDateSelectedListener = MaterialCalendar.OnDateSelectedListener, MaterialCalendarOnMonthChangedListener = MaterialCalendar.OnMonthChangedListener, MaterialCalendarMode = MaterialCalendar.CalendarMode, MaterialCalendarDecorator = MaterialCalendar.DayViewDecorator, MaterialCalendarDot = MaterialCalendar.spans.DotSpan, MaterialCalendarDay = MaterialCalendar.CalendarDay;
var Calendar = (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Calendar.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    Calendar.prototype.createNativeView = function () {
        var nativeView = new MaterialCalendarView(this._context);
        this.appearance = {
            weekdayTextColor: "black",
            headerTitleColor: "black",
            eventColor: "red",
            selectionColor: "blue",
            todayColor: "yellow",
            todaySelectionColor: "orange",
            borderRadius: 25
        };
        nativeView.setHeaderTextAppearance(android.R.style.TextAppearance_AppCompat_Medium);
        nativeView.setWeekDayTextAppearance(android.R.style.TextAppearance_AppCompat_Medium);
        nativeView.setDateTextAppearance(android.R.style.CustomDayTextAppearance);
        var _that = new WeakRef(this);
        var selectedDateListener = new MaterialCalendarOnDateSelectedListener({
            get owner() {
                return _that.get();
            },
            onDateSelected: function (widget, date, selected) {
                this.owner.notify({
                    eventName: common_1.NSEvents.dateSelected,
                    object: _that,
                    data: { date: date, selected: selected }
                });
            }
        });
        nativeView.setOnDateChangedListener(selectedDateListener);
        var selectedMonthListener = new MaterialCalendarOnMonthChangedListener({
            get owner() {
                return _that.get();
            },
            onMonthChanged: function (widget, date) {
                this.owner.notify({
                    eventName: common_1.NSEvents.monthChanged,
                    object: _that,
                    data: date
                });
            }
        });
        nativeView.setOnMonthChangedListener(selectedMonthListener);
        return nativeView;
    };
    Calendar.prototype[common_1.appearanceProperty.setNative] = function (newAppearanceValue) {
        this.nativeView.setArrowColor(new color_1.Color(newAppearanceValue.headerTitleColor).android);
        this.nativeView.removeDecorators();
        this.addDecoratorDot(newAppearanceValue.eventColor);
        this.nativeView.setSelectionColor(new color_1.Color(newAppearanceValue.selectionColor).android);
        if (!newAppearanceValue.todaySelectionColor) {
            newAppearanceValue.todaySelectionColor = newAppearanceValue.selectionColor;
        }
        if (!newAppearanceValue.borderRadius) {
            newAppearanceValue.borderRadius = 50;
        }
        this.nativeView.removeDecorators();
        this.addDecoratorToday(new Date(), newAppearanceValue.todayColor, newAppearanceValue.todaySelectionColor, newAppearanceValue.borderRadius);
        this.addDecoratorDot(this.appearance.eventColor);
    };
    Calendar.prototype[common_1.settingsProperty.setNative] = function (newSettings) {
        var oldSettings = this.settings;
        this.nativeView.state().edit()
            .setCalendarDisplayMode(newSettings.displayMode)
            .commit();
        this.nativeView.setSelectionMode(newSettings.selectionMode);
        this.nativeView.setTitleAnimationOrientation(newSettings.scrollOrientation);
        var firstWeekdayTemp = newSettings.firstWeekday <= 7 && newSettings.firstWeekday > 0 ? newSettings.firstWeekday : 1;
        this.nativeView.state().edit()
            .setFirstDayOfWeek(firstWeekdayTemp)
            .commit();
        var calendarMaxDate = newSettings.maximumDate;
        this.nativeView.state().edit()
            .setMaximumDate(new MaterialCalendarDay(calendarMaxDate.getFullYear(), calendarMaxDate.getMonth(), calendarMaxDate.getDate()))
            .commit();
        var calendarMinDate = newSettings.minimumDate;
        this.nativeView.state().edit()
            .setMinimumDate(new MaterialCalendarDay(calendarMinDate.getFullYear(), calendarMinDate.getMonth(), calendarMinDate.getDate()))
            .commit();
    };
    Calendar.prototype[common_1.eventsProperty.setNative] = function (newEvents) {
        this.nativeView.removeDecorators();
        this.addDecoratorDot(this.appearance.eventColor);
    };
    Calendar.prototype.addDecoratorToday = function (date, colorBackgroundValue, colorSelectionValue, borderRadiusValue) {
        var _this = this;
        var _that = this;
        this.nativeView.addDecorator(new MaterialCalendarDecorator({
            shouldDecorate: function (day) {
                var should = false;
                if (_this.isSameDate(day, date)) {
                    should = true;
                }
                return should;
            },
            decorate: function (view) {
                var newBackgroundColor = colorBackgroundValue === "" ? new color_1.Color("red").android : new color_1.Color(colorBackgroundValue).android;
                var newSelectionColor = colorSelectionValue === "" ? new color_1.Color("blue").android : new color_1.Color(colorSelectionValue).android;
                var highlightDrawable = new android.graphics.drawable.GradientDrawable();
                var setSelectionDrawable = new android.graphics.drawable.GradientDrawable();
                highlightDrawable.setCornerRadius(borderRadiusValue * 2);
                highlightDrawable.setColor(newBackgroundColor);
                highlightDrawable.setSize(40, 40);
                highlightDrawable.getPadding(new android.graphics.Rect(10, 10, 10, 10));
                setSelectionDrawable.setCornerRadius(borderRadiusValue * 2);
                setSelectionDrawable.setColor(newSelectionColor);
                setSelectionDrawable.setSize(40, 40);
                setSelectionDrawable.getPadding(new android.graphics.Rect(10, 10, 10, 10));
                view.setBackgroundDrawable(highlightDrawable);
                view.setSelectionDrawable(setSelectionDrawable);
            }
        }));
    };
    Calendar.prototype.addDecoratorDot = function (colorValue) {
        var _this = this;
        var _that = this;
        this.nativeView.addDecorator(new MaterialCalendarDecorator({
            shouldDecorate: function (day) {
                var should = false;
                if (_this.events) {
                    var i = 0;
                    while (!should && i < _this.events.length) {
                        if (_that.isSameDate(day, _this.events[i].date)) {
                            should = true;
                        }
                        i++;
                    }
                }
                return should;
            },
            decorate: function (view) {
                var newColor;
                if (colorValue === "") {
                    newColor = new color_1.Color("green").android;
                }
                else {
                    newColor = new color_1.Color(colorValue).android;
                }
                view.addSpan(new MaterialCalendarDot(5, newColor));
            }
        }));
    };
    Calendar.prototype.dateHasEvent = function (date) {
        var i = 0, found = false;
        while (!found && i < this.events.length) {
            if (this.isSameDate(date, this.events[i].date)) {
                found = true;
            }
            i++;
        }
        return found;
    };
    Calendar.prototype.isSameDate = function (dateOne, dateTwo) {
        return dateOne.getMonth() === dateTwo.getMonth() && dateOne.getDay() === dateTwo.getDate();
    };
    return Calendar;
}(common_1.CalendarBase));
exports.Calendar = Calendar;
