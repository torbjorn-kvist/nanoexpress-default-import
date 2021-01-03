import nanoexpress from 'nanoexpress'

import bodyParser from '@nanoexpress/middleware-body-parser'
import staticServe from '@nanoexpress/middleware-static-serve'
import schemator from '@nanoexpress/middleware-schemator'

import swaggerUiDist from 'swagger-ui-dist'

import mockup from './mockup.js'

const app = nanoexpress({
  jsonSpaces: 2
})

const schematorInstance = schemator({ swaggerPath: './swagger.json' })

app.use(mockup)
app.use(bodyParser())

app.get('/swagger-ui-dist/:file', staticServe(swaggerUiDist.absolutePath()))
app.get('/swagger.json', schematorInstance.expose())
app.get('/swagger', schematorInstance.render({ exposePath: '/swagger.json' }))

app.get(
  '/',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({ method: 'get', attach: '/', path: './docs.yml' }),
  async () => ({ status: 'success' })
)
app.post(
  '/',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({ method: 'post', attach: '/', path: './docs.yml' }),
  async () => ({ status: 'success' })
)

app.listen(4000)
