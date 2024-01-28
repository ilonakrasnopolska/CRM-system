const headerContainer = document.getElementById('header-container') //get header container
const container = document.getElementById('container') //get container
const boxShadowOfBody = document.getElementById('box-shadow') //get div for shadow

const tableBox = createDiv('table')
const clientsList = document.createElement('ul') //create table
clientsList.classList.add('table__list') //add class name to table
const addButton = createButton('add__button', 'Add client') //create button add client

//current status of modal window 
let currentModal = null

//create contacts array
let contactsArray = [
  {
    contactName: 'Phone number',
    contact: '',
    logo: createSvg("d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z", "fill", "#9873FF", "opacity", "0.7"),
    placeholder: 'Enter phone number',
  },
  {
    contactName: 'Additional phone',
    contact: '',
    logo: createSvg("d", "M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z", "fill", "#9873FF", "opacity", "16"),
    placeholder: 'Enter an additional phone',
  },
  {
    contactName: 'Email',
    contact: '',
    logo: createSvg("d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z", "fill", "#9873FF", "opacity", "0.7"),
    placeholder: 'Enter email address',
  },
  {
    contactName: 'Vk',
    contact: '',
    logo: createSvg("d", "M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z", "fill", "#9873FF", "opacity", "0.7"),
    placeholder: 'Add social network',
  },
  {
    contactName: 'Facebook',
    contact: '',
    logo: createSvg("d", "M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z", "fill", "#9873FF", "opacity", "0.7"),
    placeholder: 'Add social network',
  },
]

//create clients array
let clientsArray = [
  {
    id: getRandomNumber(1000, 10000),
    fullName: 'Ilona Sue Kras',
    dateOfCreation: getDate(),
    timeOfCreation: getTime(),
    latestChanges: getDate(),
    timeLatestChanges: getTime(),
    contacts: contactsArray.logo,
  },
  {
    id: getRandomNumber(1000, 10000),
    fullName: 'Ilona Sue Kras',
    dateOfCreation: getDate(),
    timeOfCreation: getTime(),
    latestChanges: getDate(),
    timeLatestChanges: getTime(),
    time: getTime(),
    contacts: contactsArray.logo,
  }
]

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

