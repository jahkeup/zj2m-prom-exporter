const fastify = require('fastify')()

// Http Server settings
const httpPort = process.env['HTTP_METRICS_PORT'] || 9001
const httpAddr = process.env['HTTP_METRICS_ADDR'] || '0.0.0.0'
const httpMetricPath = '/metrics'

// Http Server to return metrics
function HttpServer (customRegistry, logger) {
  // Declare a route
  fastify.get(httpMetricPath, async request => {
    logger.info(`Metrics query from ${request.ip}`)
    return customRegistry.metrics()
  })

  // Run the server!
  const start = async () => {
    try {
      await fastify.listen(httpPort, httpAddr)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()
}
exports.HttpServer = HttpServer
