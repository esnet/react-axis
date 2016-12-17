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

var _Tick = require("./Tick");

var _Tick2 = _interopRequireDefault(_Tick);

require("./Axis.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        label: _react2.default.PropTypes.string.isRequired,

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
    renderAxisTicks: function renderAxisTicks() {
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

            case "power":
                scale = (0, _d3Scale.scalePow)().exponent(this.props.exponent).domain([this.props.min, this.props.max]).range(p === "left" || p === "right" ? [this.props.height - this.props.margin * 2, 0] : [0, this.props.width - this.props.margin * 2]);
                break;

            default:
            //pass
        }

        return scale.ticks(this.props.tickCount).map(function (tickValue, tickIndex) {
            var tickPosition = scale(tickValue) + _this.props.margin;
            var tickFormatSpecifier = _this.props.tickFormatSpecifier;

            // Get a d3 format function, either from the string the user
            // supplied in the format prop, or ask the scale for its
            // suggestion
            var d3Format = _this.props.format ? (0, _d3Format.format)(_this.props.format) : scale.tickFormat(_this.props.tickCount, tickFormatSpecifier);

            // The user can specify the values all be positive
            var absolute = _this.props.absolute;

            var formatter = function formatter(d) {
                return absolute ? d3Format(Math.abs(d)) : d3Format(d);
            };
            var label = formatter(tickValue);

            return _react2.default.createElement(_Tick2.default, {
                key: tickValue,
                align: _this.props.position,
                label: label,
                labelAlign: "center",
                position: tickPosition,
                size: _this.props.tickSize,
                extend: _this.props.tickExtend,
                width: _this.props.width,
                height: _this.props.height });
        });
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
                { height: this.props.height, width: this.props.width },
                this.renderAxis()
            );
        } else {
            return this.renderAxis();
        }
    }
});