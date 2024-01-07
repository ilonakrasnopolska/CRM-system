const headerContainer = document.getElementById('header-container')
const container = document.getElementById('container')
const clientsList = document.createElement('ul')

//create clients array
let clientsArray = []

//function create element div
function createDiv(className) {
  const div = document.createElement('div')
  div.classList.add(className)
  return div
}

//function create element input
function createInput(className, placeholder, type) {
  const input = document.createElement('input')
  input.classList.add(className)
  input.placeholder = placeholder
  input.type = type
  return input
}

//function create element title 'h'
function createTitle(titleTag,className,text) {
  const title = document.createElement(titleTag)
  title.classList.add(className)
  title.textContent = text
  return title
}

//function create element button
function createButton(className, text) {
  const button = document.createElement('button')
  button.classList.add(className)
  button.textContent = text
  return button
}

//function create element paragraph
function createParagraph(className, text) {
  const paragraph = document.createElement('p')
  paragraph.classList.add(className)
  paragraph.textContent = text
  return paragraph
}

//function create element strong
function createStrong(className, text) {
  const strong = document.createElement('strong')
  strong.classList.add(className)
  strong.textContent = text
  return strong
}

//function create element a
function createLink(className, text) {
  const link = document.createElement('a')
  link.classList.add(className)
  link.textContent = text
  return link
}

//function create element form
function createForm(className) {
  const form = document.createElement('form')
  form.classList.add(className)
  return form
}

//function create header elements
function createHeaderElements() {
  const image = document.createElement('img') //create img
  image.src = './img/logoskb.png' 
  image.alt = 'Logo'

  const inputBox = createDiv('header__input-box') //create input box
  const input = createInput('header__input', 'Enter your request', 'text') //create input
  inputBox.append(input)

  headerContainer.append(image, inputBox)
}

createHeaderElements()
