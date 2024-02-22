// global variables

//get url from server
const SERVER_URI = 'http://localhost:3000/api/clients'
const headerContainer = document.getElementById('header-container') //get header container
const container = document.getElementById('container') //get container
const boxShadowOfBody = document.getElementById('box-shadow') //get div for shadow
const animationLoader = createDiv('loader') //create animation block
animationLoader.id = 'loader'


const tableBox = document.getElementById('table-box') //create all table box
const table = createDiv('table') //create table
const clientsList = document.createElement('ul') //create ul
clientsList.classList.add('table__list') //add class name to table
const addButton = createButton('add__button-disabled', 'Add client') //create button add client

//current status of modal window 
let currentModal = null
//current obj id status from server
let currentServerObjID = null
//current status of animation for clients list
let animationPlayed = false

//create contacts data array
let contactsArray = [
  {
    value: 'Phone number',
    type: 'Phone number',
    label: 'Phone number',
    logo: createSvg("d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z", "fill", "#9873FF", "table__contact-svg", "16"),
    placeholder: 'Enter phone number',
  },
  {
    value: 'Additional phone',
    type: 'Additional phone',
    label: 'Additional phone',
    logo: createSvg("d", "M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z", "fill", "#FFFFFF", "table__contact-svg-phone", "16"),
    placeholder: 'Enter an additional phone',
  },
  {
    value: 'Email',
    type: 'Email',
    label: 'Email',
    logo: createSvg("d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z", "fill", "#9873FF", "table__contact-svg", "16"),
    placeholder: 'Enter email address',
  },
  {
    value: 'Vk',
    type: 'Vk',
    label: 'Vk',
    logo: createSvg("d", "M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z", "fill", "#9873FF", "table__contact-svg", "16"),
    placeholder: 'Add social network',
  },
  {
    value: 'Facebook',
    type: 'Facebook',
    label: 'Facebook',
    logo: createSvg("d", "M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z", "fill", "#9873FF", "table__contact-svg", "16"),
    placeholder: 'Add social network',
  },
  {
    value: 'Other',
    type: 'Other',
    label: 'Other',
    logo: createSvg("d", "M4.92969 8.52734H3.375V7.83203H4.92969V6.23828H5.63281V7.83203H7.19141V8.52734H5.63281V10.1133H4.92969V8.52734ZM7.9375 8.56641C7.9375 6.33203 8.84766 5.21484 10.668 5.21484C10.9544 5.21484 11.1966 5.23698 11.3945 5.28125V6.04688C11.1966 5.98958 10.9674 5.96094 10.707 5.96094C10.0951 5.96094 9.63542 6.125 9.32812 6.45312C9.02083 6.78125 8.85417 7.30729 8.82812 8.03125H8.875C8.9974 7.82031 9.16927 7.65755 9.39062 7.54297C9.61198 7.42578 9.8724 7.36719 10.1719 7.36719C10.6901 7.36719 11.0938 7.52604 11.3828 7.84375C11.6719 8.16146 11.8164 8.59245 11.8164 9.13672C11.8164 9.73568 11.6484 10.2096 11.3125 10.5586C10.9792 10.9049 10.5234 11.0781 9.94531 11.0781C9.53646 11.0781 9.18099 10.9805 8.87891 10.7852C8.57682 10.5872 8.34375 10.3008 8.17969 9.92578C8.01823 9.54818 7.9375 9.09505 7.9375 8.56641ZM9.92969 10.3203C10.2448 10.3203 10.487 10.2188 10.6562 10.0156C10.8281 9.8125 10.9141 9.52214 10.9141 9.14453C10.9141 8.81641 10.8333 8.55859 10.6719 8.37109C10.513 8.18359 10.2734 8.08984 9.95312 8.08984C9.75521 8.08984 9.57292 8.13281 9.40625 8.21875C9.23958 8.30208 9.10807 8.41797 9.01172 8.56641C8.91536 8.71224 8.86719 8.86198 8.86719 9.01562C8.86719 9.38281 8.96615 9.69271 9.16406 9.94531C9.36458 10.1953 9.61979 10.3203 9.92969 10.3203Z", "fill", "#333333", "table__other-svg", "16"),
    placeholder: 'Add other contact',
  },
]

//create clients array
let clientsArray = []

// func's for work with server

