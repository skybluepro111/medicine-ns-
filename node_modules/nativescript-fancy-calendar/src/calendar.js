"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var properties_1 = require("tns-core-modules/ui/core/properties");
exports.NSEvents = {
    dateSelected: "dateSelected",
    monthChanged: "monthChanged",
    displayModeChanged: "displayModeChanged"
};
var CalendarBase = (function (_super) {
    __extends(CalendarBase, _super);
    function CalendarBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CalendarBase;
}(view_1.View));
exports.CalendarBase = CalendarBase;
exports.settingsProperty = new properties_1.Property({
    name: "settings",
    valueChanged: function (target, oldValue, newValue) {
        console.dir(oldValue);
        console.dir(newValue);
    },
    valueConverter: function (value) {
        console.dir(value);
        return value;
    }
});
exports.settingsProperty.register(CalendarBase);
exports.appearanceProperty = new properties_1.Property({
    name: "appearance"
});
exports.appearanceProperty.register(CalendarBase);
exports.eventsProperty = new properties_1.Property({
    name: "events"
});
exports.eventsProperty.register(CalendarBase);
