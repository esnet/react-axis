"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require("react-addons-css-transition-group");

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _d3Scale = require("d3-scale");

var _Tick = require("./Tick");

var _Tick2 = _interopRequireDefault(_Tick);

var _durationFormat = require("./formatters/duration-format");

var _durationFormat2 = _interopRequireDefault(_durationFormat);

var _timeFormat = require("./formatters/time-format");

var _timeFormat2 = _interopRequireDefault(_timeFormat);

require("./Axis.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

var moment = require("moment");

require("moment-timezone");

var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;
var durationDecade = durationYear * 10;

var majors = {
    "second": "minute",
    "minute": "hour",
    "hour": "day",
    "day": "month",
    "week": "month",
    "month": "year",
    "year": "year"
};

var tickIntervals = [[durationSecond, "second", 1], [5 * durationSecond, "second", 5], [15 * durationSecond, "second", 15], [30 * durationSecond, "second", 30], [durationMinute, "minute", 1], [5 * durationMinute, "minute", 5], [15 * durationMinute, "minute", 15], [30 * durationMinute, "minute", 30], [durationHour, "hour", 1], [3 * durationHour, "hour", 3], [6 * durationHour, "hour", 6], [12 * durationHour, "hour", 12], [durationDay, "day", 1], [2 * durationDay, "day", 2], [3 * durationDay, "day", 3], [4 * durationDay, "day", 4], [5 * durationDay, "day", 5], [durationWeek, "week", 1], [durationMonth, "month", 1], [3 * durationMonth, "month", 3], [durationYear, "year", 1], [durationDecade, "year", 10]];

/**
 * A TimeAxis component rendered into SVG. The component can be aligned using the
 * `position` prop to the top or bottom.
 *
 * Scaling of the axis is done with the `beginTime` and `endTime` props. These
 * are Javascript Date objects.
 *
 * Overall size of the SVG component is done with `width` and `height`.
 *
 * The `TimeAxis` has support for rendering in any timezone using the `timezone`
 * props. It defaults to local time.
 *
 * For example:
 * ```
 *  <TimeAxis
 *      beginTime={beginTime}
 *      endTime={endTime}
 *      timezone="America/Chicago"
 *      position="bottom"
 *      width={800}
 *      height={50}
 *  />
 * ```
 *
 * The format of the axis labels has an appropiate default. However, you
 * can use the `format` props to gain additional control, either with
 * some built in formats or by supplying a function.
 *
 */
exports.default = _react2.default.createClass({

    displayName: "TimeAxis",

    getDefaultProps: function getDefaultProps() {
        return {
            width: 100,
            height: 100,
            tickCount: 10,
            tickMajor: 20,
            tickMinor: 14,
            tickExtend: 0,
            margin: 10,
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
         * The title of the axis to render.
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
         * The format for the tick labels.
         *
         * The default it to compute this automatically. You can also specify this
         * as a string or function.
         *
         * Six special options exist, specified as a string: setting format to:
         *  * "second",
         *  * "hour"
         *  * "day"
         *  * "month"
         *  * "year"
         *
         * will show only ticks on those, and every one of those intervals.
         *
         * For example maybe you are showing a bar chart for October 2014 then setting
         * the format to "day" will insure that a label is placed for each and every day,
         * all 31 of them. Be careful though, it's easy to add too many labels this way.
         *
         * The last string option is:
         *  * "duration".
         *
         * This interprets the time as a duration. This is good for data that is
         * specified relative to its start time, rather than as an actual date/time.
         *
         * Finally, format can also be a function. The function will be passed the date
         * it is rendering. It expects the return result to be a an object describing
         * the resulting tick. For example:
         *
         * ```js
         *     format = (d) => ({
         *         label: moment(d).format(h:mm a),
         *         size: 15,
         *         labelAlign: "adjacent"
         *     });
         * ```
         */
        format: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.oneOf(["second", "minute", "hour", "day", "month", "year", "decade", "duration"]), _react2.default.PropTypes.func]),

        /**
         * The size of each minor tick mark.
         */
        tickMinor: _react2.default.PropTypes.number,

        /**
         * The size of each major tick mark.
         */
        tickMajor: _react2.default.PropTypes.number,

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
        var formatter = this.props.format;
        var timezone = this.props.timezone;

        // A duration format is relative to UTC for the purposes
        // of tick alignment
        var formatAsDuration = this.props.format === "duration";
        if (formatAsDuration) {
            timezone = "Etc/UTC";
        }

        var interval = 5; //this.props.interval

        var scale = (0, _d3Scale.scaleTime)().domain([this.props.beginTime, this.props.endTime]).range([this.props.margin, this.props.width - this.props.margin * 2]);

        var start = +this.props.beginTime;
        var stop = +this.props.endTime;
        var target = Math.abs(stop - start) / interval;

        // Determine the time unit of the spacing of ticks,
        // either because it's explicitly defined as the format
        // (day, month, year, etc), or using our tickInterval
        // lookup
        var type = void 0,
            num = void 0;
        if (_underscore2.default.isString(formatter) && !(formatter == "duration" || formatter == "decade")) {
            type = formatter;
            num = 1;
        } else {
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
        }

        // Formatter will be a function (date) => string, or
        // a string format type. In the case of the string type
        // that might be "duration", or "minutes", "day", etc.
        if (typeof this.props.format === 'function') {
            formatter = this.props.format;
        } else if (formatAsDuration) {
            formatter = (0, _durationFormat2.default)();
        } else {
            formatter = (0, _timeFormat2.default)(type, timezone);
        }

        var starttz = timezone ? moment(start).tz(timezone) : moment(start); // begin time
        var stoptz = timezone ? moment(stop).tz(timezone) : moment(stop); // end time

        // We want to align our minor ticks to our major ones.
        // For instance if we are showing 3 hour minor ticks then we
        // want to them to be 12am, 3am, etc (not 11pm, 2am, etc)
        var startd = void 0;
        var stopd = void 0;
        if (this.props.format === "decade") {
            // sets start and stop closest to the nearest 100
            // example : 1981 would set to 1980, 2009 would set to 2010
            startd = starttz.set('year', Math.floor(starttz.year() / 10) * 10);
            stopd = stoptz.set('year', Math.ceil(stoptz.year() / 10) * 10);
        } else {
            startd = starttz.startOf(majors[type]).add(num, "type");
            stopd = stoptz.endOf(type);
        }

        var i = 0;
        var d = startd;
        var ticks = [];
        while (d.isBefore(stopd)) {
            var date = d.toDate();
            var pos = scale(date);

            var _formatter = formatter(date),
                label = _formatter.label,
                size = _formatter.size,
                labelAlign = _formatter.labelAlign;

            if (d >= start && d < stop) {
                ticks.push(_react2.default.createElement(_Tick2.default, {
                    key: +d,
                    id: i,
                    align: this.props.position,
                    label: label,
                    size: size,
                    position: pos,
                    extend: this.props.tickExtend,
                    labelAlign: labelAlign,
                    width: this.props.width,
                    height: this.props.height }));
            }
            d = d.add(num, type);
            i++;
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
                {
                    component: "g",
                    transitionName: "ticks",
                    transitionEnterTimeout: 500,
                    transitionLeaveTimeout: 500 },
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