let buttons = document.querySelectorAll('.button_dropdown')

// handle display form by buttons
buttons.forEach(btn => {
    btn.addEventListener('click', function () {
        let name_form = this.getAttribute('id')
        let myForm = document.querySelector('[myForm="' + name_form + '"]')
        this.classList.toggle('button_up')
        myForm.classList.toggle('active')
    })
})
// function render invalid div
const createMsg = (parentNode, msg, className) => {
    const invalidDiv = document.createElement("div")
    invalidDiv.className = className
    invalidDiv.innerHTML = msg
    parentNode.appendChild(invalidDiv)
}
// function clear invalid
const clearMsg = (className) => {
    document.querySelectorAll('.' + className + '').forEach((item) => {
        item.remove()
    });
}
//---------------------------COURSE NAME
// handle course name >= 3 character
const courseName_input = document.querySelector('#course_name')
const course_name_field = document.querySelector("#course_name_form")
courseName_input.addEventListener('change', function () {
    console.log(courseName_input.parentElement)
    // coursename_input.parentNode: form-group  
    course_name_field.innerHTML = this.value
    clearMsg('invalid_input')
    if (courseName_input.value.length < 3) {
        course_name_field.innerHTML = ""
        createMsg(courseName_input.parentNode, "Tên khóa học phải ít nhất 3 kí tự", 'invalid_input')
    }


})
courseName_input.addEventListener('keydown', function (e) {
    console.log(e.which)
    if (e.which > 48 && e.which < 57) {
        e.preventDefault()
    }
})
courseName_input.addEventListener('input', function (e) {
    clearMsg('invalid_input')

    if (courseName_input.value.length < 3) {
        course_name_field.innerHTML = ""
        createMsg(courseName_input.parentNode, "Tên khóa học phải ít nhất 3 kí tự", 'invalid_input')
    }
})
// courseName_input.addEventListener('keydown', function (e) {
//     let charCode = e.which
//     console.log(charCode)
//     if (charCode >= 48 && charCode < 58) {
//         e.preventDefault();
//     }
// })
// ---------------------------------PRICE
// function format price by VND
const formatPrice = (str) => {
    if (str.length == 0) {
        return ""
    }
    return str.trim().split('').reverse().reduce((prev, next, index) => {
        // console.log(index, index % 3, (index % 3) ? 'ko ,' : ',')
        // console.log('prev' + prev, 'next: ' + next)
        return ((index % 3) ? next : (next + '.')) + prev
    })
}
// handle course price format
// prevent input character (only input number)

const coursePrice_input = document.querySelector('#course_price')
coursePrice_input.addEventListener('keydown', function (e) {
    // console.log(e.target.selectionStart,)
    let charCode = e.which
    // charCode =37,39: <- ->
    // charCode = 48 -> 57: 0 -> 9
    if (charCode > 31 && charCode != 37 && charCode != 39 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
    }
    if ((charCode == 39) && e.target.selectionStart == this.value.length - 4) {
        e.preventDefault();
    }
    if (charCode == 8 && (e.target.selectionStart == this.value.length || e.target.selectionStart > this.value.length - 4)) {
        e.preventDefault()
    }

})

// seperate price with .


// focus
coursePrice_input.addEventListener('focus', function (e) {
    console.log(true)
    this.setSelectionRange(this.value.length - 3, this.value.length - 3);
    // this.setSelectionRange(this.value.length - 3, this.value.length - 3);
})


// click
coursePrice_input.addEventListener('click', function (e) {
    // click right VND => move to before VND => can not delete VND
    if (e.target.selectionStart == this.value.length || e.target.selectionStart > this.value.length - 3) {
        this.setSelectionRange(this.value.length - 3, this.value.length - 3);
    }

    this.setSelectionRange(e.target.selectionStart, e.target.selectionStart);
    // this.setSelectionRange(this.value.length - 3, this.value.length - 3);
})
// keyup
coursePrice_input.addEventListener('keyup', function (e) {
    let charCode = e.which
    let priceWithOutVND = this.value.replace(/\sVND/, '')
    console.log([...priceWithOutVND])
    console.log('real ' + formatPrice(priceWithOutVND.split('.').join("")))

    if (charCode == 37) {
        console.log(e.target.selectionStart)
        this.setSelectionRange(e.target.selectionStart, e.target.selectionStart);

        return
    }
    if (charCode == 39) {
        console.log(e.target.selectionStart)
        this.setSelectionRange(e.target.selectionStart, e.target.selectionStart);
        return
    }
    // if (charCode == 8) {
    //     let lastSelectionStart = e.target.selectionStart
    //     let arrayPrice = [...priceWithOutVND]
    //     let arrayPriceRe = arrayPrice

    //     console.log("arrayPriceRe" + arrayPriceRe)
    //     this.setSelectionRange(lastSelectionStart, lastSelectionStart);
    //     this.value = formatPrice(priceWithOutVND.split('.').join(""))
    //     this.value = this.value + 'VND'


    //     if (priceWithOutVND == "") {
    //         this.value = ""
    //     }
    //     this.setSelectionRange(lastSelectionStart, lastSelectionStart);

    //     // this.setSelectionRange(this.value.length - 3, this.value.length - 3);
    //     return
    // }

    if (/^0/.test(priceWithOutVND)) {
        if (priceWithOutVND.length == 1 && priceWithOutVND[0] == 0) {
            this.value = priceWithOutVND.replace(/^0/, "")
        }
        else {
            this.value = priceWithOutVND.replace(/^0/, "") + 'VND'
        }
        this.setSelectionRange(this.value.length - 4, this.value.length - 4);
    }

    else {
        // this.value = Number(this.value.split('.').join('')).toLocaleString("de")
        this.value = formatPrice(priceWithOutVND.split('.').join(""))
        this.value = this.value + ' VND'
        this.setSelectionRange(this.value.length - 4, this.value.length - 4);
        if (this.value.slice(0, 4) == ' VND') {
            this.value = ""
        }
        // 

        // delete VND if no number

    }

    // let deNumber = Number(this.value.replace(/VND/g, '').split('.').join(""))
    // console.log(typeof Number(deNumber))
    // // x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    // // console.log(deNumber.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }));
    // // let formatPrice = deNumber.toLocaleString("de")

    // let numWitoutVND = Number(this.value.replace(/VND/, ''))
    // console.log(numWitoutVND)
    // this.value = numWitoutVND.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

})
//--------------------------------- PRICE
// handle image

