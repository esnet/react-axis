/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { format } from "d3-format";
import { scaleLinear, scaleLog, scalePow } from "d3-scale";
import Tick from "./Tick";
import "./Axis.css";

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
export default React.createClass({

    displayName: "Axis",

    getDefaultProps() {
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
            absolute: false,
        };
    },

    propTypes: {

        align: React.PropTypes.oneOf(["center", "left"]),

        /**
         * The label to render.
         */
        label: React.PropTypes.string.isRequired,

        /**
         * The width of the rectangle to render into.
         */
        width: React.PropTypes.number,

        /**
         * The height of the rectangle to render into.
         */
        height: React.PropTypes.number,

        /**
         * The type of the scale: "linear", "log" or "power".
         */
        type: React.PropTypes.oneOf(["linear", "log", "power"]),

        /**
         * The exponent if a power scale is used.
         */
        exponent: React.PropTypes.number,

        /**
         * The d3 format for the tick labels. The default it to
         * compute this automatically from the scale.
         */
        format: React.PropTypes.string,

        /**
         * Apply abs(value) to all values.
         */
        absolute: React.PropTypes.bool,

        /**
         * The size of each tick mark.
         */
        tickSize: React.PropTypes.number,

        /**
         * Extend the tick marks away from the tick label
         * by this amount. This can be used to provide a grid
         * line for each tick.
         */
        tickExtend: React.PropTypes.number,
    },

    renderAxisLabel() {
        const { width, height, position, labelPosition, labelStyle } = this.props;
        let translate;
        let rotate = `rotate(0)`;
        let anchor = "start";
        switch (position) {
            case "left":
                translate = `translate(${width - labelPosition},5)`;
                rotate = `rotate(-90)`;
                anchor = "end";
                break;
            case "right":
                translate = `translate(${labelPosition},5)`;
                rotate = `rotate(-90)`;
                anchor = "end";
                break;
            case "top":
                translate = `translate(5, ${height - labelPosition})`;
                break;
            case "bottom":
                translate = `translate(5, ${labelPosition})`;
                break;
            default:
                //pass
        }
        return (
            <g transform={translate}>
                <text
                    transform={rotate}
                    textAnchor={anchor}
                    style={labelStyle}>
                    {this.props.label}
                </text>
            </g>
        );
    },
 
    renderAxisLine() {
        const p = this.props.position;
        if ( p === "left" || p === "right" ) {
            return (
                <line
                    key="axis"
                    className="axis"
                    style={{stroke: "#AAA", strokeWidth: 0.5}}
                    x1={p === "left" ? this.props.width : 0}
                    y1={this.props.margin}
                    x2={p === "left" ? this.props.width: 0}
                    y2={this.props.height - this.props.margin} />
            );
        } else {
            return (
                <line
                    key="axis"
                    className="axis"
                    style={{stroke: "#AAA", strokeWidth: 0.5}}
                    x1={this.props.margin}
                    y1={p === "bottom" ? 0 : this.props.height}
                    x2={this.props.width - this.props.margin}
                    y2={p === "bottom" ? 0 : this.props.height} />
            );
        }
    },

    renderAxisTicks() {
        const p = this.props.position;

        let scale;
        switch (this.props.type) {
            case "linear":
                scale = scaleLinear()
                    .domain([this.props.min, this.props.max])
                    .range(p === "left" || p === "right" ?
                        [this.props.height - this.props.margin * 2, 0] :
                        [0, this.props.width - this.props.margin * 2]);
            break;

            case "log":
                scale = scaleLog()
                    .domain([this.props.min, this.props.max])
                    .range(p === "left" || p === "right" ?
                        [this.props.height - this.props.margin * 2, 0] :
                        [0, this.props.width - this.props.margin * 2]);
            break;

            case "power":
                scale = scalePow()
                    .exponent(this.props.exponent)
                    .domain([this.props.min, this.props.max])
                    .range(p === "left" || p === "right" ?
                        [this.props.height - this.props.margin * 2, 0] :
                        [0, this.props.width - this.props.margin * 2]);
            break;

            default:
                //pass
        }
         
        return scale.ticks(this.props.tickCount).map((tickValue, tickIndex) => {
            const tickPosition = scale(tickValue) + this.props.margin;
            const tickFormatSpecifier = this.props.tickFormatSpecifier;

            // Get a d3 format function, either from the string the user
            // supplied in the format prop, or ask the scale for its
            // suggestion
            const d3Format = this.props.format ?
                format(this.props.format) :
                scale.tickFormat(this.props.tickCount, tickFormatSpecifier);

            // The user can specify the values all be positive
            const absolute = this.props.absolute;

            const formatter = d =>
                absolute ? d3Format(Math.abs(d)) : d3Format(d);
            const label = formatter(tickValue);

            return (
                <Tick
                    key={tickValue}
                    align={this.props.position}
                    label={label}
                    labelAlign="center"
                    position={tickPosition}
                    size={this.props.tickSize}
                    extend={this.props.tickExtend}
                    width={this.props.width}
                    height={this.props.height} />
            );
        });
    },

    renderAxis() {
        return (
            <g>
                {this.renderAxisLine()}
                <ReactCSSTransitionGroup component="g" transitionName="ticks" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {this.renderAxisTicks()}
                </ReactCSSTransitionGroup>
                {this.renderAxisLabel()}
            </g>
        );
    },

    render() {
        if (this.props.standalone) {
            return (
                <svg height={this.props.height} width={this.props.width}>
                    {this.renderAxis()}
                </svg>
            );
        } else {
            return this.renderAxis()
        }
    }
});
