Object.defineProperty(exports, "__esModule", { value: true });
var legendViewCommonModule = require("./chart-legend-view-common");
var chartModule = require("../../chart-common");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
var utilsModule = require("tns-core-modules/utils/utils");
var style_properties_1 = require("tns-core-modules/ui/styling/style-properties");
var RadLegendView = (function (_super) {
    __extends(RadLegendView, _super);
    function RadLegendView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RadLegendView.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadLegendView.prototype.updateLegendView = function (chartView) {
        if (!(chartView)) {
            return;
        }
        if (!(chartView instanceof chartModule.RadChartBase)) {
            return;
        }
        if (!chartView._context) {
            return;
        }
        if (!this.position) {
            return;
        }
        if (!this._android) {
            this._android = new com.telerik.widget.primitives.legend.RadLegendView(chartView._context);
        }
        if (!this._chart) {
            this._chart = chartView;
        }
        this._android.setLegendProvider(chartView['androidView']);
        var parent = this._android.getParent();
        if (parent) {
            parent.removeView(this._android);
        }
        var lParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        var cParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        chartView['androidView'].setId(android.view.View.generateViewId());
        this._android.setId(android.view.View.generateViewId());
        var widthPixels = style_properties_1.PercentLength.toDevicePixels(this.width, 0, this._android.getWidth());
        var heightPixels = style_properties_1.PercentLength.toDevicePixels(this.height, 0, this._android.getHeight());
        switch (this.position.toLowerCase()) {
            case chart_public_enum_1.ChartLegendPosition.Left.toLowerCase():
                if (isNaN(+widthPixels)) {
                    console.log("WARNING: Width property is required if legend position is set to left.");
                }
                lParams.width = widthPixels;
                lParams.height = (!isNaN(heightPixels) && heightPixels > 0 ? heightPixels : android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                lParams.addRule(android.widget.RelativeLayout.CENTER_VERTICAL);
                cParams.width = android.widget.RelativeLayout.LayoutParams.FILL_PARENT;
                cParams.height = android.widget.RelativeLayout.LayoutParams.FILL_PARENT;
                cParams.addRule(android.widget.RelativeLayout.RIGHT_OF, this._android.getId());
                cParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                break;
            case chart_public_enum_1.ChartLegendPosition.Right.toLowerCase():
                if (isNaN(+widthPixels)) {
                    console.log("WARNING: Width property is required if legend position is set to right.");
                }
                lParams.width = widthPixels;
                lParams.height = (!isNaN(heightPixels) && heightPixels > 0 ? heightPixels : android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT, this._android.getId());
                lParams.addRule(android.widget.RelativeLayout.CENTER_VERTICAL);
                cParams.width = android.widget.RelativeLayout.LayoutParams.FILL_PARENT;
                cParams.height = android.widget.RelativeLayout.LayoutParams.FILL_PARENT;
                cParams.addRule(android.widget.RelativeLayout.LEFT_OF, this._android.getId());
                cParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                break;
            case chart_public_enum_1.ChartLegendPosition.Top.toLowerCase():
                lParams.width = android.widget.RelativeLayout.LayoutParams.MATCH_PARENT;
                lParams.height = (!isNaN(heightPixels) && heightPixels > 0 ? heightPixels : android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                cParams.addRule(android.widget.RelativeLayout.BELOW, this._android.getId());
                break;
            case chart_public_enum_1.ChartLegendPosition.Bottom.toLowerCase():
                lParams.width = android.widget.RelativeLayout.LayoutParams.MATCH_PARENT;
                lParams.height = (!isNaN(heightPixels) && heightPixels > 0 ? heightPixels : android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                cParams.addRule(android.widget.RelativeLayout.ABOVE, this._android.getId());
                break;
            case chart_public_enum_1.ChartLegendPosition.Floating.toLowerCase():
                var params = this.getFloatingPositionParams();
                lParams = params.legendParam;
                cParams = params.chartParam;
                break;
        }
        chartView['androidView'].setLayoutParams(cParams);
        this._android.setLayoutParams(lParams);
        chartView.rootLayout.addView(this._android);
    };
    RadLegendView.prototype.getFloatingPositionParams = function () {
        var lParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        var cParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        var vertOff = utilsModule.layout.toDeviceIndependentPixels(this.verticalOffset);
        var horzOff = utilsModule.layout.toDeviceIndependentPixels(this.horizontalOffset);
        switch (this.offsetOrigin.toLowerCase()) {
            case chart_public_enum_1.ChartLegendOffsetOrigin.TopRight.toLowerCase():
                lParams.setMargins(0, vertOff, horzOff, 0);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                break;
            case chart_public_enum_1.ChartLegendOffsetOrigin.BottomLeft.toLowerCase():
                lParams.setMargins(horzOff, 0, 0, vertOff);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                break;
            case chart_public_enum_1.ChartLegendOffsetOrigin.BottomRight.toLowerCase():
                lParams.setMargins(0, 0, horzOff, vertOff);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                break;
            case chart_public_enum_1.ChartLegendOffsetOrigin.TopLeft.toLowerCase():
            default:
                lParams.setMargins(horzOff, vertOff, 0, 0);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                lParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                break;
        }
        var widthPixels = style_properties_1.PercentLength.toDevicePixels(this.width, 0, this._android.getWidth());
        var heightPixels = style_properties_1.PercentLength.toDevicePixels(this.height, 0, this._android.getHeight());
        if (isNaN(widthPixels) || widthPixels === 0) {
            console.log("WARNING: Width property is required if legend position is set to Floating.");
        }
        lParams.width = widthPixels;
        lParams.height = (!isNaN(heightPixels) && heightPixels > 0 ? heightPixels : android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        cParams.width = android.widget.RelativeLayout.LayoutParams.MATCH_PARENT;
        cParams.height = android.widget.RelativeLayout.LayoutParams.MATCH_PARENT;
        return { legendParam: lParams, chartParam: cParams };
    };
    RadLegendView.prototype.onTitleChanged = function (oldValue, newValue) {
        console.log("WARNING: Android chart legend doesn't support 'title' property.");
    };
    RadLegendView.prototype.onPositionChanged = function (oldValue, newValue) {
        this.updateLegendView(this._chart);
    };
    RadLegendView.prototype.onOffsetOriginChanged = function (oldValue, newValue) {
        this.updateLegendView(this._chart);
    };
    RadLegendView.prototype.onHorizontalOffsetChanged = function (oldValue, newValue) {
        this.updateLegendView(this._chart);
    };
    RadLegendView.prototype.onVerticalOffsetChanged = function (oldValue, newValue) {
        this.updateLegendView(this._chart);
    };
    return RadLegendView;
}(legendViewCommonModule.RadLegendView));
exports.RadLegendView = RadLegendView;
