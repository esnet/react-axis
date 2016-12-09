"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  Copyright (c) 2016, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require("react-addons-css-transition-group");

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _d3Scale = require("d3-scale");

var _Tick = require("./Tick");

var _Tick2 = _interopRequireDefault(_Tick);

require("./Axis.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require("moment");
require("moment-timezone");

var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

var formatterMap = {
    second: ":ss",
    minute: "h:mm a",
    hour: "h a",
    day: "ddd DD",
    week: "MMM DD",
    month: "MMM",
    year: "Y"
};

var tickIntervals = [[durationSecond, "second", 1], [5 * durationSecond, "second", 5], [15 * durationSecond, "second", 15], [30 * durationSecond, "second", 30], [durationMinute, "minute", 1], [5 * durationMinute, "minute", 5], [15 * durationMinute, "minute", 15], [30 * durationMinute, "minute", 30], [durationHour, "hour", 1], [3 * durationHour, "hour", 3], [6 * durationHour, "hour", 6], [12 * durationHour, "hour", 12], [durationDay, "day", 1], [2 * durationDay, "day", 2], [3 * durationDay, "day", 3], [4 * durationDay, "day", 4], [5 * durationDay, "day", 5], [durationWeek, "week", 1], [durationMonth, "month", 1], [3 * durationMonth, "month", 3], [durationYear, "year", 1]];

/**
 * A basic Axis component rendered into SVG. The component can be aligned using the
 * `position` prop, to display it above, below, left or right of a chart or other
 * visualization. Scaling of the axis is done with the `min` and `max` props. The scale
 * type can be "linear" or "log", controlled with the `type` prop.
 *
 * Overall size of the SVG component is done with `width` and `height`. You can also control
 * the number of ticks with `tickCount` (for linear scales), the size of the ticks with
 * `tickSize`.
 */
exports.default = _react2.default.createClass({

    displayName: "TimeAxis",

    getDefaultProps: function getDefaultProps() {
        return {
            width: 100,
            height: 100,
            tickCount: 10,
            tickSize: 5,
            tickExtend: 0,
            margin: 10,
            type: "linear",
            exponent: 2,
            standalone: false,
            labelPosition: 50,
            labelStyle: {
                fill: "grey",
                stroke: "none",
                pointerEvents: "none"
            },
            absolute: false
        };
    },


    propTypes: {

        align: _react2.default.PropTypes.oneOf(["center", "left"]),

        /**
         * The label to render.
         */
        label: _react2.default.PropTypes.string,

        /**
         * The width of the rectangle to render into.
         */
        width: _react2.default.PropTypes.number,

        /**
         * The height of the rectangle to render into.
         */
        height: _react2.default.PropTypes.number,

        /**
         * The type of the scale: "linear", "log" or "power".
         */
        type: _react2.default.PropTypes.oneOf(["linear", "log", "power"]),

        /**
         * The exponent if a power scale is used.
         */
        exponent: _react2.default.PropTypes.number,

        /**
         * The d3 format for the tick labels. The default it to
         * compute this automatically from the scale.
         */
        format: _react2.default.PropTypes.string,

        /**
         * Apply abs(value) to all values.
         */
        absolute: _react2.default.PropTypes.bool,

        /**
         * The size of each tick mark.
         */
        tickSize: _react2.default.PropTypes.number,

        /**
         * Extend the tick marks away from the tick label
         * by this amount. This can be used to provide a grid
         * line for each tick.
         */
        tickExtend: _react2.default.PropTypes.number
    },

    renderAxisLabel: function renderAxisLabel() {
        var _props = this.props,
            width = _props.width,
            height = _props.height,
            position = _props.position,
            labelPosition = _props.labelPosition,
            labelStyle = _props.labelStyle;

        var translate = void 0;
        var rotate = "rotate(0)";
        var anchor = "start";
        switch (position) {
            case "left":
                translate = "translate(" + (width - labelPosition) + ",5)";
                rotate = "rotate(-90)";
                anchor = "end";
                break;
            case "right":
                translate = "translate(" + labelPosition + ",5)";
                rotate = "rotate(-90)";
                anchor = "end";
                break;
            case "top":
                translate = "translate(5, " + (height - labelPosition) + ")";
                break;
            case "bottom":
                translate = "translate(5, " + labelPosition + ")";
                break;
            default:
            //pass
        }
        return _react2.default.createElement(
            "g",
            { transform: translate },
            _react2.default.createElement(
                "text",
                {
                    transform: rotate,
                    textAnchor: anchor,
                    style: labelStyle },
                this.props.label
            )
        );
    },
    renderAxisLine: function renderAxisLine() {
        var p = this.props.position;
        return _react2.default.createElement("line", {
            key: "axis",
            className: "axis",
            style: { stroke: "#AAA", strokeWidth: 2 },
            x1: this.props.margin,
            y1: p === "bottom" ? 0 : this.props.height,
            x2: this.props.width - this.props.margin,
            y2: p === "bottom" ? 0 : this.props.height });
    },
    renderAxisTicks: function renderAxisTicks() {
        var TZ = this.props.timezone;
        // const p = this.props.position;
        var interval = 5; //this.props.interval

        var scale = (0, _d3Scale.scaleTime)().domain([this.props.beginTime, this.props.endTime]).range([0, this.props.width - this.props.margin * 2]);

        var start = +this.props.beginTime;
        var stop = +this.props.endTime;
        var target = Math.abs(stop - start) / interval;

        var type = void 0,
            num = void 0; //, duration;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = tickIntervals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 3),
                    _d = _step$value[0],
                    t = _step$value[1],
                    n = _step$value[2];

                if (target < _d) break;
                type = t;
                num = n;
                //duration = d;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var majors = {
            "second": "minute",
            "minute": "hour",
            "hour": "day",
            "day": "month",
            "week": "month",
            "month": "year",
            "year": "year"
        };

        var formatter = function formatter(v) {
            var t = type;
            if (moment(v).tz(TZ).startOf(majors[type]).isSame(moment(v).tz(TZ))) {
                t = majors[type];
            }
            return moment(v).tz(TZ).format(formatterMap[t]);
        };

        var starttz = moment(start).tz(TZ);
        var stoptz = moment(stop).tz(TZ);
        var startd = starttz.startOf(majors[type]).add(num, "type");
        var stopd = stoptz.startOf(type);

        var d = startd;
        var tickIndex = 0;
        var ticks = [];

        while (d.isBefore(stopd)) {
            d = d.add(num, type);
            var tickValue = d.toDate();
            var tickPosition = scale(tickValue);
            if (d > start && d < stop) {
                var tickSize = moment(d).tz(TZ).startOf(majors[type]).isSame(moment(d).tz(TZ)) ? 20 : 15;

                ticks.push(_react2.default.createElement(_Tick2.default, {
                    key: +d,
                    align: this.props.position,
                    tickFormat: formatter,
                    tickValue: tickValue,
                    tickPosition: tickPosition,
                    tickIndex: tickIndex,
                    tickSize: tickSize,
                    tickExtend: this.props.tickExtend,
                    labelAlign: "adjacent",
                    width: this.props.width,
                    height: this.props.height }));
            }

            tickIndex++;
        }
        return ticks;
    },
    renderAxis: function renderAxis() {
        return _react2.default.createElement(
            "g",
            null,
            this.renderAxisLine(),
            _react2.default.createElement(
                _reactAddonsCssTransitionGroup2.default,
                { component: "g", transitionName: "ticks", transitionEnterTimeout: 500, transitionLeaveTimeout: 500 },
                this.renderAxisTicks()
            ),
            this.renderAxisLabel()
        );
    },
    render: function render() {
        if (this.props.standalone) {
            return _react2.default.createElement(
                "svg",
                { height: this.props.height, width: this.props.width, style: { shapeRendering: "crispEdges" } },
                this.renderAxis()
            );
        } else {
            return this.renderAxis();
        }
    }
});