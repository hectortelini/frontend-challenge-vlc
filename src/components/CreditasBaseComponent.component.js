export default class CreditasBaseComponent extends HTMLElement {
  constructor () {
    super()
    this._URLStyleSheet = './src/styles.css'
  }
  render (template) {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.addExternalStyle(this._URLStyleSheet)
  }

  async addExternalStyle (urlStyle) {
    const sheet = new CSSStyleSheet()
    await sheet.replace(`@import url("${urlStyle}")`)
    this.shadowRoot.adoptedStyleSheets = [sheet]
  }
}
