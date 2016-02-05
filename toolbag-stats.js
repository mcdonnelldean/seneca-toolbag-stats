'use strict'

var _ = require('lodash')

var defaults = {
  plugin: 'stats'
}

module.exports = function (opts) {
  var seneca = this
  var extend = seneca.util.deepextend

  opts = extend(defaults, opts)

  seneca.add({role: opts.plugin, cmd: 'map', type:'stats'}, handle_map_stats)

  return 'toolbag-stats'
}

function handle_map_stats (msg, done) {
  this.prior(msg, function (err, metrics) {
    if (err) this.log.error(err)

    metrics = metrics || []
    msg = msg.payload

    metrics = metrics.concat(make_memory_usage(msg))
    metrics = metrics.concat(make_cpu_snapshot(msg))
    metrics = metrics.concat(make_system_snapshot(msg))
    metrics = metrics.concat(make_process_snapshot(msg))

    done(null, {metrics: metrics})
  })
}

function make_memory_usage (msg) {
  var mem = msg.memory
  var proc = msg.process

  var series = {
    metric: 'memory_usage',
    values: {
      heap_total: mem.heapTotal,
      heap_used: mem.heapUsed,
      rss: mem.rss
    },
    tags: {
      pid: proc.pid
    }
  }

  return [series]
}

function make_cpu_snapshot (msg) {
  var cpus = msg.cpu
  var proc = msg.process

  var series = []

  _.each(cpus, (cpu) => {
    series.push({
      metric: 'cpu_snapshot',
      values: {
        speed: cpu.speed,
        user: cpu.times.user,
        nice: cpu.times.nice,
        idle: cpu.times.idle,
        irq: cpu.times.irq
      },
      tags: {
        pid: proc.pid,
        model: cpu.model
      }
    })
  })

  return series
}

function make_system_snapshot (msg) {
  var sys = msg.system
  var proc = msg.process

  var series = {
    metric: 'system_snapshot',
    values: {
      mem_total: sys.totalmem,
      mem_used: sys.freemem,
      uptime: sys.uptime
    },
    tags: {
      pid: proc.pid,
      arch: sys.arch,
      host: sys.hostname,
      platform: sys.platform
    }
  }

  return [series]
}

function make_process_snapshot (msg) {
  var proc = msg.process

  var series = {
    metric: 'process_snapshot',
    values: {
      uptime: proc.uptime
    },
    tags: {
      pid: proc.pid,
      title: proc.title,
      host: proc.hostname,
      platform: proc.platform
    }
  }

  return [series]
}
