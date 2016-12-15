
import React from "react";
import Tick from "../components/Tick";

export default ({ test }) => {

    const tests = [
        {label: 1.2, width: 100, height: 40},
        {label: 1.4, position: 50, width: 100, height: 40},
        {label: 1.6, labelAlign: "center", position: 50, width: 100, height: 40},
        {label: 1.6, labelAlign: "center", position: 80, size: 20, width: 100, height: 40},
        {label: 1.6, labelAlign: "adjacent", position: 80, size: 20, width: 100, height: 40},

        {align: "top", label: 1.2, width: 100, height: 40},
        {align: "top", label: 1.4, labelAlign: "center", position: 50, width: 100, height: 40},
        {align: "top", label: 1.6, labelAlign: "adjacent", position: 50, width: 100, height: 40},
        {align: "top", label: 1.6, labelAlign: "center", position: 80, size: 20, width: 100, height: 40},
        {align: "top", label: 1.6, labelAlign: "adjacent", position: 80, size: 20, width: 100, height: 40},

        {align: "left", label: 8.1, position: 50, size: 5, width: 40, height: 100},
        {align: "left", label: 10.1, position: 50, size: 15, width: 40, height: 100},
        {align: "right", label: 9.1, position: 50, size: 5, width: 40, height: 100},
        {align: "right", label: 11.1, position: 50, size: 15, width: 40, height: 100}

    ];

    return (
        <Tick
            key="key"
            index={0}
            {...tests[test]} />
    );
};
