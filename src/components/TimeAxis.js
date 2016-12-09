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
import { scaleTime } from "d3-scale";
const moment = require("moment");
require("moment-timezone");

import Tick from "./Tick";
import "./Axis.css";

const durationSecond = 1000;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;

const formatterMap = {
    second: ":ss",
    minute: "h:mm a",
    hour: "h a",
    day: "ddd DD",
    week: "MMM DD",
    month: "MMM",
    year: "Y",
};

const tickIntervals = [
    [      durationSecond, "second",  1],
    [  5 * durationSecond, "second",  5],
    [ 15 * durationSecond, "second", 15],
    [ 30 * durationSecond, "second", 30],
    [      durationMinute, "minute",  1],
    [  5 * durationMinute, "minute",  5],
    [ 15 * durationMinute, "minute", 15],
    [ 30 * durationMinute, "minute", 30],
    [      durationHour  ,   "hour",  1],
    [  3 * durationHour  ,   "hour",  3],
    [  6 * durationHour  ,   "hour",  6],
    [ 12 * durationHour  ,   "hour", 12],
    [      durationDay   ,    "day",  1],
    [  2 * durationDay   ,    "day",  2],
    [  3 * durationDay   ,    "day",  3],
    [  4 * durationDay   ,    "day",  4],
    [  5 * durationDay   ,    "day",  5],
    [      durationWeek  ,   "week",  1],
    [      durationMonth ,  "month",  1],
    [  3 * durationMonth ,  "month",  3],
    [      durationYear  ,   "year",  1]
];


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

    displayName: "TimeAxis",

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
        label: React.PropTypes.string,

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
        return (
            <line
                key="axis"
                className="axis"
                style={{stroke: "#AAA", strokeWidth: 2}}
                x1={this.props.margin}
                y1={p === "bottom" ? 0 : this.props.height}
                x2={this.props.width - this.props.margin}
                y2={p === "bottom" ? 0 : this.props.height} />
        );
    },

    renderAxisTicks() {
        const TZ = this.props.timezone;
        // const p = this.props.position;
        const interval = 5; //this.props.interval

        const scale = scaleTime()
            .domain([this.props.beginTime, this.props.endTime])
            .range([0, this.props.width - this.props.margin * 2]);
       
        const start = +this.props.beginTime;
        const stop = +this.props.endTime;
        const target = Math.abs(stop - start) / interval;

        let type, num; //, duration;
        for (const [d, t, n] of tickIntervals) {
            if (target < d) break;
            type = t;
            num = n;
            //duration = d;
        }
        
        const majors = {
            "second": "minute",
            "minute": "hour",
            "hour": "day",
            "day": "month",
            "week": "month",
            "month": "year",
            "year": "year"
        };

        const formatter = function(v) {
            let t = type;
            if (moment(v).tz(TZ).startOf(majors[type]).isSame(moment(v).tz(TZ))) {
                t = majors[type];
            }
            return moment(v).tz(TZ).format(formatterMap[t])
        }

        
        const starttz = moment(start).tz(TZ);
        const stoptz = moment(stop).tz(TZ);
        const startd = starttz.startOf(majors[type]).add(num, "type");
        const stopd = stoptz.startOf(type);

        let d = startd;
        let tickIndex = 0;
        let ticks = [];

        while (d.isBefore(stopd)) {
            d = d.add(num, type);
            const tickValue = d.toDate();
            const tickPosition = scale(tickValue);
            if (d > start && d < stop) {
                const tickSize =
                    moment(d).tz(TZ).startOf(majors[type]).isSame(moment(d).tz(TZ)) ? 20 : 15;

                ticks.push(
                    <Tick
                        key={+d}
                        align={this.props.position}
                        tickFormat={formatter}
                        tickValue={tickValue}
                        tickPosition={tickPosition}
                        tickIndex={tickIndex}
                        tickSize={tickSize}
                        tickExtend={this.props.tickExtend}
                        labelAlign="adjacent"
                        width={this.props.width}
                        height={this.props.height} />
                );
            }

            tickIndex++;
        }
        return ticks;
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
                <svg height={this.props.height} width={this.props.width} style={{shapeRendering: "crispEdges"}}>
                    {this.renderAxis()}
                </svg>
            );
        } else {
            return this.renderAxis()
        }
    }
});
