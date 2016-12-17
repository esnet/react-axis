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
import moment from "moment";

import TimeAxis from "../../../components/TimeAxis";

const scales = [
    {label: "1min", end: (d) => moment(d).add(1, "minute").toDate()},
    {label: "5min", end: (d) => moment(d).add(5, "minutes").toDate()},
    {label: "30min", end: (d) => moment(d).add(30, "minutes").toDate()},
    {label: "1h", end: (d) => moment(d).add(1, "hours").toDate()},
    {label: "3h", end: (d) => moment(d).add(3, "hours").toDate()},
    {label: "6h", end: (d) => moment(d).add(6, "hours").toDate()},
    {label: "1d", end: (d) => moment(d).add(1, "days").toDate()},
    {label: "5d", end: (d) => moment(d).add(5, "days").toDate()},
    {label: "1m", end: (d) => moment(d).add(1, "months").toDate()},
    {label: "3m", end: (d) => moment(d).add(3, "months").toDate()},
    {label: "6m", end: (d) => moment(d).add(6, "months").toDate()},
    {label: "1y", end: (d) => moment(d).add(1, "year").toDate()},
    {label: "2y", end: (d) => moment(d).add(2, "year").toDate()},
    {label: "5y", end: (d) => moment(d).add(5, "year").toDate()}
];

const duration = React.createClass({

    getInitialState() {
        return {
            time: 0,
            timescale: "5min"
        };
    },

    /**
     * When our page mounts we start up an interval timer.
     * Each time that fires we set a net timerange in our
     * component state and that drives rerendering.
     */
    componentDidMount() {
        this._timer = setInterval(() => {
            this.setState({time: this.state.time + 1000});
        }, 1000);
    },

    /**
     * When out component unmounts, we stop the interval timer
     */
    componentWillUnmount() {
        clearInterval(this._timer);
    },

    renderTimeRanges() {
        const linkStyle = {
            fontWeight: 600,
            color: "grey",
            cursor: "default",
            paddingLeft: 10,
        };

        const linkStyleActive = {
            color: "steelblue",
            cursor: "pointer",
            paddingLeft: 10
        };

        return scales.map(({label, begin}, i) => {
            return (
                <span
                    key={i}
                    style={this.state.timescale !== label ? linkStyleActive : linkStyle}
                    onClick={() => this.setState({timescale: label})}>
                        {label}
                </span>
            );
        });
    },

    renderAxis() {
        const rowStyle = {
            border: 1,
            borderStyle: "solid",
            borderRadius: 5,
            borderColor: "#DDD",
            padding: 2,
            margin: 5
        };

        const beginTime = new Date(0);
        let endTime;
        scales.forEach(s => {
            if (s.label === this.state.timescale) {
                endTime = new Date(+s.end(beginTime) + this.state.time);
            }
        });

        return (
            <div className="row">

                <div className="col-md-12" style={{fontSize: 14, color: "#777"}}>
                    {this.renderTimeRanges()}
                </div>

                <hr />

                <div className="col-md-2">
                    Duration
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        format="duration"
                        standalone={true}
                        position="bottom"
                        beginTime={beginTime}
                        endTime={endTime}
                        width={800}
                        height={50} />
                </div>
            </div>
        );
    },

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        {this.renderAxis()}
                    </div>
                </div>
            </div>
        );
    }
});

// Export example
import duration_docs from "./duration_docs.md";
export default {duration, duration_docs};
