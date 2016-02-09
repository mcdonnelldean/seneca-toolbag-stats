'strict'

const config = {
  metrics: {
    collector: true,
    log_input: false,
    log_output: true
  }
}

require('seneca')()
  .use('vidi-metrics', config.metrics)
  .use('..')
  .listen()
