// - Дана textarea.
// В неё вводится текст.
// Сделайте так, чтобы после захода на эту страницу через некоторое время, введенный текст остался в textarea.


const textarea = document.getElementById("myTextarea")
textarea.value = localStorage.getItem("textarea")
textarea.oninput = (ev) => {
    localStorage.setItem("textarea", ev.target.value)
}

// - Дана форма с инпутами, текстареа, чекбоксами, радио кнопочками, селектами и тп.
// Пользователь вводит какие-то данные и закрывает страницу (не факт, что он заполнил всю форму).
// Сделайте так, чтобы при следующем заходе на страницу введенные им ранее данные стояли на своих местах.
// Сделайте ваш скрипт как можно более универсальным.


let formUser = document.getElementById('newForm')

for (const input of formUser) {
    const keyInput = input.name;
    input.value = localStorage.getItem(keyInput)

    if (input.type === "checkbox" || input.type === "radio") {

        input.checked = false
        if (input.value === "true") {
            input.checked = true
        }
    }

    input.oninput = (ev) => {

        if (ev.target.type === "checkbox" || ev.target.type === "radio")
            ev.target.checked
                ? ev.target.value = true
                : ev.target.value = false
        localStorage.setItem(keyInput, ev.target.value)

    }
}
// localStorage.clear()


// -Дан текстареа. В него можно ввести данные, нажать кнопку "сохранить" и они "фикисруются" (в хранилище), затем поредактировать их, затем еще поредактировать и возможно еще.....
// Требование : хранить историю своих изменений (даже после перезагрузки страницы).
// Сверху над текстареа должны появится стрелочки, с помощью которых можно перемещаться по истории (не забудьте!чекпоинт истории - нажатеи кнопки сохранить).

let prev = document.getElementById("prev")
let next = document.getElementById("next")

let buttonInBlock = document.getElementById("saveBut")

let textareaWithButton = document.getElementById("textarea")
textareaWithButton.value = localStorage.getItem("textareaWithButton")



buttonInBlock.onclick = () => {
    localStorage.setItem(localStorage.length + 1, textareaWithButton.value)
}
// console.log(textareaWithButton.name + '1')
prev.onclick = () => {
    let counter;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            if(localStorage.getItem(key) === textareaWithButton.value){
                counter = key

            }
        }
    }
    if(counter === "1") {
        prev.setAttribute("disabled", "disabled")
    }
    textareaWithButton.value = localStorage.getItem(counter -1)
}
next.onclick = () => {
    let counter;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            if(localStorage.getItem(key) === textareaWithButton.value){
                counter = key

            }
        }
    }

    if(counter === localStorage.length.toString()) {
        next.setAttribute("disabled", "disabled")
    }
    textareaWithButton.value = localStorage.getItem(+(counter) + 1)


}
// localStorage.clear()





// - Реализуйте записную книгу, хранящую данные в локальном хранилище.
// Данные которые надо сохранять : ФИО, номер, почта, фирма, отдел, день рождения
// Данные вводить через соответсвующую форму.
// --Каждому контакту добавить кнопку для удаления контакта.
// --Каждому контакту добавить кнопку редактироваиня. При нажати на нее появляется форма, в которой есть все необходимые инпуты для редактирования, которые уже заполнены данными объекта