'use strict'

var _ = require('lodash')

var defaults = {
  plugin: 'vidi-toolbag-metrics',
  role: 'metrics'
}


module.exports = function (opts) {
  var seneca = this
  var extend = seneca.util.deepextend

  opts = extend(defaults, opts)

  seneca.add({role: opts.role, hook: 'tag'}, tag)
  seneca.add({role: opts.role, hook: 'map', source: 'toolbag'}, map)

  return opts.plugin
}


function tag (msg, done) {
  if (!msg && !msg.type === 'stats') {
    return done(null, null)
  }

  var data = msg.payload
  if (!data && !data.source) {
    return done(null, null)
  }

  return done(null, {
    source: data.payload.source,
    payload: data.payload
  })
}


function map (msg, done) {
  this.prior(msg, function (err, metrics) {
    if (err) this.log.error(err)

    metrics = []
    metrics = metrics.concat(make_cpu_snapshot(msg.payload))
    metrics = metrics.concat(make_process_snapshot(msg.payload))
    metrics = metrics.concat(make_eventloop_snapshot(msg.payload))
    metrics = metrics.concat(make_argv(msg.payload))

    done(null, metrics)
  })
}

function make_argv (data) {
  var meta = data.meta || {tags: []}
  var proc = data.process
  var argvs = proc.argv

  var index = 0
  var series = []

  _.each(argvs, (argv) => {
    series.push({
      timestamp: new Date(data.timestamp).getTime(),
      source: data.source,
      name: 'argv',
      values: {
        path: encodeURIComponent(argv)
      },
      tags: {
        pid: proc.pid,
        tag: meta.tags[0] || 'untagged'
      }
    })
  })

  return series
}

function make_cpu_snapshot (data) {
  var cpus = data.cpu
  var proc = data.process


  var id = 0
  var series = []

  _.each(cpus, (cpu) => {
    series.push({
      source: data.source,
      name: 'cpu_snapshot',
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


function make_process_snapshot (data) {
  var proc = data.process
  var sys = data.system
  var mem = data.memory

  var series = {
    source: data.source,
    name: 'process_snapshot',
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
      host: sys.hostname,
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


function make_eventloop_snapshot (data) {
  var loop = data.eventLoop
  var proc = data.process

  var series = {
    source: data.source,
    name: 'event_loop_snapshot',
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