// import image
const courseImage_input = document.querySelector('#inputGroupFile')
const courseImage = document.querySelector('#image_upload')
// ------------------prevent browse type not image
// const validateFileType = () => {
//     let fileName = document.getElementById("fileName").value;
//     let idxDot = fileName.lastIndexOf(".") + 1;
//     let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
//     if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
//         //TO DO
//     } else {
//         createMsg(fileName.parentNode, 'Vui lòng nhập ảnh', 'invalid_img')
//     }
// }


courseImage_input.addEventListener('change', function () {
    let file = this.files[0]
    console.log(file.name)
    clearMsg('invalid_img')
    let file_name = file.name
    let idsx_dot = file_name.lastIndexOf('.') + 1
    let extFile = file_name.substr(idsx_dot, file_name.length).toLowerCase()
    console.log(extFile)
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
        courseImage.src = URL.createObjectURL(file)
    } else {
        courseImage_input.value = ''
        createMsg(this.parentNode.parentNode, "Vui lòng chọn ảnh định dạng .jpg/.jpeg/.png", "invalid_img")
    }
    // let idxDot = fileName.lastIndexOf(".") + 1;
    // let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();


})
// delete image and set default image
const default_image_url = '/images/upload-img.jpg'
const courseImage_delete = document.querySelector('#course_image_delete')
courseImage_delete.addEventListener('click', (e) => {
    e.preventDefault()
    courseImage.src = default_image_url
    courseImage_input.value = ''
})

//--------------------------QUANTITY

const courseQuantity_min_input = document.querySelector('#course_min_quantity')
const courseQuantity_max_input = document.querySelector('#course_max_quantity')
const courseQuantity_max_value = 15
const courseQuantity_default = 1

// function prevent negative (-1,-2,-3)
const preventNegative = (number) => {
    return (Number.isInteger(number) && number > 0) ? number : Math.abs(number)
}

// function check if value > max_value 
const isExceedMaxvalue = (value, max_value) => {
    return (value >= max_value) ? true : false
}


// handle input negative/not integer number in min input
courseQuantity_min_input.addEventListener('change', function () {

    clearMsg('invalid_quantity')
    if (isExceedMaxvalue(preventNegative(this.value), courseQuantity_max_value)) {
        this.value = courseQuantity_default
    }
    this.value = preventNegative(this.value)
    if (parseInt(courseQuantity_max_input.value) < parseInt(this.value)) {
        createMsg(this.parentNode, 'Min phải nhỏ hơn Max', 'invalid_quantity')
    }

})
courseQuantity_max_input.addEventListener('keydown', function (e) {
    if (e.which === 190 || e.which === 110) {
        e.preventDefault();
    }
})
courseQuantity_min_input.addEventListener('keydown', function (e) {
    if (e.which === 190 || e.which === 110) {
        e.preventDefault();
    }
})
// handle input negative/not integer number in max input
courseQuantity_max_input.addEventListener('change', function () {
    clearMsg('invalid_quantity')
    if (isExceedMaxvalue(preventNegative(this.value), courseQuantity_max_value)) {
        this.value = courseQuantity_max_value
    }
    this.value = preventNegative(this.value)
    if (parseInt(courseQuantity_min_input.value) >= parseInt(this.value)) {
        createMsg(this.parentNode, 'Min phải nhỏ hơn Max', 'invalid_quantity')
    }
})

// --------------------------TAGS

const list_tags = document.querySelector('.tags_list')
const create_tag_input = document.querySelector('#course_tags')

