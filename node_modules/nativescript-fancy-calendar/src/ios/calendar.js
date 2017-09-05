"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
var types_1 = require("utils/types");
var color_1 = require("tns-core-modules/color");
CGRectMake;
var SCROLL_ORIENTATION;
(function (SCROLL_ORIENTATION) {
    SCROLL_ORIENTATION[SCROLL_ORIENTATION["VERTICAL"] = FSCalendarScrollDirectionVertical] = "VERTICAL";
    SCROLL_ORIENTATION[SCROLL_ORIENTATION["HORIZONTAL"] = FSCalendarScrollDirectionHorizontal] = "HORIZONTAL";
})(SCROLL_ORIENTATION = exports.SCROLL_ORIENTATION || (exports.SCROLL_ORIENTATION = {}));
var DISPLAY_MODE;
(function (DISPLAY_MODE) {
    DISPLAY_MODE[DISPLAY_MODE["WEEK"] = FSCalendarScopeWeek] = "WEEK";
    DISPLAY_MODE[DISPLAY_MODE["MONTH"] = FSCalendarScopeMonth] = "MONTH";
})(DISPLAY_MODE = exports.DISPLAY_MODE || (exports.DISPLAY_MODE = {}));
var CalendarSubtitle = (function () {
    function CalendarSubtitle(subtitleDate, subtitleText) {
        this._date = subtitleDate;
        this._text = subtitleText;
    }
    Object.defineProperty(CalendarSubtitle.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (subtitleDate) {
            this._date = subtitleDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarSubtitle.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (subtitleText) {
            this._text = subtitleText;
        },
        enumerable: true,
        configurable: true
    });
    return CalendarSubtitle;
}());
exports.CalendarSubtitle = CalendarSubtitle;
var CalendarDelegate = (function (_super) {
    __extends(CalendarDelegate, _super);
    function CalendarDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarDelegate.initWithOwner = function (owner) {
        var delegate = CalendarDelegate.new();
        delegate._owner = owner;
        return delegate;
    };
    Object.defineProperty(CalendarDelegate.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        enumerable: true,
        configurable: true
    });
    CalendarDelegate.prototype.calendarDidSelectDateAtMonthPosition = function (calendar, date, monthPosition) {
        if (this._owner) {
            this._owner.get().dateSelectedEvent(date);
        }
    };
    CalendarDelegate.prototype.calendarDidDeselectDateAtMonthPosition = function (calendar, date, monthPosition) {
        if (this._owner) {
            this._owner.get().dateSelectedEvent(date);
        }
    };
    CalendarDelegate.prototype.calendarCurrentMonthDidChange = function (calendar) {
        if (this._owner) {
            this._owner.get().pageChanged(calendar);
        }
    };
    CalendarDelegate.prototype.calendarBoundingRectWillChangeAnimated = function (calendar, bounds, animated) {
        this._owner.get().displayModeChanged(bounds);
    };
    return CalendarDelegate;
}(NSObject));
CalendarDelegate.ObjCProtocols = [FSCalendarDelegate];
var CalendarDataSource = (function (_super) {
    __extends(CalendarDataSource, _super);
    function CalendarDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarDataSource.initWithOwner = function (owner) {
        var source = CalendarDataSource.new();
        source._owner = owner;
        return source;
    };
    CalendarDataSource.prototype.calendarSubtitleForDate = function (calendar, date) {
        if (this._owner)
            return this._owner.get().dateHasSubtitle(date);
        return undefined;
    };
    CalendarDataSource.prototype.maximumDateForCalendar = function (calendar) {
        var maximumDate = this._owner && this._owner.get().settings && types_1.isDefined(this._owner.get().settings.maximumDate) ? this._owner.get().settings.maximumDate : null;
        return maximumDate;
    };
    CalendarDataSource.prototype.minimumDateForCalendar = function (calendar) {
        var minimumDate = this._owner.get().settings && types_1.isDefined(this._owner.get().settings.minimumDate) ? this._owner.get().settings.minimumDate : null;
        return minimumDate;
    };
    CalendarDataSource.prototype.calendarNumberOfEventsForDate = function (calendar, date) {
        if (this._owner)
            return this._owner.get().dateHasEvent(date);
        return 0;
    };
    return CalendarDataSource;
}(NSObject));
CalendarDataSource.ObjCProtocols = [FSCalendarDataSource];
var Calendar = (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = _super.call(this) || this;
        _this.nativeView = FSCalendar.alloc().initWithFrame(CGRectMake(0, 0, 320, 300));
        _this._delegate = CalendarDelegate.initWithOwner(new WeakRef(_this));
        _this._dataSource = CalendarDataSource.initWithOwner(new WeakRef(_this));
        _this._calendarHeightConstraint = new NSLayoutConstraint();
        _this.appearance = {
            weekdayTextColor: "black",
            headerTitleColor: "black",
            eventColor: "red",
            selectionColor: "blue",
            todayColor: "yellow",
            todaySelectionColor: "orange",
            borderRadius: 25
        };
        _this.settings = {
            displayMode: DISPLAY_MODE.MONTH,
            scrollOrientation: SCROLL_ORIENTATION.HORIZONTAL,
            selectionMode: common_1.SELECTION_MODE.SINGLE,
            firstWeekday: 3,
            maximumDate: undefined,
            minimumDate: undefined
        };
        return _this;
    }
    Object.defineProperty(Calendar.prototype, "ios", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    Calendar.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        if (this.height) {
            this.nativeView.frame.size.height = this.height;
            this.nativeView.frame.size.height = this.height;
        }
        if (this.width) {
            this.nativeView.frame.size.width = this.width;
            this.nativeView.frame.size.width = this.width;
        }
        this.nativeView.delegate = this._delegate;
        this.nativeView.dataSource = this._dataSource;
    };
    Calendar.prototype.onUnloaded = function () {
    };
    Calendar.prototype.disposeNativeView = function () {
    };
    Object.defineProperty(Calendar.prototype, "calendarHeightConstraint", {
        get: function () {
            return this._calendarHeightConstraint;
        },
        enumerable: true,
        configurable: true
    });
    Calendar.prototype.setSalendarHeightConstraint = function (height) {
        this._calendarHeightConstraint.constant = height;
    };
    Calendar.prototype[common_1.settingsProperty.setNative] = function (newSettings) {
        console.dir(newSettings);
        this.nativeView.setScopeAnimated(newSettings.displayMode, true);
        this.nativeView.allowsMultipleSelection = newSettings.selectionMode === common_1.SELECTION_MODE.MULTIPLE ? true : false;
        this.nativeView.scrollDirection = newSettings.scrollOrientation === 0 ? SCROLL_ORIENTATION.VERTICAL : SCROLL_ORIENTATION.HORIZONTAL;
        var firstWeekdayTemp = newSettings.firstWeekday <= 7 && newSettings.firstWeekday > 0 ? newSettings.firstWeekday : 1;
        this.nativeView.firstWeekday = firstWeekdayTemp;
    };
    Calendar.prototype[common_1.appearanceProperty.setNative] = function (newAppearanceValue) {
        console.dir(newAppearanceValue);
        this.nativeView.appearance.weekdayTextColor = new color_1.Color(newAppearanceValue.weekdayTextColor).ios;
        this.nativeView.appearance.headerTitleColor = new color_1.Color(newAppearanceValue.headerTitleColor).ios;
        this.nativeView.appearance.eventColor = new color_1.Color(newAppearanceValue.eventColor).ios;
        this.nativeView.appearance.selectionColor = new color_1.Color(newAppearanceValue.selectionColor).ios;
        this.nativeView.appearance.todayColor = new color_1.Color(newAppearanceValue.todayColor).ios;
        this.nativeView.appearance.todaySelectionColor = new color_1.Color(newAppearanceValue.todaySelectionColor).ios;
        this.nativeView.appearance.borderRadius = newAppearanceValue.borderRadius;
        this.nativeView.clipsToBounds = newAppearanceValue.hasBorder;
    };
    Object.defineProperty(Calendar.prototype, "subtitles", {
        set: function (calendarSubtitles) {
            if (this._subtitles !== calendarSubtitles) {
                this._subtitles = calendarSubtitles;
            }
        },
        enumerable: true,
        configurable: true
    });
    Calendar.prototype.dateSelectedEvent = function (date) {
        this.notify({
            eventName: common_1.NSEvents.dateSelected,
            object: this,
            data: date
        });
    };
    Calendar.prototype.pageChanged = function (calendar) {
        this.notify({
            eventName: common_1.NSEvents.monthChanged,
            object: this,
            data: calendar
        });
    };
    Calendar.prototype.dateHasEvent = function (date) {
        var countEventsDate = 0;
        var _that = this;
        this.events.forEach(function (event) {
            if (_that.isSameDate(date, event.date)) {
                countEventsDate++;
            }
        });
        return countEventsDate;
    };
    Calendar.prototype[common_1.eventsProperty.setNative] = function (newEvents) {
        this.nativeView.dataSource = CalendarDataSource.initWithOwner(new WeakRef(this));
    };
    Calendar.prototype.dateHasEventImage = function (date) {
        var i = 0, found = undefined;
        while (!found && i < this.events.length) {
            if (this.isSameDate(date, this.events[i].date) && this.events[i].source) {
                found = this.events[i].source;
            }
            i++;
        }
        return found;
    };
    Calendar.prototype.dateHasSubtitle = function (date) {
        var found = undefined;
        if (this._subtitles) {
            var i = 0;
            while (!found && i < this._subtitles.length) {
                if (this.isSameDate(date, this._subtitles[i].date)) {
                    found = this._subtitles[i].text;
                }
                i++;
            }
        }
        return found;
    };
    Calendar.prototype.isSameDate = function (dateOne, dateTwo) {
        return dateOne.getMonth() === dateTwo.getMonth() && dateOne.getDay() === dateTwo.getDay() && dateOne.getYear() === dateTwo.getYear() && dateOne.getDate() === dateTwo.getDate();
    };
    Calendar.prototype.reload = function () {
        this.nativeView.reloadData();
    };
    Calendar.prototype.displayModeChanged = function (bounds) {
        this.notify({
            eventName: common_1.NSEvents.displayModeChanged,
            object: this,
            data: bounds
        });
    };
    return Calendar;
}(common_1.CalendarBase));
exports.Calendar = Calendar;
