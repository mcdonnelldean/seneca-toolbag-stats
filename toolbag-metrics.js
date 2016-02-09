'use strict'

var _ = require('lodash')

var defaults = {
  plugin: 'vidi-toolbag-metrics',
  role: 'metrics',
  log_input: false,
  log_output: false
}

module.exports = function (opts) {
  var seneca = this
  var extend = seneca.util.deepextend

  opts = extend(defaults, opts)

  seneca.add({role: opts.role, cmd: 'map'}, map_stats)

  return opts.plugin
}

function map_stats (msg, done) {
  this.prior(msg, function (err, stats) {
    if (err) this.log.error(err)

    stats = []
    msg = msg.data.payload

    stats = stats.concat(make_cpu_snapshot(msg))
    stats = stats.concat(make_process_snapshot(msg))
    stats = stats.concat(make_eventloop_snapshot(msg))

    done(null, {stats: stats})
  })
}

function make_cpu_snapshot (msg) {
  var cpus = msg.cpu
  var proc = msg.process

  var series = []
  var id = 0

  _.each(cpus, (cpu) => {
    series.push({
      stat: 'cpu_snapshot',
      values: {
        speed: cpu.speed,
        user: cpu.times.user,
        nice: cpu.times.nice,
        idle: cpu.times.idle,
        irq: cpu.times.irq
      },
      tags: {
        pid: proc.pid,
        model: cpu.model,
        id: ++id
      }
    })
  })

  return series
}

function make_process_snapshot (msg) {
  var proc = msg.process
  var sys = msg.system
  var mem = msg.memory

  var series = {
    stat: 'process_snapshot',
    values: {
      ram_total: sys.totalmem,
      ram_used: sys.freemem,
      heap_total: mem.heapTotal,
      heap_used: mem.heapUsed,
      heap_rss: mem.rss,
      sys_uptime: sys.uptime,
      proc_uptime: proc.uptime
    },
    tags: {
      pid: proc.pid,
      title: proc.title,
      host: proc.hostname,
      arch: sys.arch,
      platform: sys.platform,
      exec_path: encodeURIComponent(proc.execPath),
      ver_node: proc.versions.node,
      ver_v8: proc.versions.v8,
      ver_uv: proc.versions.uv,
      ver_openssl: proc.versions.openssl,
    }
  }

  return [series]
}

function make_eventloop_snapshot (msg) {
  var loop = msg.eventLoop
  var proc = msg.process

  var series = {
    stat: 'event_loop_snapshot',
    values: {
      delay: loop.delay,
      limit: loop.limit
    },
    tags: {
      over_limit: loop.overLimit,
      pid: proc.pid
    }
  }

  return [series]
}
