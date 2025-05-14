const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];
document.addEventListener("DOMContentLoaded", function() {
  const coursesContainer = document.getElementById("courses-container");
  const allBtn = document.getElementById("all-btn");
  const cseBtn = document.getElementById("cse-btn");
  const wddBtn = document.getElementById("wdd-btn");
  const creditCount = document.getElementById("credit-count");

  function displayCourses(courseList, bgColorCompleted, textColorCompleted, bgColorNotCompleted, textColorNotCompleted, showOnlySubject = null) {
    coursesContainer.innerHTML = ""; // Clear previous courses

    courseList.forEach(course => {
      if (showOnlySubject && course.subject !== showOnlySubject) return; // Filter specific subject

      const courseDiv = document.createElement("div");
      courseDiv.classList.add("course-box");
      courseDiv.textContent = `${course.subject} ${course.number} - ${course.title}`;

      if (course.completed) {
        courseDiv.style.backgroundColor = bgColorCompleted;
        courseDiv.style.color = textColorCompleted;
        courseDiv.innerHTML += " ✅"; // Add checklist symbol
      } else {
        courseDiv.style.backgroundColor = bgColorNotCompleted;
        courseDiv.style.color = textColorNotCompleted;
      }

      coursesContainer.appendChild(courseDiv);
    });

    // Calculate total credits dynamically using reduce()
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    creditCount.textContent = totalCredits; // Update the credit count display
  }

  // Event for "ALL" button
  allBtn.addEventListener("click", () => {
    displayCourses(
      courses,
      "var(--green-olive)", "var(--beige-light)", // Colors for completed courses
      "var(--wine-red)", "var(--beige-light)"   // Colors for incomplete courses
    );

    // Highlight the active button
    allBtn.style.backgroundColor = "var(--green-olive)";
    allBtn.style.color = "var(--beige-light)";
    cseBtn.style.backgroundColor = "";
    cseBtn.style.color = "";
    wddBtn.style.backgroundColor = "";
    wddBtn.style.color = "";
  });

  // Event for "CSE" button
  cseBtn.addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");

    displayCourses(
      cseCourses, 
      "var(--golden-ocre)", "black", // Colors for completed CSE courses
      "", "", // Incomplete courses should not appear
      "CSE"
    );

    // Highlight the active button
    cseBtn.style.backgroundColor = "var(--golden-ocre)";
    cseBtn.style.color = "black";
    allBtn.style.backgroundColor = "";
    allBtn.style.color = "";
    wddBtn.style.backgroundColor = "";
    wddBtn.style.color = "";
  });

  // Event for "WDD" button
  wddBtn.addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");

    displayCourses(
      wddCourses, 
      "black", "var(--beige-light)", // Colors for completed WDD courses
      "var(--wine-red)", "var(--beige-light)", // Colors for incomplete WDD courses
      "WDD"
    );

    // Highlight the active button
    wddBtn.style.backgroundColor = "black";
    wddBtn.style.color = "var(--beige-light)";
    allBtn.style.backgroundColor = "";
    allBtn.style.color = "";
    cseBtn.style.backgroundColor = "";
    cseBtn.style.color = "";
  });

  // Initially display all completed courses
  displayCourses(
    courses.filter(course => course.completed),
    "var(--gray-marble)", "var(--brown-dark)", 
    "var(--wine-red)", "var(--beige-light)"
  );
});