let tags = []
// function createTag
const createTag = () => {
    document.querySelectorAll('.course_tag').forEach(li => li.remove())
    console.log(tags)
    tags.slice().reverse().forEach(tag => {
        let li = `<li class="course_tag">${tag}<i class="close fa-solid fa-xmark" style="color: #babec4;" onclick="delete_tag(this,'${tag}')"></i></li>`
        list_tags.insertAdjacentHTML("afterbegin", li)
    })
}
// function delete tag
const delete_tag = (element, tag) => {
    let index = tags.indexOf(tag)
    console.log(index)
    tags = [...tags.slice(0, index), ...tags.slice(index + 1, tags.length)]
    element.parentElement.remove()
    console.log(tags)
}
// function add tag
const addTag = (e) => {
    if (e.key == 'Enter') {
        const tag = e.target.value
        if (tag.length > 1) {
            tags.push(tag)
            createTag()
        }
        e.target.value = ''

    }
}
// 
create_tag_input.addEventListener('keyup', addTag)

// function delete tag
const delete_tag_button = document.querySelectorAll('.close')
delete_tag_button.forEach(b => {
    b.addEventListener('click', function (e) {
        console.log(this)
    })
})

//-----------------------Description
const description_field = document.querySelector('#course_description')
const count_field = document.querySelector('#count')
description_field.addEventListener('input', function () {
    count_field.innerHTML = `${this.value.length}/200`
    description_field.maxLength = 200

})

//------------------Google meet
const courseLink_ggmeet_input = document.querySelector('#course_link_ggmeet')
const regexLinkGGMeet = /^https:\/\/meet\.google\.com\/[a-zA-Z]{3}-[a-zA-Z]{4}-[a-zA-Z]{3,3}$/g
// https://meet.google.com/nox-sxjk-sj
courseLink_ggmeet_input.addEventListener('change', function () {
    clearMsg('invalid_url')
    if (!regexLinkGGMeet.test(this.value)) {
        createMsg(this.parentNode, 'Vui lòng nhập một liên kết hợp lệ của Google Meet (https://meet.google.com/xxx-xxxx-xxx)', 'invalid_url')
    }

})

// courseLink_ggmeet_input.addEventListener('keyup', function (e) {
//     console.log(this.value)
//     console.log(regexLinkGGMeet.test(this.value))
//     clearMsg('invalid_url')
//     if (!regexLinkGGMeet.test(this.value)) {
//         createMsg(this.parentNode, 'Vui lòng nhập một liên kết hợp lệ của Google Meet (https://meet.google.com/xxx-xxxx-xxx)', 'invalid_url')
//     }
// })

// ----------------render checkbox day
const checkBoxDay_box = document.querySelector('#checkbox_days')
for (let i = 2; i <= 8; i++) {

    checkBoxDay_box.innerHTML += ` 
    <div class="form-check checkbox_day"> 
    <label class="form-check-label" for="${i == 8 ? "CN" : "T" + i}"> ${i == 8 ? "CN" : "T" + i} </label>
        <input class="form-check-input checkbox_input_day" type="checkbox" value="${i == 8 ? "CN" : "T" + i}" id="${i == 8 ? "CN" : "T" + i}">
</div>`
}

// picker time start
const picker_time_start_input = document.querySelector('#picker_start')
const date_box = document.querySelectorAll('.checkbox_input_day')
if (picker_time_start_input.value.length == "") {
    date_box.forEach(e => e.disabled = true)
}
picker_time_start_input.addEventListener('change', function () {
    console.log(this.value.split(':'))
    let start = this.value.split(':')
    let end = picker_time_end_input.value.split(':')
    picker_time_end_input.value = ""
    clearMsg('invalid_end')
    clearMsg('invalid_start')
    if (start[0] < 7 && this.value != "") {
        createMsg(this.parentNode, 'Thời gian bắt đầu sớm nhất là 7:00 AM', 'invalid_start')
        this.value = ""
        date_box.forEach(e => {
            e.disabled = true
            e.checked = false
        })
    }
    isSatisfiedStartAndEndPicker(start, end, this)
    // if (picker_time_start_input.value.length != "") {
    //     date_box.forEach(e => e.disabled = false)
    // }
    // if (picker_time_start_input.value.length == "") {
    //     date_box.forEach(e => {
    //         e.disabled = true
    //         e.checked = false
    //     })
    // }
    if (check_empty()) {
        date_box.forEach(e => {
            e.disabled = true
            e.checked = false
        })
    }
    if (start[0] >= 19) {
        createMsg(this.parentNode, 'Không phù hợp vì thời gian kết thúc trễ nhất là 7:00 PM', 'invalid_start')
        date_box.forEach(e => {
            e.disabled = true
            e.checked = false
        })
        this.value = ""
    }
})

