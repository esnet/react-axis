
In this `TimeAxis` example we create a new axis from a `beginTime` and `endTime`. Both of these are regular Javascript Dates. We can tell the axis how it should be orientated with the `position` prop. We can also specify the `timezone` to display the axis in.

```js
    <TimeAxis
        timezone="Australia/Adelaide"
        position="bottom"
        beginTime={beginTime}
        endTime={endTime}
        width={800}
        height={50} />
```

