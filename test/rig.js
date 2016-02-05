'strict'

const config = {
  stats: {
    collector: true,
    log_metrics: true,
    log_payload: false
  }
}

// Allows easy testing of this
// plugin, simply run `npm run rig`.
require('seneca')()
  .use('stats', config.stats)
  .use('..')
  .listen()
