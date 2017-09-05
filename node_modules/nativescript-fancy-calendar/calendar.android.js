"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./src/common"));
__export(require("./src/android/calendar"));
var MaterialCalendar = com.prolificinteractive.materialcalendarview, MaterialCalendarMode = MaterialCalendar.CalendarMode, MaterialCalendarView = MaterialCalendar.MaterialCalendarView;
var DISPLAY_MODE;
(function (DISPLAY_MODE) {
    DISPLAY_MODE[DISPLAY_MODE["WEEK"] = MaterialCalendarMode.WEEKS] = "WEEK";
    DISPLAY_MODE[DISPLAY_MODE["MONTH"] = MaterialCalendarMode.MONTHS] = "MONTH";
})(DISPLAY_MODE = exports.DISPLAY_MODE || (exports.DISPLAY_MODE = {}));
var SCROLL_ORIENTATION;
(function (SCROLL_ORIENTATION) {
    SCROLL_ORIENTATION[SCROLL_ORIENTATION["VERTICAL"] = MaterialCalendarView.VERTICAL] = "VERTICAL";
    SCROLL_ORIENTATION[SCROLL_ORIENTATION["HORIZONTAL"] = MaterialCalendarView.HORIZONTAL] = "HORIZONTAL";
})(SCROLL_ORIENTATION = exports.SCROLL_ORIENTATION || (exports.SCROLL_ORIENTATION = {}));
