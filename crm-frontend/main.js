const headerContainer = document.getElementById('header-container') //get header container
const container = document.getElementById('container') //get container
const boxShadowOfBody = document.getElementById('box-shadow') //get div for shadow

const tableBox = createDiv('table')
const clientsList = document.createElement('ul') //create table
clientsList.classList.add('table__list') //add class name to table
const addButton = createButton('add__button', 'Add client') //create button add client

//get date of latest changes of client
let latestChanges = getDateLatestChanges()

//get time of latest changes of client
let timeOfLatestChanges = getTimeLatestChanges()

//create clients array
let clientsArray = [
  {
    id: Date.now(),
    fullName: 'Ilona Sue Kras',
    date: latestChanges,
    latestChanges,
    contacts: 'vk',
  },
  {
    id: Date.now(),
    fullName: 'Ilona Sue Kras',
    date: latestChanges,
    latestChanges,
    contacts: 'vk',
  }
]

//current status of modal window 
let currentModal = null
//client id 
let clientId = Date.now()


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

//function create label
function createLabel(className, forName, text) {
  const label = document.createElement('label')
  label.classList.add(className)
  label.setAttribute('for', forName)
  label.textContent = text
  return label
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
function createSvg(attribute, coordinates, fill, color, className, size) {
  // create svg
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.classList.add(className)

  // add attribute width and height
  svg.setAttribute("width", size)
  svg.setAttribute("height", size)

  // Создаем элемент path и устанавливаем атрибут d для задания формы
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute(attribute, coordinates)
  path.setAttribute(fill, color) // add color

  // add path to svg
  svg.appendChild(path)
  return svg
}

// if user click to ESC
function handleKeyPress(e) {
  if (e.key === 'Escape') {
    closeModal()
  }
}

//function create date - latest changes - when user edit client info
function getDateLatestChanges() {
  //get current date
  const currentDate = new Date() 
  
  // получаем год
  const year = currentDate.getFullYear()
  // Месяц с ведущим нулем
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  // День с ведущим нулем
  const day = currentDate.getDate().toString().padStart(2, '0') 

  const date = `${day}.${month}.${year}`
  return date
}

//function create time - latest changes - when user edit client info
function getTimeLatestChanges() {
  //get current date
  const currentDate = new Date() 
  
  // Часы с ведущим нулем
  const hours = currentDate.getHours().toString().padStart(2, '0') 
  // Минуты с ведущим нулем
  const minutes = currentDate.getMinutes().toString().padStart(2, '0') 

  const time = `${hours}:${minutes}`
  return time
}

//function create modal window to edit data of client
function createModalWindow(subtitle, id, cancelBtn, formType, modalName) {
  //function with conditions for closing modal window
  function handleCloseConditions(event) {
    const buttonRemove = document.querySelector('.modal__remove-btn')

    //add event to body shadow if user click at body and not at modal
    boxShadowOfBody.addEventListener('click', function (event) {
      if (
        currentModal &&
        currentModal.classList.contains('open') &&
        (event.target.classList.contains('modal__close-button') ||
          !currentModal.contains(event.target))
      ) {
        currentModal.remove()
        closeModal()
      }
    })

    // Проверка, что клик был вне модального окна
    if (
      currentModal &&
      currentModal.classList.contains('open') &&
      (event.target.classList.contains('modal__close-button') ||
        !currentModal.contains(event.target))
    ) {
      currentModal.remove()
      closeModal()
    }

    // check for button "Cancel"
    if (buttonRemove && buttonRemove.textContent === 'Cancel') {
      currentModal.remove()
      closeModal()
    }

    // check for button "Remove client"
    if (buttonRemove && buttonRemove.textContent === 'Remove client') {
      console.log('Удалять клиента тут ')
      currentModal.remove()
      closeModal()
    }

    //add event for esc
    window.addEventListener('keydown', handleKeyPress)
  }

  //reset all before create a new window 
  closeModal()
  //call func which create all conditions for closing window if user click
  handleCloseConditions()

  //create form box
  const modalBox = createDiv('modal')
  modalBox.id = modalName
  modalBox.classList.add('open')
  //add class name to div with shadow
  if (modalBox.classList.contains('open')) {
    boxShadowOfBody.classList.add('shadow-on')
  }
  //Предотвращаем всплытие события, чтобы при клике в модальном окне не срабатывало закрытие окна 
  modalBox.addEventListener('click', function (event) {
    event.stopPropagation()
  })

  //create form
  const form = createForm('form')
  form.classList.add('modal__form')
  form.type = 'submit'
  form.addEventListener('submit', function (event) {
    event.preventDefault()
    if (formType === 'add') {
      addNewClient()
    } else if (formType === 'edit') {
      editClientData(id)
    }
    //clear form
    form.reset()
  })

  //create box for title and close btn
  const titleBtnBox = createDiv('modal__title-btn-box')
  const title = createTitle('h2', 'modal__title', subtitle)
  let titleId = createParagraph('modal__title-id', id)

  //create close button
  const closeBtn = createButton('modal__close-button', '')
  closeBtn.type = 'button'
  closeBtn.addEventListener('click', closeModal)

  //append all
  titleBtnBox.append(title, titleId, closeBtn)
  form.append(titleBtnBox)

  //this func create inputs for form
  function createFormInputs() {
    //create input components array
    let inputComponents = [
      {
        className: 'modal__label',
        forName: 'surname',
        text: 'Surname*',
      },
      {
        className: 'modal__label',
        forName: 'name',
        text: 'Name*',
      },
      {
        className: 'modal__label',
        forName: 'lastName',
        text: 'Last Name*',
      },
    ]

    for (let i = 0; i < inputComponents.length; i++) {
      const { className, forName, text } = inputComponents[i]
      const inputBox = createDiv('modal__input-box') //create box
      let label = createLabel(className, forName, text) //create label
      let input = createInput('modal__input', '', 'text') //create input
      input.setAttribute('name', forName) //add input name

      inputBox.append(label, input) //add to box
      form.append(inputBox) //add to form
    }
  }
  //put all buttons to modal window
  function createButtons(cancelBtn) {
    //this func create option for Choose contact of client
    function createSelectForChooseContact() {
      //create select box
      const selectBox = createDiv('modal__select-box')
      //create select
      const select = document.createElement('select')
      select.classList.add('modal__select')

      const optionTextArr = ['Phone number', 'Additional phone', 'Email', 'Vk', 'Facebook']
      const selectInput = createInput('modal__select-input', '', '')
      selectInput.placeholder = 'Enter phone number'

      //create option
      for (let i = 0; i < optionTextArr.length; i++) {
        let option = document.createElement('option')
        option.text = optionTextArr[i]
        option.value = `option${i + 1}`
        select.appendChild(option)
      }

      // Add event listener to the select element
      select.addEventListener('change', function () {
        selectInput.placeholder = '' //clear placeholder if use change
        const selectedOption = this.value // Get the selected option value

        // Update input attributes based on the selected option
        switch (selectedOption) {
          case 'option1':
            selectInput.type = 'tel'
            selectInput.placeholder = 'Enter phone number'
            break
          case 'option2':
            selectInput.type = 'tel'
            selectInput.placeholder = 'Enter an additional phone number'
            break;
          case 'option3':
            selectInput.type = 'email'
            selectInput.placeholder = 'Enter email address'
            break
          case 'option4':
          case 'option5':
            selectInput.type = 'url'
            selectInput.placeholder = 'Add social network'
            break
          default:
            // Handle default case if needed
            break
        }
      })

      //create btn for removing contact
      const removeContactBtn = createButton('modal__remove-contact-btn', '') //create btn for cleaning input
      const removeContactBtnSvg = createSvg("d", 'M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z', "fill", "#B0B0B0", "modal__remove-btn-svg", "12")
      removeContactBtn.appendChild(removeContactBtnSvg) //add svg to btn
      removeContactBtn.addEventListener('click', function (event) {
        event.stopPropagation()
        event.preventDefault()
        selectBox.remove()
      })

      //add select and input to box
      selectBox.append(select, selectInput, removeContactBtn)
      //add box to modal window
      addBtnBox.append(selectBox)
    }

    //create container for btn-s
    const addBtnBox = createDiv('modal__add-contact-box')
    addBtnBox.id = 'add-contact-box'

    //create btn add contact
    //create svg to btn add contact
    const addContactBtnSvg = createSvg("d", "M7.00001 3.66665C6.63334 3.66665 6.33334 3.96665 6.33334 4.33331V6.33331H4.33334C3.96668 6.33331 3.66668 6.63331 3.66668 6.99998C3.66668 7.36665 3.96668 7.66665 4.33334 7.66665H6.33334V9.66665C6.33334 10.0333 6.63334 10.3333 7.00001 10.3333C7.36668 10.3333 7.66668 10.0333 7.66668 9.66665V7.66665H9.66668C10.0333 7.66665 10.3333 7.36665 10.3333 6.99998C10.3333 6.63331 10.0333 6.33331 9.66668 6.33331H7.66668V4.33331C7.66668 3.96665 7.36668 3.66665 7.00001 3.66665ZM7.00001 0.333313C3.32001 0.333313 0.333344 3.31998 0.333344 6.99998C0.333344 10.68 3.32001 13.6666 7.00001 13.6666C10.68 13.6666 13.6667 10.68 13.6667 6.99998C13.6667 3.31998 10.68 0.333313 7.00001 0.333313ZM7.00001 12.3333C4.06001 12.3333 1.66668 9.93998 1.66668 6.99998C1.66668 4.05998 4.06001 1.66665 7.00001 1.66665C9.94001 1.66665 12.3333 4.05998 12.3333 6.99998C12.3333 9.93998 9.94001 12.3333 7.00001 12.3333Z",
      "fill", "#9873FF", "modal__add-btn-svg", "14px")
    const addContactBtn = createButton('modal__add-contact-btn', 'Add contact') //create btn add contact
    addContactBtn.id = 'add-contact'
    addContactBtn.appendChild(addContactBtnSvg) //add svg to btn
    addContactBtn.addEventListener('click', function (event) {
      event.stopPropagation()
      event.preventDefault()
      //call func for choosing add contact to form
      createSelectForChooseContact()
    })

    //add select contacts to box
    addBtnBox.append(addContactBtn)

    //create save btn
    const saveBtn = createButton('modal__save-btn', 'Save')
    saveBtn.id = 'save-btn'
    saveBtn.type = 'submit'

    //create remove btn
    const removeClient = createButton('modal__remove-btn', cancelBtn)
    removeClient.type = 'button'

    //add btn-s to form
    form.append(addBtnBox, saveBtn, removeClient)
  }

  //call func for adding inputs to form
  createFormInputs()
  //call func for adding buttons to form
  createButtons(cancelBtn)

  //add form to box
  modalBox.append(form)
  //запоминаем текущее модальное окно в переменной current modal
  currentModal = modalBox
  //add form to container
  boxShadowOfBody.append(modalBox)
  return modalBox
}

//function close modal window 
function closeModal() {
  if (currentModal) {
    //remove class name for opening
    currentModal.classList.remove('open')
    boxShadowOfBody.classList.remove('shadow-on')
    //remove modal window from html
    currentModal.remove()
    //Сбрасываем текущее модальное окно
    currentModal = null
  }
}

//function add client button - add event listener
function createAddClientButton() {
  // Check if the button already exists
  const existingButtonBox = document.querySelector('.add__btn-box')
  const existingSvg = document.querySelector('.add__button-svg')
  if (existingButtonBox) {
    existingButtonBox.remove()
    existingSvg.remove()
  }

  const btnBox = createDiv('add__btn-box')
  const svgElement = createSvg("d", "M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z", "fill", "#9873FF", "add__button-svg", "22")
  addButton.append(svgElement)

  addButton.addEventListener('click', function () {
    createModalWindow('New client', '', 'Cancel', 'add', 'modalAdd') //call func pop up window for editing
  })

  btnBox.append(addButton) //add btn to btn box
  container.append(btnBox) //add btn box to container
}

//function for adding new client
function addNewClient() {
  //find all inputs
  let allInputsArray = document.querySelectorAll('.modal__input')
  let fullName = `${allInputsArray[0].value} ${allInputsArray[1].value} ${allInputsArray[2].value}`

  //create new client obj
  let newClientObj = {
    id: Date.now(),
    fullName,
    date: latestChanges,
    latestChanges,
    contacts: 'vk',
  }

  //add to array
  clientsArray.push(newClientObj)

  //render table
  renderClientsTable()
}

//function for edit client data
function editClientData(id) {
  //find all inputs
  let allInputsArray = document.querySelectorAll('.modal__input')
  let fullName = `${allInputsArray[0].value} ${allInputsArray[1].value} ${allInputsArray[2].value}`

  clientsArray.id
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
  const tableHeader = createDiv('table__sort')
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
      attribute: 'd',
      coordinates: 'M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z',
      fill: 'fill',
      color: '#9873FF'
    },
    {
      name: 'Date and time of creation',
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

    let button = createButton('table__sort-button', name) //create button

    if (i === 0) { //add class name to 1 button
      button.classList.add('table__sort-bth-id')
    }

    if (i < 4) { //for 4 btn create svg
      let svg = createSvg(attribute, coordinates, fill, color, 'table__sort-svg', '12') //create svg
      button.append(svg) //add svg to button

      if (i > 0 && i < 4) { //add class name to svg
        svg.classList.add('table__sort-svg-arrow')
      }
    }

    if (i === 1) { //add text to button
      let text = createParagraph('table__sort-button-txt', 'A-Z')
      button.append(text)
    }

    tableHeader.append(button) //add button
  }

  tableBox.append(tableHeader) //add table header to box
}

