import css from './style.css'
import '@google/model-viewer'

const block = function (el, config) {
  var parser = new DOMParser()

  const child = document.createElement('div')
  child.classList.add(css.modelviewer)

  const url = config.url
  const views = config.views || []
  views.forEach((v, i) => {
    const id = {
      sandbox: 'modelviewer',
      index: i,
      view: v
    }
    config._sceneConfig._steps.push(id)
  })

  const modelraw = `<model-viewer 
    camera-controls
    interaction-prompt="none"
    src="${url}">
  </model-viewer>
`
  const model = parser.parseFromString(modelraw, 'text/html').body.childNodes[0]
  child.append(model)

  this.stepForward = step => {
    if (step.sandbox === 'modelviewer') {
      model.cameraOrbit = step.view
    }
  }

  el.appendChild(child)
}

export default block

block.install = Presenta => {
  Presenta.addBlock('modelviewer', block)
  // Presenta.u.addProp(['svgPadding'])
  // if (Presenta.io.addCache) Presenta.io.addCache({ type: 'modelviewer', field: 'url' })
}

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(block)
}
