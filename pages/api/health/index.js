import nc from 'next-connect'
const health = require('@cloudnative/health-connect')

const healthCheck = new health.HealthChecker()

// app.use('/health', health.HealthEndpoint(healthCheck))

const handler = nc()
  .use(health.HealthEndpoint(healthCheck))
  .get((req, res) => {
    res.send('Hello world')
  })

export default handler
