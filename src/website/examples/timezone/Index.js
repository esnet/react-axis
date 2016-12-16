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
    {label: "1min", begin: (d) => moment(d).subtract(1, "minute").toDate()},
    {label: "5min", begin: (d) => moment(d).subtract(5, "minutes").toDate()},
    {label: "30min", begin: (d) => moment(d).subtract(30, "minutes").toDate()},
    {label: "1h", begin: (d) => moment(d).subtract(1, "hours").toDate()},
    {label: "3h", begin: (d) => moment(d).subtract(3, "hours").toDate()},
    {label: "6h", begin: (d) => moment(d).subtract(6, "hours").toDate()},
    {label: "1d", begin: (d) => moment(d).subtract(1, "days").toDate()},
    {label: "5d", begin: (d) => moment(d).subtract(5, "days").toDate()},
    {label: "1m", begin: (d) => moment(d).subtract(1, "months").toDate()},
    {label: "3m", begin: (d) => moment(d).subtract(3, "months").toDate()},
    {label: "6m", begin: (d) => moment(d).subtract(6, "months").toDate()},
    {label: "1y", begin: (d) => moment(d).subtract(1, "year").toDate()},
    {label: "2y", begin: (d) => moment(d).subtract(2, "year").toDate()},
    {label: "5y", begin: (d) => moment(d).subtract(5, "year").toDate()},
    {label: "ytd", begin: (d) => moment(d).startOf("year").toDate()}
];

const timezone = React.createClass({

    getInitialState() {
        return {
            timescale: "ytd"
        };
    },

    /**
     * When our page mounts we start up an interval timer.
     * Each time that fires we set a net timerange in our
     * component state and that drives rerendering.
     */
    componentDidMount() {
        this._timer = setInterval(() => {
            this.forceUpdate();
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

        const endTime = new Date();
        let beginTime;
        scales.forEach(s => {
            if (s.label === this.state.timescale) {
                beginTime = s.begin(endTime);
            }
        });

        return (
            <div className="row">

                <div className="col-md-12" style={{fontSize: 14, color: "#777"}}>
                    {this.renderTimeRanges()}
                </div>

                <hr />

                <div className="col-md-2">
                    Australia/Adelaide
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        timezone="Australia/Adelaide"
                        standalone={true}
                        position="bottom"
                        beginTime={beginTime}
                        endTime={endTime}
                        width={800}
                        height={50} />
                </div>

                <div className="col-md-2">
                    UTC
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        timezone="Etc/UTC"
                        standalone={true}
                        position="bottom"
                        beginTime={beginTime}
                        endTime={endTime}
                        width={800}
                        height={50} />
                </div>

                <div className="col-md-2">
                    America/Chicago
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        timezone="America/Chicago"
                        standalone={true}
                        position="bottom"
                        beginTime={beginTime}
                        endTime={endTime}
                        width={800}
                        height={50} />
                </div>

                <div className="col-md-2">
                    America/Los_Angeles
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        timezone="America/Los_Angeles"
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
import timezone_docs from "./timezone_docs.md";
export default {timezone, timezone_docs};
