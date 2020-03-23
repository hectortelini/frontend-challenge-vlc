const template = document.createElement('template')
template.innerHTML = `
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'ubuntu';
}
.header {
    background-color: #1eb98a;
    padding: 20px 0;
  }
  
  .header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
  }
  
  .logo {
    height: 1em;
  }
  
  .help {
    cursor: pointer;
    text-decoration: none;
    color: var(--concrete);
  }
</style>
<header class="header">
        <div class="header__container">
          <h1 class="header__title">
            <a href="#" title="Creditas">
              <img class="logo" src="https://staging.creditas.com.br/static/images/logo-creditas-white-3cd22a2808.svg" alt="Creditas">
            </a>
          </h1>
          <div class="help" id="help">Help</div>
        </div>
      </header>`

export default class HeaderElement extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  connectedCallback () {
    this.responseHelp = null
    this.loadHelp()
    this.onclick = this.Help
  }

  Help (event, res) {
    const message = this.responseHelp || 'Please wait 10 secons and try again!'
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
      const [question, answer] = await Promise.all([
        this.loadRequest('api/question'),
        this.loadRequest('api/answer')
      ])
      this.responseHelp = question.includes('wrong') ? `${question}` : `${question}\n${answer}`
    } catch (e) {
      console.log('error', e)
    }
  }
}
