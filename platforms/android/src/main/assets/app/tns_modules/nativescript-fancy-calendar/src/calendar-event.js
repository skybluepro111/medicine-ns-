"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CalendarEvent = (function () {
    function CalendarEvent(eventDate, eventSource) {
        this._date = eventDate;
        if (eventSource) {
            this._source = eventSource;
        }
    }
    Object.defineProperty(CalendarEvent.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (eventDate) {
            this._date = eventDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "source", {
        get: function () {
            return this._source;
        },
        set: function (eventSource) {
            this._source = eventSource;
        },
        enumerable: true,
        configurable: true
    });
    return CalendarEvent;
}());
exports.CalendarEvent = CalendarEvent;
