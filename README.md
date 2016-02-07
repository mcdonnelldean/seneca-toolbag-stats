# seneca-toolbag-stats

A toolbag collector for seneca-stats.

## Work in progress
This module is currently a work in progress.

## Metrics

### Process Snapshot
```
{
  "stat": "process_snapshot",
  "values": {
    "ram_total": 17179869184,
    "ram_used": 8637968384,
    "heap_total": 68023552,
    "heap_used": 41239832,
    "heap_rss": 88076288,
    "sys_uptime": 1075722,
    "proc_uptime": 4.344
  },
  "tags": {
    "pid": 66618,
    "title": "node",
    "arch": "x64",
    "platform": "darwin"
  }
}
```

### Cpu Snapshot
```
{
  "stat": "cpu_snapshot",
  "values": {
    "speed": 3100,
    "user": 14114880,
    "nice": 0,
    "idle": 331620480,
    "irq": 0
  },
  "tags": {
    "pid": 66618,
    "model": "Intel(R) Core(TM) i7-5557U CPU @ 3.10GHz",
    "id": 4
  }
}
```

### Event Loop Snapshot
```
{
  "stat": "event_loop_snapshot",
  "values": {
    "delay": 4.336254000663757,
    "limit": 30
  },
  "tags": {
    "over_limit": false,
    "pid": 66618
  }
}
```
