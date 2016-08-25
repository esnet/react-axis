# React Axis

An axis widget intended to replace generated D3 SVG with a React friendly component. Under the hood, it still uses D3's scales and format, but rendering and animation is done with React.

This is a very minimal version of the functionality needed for a full charting app, but it's a start. We will be merging this into react-timeseries-charts. Once that happens we'll bump this to v1.0.

Getting started
---------------

This React Axis component is intended to be installed with [npm](https://www.npmjs.com/) and the built into your project with a tool like [Webpack](https://webpack.github.io/). As it is a standalone axis component, most likely it should be used in another library, but who knows. Either way, it expects React to be present.

To install:

    npm install react-axis --save

Developing
----------

The repo contains the examples website. This is very helpful in developing new functionality. Within a cloned repo, you first need to run:

    npm install

This will install the development dependencies into your node_modules directory.

You can then start up the test server, as well as automatic source building, by doing:

    npm run start-website

License
-------

This code is distributed under a BSD style license, see the LICENSE file for complete information.

Copyright
---------

React Axis, Copyright (c) 2016, The Regents of the University of California, through Lawrence Berkeley National Laboratory (subject to receipt of any required approvals from the U.S. Dept. of Energy). All rights reserved.

If you have questions about your rights to use or distribute this software, please contact Berkeley Lab's Technology Transfer Department at TTD@lbl.gov.

NOTICE. This software is owned by the U.S. Department of Energy. As such, the U.S. Government has been granted for itself and others acting on its behalf a paid-up, nonexclusive, irrevocable, worldwide license in the Software to reproduce, prepare derivative works, and perform publicly and display publicly. Beginning five (5) years after the date permission to assert copyright is obtained from the U.S. Department of Energy, and subject to any subsequent five (5) year renewals, the U.S. Government is granted for itself and others acting on its behalf a paid-up, nonexclusive, irrevocable, worldwide license in the Software to reproduce, prepare derivative works, distribute copies to the public, perform publicly and display publicly, and to permit others to do so.
