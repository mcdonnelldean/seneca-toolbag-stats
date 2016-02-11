![Banner][]

# vidi-toolbag-metrics

- __Lead Maintainer:__ [Dean McDonnell][Lead]
- __Sponsor:__ [nearForm][Sponsor]

A Vidi: Metrics plugin that allows data emitted by [Toolbag][] over UPD to be tagged and mapped
into various sinks. This plugin should be loaded in collectors, not emitters. Can be ran as a
stand-alone micro-service.

- __Work in progress__ This module is currently a work in progress.

## Running as a plugin
To use as a plugin, install via npm and use in your Seneca system,

```
npm install vidi-metrics
npm install vidi-toolbag-metrics
```

```js
require('seneca')()
  .use('vidi-metrics', {collector: {enabled: true})
  .use('vidi-toolbag-metrics')
  ...
```

## Running as a micro-service
A demo micro-service can be found in `srv/demo.js` and ran via npm. Simply clone this repository
locally and run,

```
npm install; npm run demo
```

The demo runs in collector mode and tracks any data emitted by toolbag to it's default port. It makes a
great springboard for a custom micro-service tailored to your needs. Check the [Org][] for additional
plugins that can be dropped in to add more functionality.

## Metrics
The following metrics are emitted from this plugin.

```
{
  "source": "toolbag",
  "name": "cpu_snapshot",
  "values": {
    "speed": 3100,
    "user": 4562770,
    "nice": 0,
    "idle": 93014020,
    "irq": 0
  },
  "tags": {
    "pid": 33418,
    "model": "Intel(R) Core(TM) i7-5557U CPU @ 3.10GHz",
    "id": 4
  }
}
```

```
{
  "source": "toolbag",
  "name": "process_snapshot",
  "values": {
    "ram_total": 17179869184,
    "ram_used": 6538592256,
    "heap_total": 66991616,
    "heap_used": 43497312,
    "heap_rss": 88432640,
    "sys_uptime": 213884,
    "proc_uptime": 4.323
  },
  "tags": {
    "pid": 33418,
    "title": "node",
    "arch": "x64",
    "platform": "darwin",
    "exec_path": "%2FUsers%2Fmcdonnelldean%2F.nvm%2Fversions%2Fnode%2Fv4.0.0%2Fbin%2Fnode",
    "ver_node": "4.0.0",
    "ver_v8": "4.5.103.30",
    "ver_uv": "1.7.3",
    "ver_openssl": "1.0.2d"
  }
}
```

```
{
  "source": "toolbag",
  "name": "event_loop_snapshot",
  "values": {
    "delay": 4.2011629939079285,
    "limit": 30
  },
  "tags": {
    "over_limit": false,
    "pid": 33418
  }
}
```

## Contributing
The [Vidi: Insights org][Org] encourages __open__ and __safe__ participation.

- [Code of Conduct][CoC]

If you feel you can help in any way, be it with documentation, examples, extra testing, or new
features please get in touch.

## License
Copyright (c) 2016, Dean McDonnell and other contributors.
Licensed under [MIT][].

[Banner]: https://raw.githubusercontent.com/vidi-insights/org/master/assets/vidi-banner.png
[Lead]: https://github.com/mcdonnelldean
[Sponsor]: http://www.nearform.com/
[Org]: https://github.com/vidi-insights
[CoC]: https://github.com/vidi-insights/org/blob/master/code-of-conduct.md
[MIT]: ./LICENSE

[Toolbag]: https://github.com/continuationlabs/toolbag
