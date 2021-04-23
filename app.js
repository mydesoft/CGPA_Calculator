const lists = document.getElementById('course-table-list');
const addButton = document.getElementById('add-to-list-btn');
const addToListForm = document.getElementById('add-to-list-form');
const gpaButton = document.getElementById('calculate-gpa-btn');
const cgpaButton = document.getElementById('calculate-cgpa-btn');

const allEnteredInputs = [];

const showAlertMessages = (message, alertType) => {
    //create alert
    const divAlert = document.createElement('div');
    divAlert.className = `alert alert-${alertType}`;
    const messageText = document.createTextNode(message);
    divAlert.append(messageText);

    const inputsCard = document.getElementById('inputs-card');
    const inputsCardContainer = document.getElementById('inputs-card-row');
    inputsCardContainer.insertBefore(divAlert, inputsCard);

    //clear alert
    const clearAlert = () => {
        document.querySelector('.alert').remove();
    }
    setTimeout(clearAlert, 2500);

}

const addToListHandler = (event) => {
    event.preventDefault();

    const enteredCourse = document.getElementById('course').value;
    const enteredUnit = document.getElementById('select-unit').value;
    const enteredGrade = document.getElementById('select-grade').value;

    if(enteredCourse === '' || enteredUnit === '' || enteredGrade === ''){
        showAlertMessages('Fill All Fields to compute your GPA | CGPA', 'danger');
    }

    else{

    let point;
    switch(enteredGrade){
        case 'A':
            point = parseInt(enteredUnit) * 5;
            break;
        
        case 'B':
            point = parseInt(enteredUnit) * 4;
            break;

        case 'C':
            point = parseInt(enteredUnit) * 3;
            break;

        case 'D':
            point = parseInt(enteredUnit) * 2;
            break;

        case 'E':
            point = parseInt(enteredUnit) * 1;
            break;

        case 'F':
            point = parseInt(enteredUnit) * 0;
            break;

    }

    const calculatedPoint = point;

    const coursesUnitGradeObj = {
        course : enteredCourse,
        unit : parseInt(enteredUnit),
        grade : enteredGrade,
        point: calculatedPoint,
        id: Math.random()
    }

    allEnteredInputs.push(coursesUnitGradeObj);
    showAlertMessages('Course, Unit and Grade added for calculation!', 'success');
    renderTableLists();

    //clear inputs
    document.getElementById('course').value = '';
    document.getElementById('select-unit').value = '';
    document.getElementById('select-grade').value = '';
    }

}


const renderTableLists = () => {
    
    lists.innerHTML = '';

    allEnteredInputs.forEach((input) => {
        const list = document.createElement('tr');
        list.innerHTML = `
            <td>${input.course}</td>
            <td>${input.unit}</td>
            <td>${input.grade}</td>
            <td><button class="btn btn-danger btn-sm delete">x</button></td>
        `;

        lists.appendChild(list);


        //delete course
        list.addEventListener('click', (event) => {
            el = event.target
            if(el.classList.contains('delete')){
                el.parentElement.parentElement.remove();

            }
            
        })
        const deleteCourseList = list.querySelector('td:last-of-type').firstElementChild;
        deleteCourseList.addEventListener('click', deleteCourseHandler.bind(null, input.id));

    });

    checkCourseTable()
    
}


const deleteCourseHandler = (id) => {

    allEnteredInputs.forEach((input, inputId) => {
        if(input.id === id){
            allEnteredInputs.splice(inputId, 1);
            showAlertMessages('Course removed from computation', 'success');
             }
         });

         checkCourseTable();
}

const checkCourseTable = () => {
    if(allEnteredInputs.length > 0){

        gpaButton.removeAttribute('disabled');
        cgpaButton.removeAttribute('disabled');
    }

    else{
        gpaButton.setAttribute('disabled', true);
        cgpaButton.setAttribute('disabled', true);
    }
}

const computation = () =>{
    
   const totalUnits = allEnteredInputs.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.unit;
}, 0);


const totalPoints = allEnteredInputs.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.point;
}, 0);

    const result = totalPoints / totalUnits;
    return result;
}

calculateGPAHandler = () => {

    const gpa = computation();
    const cardGPA = document.getElementById('gpa-output');

    if(isNaN(gpa) || gpa === ''){
        return;
    }
    cardGPA.innerText = `GPA: ${gpa.toFixed(2)}`;
}


calculateCGPAHandler = () => {
    
    const cgpa = computation();
    const cardCGPA = document.getElementById('cgpa-output');

    if(isNaN(cgpa) || cgpa === ''){
        return;
    }
    cardCGPA.innerText = `CGPA: ${cgpa.toFixed(2)}`;
}


//Event Listeners
addToListForm.addEventListener('submit', addToListHandler);
gpaButton.addEventListener('click', calculateGPAHandler);
cgpaButton.addEventListener('click', calculateCGPAHandler);