//function create date - for date of creation and latest changes 
function getDate() {
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

//function create time - for date of creation and latest changes 
function getTime() {
  //get current date
  const currentDate = new Date()

  // Часы с ведущим нулем
  const hours = currentDate.getHours().toString().padStart(2, '0')
  // Минуты с ведущим нулем
  const minutes = currentDate.getMinutes().toString().padStart(2, '0')

  const time = `${hours}:${minutes}`
  return time
}

//function validation of modal window
function validation(form) {
  //value of validation
  let result = true
  //get all inputs
  let allInputs = form.querySelectorAll('.modal__input')
  //get all contacts inputs
  let allContactInputs = form.querySelectorAll('.modal__select-input')

  //func create label of input for creating error
  function createError(input, text) {
    const parent = input.parentNode //get input-box
    const errorLabel = createLabel('error-label', 'error', text) //create label

    parent.classList.add('error')
    input.classList.add('input-error')

    parent.append(errorLabel)
  }
  //func remove error of input
  function removeError(input) {
    const parent = input.parentNode //get input-box

    if (parent.classList.contains('error')) {
      parent.querySelector('.error-label').remove()
      parent.classList.remove('error')
      input.classList.remove('input-error')
    }
  }
  //func wrapper for all input conditions of enter
  function inputEnterValidation(input) {
    const contactAdded = document.getElementById('add-contact-box').querySelector('.modal__select-box') !== null
    const addContactBtn = document.getElementById('add-contact')

    //check if user added contact
    if (!contactAdded) {
      removeError(addContactBtn)
      createError(addContactBtn, `You have to add a client contact!`)
      result = false
    } else {
      removeError(addContactBtn)
    }

    //check max-length = 15
    if (input.dataset.maxLength) {
      if (input.value.trim().length > input.dataset.maxLength) {
        removeError(input)
        createError(input, `Maximum number of characters ${input.dataset.maxLength}`)
        result = false
      }
    }
    //check only first input if not empty
    if (input.dataset.required == 'true') {
      if (input.value.trim() == '') {
        removeError(input)
        createError(input, 'The field is empty')
        result = false
      }
    }
    //if field type text
    if (input.type === 'text' && input.type !== 'tel') {
      const value = input.value.trim()
      if (/\d/.test(value)) {
        createError(input, `The field should not contain numbers!`)
        result = false
      }
    }
    //if field type tel
    if (input.type === 'tel') {
      const value = input.value.trim()
      if (!/\d/.test(value)) {
        createError(input, `The field should contain numbers!`)
        result = false
      }
    }
    //if user enter the new value after he got error
    input.addEventListener('input', function () {
      const parent = this.parentNode
      if (parent.classList.contains('error')) {
        parent.querySelector('.error-label').remove()
        parent.classList.remove('error')
      }
    })
  }

  //check if input.value = empty with client full name 
  for (const input of allInputs) {

    removeError(input) //clear errors

    inputEnterValidation(input) //call func for checking all input
  }

  //check if input.value = empty with client contact
  for (const input of allContactInputs) {

    removeError(input) //clear errors

    inputEnterValidation(input) //call func for checking all input
  }

  return result
}

//func create sort of table
function sortByKey(array, key) {
  return array.sort((a, b) => {
    if (key === 'number') {
      const valueA = calcAge(a['number'])
      const valueB = calcAge(b['number'])
      return valueA - valueB
    } else {
      // Преобразуем в верхний регистр для удобства сравнения
      const valueA = a[key].toUpperCase() 
      const valueB = b[key].toUpperCase()

      if (valueA < valueB) {
        return -1 // Возвращаем отрицательное число, если valueA меньше valueB
      }
      if (valueA > valueB) {
        return 1 // Возвращаем положительное число, если valueA больше valueB
      }
      return 0 // Возвращаем 0, если значения равны
    }
  })
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
  form.addEventListener('submit', async function (event) {
    event.preventDefault()

    //call validation
    if (validation(this) == true) {
      if (formType === 'add') {
        addNewClient()
      } else if (formType === 'edit') {
        editClientData(id)
      }
      //clear form
      form.reset()
    }
  })

  //create box for title and close btn
  const titleBtnBox = createDiv('modal__title-btn-box')
  const title = createTitle('h2', 'modal__title', subtitle)
  let titleId = createParagraph('modal__title-id', `ID:${id}`)

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
      input.setAttribute('data-max-length', '15') //add max length
      input.setAttribute('data-required', 'true')

      inputBox.append(label, input) //add to box
      form.append(inputBox) //add to form
    }
  }
  //put all buttons to modal window
  function createButtons(cancelBtn) {
    //this func create option for Choose contact of client
    function createSelectForAddContact() {
      //create select box
      const selectBox = createDiv('modal__select-box')
      //create select
      const select = document.createElement('select')
      select.classList.add('modal__select')

      const selectInput = createInput('modal__select-input', '', '')
      selectInput.placeholder = 'Enter phone number'
      selectInput.type = 'tel'
      selectInput.setAttribute('data-required', 'true')

      //create option
      for (let i = 0; i < contactsArray.length; i++) {
        let option = document.createElement('option')
        option.text = contactsArray[i].contactName
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
            selectInput.placeholder = contactsArray[0].placeholder
            selectInput.setAttribute('data-max-length', '15')
            selectInput.setAttribute('data-min-length', '10')
            selectInput.dataset.type = 'phone'
            break
          case 'option2':
            selectInput.type = 'tel'
            selectInput.placeholder = contactsArray[1].placeholder
            selectInput.setAttribute('data-max-length', '15')
            selectInput.setAttribute('data-min-length', '10')
            selectInput.dataset.type = 'phone'
            break
          case 'option3':
            selectInput.type = 'email'
            selectInput.placeholder = contactsArray[2].placeholder
            selectInput.setAttribute('data-max-length', '25')
            break
          case 'option4':
            selectInput.type = 'url'
            selectInput.placeholder = contactsArray[3].placeholder
            break
          case 'option5':
            selectInput.type = 'url'
            selectInput.placeholder = contactsArray[4].placeholder
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
      createSelectForAddContact()
      const parent = this.parentNode
      if (parent.classList.contains('error')) {
        parent.querySelector('.error-label').remove()
        parent.classList.remove('error')
      }
    })

    //add select contacts to box
    addBtnBox.append(addContactBtn)

    //create save btn
    const saveBtn = createButton('modal__save-btn', 'Save')
    saveBtn.id = 'save-btn'
    saveBtn.type = 'submit'

    //create remove btn
    const removeClientBtn = createButton('modal__remove-btn', cancelBtn)
    removeClientBtn.type = 'button'
    removeClientBtn.addEventListener('click', function () {
      //call func for removing client 
      removeClient(id)
      //call func for close window 
      closeModal()
    })

    //add btn-s to form
    form.append(addBtnBox, saveBtn, removeClientBtn)
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

  //find select
  let selectedContact = document.querySelector('.modal__select')
  //find all inputs with contacts
  let contactsInputArr = document.querySelectorAll('.modal__select-input')
  //create new client contacts array
  let newClientContacts = []

  // if select.text === contacts array.contact name => add to contact value from input
  // for (let i = 0; i < contactsInputArr.length; i++) {
  //   for (let j = 0; j < selectedContact.length; j++) {
  //     if (selectedContact[j].text === contactsArray[i].contactName) {
  //       contactsArray[i].contact = contactsInputArr[j].value.trim()
  //       newClientContacts = contactsArray[i].logo
  //       break // Выход из внутреннего цикла, если найдено соответствие
  //     }
  //   }
  // }
  // console.log(contactsArray)
  // console.log(newClientContacts);

  //create new client obj
  let newClientObj = {
    id: getRandomNumber(1000, 10000),
    fullName,
    dateOfCreation: getDate(),
    timeOfCreation: getTime(),
    latestChanges: getDate(),
    timeLatestChanges: getTime(),
    time: getTime(),
    contacts: newClientContacts,
  }

  //add to array
  clientsArray.push(newClientObj)

  //render table
  renderClientsTable()
}

