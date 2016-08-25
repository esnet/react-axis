"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require("react-addons-css-transition-group");

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _d3Format = require("d3-format");

var _d3Scale = require("d3-scale");

require("./Axis.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tick = _react2.default.createClass({
    displayName: "Tick",
    renderVerticalTick: function renderVerticalTick(i, t, x, fmt, isTop) {

        var textStyle = {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };

        console.log(i, t, x, isTop, "translate(" + x + "px, " + (isTop ? this.props.height : 0) + "px)");

        return _react2.default.createElement(
            "g",
            {
                className: "tick-grp",
                style: {
                    transform: "translate(" + x + "px, " + (isTop ? this.props.height : 0) + "px)"
                },
                key: "marker-" + fmt(t) },
            _react2.default.createElement("line", {
                className: "tick-mark",
                key: "tick-" + t,
                style: { stroke: "#AAA", strokeWidth: 0.5 },
                x1: 0, y1: 0, x2: 0,
                y2: isTop ? -this.props.tickSize : this.props.tickSize }),
            _react2.default.createElement(
                "text",
                {
                    className: "tick-label",
                    key: "label-" + t,
                    style: textStyle,
                    y: isTop ? -this.props.tickSize - 3 : this.props.tickSize + 3,
                    alignmentBaseline: isTop ? "baseline" : "hanging",
                    textAnchor: "middle" },
                fmt(t)
            )
        );
    },
    renderHorizontalTick: function renderHorizontalTick(i, t, y, fmt, isLeft) {

        var textStyle = {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };

        return _react2.default.createElement(
            "g",
            {
                className: "tick-grp",
                style: {
                    transform: "translate(" + (isLeft ? this.props.width : 0) + "px," + y + "px)"
                },
                key: "marker-" + fmt(t) },
            _react2.default.createElement("line", {
                className: "tick-mark",
                key: "tick-" + t,
                style: { stroke: "#AAA", strokeWidth: 0.5 },
                x1: isLeft ? -this.props.tickSize : this.props.tickSize,
                y1: 0, x2: 0, y2: 0 }),
            _react2.default.createElement(
                "text",
                {
                    className: "tick-label",
                    key: "label-" + t,
                    style: textStyle,
                    x: isLeft ? -this.props.tickSize - 3 : this.props.tickSize + 3,
                    alignmentBaseline: "middle",
                    textAnchor: isLeft ? "end" : "start" },
                fmt(t)
            )
        );
    },
    render: function render() {
        var _props = this.props;
        var tickFormat = _props.tickFormat;
        var tickValue = _props.tickValue;
        var tickPosition = _props.tickPosition;
        var tickIndex = _props.tickIndex;
        var align = _props.align;


        if (align === "top" || align === "bottom") {
            return this.renderVerticalTick(tickIndex, tickValue, tickPosition, tickFormat, align === "top");
        } else {
            return this.renderHorizontalTick(tickIndex, tickValue, tickPosition, tickFormat, align === "left");
        }
    }
});

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
/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

exports.default = _react2.default.createClass({

    displayName: "Axis",

    getDefaultProps: function getDefaultProps() {
        return {
            width: 100,
            height: 100,
            tickCount: 10,
            tickSize: 5,
            margin: 10,
            type: "linear"
        };
    },


    propTypes: {

        align: _react2.default.PropTypes.oneOf(["center", "left"]),

        /**
         * The label to render
         */
        label: _react2.default.PropTypes.string.isRequired,

        /**
         * The width of the rectangle to render into
         */
        width: _react2.default.PropTypes.number,

        /**
         * The height of the rectangle to render into
         */
        height: _react2.default.PropTypes.number
    },

    renderAxis: function renderAxis() {
        var p = this.props.position;
        if (p === "left" || p === "right") {
            return _react2.default.createElement("line", {
                key: "axis",
                className: "axis",
                style: { stroke: "#AAA", strokeWidth: 0.5 },
                x1: p === "left" ? this.props.width : 0,
                y1: this.props.margin,
                x2: p === "left" ? this.props.width : 0,
                y2: this.props.height - this.props.margin });
        } else {
            return _react2.default.createElement("line", {
                key: "axis",
                className: "axis",
                style: { stroke: "#AAA", strokeWidth: 0.5 },
                x1: this.props.margin,
                y1: p === "bottom" ? 0 : this.props.height,
                x2: this.props.width - this.props.margin,
                y2: p === "bottom" ? 0 : this.props.height });
        }
    },
    renderTicks: function renderTicks() {
        var _this = this;

        var p = this.props.position;

        var scale = void 0;
        switch (this.props.type) {
            case "linear":
                scale = (0, _d3Scale.scaleLinear)().domain([this.props.min, this.props.max]).range(p === "left" || p === "right" ? [this.props.height - this.props.margin * 2, 0] : [0, this.props.width - this.props.margin * 2]);
                break;

            case "log":
                scale = (0, _d3Scale.scaleLog)().domain([this.props.min, this.props.max]).range(p === "left" || p === "right" ? [this.props.height - this.props.margin * 2, 0] : [0, this.props.width - this.props.margin * 2]);
                break;

            default:
                break;
        }

        return scale.ticks(this.props.tickCount).map(function (tickValue, tickIndex) {
            var tickPosition = scale(tickValue) + _this.props.margin;
            var tickFormat = (0, _d3Format.format)(".0f"); //"scale.tickFormat();
            return _react2.default.createElement(Tick, {
                key: tickValue,
                align: _this.props.position,
                tickFormat: tickFormat,
                tickValue: tickValue,
                tickPosition: tickPosition,
                tickIndex: tickIndex,
                tickSize: _this.props.tickSize,
                width: _this.props.width,
                height: _this.props.height });
        });
    },
    render: function render() {
        return _react2.default.createElement(
            "svg",
            { height: this.props.height, width: this.props.width },
            this.renderAxis(),
            _react2.default.createElement(
                _reactAddonsCssTransitionGroup2.default,
                { component: "g", transitionName: "ticks", transitionEnterTimeout: 500, transitionLeaveTimeout: 500 },
                this.renderTicks()
            )
        );
    }
});