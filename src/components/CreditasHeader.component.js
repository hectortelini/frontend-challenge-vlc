import CreditasBaseComponent from './CreditasBaseComponent.component'

import { template } from '../templates/CreditasHeader.template'

export default class CreditasHeader extends CreditasBaseComponent {
  constructor () {
    super()
    this.render(template)
    this._responseHelp = null
  }
  connectedCallback () {
    this.loadHelp()
    this.onclick = this.Help
  }

  Help (event, res) {
    const message = this._responseHelp || 'Please wait 10 secons and try again!'
    alert(message)
  }

  async loadRequest (url) {
    const req = await fetch(url)
    const { text, message } = await req.json()
    const res = text || message
    return res
  }

  async loadHelp () {
    try {
      const requests = ['api/question', 'api/answer']
      const [question, answer] = await Promise.all(requests.map(req => this.loadRequest(req)))
      this._responseHelp = question.includes('wrong') ? `${question}` : `${question}\n${answer}`
    } catch (e) {
      console.log('error', e)
    }
  }
}