//function for edit client data
function editClientData(id) {
  const clientIndex = clientsArray.findIndex(item => item.id === id)

  if (clientIndex !== -1) {
    //find all inputs
    let allInputsArray = document.querySelectorAll('.modal__input')
    //get all value from inputs 
    let fullName = `${allInputsArray[0].value} ${allInputsArray[1].value} ${allInputsArray[2].value}`

    clientsArray[clientIndex].fullName = fullName
    clientsArray[clientIndex].latestChanges = getDate()
    clientsArray[clientIndex].timeLatestChanges = getTime()

    renderClientsTable()
    closeModal()
  }
}

//function for removing client
function removeClient(id) {
  const indexToRemove = clientsArray.findIndex(item => item.id === id)

  if (indexToRemove !== -1) {
    clientsArray.splice(indexToRemove, 1)
    renderClientsTable()
  }
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
function createClientAtTable(id, fullName, date, createTime, latestChanges, changesTime, contacts) {
  const li = document.createElement('li') //create li 
  li.classList.add('table__list-item')

  //create func create action
  function createAction() {
    const action = createDiv('table__client-action') //create container for action btns

    const buttonEdit = createButton('table__client-action-btn', 'Edit') //create btn edit
    const svgEditBtn = createSvg("d", "M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z", "fill", "#9873FF", "table__actions-svg", "16")
    buttonEdit.appendChild(svgEditBtn)

    buttonEdit.addEventListener('click', function () {
      createModalWindow(`Change the data`, id, 'Remove client', 'edit', 'modalEdit') //call func pop up window for editing    
    })

    const buttonRemove = createButton('table__client-action-btn', 'Remove') //create btn remove
    const svgRemoveBtn = createSvg("d", "M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z", "fill", "#F06A4D", "table__actions-svg", "16")
    buttonRemove.append(svgRemoveBtn)

    buttonRemove.addEventListener('click', function () {
      //call func for removing client 
      removeClient(id)
    })

    action.append(buttonEdit, buttonRemove)
    return action
  }

  let number = createButton('table__client-id', id)
  let clientName = createButton('table__client-text', fullName)
  let dateOfCreating = createButton('table__client-text', date)
  let timeOfCreating = createParagraph('table__last-changes-time', createTime)
  dateOfCreating.append(timeOfCreating)

  let lastChanges = createButton('table__client-text', latestChanges)
  let timeLastChanges = createParagraph('table__last-changes-time', changesTime)
  lastChanges.append(timeLastChanges)

  let contact = createButton('table__client-text', contacts)

  li.append(number, clientName, dateOfCreating, lastChanges, contact, createAction())
  return li
}

//function render clients table
function renderClientsTable() {
  clientsList.innerHTML = '' //clear table before render

  for (let i = 0; i < clientsArray.length; i++) {
    let client = createClientAtTable(clientsArray[i].id,
      clientsArray[i].fullName,
      clientsArray[i].dateOfCreation,
      clientsArray[i].timeOfCreation,
      clientsArray[i].latestChanges,
      clientsArray[i].timeLatestChanges,
      clientsArray[i].contacts)
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

