# seneca-toolbag-stats

A toolbag collector for seneca-stats.

## Work in progress
This module is currently a work in progress.

## Metrics

### Memory Usage
```
{
  "metric": "memory_usage",
  "values": {
    "heap_total": 65959680,
    "heap_used": 43169112,
    "rss": 88629248
  },
  "tags": {
    "pid": 50526
  }
}
```

### Cpu Snapshot
```
{
  "metric": "cpu_snapshot",
  "values": {
    "speed": 3100,
    "user": 10831180,
    "nice": 0,
    "idle": 264185920,
    "irq": 0
  },
  "tags": {
    "pid": 50526,
    "model": "Intel(R) Core(TM) i7-5557U CPU @ 3.10GHz"
  }
}
```

### System Snapshot
```
{
  "metric": "system_snapshot",
  "values": {
    "mem_total": 17179869184,
    "mem_used": 5719900160,
    "uptime": 898570
  },
  "tags": {
    "pid": 50526,
    "arch": "x64",
    "host": "mcddmpb",
    "platform": "darwin"
  }
}
```

### Process Snapshot
```
{
  "metric": "process_snapshot",
  "values": {
    "uptime": 3.324
  },
  "tags": {
    "pid": 50526,
    "title": "node"
  }
}
```