// pick time end
const picker_time_end_input = document.querySelector('#picker_end')
picker_time_end_input.addEventListener('change', function () {
    let time = this.value.split(':')
    date_box.forEach(e => {

        e.checked = false
    })
    clearMsg('invalid_end')
    date_box.forEach(e => {

        e.checked = false
    })
    if (check_empty()) {
        date_box.forEach(e => {
            e.disabled = true
            e.checked = false
        })
    } else {
        date_box.forEach(e => {
            e.disabled = false

        })
    }
    console.log(time[0] + "* 3600" + time[1] + "*60")
    if (time[0] > 19 || time[0] == 0 || (time[0] == 19 && time[1] >= 0)) {
        createMsg(this.parentNode, 'Thời gian kết thúc trễ nhất là 7:00 PM', 'invalid_end')
        date_box.forEach(e => {

            e.checked = false
        })
        this.value = ""
        return
    }
    // check fromn picker time start -> end >= 2 hours 
    isSatisfiedStartAndEndPicker(picker_time_start_input.value.split(':'), time, this)
    if (picker_time_start_input.value.length == "") {
        this.value = ""
        createMsg(this.parentNode, 'Vui lòng nhập thời gian bắt đầu', 'invalid_end')
        date_box.forEach(e => {

            e.checked = false
        })
        console.log('rỗng')
    }
    // // kết thúc lúc 7:00 AM
    // if (time[0] == 7) {
    //     createMsg(this.parentNode, 'Không hợp lí vì thời gian bắt đầu sớm nhất là 7:00 AM', 'invalid_end')
    //     this.value = ""
    // }

})
picker_time_start_input.addEventListener('focus', function () {
    clearMsg('invalid_end')
    clearMsg('invalid_start')
    if (this.value.length == "")
        this.value = "07:00"
    console.log(check_empty())
    if (check_empty()) {
        date_box.forEach(e => {
            e.disabled = true
            e.checked = false
        })
    } else {
        date_box.forEach(e => {
            e.disabled = false
        })
    }
})

const isSatisfiedStartAndEndPicker = (start, end, input) => {
    let time_start = new Date();
    let time_end = new Date();


    time_start.setHours(start[0], start[1], 0, 0)
    time_end.setHours(end[0], end[1], 0, 0)
    // time_end.setHours(value_end[0], value_end[1], value_end[2], 0)

    // time_end - time_start = ...(milisecond) => 2 hours = 7200000 mili
    if (time_end - time_start < 7200000) {
        createMsg(input.parentNode, 'Thời gian bắt đầu và kết thúc phải >= 2 tiếng', 'invalid_end')
        input.value = ""
        return
    }
    // if (start[0] == end[0] && start[1] == end[1]) {
    //     console.log('bằng')
    //     createMsg(input.parentNode, 'Thời gian bắt đầu và kết thúc không được giống nhau', 'invalid_end')
    //     input.value = ""
    //     return
    // }
    console.log(time_end - time_start)
}


// picker date
const compare_dates = (d1, d2, parentNode) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 < date2) {
        console.log(`${d1} is less than ${d2}`);
        return false
    } else if (date1 >= date2) {
        console.log(`${d1} is greater than ${d2}`);
        return true
    }
};
const compare_dates2 = (d1, d2, parentNode) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    console.log(date1, date2)
    if (date1 < date2) {
        console.log(`${d1} is less than ${d2}`);
        return false
    } else if (date1 > date2) {
        console.log(`${d1} is greater than ${d2}`);
        return true
    } else if (date1 == date2) {
        return true
    }
};
const picker_date_input = document.querySelector('#picker_date')
picker_date_input.addEventListener('change', function () {
    let currentDate = new Date()
    let chosenDate = new Date(this.value)
    console.log(new Date(this.value))
    clearMsg('invalid_date')
    date_box.forEach(e => e.checked = false)
    let currentDateByFormat = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear()
    let chosenDateFormat = (chosenDate.getMonth() + 1) + '/' + chosenDate.getDate() + '/' + chosenDate.getFullYear()

    if (compare_dates(currentDateByFormat, chosenDateFormat, this.parentNode)) {
        createMsg(this.parentNode, 'Không được chọn ngày hiện tại và quá khứ', 'invalid_date')
        this.value = ""
    }
    console.log(currentDateByFormat.valueOf())
    if (picker_date_input.value.length != "") {
        date_box.forEach(e => e.disabled = false)
    }
    console.log(check_empty())
    if (check_empty()) {
        date_box.forEach(e => {
            e.disabled = true
            e.checked = false
        })
    } else {
        date_box.forEach(e => {
            e.disabled = false

        })
    }
})
// 
const check_empty = () => {
    if (picker_time_start_input.value.length == ""
        || picker_time_end_input.value.length == ""
        || course_slot_select.value.length == ""
        || picker_date_input.value.length == "") {
        return true
    }
    return false
}
// submit save timeline
const add_button = document.querySelector('.add_button')
const save_course_container = document.querySelector('#save_course_container')
const course_slot_select = document.querySelector('.course_slot')
for (let i = 1; i <= 15; i++) {
    course_slot_select.innerHTML += ` <option value="${i}">${i}</option>`
}
course_slot_select.addEventListener('change', function () {
    date_box.forEach(e => {
        // e.disabled = true
        e.checked = false
    })
    if (check_empty()) {
        date_box.forEach(e => {
            e.disabled = true
            e.checked = false
        })
    }
    else {
        date_box.forEach(e => {
            e.disabled = false

        })
    }
})
// const renderCourseWithSmallResponsive = (list, selector) => {
//     let htmls = list.map(course => {
//         return `

