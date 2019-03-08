const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get("/teams/:teamId", (req, res) => {
    return app.render(req, res, "/team", { teamId: req.params.teamId })
  })

  server.get("/users/:userId", (req, res) => {
    return app.render(req, res, "/user", { userId: req.params.userId })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})