// - Дана textarea.
// В неё вводится текст.
// Сделайте так, чтобы после захода на эту страницу через некоторое время, введенный текст остался в textarea.


// const textarea = document.getElementById("myTextarea")
// textarea.value = localStorage.getItem("textarea")
// textarea.oninput = (ev) => {
//     localStorage.setItem("textarea", ev.target.value)
// }

// // - Дана форма с инпутами, текстареа, чекбоксами, радио кнопочками, селектами и тп.
// // Пользователь вводит какие-то данные и закрывает страницу (не факт, что он заполнил всю форму).
// // Сделайте так, чтобы при следующем заходе на страницу введенные им ранее данные стояли на своих местах.
// // Сделайте ваш скрипт как можно более универсальным.


// let formUser = document.getElementById('newForm')

// for (const input of formUser) {
//     const keyInput = input.name;
//     input.value = localStorage.getItem(keyInput)

//     if (input.type === "checkbox" || input.type === "radio") {

//         input.checked = false
//         if (input.value === "true") {
//             input.checked = true
//         }
//     }

//     input.oninput = (ev) => {

//         if (ev.target.type === "checkbox" || ev.target.type === "radio")
//             ev.target.checked ?
//             ev.target.value = true :
//             ev.target.value = false
//         localStorage.setItem(keyInput, ev.target.value)

//     }
// }
// // localStorage.clear()


// // -Дан текстареа. В него можно ввести данные, нажать кнопку "сохранить" и они "фикисруются" (в хранилище), затем поредактировать их, затем еще поредактировать и возможно еще.....
// // Требование : хранить историю своих изменений (даже после перезагрузки страницы).
// // Сверху над текстареа должны появится стрелочки, с помощью которых можно перемещаться по истории (не забудьте!чекпоинт истории - нажатеи кнопки сохранить).

// let prev = document.getElementById("prev")
// let next = document.getElementById("next")

// let buttonInBlock = document.getElementById("saveBut")

// let textareaWithButton = document.getElementById("textarea")
// textareaWithButton.value = localStorage.getItem("textareaWithButton")

// buttonInBlock.onclick = () => {
//     localStorage.setItem(localStorage.length + 1, textareaWithButton.value)
// }
// // console.log(textareaWithButton.name + '1')
// prev.onclick = () => {
//     let counter;
//     for (let key in localStorage) {
//         if (localStorage.hasOwnProperty(key)) {
//             if (localStorage.getItem(key) === textareaWithButton.value) {
//                 counter = key
//             }
//         }
//     }
//     if (counter === "1") {
//         prev.setAttribute("disabled", "disabled")
//         return
//     }
//     textareaWithButton.value = localStorage.getItem(counter - 1)
// }
// next.onclick = () => {
//     let counter;
//     for (let key in localStorage) {
//         if (localStorage.hasOwnProperty(key)) {
//             if (localStorage.getItem(key) === textareaWithButton.value) {
//                 counter = key
//             }
//         }
//     }
//     if (counter === localStorage.length.toString()) {
//         next.setAttribute("disabled", "disabled")
//         return
//     }
//     textareaWithButton.value = localStorage.getItem(+(counter) + 1)


// }
// localStorage.clear()


// - Реализуйте записную книгу, хранящую данные в локальном хранилище.
// Данные которые надо сохранять : ФИО, номер, почта, фирма, отдел, день рождения
// Данные вводить через соответсвующую форму.
// --Каждому контакту добавить кнопку для удаления контакта.
// --Каждому контакту добавить кнопку редактироваиня. При нажати на нее появляется форма, в которой есть все необходимые инпуты для редактирования, которые уже заполнены данными объекта

let formUsers = document.getElementById("formUsers")
let table = document.getElementById('mainBorder')
console.log(formUsers)
console.log(table)

let counterID = localStorage.getItem("counterID")
let currentID;

for (let i = 1; i <= counterID; i++) {
    if (localStorage.hasOwnProperty(`user${i}`)) {
        let user = JSON.parse(localStorage.getItem(`user${i}`))
        console.log(user)

        let tr = document.createElement('tr')
        for (const field in user) {
            let td = document.createElement('td')
            console.log(user[field])
            td.innerText = user[field]
            tr.appendChild(td)
        }
        let tdbut = document.createElement('td')
        let but = document.createElement('button')
        but.innerHTML = "edit"
        let currentTR;


        but.onclick = (ev) => {
            currentTR = ev.target.parentElement.parentElement
            currentID = currentTR.firstChild.innerText
            let currentUser = JSON.parse(localStorage.getItem(`user${currentID}`))
            for (const field in currentUser) {
                if (field !== 'id') {
                    formUsers[field].value = currentUser[field]
                    console.log(formUsers[field].value)
                };
            }
            // localStorage.setItem(`user${currentID}`, )

        }
        tdbut.appendChild(but)
        tr.appendChild(tdbut)
        tdbut = document.createElement('td')
        but = document.createElement('button')
        but.innerHTML = "delete"
        but.onclick = (ev) => {
            currentTR = ev.target.parentElement.parentElement
            currentID = currentTR.firstChild.innerText
            localStorage.removeItem(`user${currentID}`)
            table.removeChild(currentTR)
        }
        tdbut.appendChild(but)
        tr.appendChild(tdbut)
        table.appendChild(tr)
    }
}

formUsers.saveForm.onclick = (ev) => {
    let savedID;
    if (localStorage.hasOwnProperty(`user${currentID}`)) {
        savedID = currentID
    } else {
        counterID++
        savedID = counterID
        localStorage.setItem('counterID', counterID)
    }

    let user = {
        id: savedID
    }
    // ev.preventDefault()
    for (let field of formUsers) {
        if (field.type !== "submit") {
            user[field.name] = field.value
        }
    }

    localStorage.setItem(`user${savedID}`, JSON.stringify(user))
}

// localStorage.clear()


// for (let people of peoples) {
//     let div = document.createElement("div")
//     div.innerHTML = JSON.stringify(people)
//     let buttonDel = document.createElement(`button`)
//     let buttonEdit = document.createElement("button")
//     buttonEdit.innerHTML = "edit"
//     buttonDel.innerHTML = "delete"
//     div.appendChild(buttonEdit)
//     div.appendChild(buttonDel)
//     document.body.appendChild(div)
// }