//                     <tr>
//                         <th>Giờ bắt đầu:</th>
//                         <td>${course.start}</td>
//                     </tr>
//                     <tr>
//                         <th scope="col">Giờ kết thúc</th>
//                         <td>${course.end}</td>
//                     </tr>
//                     <tr>
//                         <th scope="col">Thứ</th>
//                         <td>${course.date}</td>
//                     </tr>
//                     <tr>
//                         <th scope="col">Slot</th>
//                         <td>${course.slot}</td>
//                     </tr>
//                     <tr>
//                         <th scope="col">Ngày dự kiến mở lớp</th>
//                         <td>${course.open}</td>
//                     </tr>
//                     <tr>
//                     <td> <div class="fix_button" onclick="update_course(${course.id})" data-id="${course.id} ">Sửa</div></td>
//                     <td> <div class="delete_button" onclick="deleteCourse(${course.id})"  data-id="${course.id} ">Xóa</div></td></tr>

//         `
//     })
//     selector.innerHTML = htmls.join('')
// }
const renderCourse = (list, selector) => {
    let htmls = list.map(course => {
        return `
        <table class="table">
        <thead>
            <tr>
                <th scope="col">Giờ bắt đầu</th>
                <th scope="col">Giờ kết thúc</th>
                <th style="width: 20%;" scope="col">Thứ</th>
                <th scope="col">Slot</th>
                <th scope="col">Ngày dự kiến mở lớp</th>
                <th scope="col" colspan="2">
                </th>
            </tr>
        </thead>
        <tbody id="save_course_container">
            <tr>
                <td>${course.start}</td>
                <td>${course.end}</td>
                <td>${course.date}</td>
                <td>${course.slot}</td>
                <td>${course.open}</td>

                <td class="td_action"> <div class="fix_button" onclick="update_course(${course.id})" data-id="${course.id} ">Sửa</div>
                                        <div class="delete_button" onclick="deleteCourse(${course.id})"  data-id="${course.id} ">Xóa</div>
                </td>
 

</tr>

        </tbody>
    </table>
    
        

   
        `
    })
    selector.innerHTML = htmls.join('')
    console.log(list)
}
let list_course = [
    // {
    //     date: ['T2', 'T3', 'T4', 'T5'],
    //     end: "17:18",
    //     id: 0,
    //     open: "2023-05-16",
    //     slot: "5",
    //     start: "07:00",
    //     endCourse: getEndDayList("2023-05-16", ['T2', 'T3', 'T4', 'T5'], 5)
    // },
    // {
    //     date: ['T6', 'T7'],
    //     end: "10:18",
    //     id: 1,
    //     open: "2023-05-19",
    //     slot: "5",
    //     start: "08:00",
    // }
]
// renderCourse(list_course, document.querySelector('#save_course_container'))
renderCourse(list_course, document.querySelector('.res_table'))
let id_course = 0

const add_course = (btn) => {
    // e.preventDefault()
    let num = 0
    clearMsg('invalid_submit')
    let checked_boxes = [
    ]
    date_box.forEach((o) => {
        if (o.checked == true) {
            checked_boxes.push(o.value)
            num++
        }
    })
    console.log(checked_boxes.length)
    console.log(num)
    if (num == 0 || picker_time_start_input.value.length == ""
        || picker_time_end_input.value.length == 0
        || course_slot_select.value.length == 0
        || picker_date_input.value.length == 0) {
        createMsg(btn.parentNode, 'Vui lòng điền đầy đủ thông tin', 'invalid_submit')
    } else {

        const course = {
            id: id_course++,
            start: picker_time_start_input.value,
            end: picker_time_end_input.value,
            slot: course_slot_select.value,
            open: picker_date_input.value,
            date: checked_boxes,
            endCourse: getEndDayList(picker_date_input.value, checked_boxes, course_slot_select.value)
        }

        list_course.unshift(course)
        // renderCourse(list_course, document.querySelector('#save_course_container'))
        // renderCourse(list_course, document.querySelector('.table'))
        renderCourse(list_course, document.querySelector('.res_table'))
        picker_time_start_input.value = ""
        picker_time_end_input.value = ""
        picker_date_input.value = ""
        course_slot_select.value = ""

        date_box.forEach(d => {
            d.checked = false
            d.disabled = true
        })
        console.log(picker_time_start_input.value, picker_time_end_input.value, picker_date_input.value, course_slot_select.value)


    }
}


// delete a course

const deleteCourse = id => {
    console.log(id)
    list_course.forEach((c, index) => {
        console.log(c)
        if (c.id == id) {
            list_course.splice(index, 1)
        }
    })

    console.log(list_course)
    // renderCourse(list_course, document.querySelector('#save_course_container'))
    renderCourse(list_course, document.querySelector('.res_table'))
}

console.log('a')

//update course 
const field_add_save_btn = document.querySelector('.save_add_btn')
const update_button = document.querySelector('.fix_button')
const cancel_button = document.querySelector('.cancel_button')

