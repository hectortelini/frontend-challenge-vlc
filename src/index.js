// It is needed for test works with WebComponents
import '@babel/polyfill'
import './styles.css'

import CreditasHeader from './components/CreditasHeader.component'
import CreditasForm from './components/CreditasForm.component'

export default class CreditasChallenge {
  static initialize () {
    this.registerComponents()
  }

  static registerComponents () {
    window.customElements.define('creditas-header', CreditasHeader)
    window.customElements.define('creditas-form', CreditasForm)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