//function create client at table
function createClientAtTable(id, fullName, date, latestChanges, contacts) {
  const li = document.createElement('li') //create li 
  li.classList.add('table__list-item')

  //create func create action
  function createAction() {
    const action = createDiv('table__client-action') //create container for action btns

    const buttonEdit = createButton('table__client-action-btn', 'Edit') //create btn edit
    const svgEditBtn = createSvg("d", "M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z", "fill", "#9873FF", "table__actions-svg", "16")
    buttonEdit.appendChild(svgEditBtn)

    buttonEdit.addEventListener('click', function () {
      createModalWindow(`Change the data`, `ID:${clientId}`, 'Remove client', 'edit', 'modalEdit') //call func pop up window for editing    
    })

    const buttonRemove = createButton('table__client-action-btn', 'Remove') //create btn remove
    const svgRemoveBtn = createSvg("d", "M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z", "fill", "#F06A4D", "table__actions-svg", "16")
    buttonRemove.append(svgRemoveBtn)

    action.append(buttonEdit, buttonRemove)
    return action
  }

  let number = createButton('table__client-id', id)
  let clientName = createButton('table__client-text', fullName)
  let dateOfCreating = createButton('table__client-text', date)

  let lastChanges = createButton('table__client-text', latestChanges)
  let timeLastChanges = createParagraph('table__last-changes-time', timeOfLatestChanges)
  lastChanges.append(timeLastChanges)

  let contact = createButton('table__client-text', contacts)

  li.append(number, clientName, dateOfCreating, lastChanges, contact, createAction())
  return li
}

//function render clients table
function renderClientsTable() {
  clientsList.innerHTML = '' //clear table before render

  for (let i = 0; i < clientsArray.length; i++) {
    let client = createClientAtTable(clientsArray[i].id, clientsArray[i].fullName, clientsArray[i].date, clientsArray[i].latestChanges, clientsArray[i].contacts)
    clientsList.append(client) //add li to ul
  }

  tableBox.append(clientsList) //add table to table box 
  container.append(tableBox) //add table to container
  //add button addBtn to container
  createAddClientButton()
}

//function render DOM
function renderDom() {
  createHeader() //func create header
  const title = createTitle('h1', 'title', 'Clients') //create title
  container.append(title) //add title 
  createTableHeader() //create table with buttons
  renderClientsTable() //render table with clients
}

renderDom()