const submit_update = (id, btn) => {
    const delete_button = document.querySelectorAll('.delete_button')


    let box = 0
    // get index of obj need update
    date_box.forEach((o) => {

        if (o.checked == true) {
            box++
        }
    })
    clearMsg('invalid_submit')

    if (box == 0 || picker_time_start_input.value.length == ""
        || picker_time_end_input.value.length == 0
        || course_slot_select.value.length == 0
        || picker_date_input.value.length == 0) {
        createMsg(btn.parentNode, 'Vui lòng điền đầy đủ thông tin', 'invalid_submit')
    }
    else {
        delete_button.forEach(d => {
            if (d.getAttribute('data-id') == id) {
                d.remove('disabled')
            }
        });
        let index = list_course.findIndex(obj => obj.id == id)
        list_course[index].start = picker_time_start_input.value
        list_course[index].end = picker_time_end_input.value
        list_course[index].open = picker_date_input.value
        list_course[index].slot = course_slot_select.value
        // delete all date before add new to prevent duplicated
        list_course[index].date.length = 0
        date_box.forEach((o) => {
            o.classList.remove('ignore')
            if (o.checked == true) {
                list_course[index].date.push(o.value)

            }
        })
        list_course[index].endCourse = getEndDayList(picker_date_input.value, list_course[index].date, course_slot_select.value)
        // list.course[index].endCourse = getEndDayList(picker_time_start_input.value,)
        // renderCourse(list_course, document.querySelector('#save_course_container'))
        renderCourse(list_course, document.querySelector('.res_table'))
        field_add_save_btn.innerHTML = `<button class="add_button" type="button" onclick="add_course(this)">Tạo lớp</button>`
        picker_time_start_input.value = ""
        picker_time_end_input.value = ""
        picker_date_input.value = ""
        course_slot_select.value = ""
        date_box.forEach(d => {
            d.checked = false
        })
    }

}
let value_date = []
const update_course = _id => {
    const delete_button = document.querySelectorAll('.delete_button')
    const update_button = document.querySelectorAll('.checkbox_input_day')
    clearMsg('invalid_submit')
    clearMsg('invalid_end')
    clearMsg('invalid_start')
    clearMsg('invalid_date')

    update_button.forEach(e => {
        e.checked = false
        e.classList.remove('ignore')
    })
    delete_button.forEach(d => {
        console.log(d.getAttribute('data-id'))
        if (d.getAttribute('data-id') == _id) {
            d.classList.add('disabled')
        }
    })


    // get a course need to update
    let course = list_course.filter((course, index) => {
        if (course.id == _id) {
            return course
        }
    })


    let { id, start, end, open, slot, date, endCourse } = course[0]
    value_date.push(...date)
    console.log(value_date)
    field_add_save_btn.innerHTML = `<button class="save_button" type="button" onClick="submit_update(${id},this)">Lưu thay đổi</button>
    <button class="cancel_button" onclick="cancel_update()" type="button" ">Hủy</button>`
    picker_time_start_input.value = start
    picker_time_end_input.value = end
    picker_date_input.value = open
    course_slot_select.value = slot
    date.forEach((d, index) => {
        date_box.forEach(_d => {

            if (_d.value == d) {
                _d.checked = true
                _d.classList.add('ignore')
            }
            _d.disabled = false
        })
    })

}
const cancel_update = () => {
    const delete_button = document.querySelectorAll('.delete_button')
    clearMsg('invalid_submit')
    clearMsg('invalid_end')
    clearMsg('invalid_start')
    clearMsg('invalid_date')
    delete_button.forEach(d => {
        d.classList.remove('disabled')

    })

    field_add_save_btn.innerHTML = `<button class="add_button" type="button" onclick="add_course(this)">Tạo lớp</button>`
    picker_time_start_input.value = ""
    picker_time_end_input.value = ""
    picker_date_input.value = ""
    course_slot_select.value = ""
    date_box.forEach(d => {
        d.checked = false
        d.classList.remove('ignore')
    })

}
const convert_time_to_minutes = (hours, minutes) => {
    return hours * 60 + Number(minutes)
}
const compare_time = (start, end, time_check) => {
    const date1 = new Date()
    // console.log(date1.getDate())
    const start_in_array = start.split(':')
    const end_in_array = end.split(':')
    const time_check_in_array = time_check.split(':')

    const start_minutes = convert_time_to_minutes(start_in_array[0], start_in_array[1])
    const end_minutes = convert_time_to_minutes(end_in_array[0], end_in_array[1])
    const time_check_minutes = convert_time_to_minutes(time_check_in_array[0], time_check_in_array[1])
    console.log(start_minutes, end_minutes, time_check_minutes)
    if (start_minutes <= time_check_minutes && time_check_minutes <= end_minutes || start_minutes >= time_check_minutes && time_check_minutes <= end_minutes) {
        // in time
        return true
        // console.log("in time")
    }
}
console.log(compare_dates2("5/23/2023", "2023-05-23"))
let open1 = "2023-06-21"
let open2 = new Date(open1.split('-').join('/'))
console.log(open2.getTime())
let open3 = new Date("06/21/2023")
console.log(open3.getTime() == open2.getTime())

