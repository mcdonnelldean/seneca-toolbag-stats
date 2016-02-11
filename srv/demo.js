'strict'

const config = {
  metrics: {
    collector: {enabled: true}
  }
}

require('seneca')()
  .use('vidi-metrics', config.metrics)
  .use('..')
  .use(sink_logger)
  .listen()

function sink_logger (opts) {
  this.add({role: 'metrics', hook: 'sink'}, (msg, done) => {
    console.log(JSON.stringify(msg.metric, null, 2))
    done()
  })

  return 'sink-logger'
}
