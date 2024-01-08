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
function createTitle(titleTag, className, text) {
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
function createLink(className, text, href) {
  const link = document.createElement('a')
  link.classList.add(className)
  link.textContent = text
  link.setAttribute('href', href)
  return link
}

//function create element form
function createForm(className) {
  const form = document.createElement('form')
  form.classList.add(className)
  return form
}

//function create svg 
function createSvg(attribute, coordinates, fill, color) {
  // create svg
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.classList.add('table__header-svg')

  // add attribute width and height
  svg.setAttribute("width", "12")
  svg.setAttribute("height", "12")
  svg.setAttribute("viewBox", "0 0 12 12")

  // Создаем элемент path и устанавливаем атрибут d для задания формы
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute(attribute, coordinates)
  path.setAttribute(fill, color) // add color

  // add path to svg
  svg.appendChild(path)
  return svg
}

//function create header elements
function createHeader() {
  const logoLink = createLink('header__logo-link', '', './index.html') //create link
  const image = document.createElement('img') //create img
  image.src = './img/logoskb.png'
  image.alt = 'Logo'
  logoLink.append(image)

  const inputBox = createDiv('header__input-box') //create input box
  const input = createInput('header__input', 'Enter your request', 'text') //create input
  inputBox.append(input)

  headerContainer.append(logoLink, inputBox)
}

//function create table 
function createTableHeader() {
  const tableHeader = createDiv('table__header')
  const buttonsTitle = [ //create array of objects names of btn-s
    {
      name: 'ID',
      attribute: 'd',
      coordinates: 'M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z',
      fill: 'fill',
      color: '#9873FF'
    },
    {
      name: 'Fullname',
      name: 'Latest changes',
      attribute: 'd',
      coordinates: 'M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z',
      fill: 'fill',
      color: '#9873FF'
    },
    {
      name: 'Date and time of creation',
      name: 'Latest changes',
      attribute: 'd',
      coordinates: 'M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z',
      fill: 'fill',
      color: '#9873FF'
    },
    {
      name: 'Latest changes',
      attribute: 'd',
      coordinates: 'M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z',
      fill: 'fill',
      color: '#9873FF'
    },
    {
      name: 'Contacts',
    },
    {
      name: 'Actions',
    }
  ]

  for (let i = 0; i < buttonsTitle.length; i++) {
    const { name, attribute, coordinates, fill, color } = buttonsTitle[i]   //get data from array of objects

    let button = createButton('table__header-button', name) //create button

    if (i === 0) { //add class name to 1 button
      button.classList.add('table__header-bth-id')
    }

      if (i < 4) { //for 4 btn create svg
        let svg = createSvg(attribute, coordinates, fill, color) //create svg
        button.append(svg) //add svg to button

        if (i > 0 && i < 4) { //add class name to svg
          svg.classList.add('table__svg-arrow')
        }
      }

    if (i === 1) { //add text to button
      let text = createParagraph('table__header-button-txt', 'A-Z')
      button.append(text)
    }

    tableHeader.append(button) //add button
  }

  container.append(tableHeader) //add table to container
}

//function render DOM
function renderDom() {
  const title = createTitle('h1', 'title', 'Clients') //create title
  container.append(title) //add title 
  createTableHeader() //create table with buttons
}

createHeader()

renderDom()