date_box.forEach(box => {

    box.addEventListener('change', function () {
        clearMsg('invalid_submit')
        let chosenDate = new Date(picker_date_input.value)
        // console.log(new Date(this.value))
        let chosenDateByFormat = (chosenDate.getMonth() + 1) + '/' + chosenDate.getDate() + '/' + chosenDate.getFullYear()
        console.log('ignore')

        let value = this.value
        list_course.forEach(course => {
            let open = new Date(course.open.split('-').join('/'))
            let pick = new Date(chosenDateByFormat)
            console.log(open, pick)
            console.log(course.endCourse[0].lastDay)
            console.log(course.endCourse[0].lastDate)
            if (!box.classList.contains('ignore')) {
                let date_array = course.date

                if (date_array.includes(this.value, 0)
                    && compare_time(course.start, course.end, picker_time_start_input.value)
                    && compare_dates2(course.endCourse[0].lastDate, chosenDateByFormat)
                    // && open.getTime() < pick.getTime()
                ) {
                    // if (date_array.includes(value, 0)) {
                    // console.log(checkExpecteDate())

                    // console.log(checkExpecteDate(chosenDate, course_slot_select.value, format_day(this.value), course.open))

                    clearMsg('invalid_submit')
                    this.checked = false
                    createMsg(this.parentNode.parentNode, 'Bạn đã có lớp học vào thời gian này', 'invalid_submit')

                }

                // console.log(value_date.includes(this.value, 0))
                // value_date.forEach(a => {

                // })

            }
        })




    })
})

// function getMondays() {
//     var d = new Date(),
//         month = d.getMonth(),
//         mondays = [];
//     let d2 = '21-05-2023'
//     let month2 = d2.split('-')[2]
//     d.setDate(1);
//     // Get the first Monday in the month

//     while (d.getDay() !== 1) {
//         d.setDate(d.getDate() + 1);

//     }

//     // Get all the other Mondays in the month
//     while (d.getMonth() === month) {
//         mondays.push(new Date(d.getTime()));
//         d.setDate(d.getDate() + 7);
//     }

//     return mondays;
// }
// const getValidSlot = () => {

// }



// let b = new Date('05/17/2023')
// let slots = 0
// // let days_in_week = ["T2", "T3", "T4"]
// let arr = []
// // b.setDate(b.getDate())

// b.setDate(b.getDate())
// console.log(b.getDate())
// do {
//     // sun: 0, monday:1, tues:2, wed:3, thus:4, friday:5, saturday:6 
//     // 
//     if (b.getDay() == 2 || b.getDay() == 3 || b.getDay() == 1) {
//         let chosenDate = new Date(b.getTime())
//         let chosenDateFormat = (chosenDate.getMonth() + 1) + '/' + chosenDate.getDate() + '/' + chosenDate.getFullYear()
//         // arr.push(new Date(b.getTime()))
//         arr.push(chosenDateFormat)
//         slots++
//         // if (compareDates(currentDateByFormat, chosenDateFormat, this.parentNode)) {
//         //     createMsg(this.parentNode, 'Không được chọn ngày hiện tại và quá khứ', 'invalid_date')
//         //     this.value = ""
//         // }
//         // b.setDate(b.getDate() + 1)
//     }
//     b.setDate(b.getDate() + 1)


// }
// while (slots < 10)

// const checkExpecteDate = (date, _slots, day) => {
//     console.log(day)
//     let slots = 0
//     let arr = []
//     let b = new Date(date)
//     b.setDate(b.getDate())
//     list_course.forEach(c =>

//         console.log(c.date))

//     // let days_in_week = ["T2", "T3", "T4"]

//     // b.setDate(b.getDate())
//     console.log(_day)

//     console.log(b.getDate())
//     do {
//         // sun: 0, monday:1, tues:2, wed:3, thus:4, friday:5, saturday:6 
//         // 
//         if (b.getDay() == day) {
//             let chosenDate = new Date(b.getTime())
//             let chosenDateFormat = (chosenDate.getMonth() + 1) + '/' + chosenDate.getDate() + '/' + chosenDate.getFullYear()
//             // arr.push(new Date(b.getTime()))
//             arr.push(chosenDateFormat)
//             slots++
//             // if (compareDates(currentDateByFormat, chosenDateFormat, this.parentNode)) {
//             //     createMsg(this.parentNode, 'Không được chọn ngày hiện tại và quá khứ', 'invalid_date')
//             //     this.value = ""
//             // }
//             // b.setDate(b.getDate() + 1)
//         }
//         b.setDate(b.getDate() + 1)


//     }
//     while (slots < _slots)
//     return arr

// }
const formatNumToDay = (day) => {
    switch (new Date().getDay()) {
        case 0:
            day = "CN";
            break;
        case 1:
            day = "T2";
            break;
        case 2:
            day = "T3";
            break;
        case 3:
            day = "T4";
            break;
        case 4:
            day = "T5";
            break;
        case 5:
            day = "T6";
            break;
        case 6:
            day = "T7";
    }
}


