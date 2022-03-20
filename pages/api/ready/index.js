import nc from 'next-connect'
const health = require('@cloudnative/health-connect')

const healthCheck = new health.HealthChecker()

const handler = nc()
  .use(health.ReadinessEndpoint(healthCheck))
  .get((req, res) => {
    res.send('Hello world')
  })

export default handler
