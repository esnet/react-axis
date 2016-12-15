
In this `TimeAxis` example we create a new axis from a `beginTime` and `endTime` and specify the special format of "duration".

Both `beginTime` and `endTime` are regular Javascript Dates, however their display will represent a duration since Jan 1, 1970. For instance if you want to show a five minute duration, starting from 0, you would set a `beginTime` of `new Date(0)` and and `endTime` of `new Date(5 * 60 * 1000)`.

```js
    <TimeAxis
        format="duration"
        position="bottom"
        beginTime={beginTime}
        endTime={endTime}
        width={800}
        height={50} />
```