//function get clients from server
async function getServerData() {
  const response = await fetch(SERVER_URI, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await response.json()

  return data
}

//function get client
async function getServerDataByID(id) {
  const response = await fetch(`${SERVER_URI}/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await response.json()

  return data
}

//function add clients to server
async function addServerData(obj) {
  const response = await fetch(SERVER_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })

  const data = await response.json()
  return data
}

//function delete clients from server
async function deleteObjFromServer(id) {
  const response = await fetch(`${SERVER_URI}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await response.json()
  return data
}

//function for change client data
async function changeServerData(id, obj) {

  const response = await fetch(`${SERVER_URI}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application.json' },
    body: JSON.stringify(obj)
  })
  const data = await response.json()

  return data
}

//function load students and render
async function getClientsAndRender() {
  addButton.disabled = true
  animationLoading(animationLoader) // Показываем анимацию загрузки

  try {
    let serverData = await getServerData()

    if (serverData) {
      clientsArray = serverData //update array of clients
      renderClientsTable(clientsArray) //render 
    }
  } catch (error) {
    console.error('Error fetching clients:', error)
  } finally {
    // Скрываем анимацию загрузки после получения данных (или в случае ошибки)
    animationLoader.style.display = 'none'
    addButton.disabled = false
    addButton.classList.add('add__button')
    addButton.classList.remove('add__button-disabled')
  }
}

//function for animation loading 
async function animationLoading(loader) {
  // Покажите анимацию перед отправкой запроса
  loader.style.display = 'flex'

  try {
    // Отправьте запрос на сервер
    const response = await fetch('http://localhost:3000/api/clients')
    const data = await response.json()

    loader.classList.add('fade-out')
    // Скрыть анимацию после получения ответа
    loader.addEventListener('animationend', function () {
      loader.style.display = 'none'
      loader.classList.remove('fade-out')
    }, { once: true })

    return data
  } catch (error) {
    // Обработайте ошибку
    console.error('Error:', error)
    // Скрыть анимацию в случае ошибки
    loader.style.display = 'none'
    return null
  }
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

//function create animation
function createAnimation(loader, className, id) {
  const loaderElement = createDiv(className)
  loaderElement.id = id
  loader.appendChild(loaderElement)
}

//function for combines from array name/surname to full name 
function getFullName(client) {
  return `${client.name} ${client.surname} ${client.lastName}`
}

// if user click to ESC when modal is open
function handleKeyPress(e) {
  if (e.key === 'Escape') {
    closeModal()
  }
}

//function stop propagation
function stopPropagation(event) {
  event.stopPropagation()
}

//function close modal window 
function closeModal() {
  if (currentModal) {
    currentModal.classList.add('close-modal') // добавляем класс анимации закрытия
    setTimeout(() => {
      if (currentModal) {
        boxShadowOfBody.classList.add('close')
        boxShadowOfBody.classList.remove('shadow-on')
        currentModal.classList.remove('close-modal')
        currentModal.remove() // удаляем модальное окно после завершения анимации
        boxShadowOfBody.classList.remove('close')
        currentModal = null
      }
    }, 300) // время анимации в миллисекундах
  }
}

//function with conditions for closing modal window if user trying to close it
function handleCloseConditions(event) {

  if (event && event.target) {
    // add event to body shadow if the user clicks on the body and not on the modal
    if (
      currentModal &&
      currentModal.classList.contains('open') &&
      (event.target.classList.contains('modal__close-button') ||
        !currentModal.contains(event.target))
    ) {
      currentModal.remove()
      closeModal()
    }
  }
  // add event for esc only once
  window.addEventListener('keydown', handleKeyPress)

  // call func which creates all conditions for closing window if the user clicks
  boxShadowOfBody.addEventListener('click', handleCloseConditions)
  closeModal()
}

//function for removing event listener before closing modal
function removeModalEventListeners() {
  boxShadowOfBody.removeEventListener('click', handleCloseConditions)
  window.removeEventListener('keydown', handleKeyPress)

  if (currentModal) {
    const boxShadowOfBody = document.querySelector('.box-shadow')
    if (boxShadowOfBody) {
      boxShadowOfBody.removeEventListener('click', function (event) {
        event.stopPropagation()
      })
    }
  }
}

//function validation of modal window
function validation(form) {
  //get modal open
  const currentModal = document.querySelector('.modal.open')

  // Check if currentModal exists before accessing validation
  if (!currentModal) {
    return false
  }
  //get contact added box
  const contactAdded = document.getElementById('add-contact-box').querySelector('.modal__select-box') !== null
  //get button add contact
  const addContactBtn = document.getElementById('add-contact')
  //get all inputs
  const allInputs = form.querySelectorAll('.modal__input')
  //get all contacts inputs
  const allContactInputs = form.querySelectorAll('.modal__select-input')
  //value of validation
  let result = true

  // check if the form type is 'remove', skip validation
  if (form.id === 'removeForm') {
    return result
  }

  //func create label of input for creating error
  function createError(input, text) {
    // get input-box
    const parent = input.parentNode
    //create wrapper for label
    const errorLabelBox = createDiv('error-label-box')
    // create label
    const errorLabel = createLabel('error-label', 'error', text)

    if (contactAdded || parent) {
      parent.classList.add('error')
      input.classList.add('input-error')
      errorLabelBox.append(errorLabel)
      parent.append(errorLabelBox)
    }
  }
  //func remove error of input
  function removeError(input) {
    const parent = input.parentNode // get input-box
    if (contactAdded || parent.classList.contains('error')) {
      const errorLabelBox = parent.querySelector('.error-label-box')

      if (errorLabelBox) {
        errorLabelBox.remove()
        parent.classList.remove('error')
        input.classList.remove('input-error')
      }
    }
  }

  //func wrapper for all input conditions of enter
  function inputEnterValidation(input) {
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
      if (!input.parentNode.classList.contains('error')) {
        if (!/\d/.test(value)) {
          createError(input, `The field should contain numbers!`)
          result = false
        }
      }
    }
    //if user enter the new value after he got error
    input.addEventListener('input', function () {
      const parent = this.parentNode
      removeError(input)
    })
  }

  //check if input.value = empty with client full name 
  for (const input of allInputs) {

    removeError(input) //clear errors

    inputEnterValidation(input) //call valid
  }

  //check if input.value = empty with client contact
  for (const input of allContactInputs) {

    removeError(input) //clear errors

    inputEnterValidation(input) //call valid
  }

  return result
}

//function formate date and time for document
function formatDate(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatTime(timeString) {
  if (!timeString) return ''

  const [hours, minutes] = timeString.split(':').slice(0, 2) // Отрезаем секунды и миллисекунды
  return `${hours}:${minutes}`
}

//function create autocomplete list
function renderAutocomplete(clients, searchInput) {
  const autocompleteList = document.querySelector('.autocomplete-list')
  autocompleteList.innerHTML = ''

  clients.forEach(client => {
    const autocompleteFullName = createButton('autocomplete-fullName', getFullName(client))
    autocompleteFullName.addEventListener('click', function () {
      searchInput.value = getFullName(client)
      applyFilters() //add filters for searching
      autocompleteList.innerHTML = ''
      autocompleteList.classList.remove('active')
    })

    autocompleteList.appendChild(autocompleteFullName)

  })
}

//function create sort of table
function sortByKey(array, key) {
  sortByKey.lastKey = sortByKey.lastKey || 'null'
  sortByKey.lastDirection = sortByKey.lastDirection || 1

  let sortOrder = 1

  //Если ключ и направление сортировки совпадают с предыдущей сортировкой, меняем направление
  if (sortByKey.lastKey === key) {
    sortOrder = -sortByKey.lastDirection
    //Инвертируем направление для следующей сортировки
    sortByKey.lastDirection *= -1
  } else {
    // Если ключи не совпадают, сбрасываем направление и устанавливаем сортировку по возрастанию
    sortOrder = 1
    sortByKey.lastDirection = 1
  }

  if (key === 'id') {
    const sortElement = document.getElementById('sort-id')
    // Проверяем, является ли это первой загрузкой страницы
    if (sortByKey.lastKey !== 'id' && sortByKey.lastDirection !== 1) {
      sortOrder = 1 // Устанавливаем sortOrder на 1 для сортировки по возрастанию при первой загрузке
    } else {
      sortOrder = sortByKey.lastDirection // Используем текущее направление сортировки
    }
    // Удаляем предыдущий класс сортировки, если есть
    sortElement.classList.remove('ascending', 'descending')
    // Добавляем новый класс сортировки
    if (sortOrder === 1 && sortElement) {
      sortElement.classList.add('ascending')
    } else if (sortElement) {
      sortElement.classList.add('descending')
    }
  }

  // Сохраняем текущий ключ
  sortByKey.lastKey = key

  return array.sort((a, b) => {
    const valueA = `${a.name} ${a.surname} ${a.lastName}`
    const valueB = `${b.name} ${b.surname} ${b.lastName}`

    if (key === 'fullName') {
      const normalizedValueA = typeof valueA === 'string' ? valueA.toUpperCase() : valueA
      const normalizedValueB = typeof valueB === 'string' ? valueB.toUpperCase() : valueB

      // Получаем элемент с id="sort-fullName"
      const sortName = document.getElementById('sort-fullName')
      // Удаляем предыдущий класс сортировки, если есть
      sortName.classList.remove('up', 'bottom')
      // Добавляем новый класс сортировки
      if (sortOrder === 1 && sortName) {
        sortName.classList.add('up')
      } else if (sortName) {
        sortName.classList.add('bottom')
      }

      return (normalizedValueA < normalizedValueB ? -1 : (normalizedValueA > normalizedValueB ? 1 : 0)) * sortOrder
    } else if (key === 'createdAt') {
      // Объединяем дату и время в объект Date для сравнения
      const dateTimeA = new Date(a[key])
      const dateTimeB = new Date(b[key])

      // Получаем элемент с id="sort-creation"
      const sortCreate = document.getElementById('sort-creation')
      // Удаляем предыдущий класс сортировки, если есть
      sortCreate.classList.remove('early', 'later')
      // Добавляем новый класс сортировки
      if (sortOrder === 1 && sortCreate) {
        sortCreate.classList.add('early')
      } else if (sortCreate) {
        sortCreate.classList.add('later')
      }

      return (dateTimeA < dateTimeB ? -1 : (dateTimeA > dateTimeB ? 1 : 0)) * sortOrder
    }
    else {
      // Получаем элемент с id="sort-changes"
      const sortChanges = document.getElementById('sort-changes')
      // Удаляем предыдущий класс сортировки, если есть
      sortChanges.classList.remove('before', 'after')
      // Добавляем новый класс сортировки
      if (sortOrder === 1 && sortChanges) {
        sortChanges.classList.add('before')
      } else if (sortChanges) {
        sortChanges.classList.add('after')
      }

      return (valueA < valueB ? -1 : (valueA > valueB ? 1 : 0)) * sortOrder
    }
  })
}

//function set initial value for clients list by id
function setClientSortInitial(array) {
  renderClientsTable(array) //render table with clients
  sortByKey(array, 'id') // set default sorting
  renderClientsTable(array) //render table with clients
}

//function create of filter 
function applyFilters() {
  const searchInput = document.getElementById('search')
  // get value from input 
  const filterValue = searchInput.value.toLowerCase()

  // filter array of clients 
  const filteredClients = clientsArray.filter(client => {
    //Приводим значения к нижнему регистру для регистронезависимого сравнения
    const fullName = getFullName(client).toLowerCase()
    const id = String(client.id).toLowerCase()

    //Проверяем совпадение по id и имени
    const idMatch = id.includes(filterValue)
    const nameMatch = fullName.includes(filterValue)

    //Возвращаем true, если хотя бы одно условие совпадает
    return idMatch || nameMatch
  })

  //Отображаем отфильтрованных клиентов
  renderClientsTable(filteredClients)
}

//function create tooltips
function createTooltips(type, contact, button) {
  //create tooltip
  const tooltip = createDiv('tooltip')
  tooltip.classList.add('hidden')

  //add text - for button remove contact
  if (button.classList.contains('modal__remove-contact-btn')) {
    tooltip.classList.add('tooltip-remove')
    let text = createStrong('tooltip__remove-text', `Remove contact`)
    tooltip.append(text)
    button.appendChild(tooltip)
  } else {
    //add text for all clients contacts
    tooltip.title = type.type
    let textType = createStrong('tooltip__type', `${type.type}:`)
    let textContact = createStrong('tooltip__contact', `${contact.value}`)
    if (type.type === 'Email') {
      textContact.classList.add('tooltip-email')
    }

    tooltip.append(textType, textContact)
    button.appendChild(tooltip)
  }

  button.addEventListener('mouseover', function () {
    tooltip.classList.remove('hidden')
  })

  button.addEventListener('mouseout', function () {
    tooltip.classList.add('hidden')
  })

  return tooltip
}

//function create contacts list witch contains one client contacts
function createContactsList(array) {
  const list = createDiv('table__contact-list')

  array.forEach(contact => {
    //if contact type from contacts array = contact type from client array
    const contactType = contactsArray.find(item => item.type === contact.type)
    const clientContact = array.find(item => item.value === contact.value)

    if (contactType && contactType.logo) {
      let button = createButton('table__contact-btn', '')
      button.innerHTML = contactType.logo.outerHTML
      createTooltips(contactType, clientContact, button)
      list.appendChild(button)
    }
  })

  return list
}

//function for adding client contact to array
function getClientContacts() {
  // find all inputs with contacts
  let contactsInputArr = document.querySelectorAll('.modal__select-input')

  // create new client contacts array
  let newClientContactsArray = []

  // loop through contactsInputArr to create new contacts
  contactsInputArr.forEach(input => {
    let selectedContact = input.closest('.modal__select-box').querySelector('.modal__select')
    let selectedValue = selectedContact.value

    // find the corresponding contact object in contactsArray
    let selectedContactObject = contactsArray.find(contact => contact.type === selectedValue)

    if (selectedContactObject) {
      let newContact = {
        value: input.value.trim(),
        type: selectedContactObject.type,
      }

      // add the new contact to the array
      newClientContactsArray.push(newContact)
    }
  })
  return newClientContactsArray
}

//function for adding new client
async function addNewClient() {
  //get animation element 
  const btnLoader = document.getElementById('btn-loader')
  //show animation after click at button
  btnLoader.style.display = 'block'

  //get close button
  const closeBtn = document.getElementById('close-modal-btn')
  closeBtn.disabled = true // Disable the close button

  //get cancel btn 
  const cancelBtn = document.querySelector('.modal__remove-btn')
  cancelBtn.disabled = true //disabled the cancel btn


  //find all inputs
  let allInputsArray = document.querySelectorAll('.modal__input')

  // create new client obj
  let newClientObj = {
    name: allInputsArray[0].value,
    surname: allInputsArray[1].value,
    lastName: allInputsArray[2].value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contacts: getClientContacts(),
  }

  // send data to server
  try {
    let serverDataObj = await addServerData(newClientObj) //add client to server
    clientsArray.push(serverDataObj) //add obj to array
    renderClientsTable(clientsArray) //render table
    //remove modal with delay
    setTimeout(() => {
      closeModal()
    }, 100) //delay in milliseconds

    // hide animation after rendering
    btnLoader.style.display = 'none'
    closeBtn.disabled = false
    cancelBtn.disabled = false
  } catch (error) {
    // hide animation if mistake
    btnLoader.style.display = 'none'
    closeBtn.disabled = false
    cancelBtn.disabled = false
  }
}

//function for edit client data
async function editClientData(id) {
  //get close button
  const closeBtn = document.getElementById('close-modal-btn')
  closeBtn.disabled = true // Disable the close button

  //find index by id
  const clientIndex = clientsArray.findIndex(item => item.id === id);
  //get all inputs and select
  const allInputsArray = document.querySelectorAll('.modal__input')

  if (clientIndex !== -1) {
    //get data from form
    const surname = allInputsArray[0].value.trim()
    const name = allInputsArray[1].value.trim()
    const lastName = allInputsArray[2].value.trim()

    //update info about client
    clientsArray[clientIndex].name = name
    clientsArray[clientIndex].surname = surname
    clientsArray[clientIndex].lastName = lastName
    clientsArray[clientIndex].updatedAt = new Date().toISOString()
    clientsArray[clientIndex].contacts = getClientContacts()

    // create obj with new data
    const updatedClientData = {
      name,
      surname,
      lastName,
      updatedAt: clientsArray[clientIndex].updatedAt,
      contacts: clientsArray[clientIndex].contacts
    }

    // send data to server
    try {

      //send new data to server
      await changeServerData(id, updatedClientData)
      //update table 
      renderClientsTable(clientsArray)
      //remove modal with delay
      setTimeout(() => {
        closeModal()
      }, 100) //delay in milliseconds

      // hide animation after rendering
      closeBtn.disabled = false
    } catch (error) {
      // hide animation if mistake
      closeBtn.disabled = false
    }
  }
}

//function for removing client
async function removeClient(id) {
  const removeBtn = document.getElementById(`remove-btn${id}`)

  const btnLoader = removeBtn.querySelector('.animated-btn')
  btnLoader.style.display = 'block'

  const svg = removeBtn.querySelector('.table__actions-svg')
  svg.style.display = 'none' // hide SVG

  const indexToRemove = clientsArray.findIndex(item => item.id === id)

  if (indexToRemove !== -1) {

    // send data to server
    try {
      //remove from server 
      await deleteObjFromServer(id)
      //remove from array
      clientsArray.splice(indexToRemove, 1)
      //render 
      renderClientsTable(clientsArray)
      // hide animation after rendering
      btnLoader.style.display = 'none'
      svg.style.display = 'block'
    } catch (error) {
      // hide animation if mistake
      btnLoader.style.display = 'none'
      svg.style.display = 'block' 
    }
  }
}

//function create modal window to edit data of client
function createModalWindow(subtitle, id, formType, modalName) {
  // Сохраняем ссылки на созданные элементы .choices
  const createdSelectElements = []

  //call func which create all conditions for closing modal and reset modal before initial new modal
  removeModalEventListeners()
  handleCloseConditions()
  closeModal()
  //очищаем массив до создания новых ссылок на элементы .choices
  createdSelectElements.splice(0, createdSelectElements.length)

  // Функция для добавления обработчика события к элементам .choices
  function addChoicesEventListener(selectElement) {
    selectElement.addEventListener('click', function (event) {
      event.stopPropagation()
      selectElement.classList.toggle('is-open')
    })

    // Обработчик события для кликов на всем документе
    document.addEventListener('click', function (event) {
      // Проверяем, был ли клик внутри элемента списка выбора или на самом списке
      if (!event.target.closest('.choices')) {
        // Удаляем класс 'is-open' у всех элементов '.choices'
        document.querySelectorAll('choices.is-open').forEach(function (choicesElement) {
          choicesElement.classList.remove('is-open')
        })
      }
    })
  }

  //function fill client old data if we have to change data
  function fillEditForm(i, id, input) {
    //find current client
    const currentClient = clientsArray.find(client => client.id === id)

    //fill form
    if (currentClient) {

      if (input.classList.contains('modal__input')) {
        if (i === 0) {
          input.value = currentClient.name
        } else if (i === 1) {
          input.value = currentClient.surname
        } else if (i === 2) {
          input.value = currentClient.lastName
        }
      }
    }
  }

  //this func create option for Choose contact of client
  function createSelectForAddContact() {
    //get add btn 
    const addContactBox = document.getElementById('add-contact-box')
    //create select box
    const selectBox = createDiv('modal__select-box')
    //create select
    const select = document.createElement('select')
    select.classList.add('modal__select')

    //create option
    for (let i = 0; i < contactsArray.length; i++) {
      const { label, value } = contactsArray[i]
      let option = document.createElement('option')
      option.label = label
      option.value = value
      select.append(option)
    }

    const selectInput = createInput('modal__select-input', '', '')
    selectInput.placeholder = 'Enter phone number'
    selectInput.setAttribute('data-required', 'true')
    selectInput.name = 'error'
    selectInput.type = 'tel'

    // // Add event listener to the select element
    select.addEventListener('change', function () {
      selectInput.placeholder = '' //clear placeholder if use change
      // update selected option value
      let selectedOption = this.value

      // Update selectInput attributes based on the selected option
      switch (selectedOption) {
        case 'Phone number':
          selectInput.type = 'tel'
          selectInput.placeholder = contactsArray[0].placeholder
          selectInput.setAttribute('data-max-length', '15')
          selectInput.setAttribute('data-min-length', '10')
          selectInput.dataset.type = 'phone'
          break
        case 'Additional phone':
          selectInput.type = 'tel'
          selectInput.placeholder = contactsArray[1].placeholder
          selectInput.setAttribute('data-max-length', '15')
          selectInput.setAttribute('data-min-length', '10')
          selectInput.dataset.type = 'phone'
          break
        case 'Email':
          selectInput.type = 'email'
          selectInput.placeholder = contactsArray[2].placeholder
          selectInput.setAttribute('data-max-length', '25')
          selectInput.dataset.type = 'email'
          break
        case 'Vk':
          selectInput.type = 'url'
          selectInput.placeholder = contactsArray[3].placeholder
          selectInput.dataset.type = 'url'
          break
        case 'Facebook':
          selectInput.type = 'url'
          selectInput.placeholder = contactsArray[4].placeholder
          selectInput.dataset.type = 'url'
          break
        case 'Other':
          selectInput.type = 'text'
          selectInput.placeholder = contactsArray[5].placeholder
          selectInput.dataset.type = 'text'
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

    createTooltips('', '', removeContactBtn)

    removeContactBtn.addEventListener('click', function (event) {
      event.stopPropagation()
      event.preventDefault()
      selectBox.remove()
    })

    //add select and input to box
    selectBox.append(select, selectInput, removeContactBtn)

    //add box to modal window
    addContactBox.append(selectBox)

    // Инициализируем Choices.js для select
    new Choices(select, {
      allowHTML: true, // Устанавливаем allowHTML в true
      shouldSort: false, // Отключаем сортировку
      placeholder: true, // Включаем плейсхолдер
      searchEnabled: false, // Отключаем поиск   
      itemSelectText: "",
    })

    // Добавляем обработчик события для каждого созданного элемента .choices
    const selectElements = document.querySelectorAll('.choices')
    selectElements.forEach(selectElement => {
      if (!createdSelectElements.includes(selectElement)) {
        addChoicesEventListener(selectElement)
        createdSelectElements.push(selectElement)
      }
    })
  }

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

      //call func for fill form
      if (formType === 'edit') {
        fillEditForm(i, id, input)
      }

      inputBox.append(label, input) //add to box
      form.append(inputBox) //add to form
    }
  }

  //put all buttons to modal window
  function createButtons() {
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

    //add select contacts to box
    addBtnBox.append(addContactBtn)

    //create save btn
    const saveOrRemoveBtn = createButton('modal__save-btn', 'Save')
    saveOrRemoveBtn.id = 'save-btn'
    saveOrRemoveBtn.type = 'submit'
    createAnimation(saveOrRemoveBtn, 'action-btn-loader', 'btn-loader')

    //create remove btn
    const removeOrCancelBtn = createButton('modal__remove-btn', 'Cancel')
    removeOrCancelBtn.type = 'button'

    //if button type remove change text of buttons
    if (formType === 'remove') {
      saveOrRemoveBtn.textContent = 'Remove'
      saveOrRemoveBtn.id = 'remove-btn'
      saveOrRemoveBtn.classList.remove('modal__save-btn')
      saveOrRemoveBtn.classList.add('modal__delete-btn')
      removeOrCancelBtn.classList.remove('modal__remove-btn')
      removeOrCancelBtn.classList.add('modal__cancel-btn')
      removeOrCancelBtn.addEventListener('click', closeModal)
    }
    else if (formType === 'edit') {
      removeOrCancelBtn.textContent = 'Remove client'
      removeOrCancelBtn.addEventListener('click', function () {
        closeModal() // close current modal
        setTimeout(() => { // Добавить небольшую задержку перед созданием нового окна
          createModalWindow('Remove a client', id, 'remove', 'modalRemove') // create new modal window
        }, 500) // Задержка в миллисекундах
      })
    } else if (formType === 'add') {
      removeOrCancelBtn.addEventListener('click', closeModal)
    }

    //add btn-s to form
    form.append(addBtnBox, saveOrRemoveBtn, removeOrCancelBtn)

    addContactBtn.addEventListener('click', function (event) {
      event.preventDefault()
      //create max count of contacts
      const maxContacts = 9
      let inputsArr = document.querySelectorAll('.modal__select-input')

      if (inputsArr.length === maxContacts) {
        addContactBtn.classList.add('modal__hidden-btn')
      } else {
        // call func for choosing add contact to form
        createSelectForAddContact()
        const parent = this.parentNode
        if (parent.classList.contains('error')) {
          parent.classList.remove('error')
          parent.querySelector('.error-label-box').remove()
          addContactBtn.classList.remove('input-error')
        }
      }
    })
  }

  //create form box
  const modalBox = createDiv('modal')
  modalBox.id = modalName
  modalBox.classList.add('open')
  //add class name to div with shadow
  if (modalBox.classList.contains('open')) {
    boxShadowOfBody.classList.add('shadow-on')
  }
  //Предотвращаем всплытие события, чтобы при клике в модальном окне не срабатывало закрытие окна 
  modalBox.addEventListener('click', stopPropagation)
  //call func for closing window if user click esc
  window.addEventListener('keydown', handleKeyPress)

  //create form
  const form = createForm('form')
  form.classList.add('modal__form')
  form.type = 'submit'
  //add id to form 
  if (formType === 'add') {
    form.id = 'addForm'
  } else if (formType === 'edit') {
    form.id = 'editForm'
  } else if (formType === 'remove') {
    form.id = 'removeForm'
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault()

    //call func for removing client if form type = remove
    if (formType === 'remove') {
      closeModal()
      removeClient(id)
    }

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
  closeBtn.id = 'close-modal-btn'
  closeBtn.addEventListener('click', closeModal)

  //append all
  titleBtnBox.append(title, titleId, closeBtn)
  form.append(titleBtnBox)

  //create text for asking if remove client
  if (formType === 'remove') {
    const questionText = createParagraph('modal__question-remove', 'Are you sure you want to remove the client?')
    form.append(questionText)
  }

  //call func for adding inputs to form
  createFormInputs()
  //call func for adding buttons to form
  createButtons()

  //add form to box
  modalBox.append(form)
  //запоминаем текущее модальное окно в переменной current modal
  currentModal = modalBox
  //add form to container
  boxShadowOfBody.append(modalBox)
  return modalBox
}

//function create header elements
function createHeader() {
  //create header elements
  const logoLink = createLink('header__logo-link', '', './index.html') //create link
  const image = document.createElement('img') //create img
  image.src = './img/logoskb.png'
  image.alt = 'Logo'
  logoLink.append(image)

  //create input box
  const inputBox = createDiv('header__input-box')
  const input = createInput('header__input', 'Enter your request', 'text') //create input
  input.id = 'search'

  // create element autocomplete list
  const autocompleteList = createDiv('autocomplete-list')
  inputBox.appendChild(autocompleteList)

  input.addEventListener('input', function (event) {
    if (autocompleteList) {
      autocompleteList.classList.add('active')
    }
    const searchTerm = this.value.toLowerCase()
    const clientsNames = clientsArray.filter(client => getFullName(client).toLowerCase().startsWith(searchTerm))
    applyFilters() //add filters for searching
    renderAutocomplete(clientsNames, event.target) //add autocomplete

    // Clear autocomplete list if search term is empty
    if (!searchTerm.trim()) {
      const autocompleteList = document.querySelector('.autocomplete-list')
      autocompleteList.innerHTML = ''
      autocompleteList.classList.remove('active')
    }
  })
  //remove autocomplete block is user click at document
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.autocomplete-list.active') && !event.target.closest('.header__input')) {
      autocompleteList.innerHTML = ''
      autocompleteList.classList.remove('active')
    }
  })

  inputBox.append(input)

  headerContainer.append(logoLink, inputBox)
}

//function create table 
function createTableHeader() {
  const tableHeader = createDiv('table__sort')
  tableHeader.id = 'sort-buttons'
  //create array of buttons details
  const buttonsDetails = [
    {
      name: 'ID',
      attribute: 'd',
      coordinates: 'M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z',
      fill: 'fill',
      color: '#9873FF',
      id: 'sort-id',
      key: 'id',
    },
    {
      name: 'Fullname',
      attribute: 'd',
      coordinates: 'M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z',
      fill: 'fill',
      color: '#9873FF',
      id: 'sort-fullName',
      key: 'fullName',
    },
    {
      name: 'Date and time of creation',
      attribute: 'd',
      coordinates: 'M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z',
      fill: 'fill',
      color: '#9873FF',
      id: 'sort-creation',
      key: 'createdAt',
    },
    {
      name: 'Latest changes',
      attribute: 'd',
      coordinates: 'M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z',
      fill: 'fill',
      color: '#9873FF',
      id: 'sort-changes',
      key: 'updatedAt',
    },
    {
      name: 'Contacts',
      id: 'contacts',
    },
    {
      name: 'Actions',
      id: 'actions',
    }
  ]

  for (let i = 0; i < buttonsDetails.length; i++) {
    const { name, attribute, coordinates, fill, color, id, key } = buttonsDetails[i]   //get data from array of objects
    let button = createButton('table__sort-button', name) //create button

    //call func for sorting if click on button
    if (key) {
      button.addEventListener('click', function () {
        sortByKey(clientsArray, key)
        renderClientsTable(clientsArray)
      })
    }

    //func create settings for all buttons 
    function createButtonSettings() {
      //add id to button
      button.id = id
      //add class name to first button
      if (i === 0) {
        button.classList.add('table__sort-bth-id')
      }
      //for first 4 btn create svg
      if (i < 4) {
        let svg = createSvg(attribute, coordinates, fill, color, 'table__sort-svg', '12') //create svg
        button.append(svg) //add svg to button
        //add class name to svg
        if (i > 0 && i < 4) {
          svg.classList.add('table__sort-svg-arrow')
        }
      }
      //add text to button
      if (i === 1) {
        let text = createParagraph('table__sort-button-txt', 'A-Z')
        button.append(text)
      }
    }

    //call func for creating buttons settings 
    createButtonSettings()
    tableHeader.append(button)
  }

  tableBox.append(tableHeader) //add table header to box
}

//function create client at table
function createClientAtTable(clientObj) {
  const li = document.createElement('li') //create li 
  li.classList.add('table__list-item')
  // split from clientObj to date and time
  const [date, time] = clientObj.createdAt ? clientObj.createdAt.split('T') : ['', '']
  const [lastDate, lastTime] = clientObj.updatedAt ? clientObj.updatedAt.split('T') : ['', '']

  //create func create action
  function createAction() {
    const action = createDiv('table__client-action') //create container for action btns

    const buttonEdit = createButton('table__client-edit-btn', 'Edit') //create btn edit
    buttonEdit.id = `edit-btn${clientObj.id}`
    const svgEditBtn = createSvg("d", "M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z", "fill", "#9873FF", "table__actions-svg", "16")
    buttonEdit.append(svgEditBtn)

    buttonEdit.addEventListener('click', function () {
      //call create modal window
      createModalWindow(`Change the data`, clientObj.id, 'edit', 'modalEdit') //call func pop up window for editing    
    })

    const buttonRemove = createButton('table__client-remove-btn', 'Remove') //create btn remove
    buttonRemove.id = `remove-btn${clientObj.id}`
    const svgRemoveBtn = createSvg("d", "M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z", "fill", "#F06A4D", "table__actions-svg", "16")
    buttonRemove.append(svgRemoveBtn)
    createAnimation(buttonRemove, 'animated-btn', 'remove-animated')

    buttonRemove.addEventListener('click', function () {
      createModalWindow('Remove a client', clientObj.id, 'remove', 'modalRemove')
    })

    action.append(buttonEdit, buttonRemove)
    return action
  }

  let number = createButton('table__client-id', clientObj.id)
  let clientName = createButton('table__client-text', getFullName(clientObj))
  let dateOfCreating = createButton('table__client-text', formatDate(date))
  let timeOfCreating = createParagraph('table__last-changes-time', formatTime(time))
  dateOfCreating.append(timeOfCreating)

  let lastChangesElement = createButton('table__client-text', formatDate(lastDate))
  let timeLastChanges = createParagraph('table__last-changes-time', formatTime(lastTime))
  lastChangesElement.append(timeLastChanges)

  let clientContacts = createContactsList(clientObj.contacts)

  li.append(number, clientName, dateOfCreating, lastChangesElement, clientContacts, createAction())

  return li
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
    createModalWindow('New client', '', 'add', 'modalAdd') //call func pop up window for editing
  })

  btnBox.append(addButton) //add btn to btn box
  container.append(btnBox) //add btn box to container
}

//function render clients table
function renderClientsTable(array) {
  clientsList.innerHTML = '' //clear table before render
  const existingRows = document.querySelectorAll('.table__list-item') // find all rows with clents

  // clear rows with clients before rendering
  existingRows.forEach(row => {
    row.remove()
  })

  for (let i = 0; i < array.length; i++) {
    let client = createClientAtTable(array[i])
    clientsList.append(client) //add li to ul
  }


  table.append(clientsList) //add table to table box 
  tableBox.append(table) //add table to container
}

//function render DOM
function renderDom() {
  createAnimation(animationLoader, 'loader__element', 'loader-element') //func call create animation loading
  const title = createTitle('h1', 'title', 'Clients') //create title
  tableBox.append(animationLoader) //add animation loader
  container.append(title, tableBox) //add title and animation
  createAddClientButton() //create button add client 
  getClientsAndRender() //get info from server
  setClientSortInitial(clientsArray) //set table sort inherit
}

window.createHeader = createHeader
window.createTableHeader = createTableHeader
window.renderDom = renderDom
