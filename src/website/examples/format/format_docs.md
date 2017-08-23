
In this `TimeAxis` example we create a new axis from a `beginTime` and `endTime` and specify the different formats such as `year`, `month`, `day` and `hour`.

Both `beginTime` and `endTime` are regular Javascript Dates.

```js
    <TimeAxis
        format="hour"
        position="bottom"
        beginTime={beginTime}
        endTime={endTime}
        width={800}
        height={50} />
```