const format_day = day => {
    let _day = 0
    switch (day) {
        case "CN":
            _day = 0
            break;
        case "T2":
            day = "Monday";
            _day = 1
            break;
        case "T3":
            _day = 2
            break;
        case "T4":
            _day = 3
            break;
        case "T5":
            _day = 4
            break;
        case "T6":
            _day = 5
            break;
        case "T7":
            _day = 6
            break
    }
    return _day

}
// console.log(format_day())
// console.log(checkExpecteDate('05/15/2023', 5, format_day("T2")))


// const getEndDateInList = () => {

//     let arr = []
//     // let arr2 = []
//     list_course.forEach(c => {
//         let b = new Date(c.open)
//         let slots = 0
//         b.setDate(b.getDate())
//         let format = []
//         c.date.forEach(da => format.push(format_day(da)))
//         console.log(c.slot)
//         do {
//             // sun: 0, monday:1, tues:2, wed:3, thus:4, friday:5, saturday:6 
//             // 
//             // if (b.getDay() == day) {
//             if (format.includes(b.getDay(), 0)) {
//                 let chosenDate1 = new Date(b.getTime())
//                 let chosenDateFormat1 = (chosenDate1.getMonth() + 1) + '/' + chosenDate1.getDate() + '/' + chosenDate1.getFullYear()
//                 // console.log(chosenDate1.getDay())
//                 // arr.push(new Date(b.getTime()))
//                 console.log(c.slot)
//                 if (slots == (c.slot - 1)) {
//                     arr.push(chosenDateFormat1)
//                     // arr2.push(chosenDate1.getDay())
//                 }
//                 // arr.push(chosenDateFormat1)
//                 slots++

//             }
//             b.setDate(b.getDate() + 1)


//         }
//         while (slots < c.slot)
//     }
//         // console.log(c.date)
//     )
//     return arr
// }

const getEndDayList = (startDate, listDay, slot) => {

    // let arr = []
    let arr2 = []
    let b = new Date(startDate)
    let slots = 0
    b.setDate(b.getDate())
    let format = []
    listDay.forEach(da => format.push(format_day(da)))
    console.log(format)
    do {
        // sun: 0, monday:1, tues:2, wed:3, thus:4, friday:5, saturday:6 
        // 
        // if (b.getDay() == day) {
        if (format.includes(b.getDay(), 0)) {
            let chosenDate1 = new Date(b.getTime())
            let chosenDateFormat1 = (chosenDate1.getMonth() + 1) + '/' + chosenDate1.getDate() + '/' + chosenDate1.getFullYear()
            // console.log(chosenDate1.getDay())
            // arr.push(new Date(b.getTime()))
            console.log(slots)
            if (slots == (slot - 1)) {
                // arr.push(chosenDateFormat1)
                arr2.push({
                    lastDay: chosenDate1.getDay(),
                    lastDate: chosenDateFormat1
                })
            }
            // arr.push(chosenDateFormat1)
            slots++

        }
        b.setDate(b.getDate() + 1)


    }
    while (slots < slot)

    // console.log(c.date)

    return arr2
}
// let days_in_week = ["T2", "T3", "T4"]

// b.setDate(b.getDate())
// console.log(getEndDayList())
// const isSatisfiedPickerDate = (day, picker) => {
//     let lastDate = getEndDayList().map(l => l.lastDate)
//     let lastDay = getEndDayList().map(l => l.lastDay)
//     console.log(lastDay)
//     console.log(picker)
//     lastDate.forEach((l, index) => {
//         // console.log(compareDates(l, '6/2/2023'))
//         console.log(lastDay[index] == format_day(day))
//         if (lastDay[index] == format_day(day) && compareDates(l, picker)) {
//             return true
//         }
//     })
// }
const setEndDate = (date) => {
    let arr2 = []
    list_course.forEach(c => {
        let b = new Date(c.open)
        let slots = 0
        b.setDate(b.getDate())
        let format = []
        c.date.forEach(da => format.push(format_day(da)))
        console.log(format)
        do {
            // sun: 0, monday:1, tues:2, wed:3, thus:4, friday:5, saturday:6 
            // 
            // if (b.getDay() == day) {
            if (format.includes(b.getDay(), 0)) {
                let chosenDate1 = new Date(b.getTime())
                let chosenDateFormat1 = (chosenDate1.getMonth() + 1) + '/' + chosenDate1.getDate() + '/' + chosenDate1.getFullYear()
                // console.log(chosenDate1.getDay())
                // arr.push(new Date(b.getTime()))
                console.log(slots)
                if (slots == (c.slot - 1)) {
                    // arr.push(chosenDateFormat1)
                    arr2.push({
                        lastDay: chosenDate1.getDay(),
                        lastDate: chosenDateFormat1
                    })
                }
                // arr.push(chosenDateFormat1)
                slots++

            }
            b.setDate(b.getDate() + 1)


        }
        while (slots < c.slot)
    }
        // console.log(c.date)
    )
    return arr2
}
