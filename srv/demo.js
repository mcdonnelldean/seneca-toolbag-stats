'strict'

const config = {
  metrics: {
    log_input: true,
    collector: {enabled: true}
  }
}

require('seneca')()
  .use('vidi-metrics', config.metrics)
  .use(require('..'))
  .use(sink_logger)
  .listen()

function sink_logger (opts) {
  this.add({role: 'metrics', hook: 'sink'}, (msg, done) => {
    console.log(JSON.stringify(msg.metric, null, 2))
    done()
  })

  return 'sink-logger'
}
