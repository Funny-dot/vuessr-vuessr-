const fs = require('fs')
const path = require('path')
const express = require('express')
const compression = require('compression') // 开启gzip压缩
const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const serverInfo = `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`
const app = express()
function createRenderer (bundle, template) {
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    runInNewContext: false,//关键代码
    template: template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}
let renderer
if (isProd) {
  const bundle = require('./dist/vue-ssr-bundle.json')
  const template = fs.readFileSync(resolve('./dist/index.html'), 'utf-8')
  renderer = createRenderer(bundle, template)
} else {
  require('./build/setup-dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template)
  })
}
const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0 // 静态资源设置缓存
})

app.use(compression({ threshold: 0 })) // gzip压缩
app.use('/dist', serve('./dist', true)) // 静态资源
app.use('/static', serve('./static', true)) // 静态资源 （如：http://localhost:8080/public/logo-120.png）
app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve('./dist/service-worker.js'))

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('未渲染成功||wei cheng gong')
  }
  const s = Date.now()
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)
  const errorHandler = err => {
    if (err && err.code === 404) {
      console.log(404)
      res.status(404).end('404 | Page Not Found')
    } else {
      res.status(500).end('500 | Internal Server Error')
    }
  }
  const context = {
      title: '测试信息', // default title
	  keywords:'111',
	  description:'2323',
      url: req.url
  }
  renderer.renderToString(context, (err, html) => {
      if (err) {
        return handleError(err)
      }
      console.log(html)
      res.send(html)
    })
})

const port = process.env.PORT || 3026

app.listen(port, () => {
  console.log(`localhost:${port}`)
})