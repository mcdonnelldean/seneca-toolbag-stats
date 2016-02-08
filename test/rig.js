'strict'

const config = {
  stats: {
    collector: true,
    log_input: false,
    log_output: true
  }
}

require('seneca')()
  .use('stats', config.stats)
  .use('..')
  .listen()
