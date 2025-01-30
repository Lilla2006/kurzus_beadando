document.addEventListener('DOMContentLoaded', () => {
    const apiCoursesUrl = 'https://vvri.pythonanywhere.com/api/courses';
    const apiStudentsUrl = 'https://vvri.pythonanywhere.com/api/students';
    
    const coursesList = document.getElementById('coursesList');
    const studentsList = document.getElementById('studentsList');

    const newCourseNameInput = document.getElementById('newCourseName');
    const newStudentNameInput = document.getElementById('newStudentName');

    const addCourseBtn = document.getElementById('addCourseBtn');
    const addStudentBtn = document.getElementById('addStudentBtn');

    const loadCoursesBtn = document.getElementById('loadCourses');
    const loadStudentsBtn = document.getElementById('loadStudents');

    loadCoursesBtn.addEventListener('click', fetchCourses);
    
    function fetchCourses() {
        fetch(apiCoursesUrl)
            .then(response => response.json())
            .then(data => renderCourses(data))
            .catch(error => console.error('Hiba a kurzusok betöltésekor:', error));
    }

    function renderCourses(courses) {
        coursesList.innerHTML = '';
        courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course.name;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️';
            deleteBtn.addEventListener('click', () => deleteCourse(course.id));

            li.appendChild(deleteBtn);
            coursesList.appendChild(li);
        });
    }

    addCourseBtn.addEventListener('click', () => {
        const courseName = newCourseNameInput.value.trim();
        if (!courseName) return alert('Adj meg egy kurzusnevet!');

        fetch(apiCoursesUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: courseName }),
        })
        .then(response => response.json())
        .then(() => {
            newCourseNameInput.value = '';
            fetchCourses();
        })
        .catch(error => console.error('Hiba a kurzus hozzáadásakor:', error));
    });

    fetch(apiCoursesUrl, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => console.log("Sikeres törlés:", data))
    .catch(error => console.error("Hiba a kurzus törlésekor:", error));
    

    loadStudentsBtn.addEventListener('click', fetchStudents);

    function fetchStudents() {
        fetch(apiStudentsUrl)
            .then(response => response.json())
            .then(data => renderStudents(data))
            .catch(error => console.error('Hiba a diákok betöltésekor:', error));
    }

    function renderStudents(students) {
        studentsList.innerHTML = '';
        students.forEach(student => {
            const li = document.createElement('li');
            li.textContent = student.name;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️';
            deleteBtn.addEventListener('click', () => deleteStudent(student.id));

            li.appendChild(deleteBtn);
            studentsList.appendChild(li);
        });
    }

    addStudentBtn.addEventListener('click', () => {
        const studentName = newStudentNameInput.value.trim();
        if (!studentName) return alert('Adj meg egy diáknevet!');

        fetch(apiStudentsUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "Példa Diák" }),
        })
        .then(response => response.json())
        .then(() => {
            newStudentNameInput.value = '';
            fetchStudents();
        })
        .catch(error => console.error('Hiba a kurzus hozzáadásakor:', error));

    })    

    function deleteStudent(id) {
        fetch(`${apiStudentsUrl}${id}/`, { method: 'DELETE' })
            .then(() => fetchStudents())
            .catch(error => console.error('Hiba a diák törlésekor:', error));
    }
});
