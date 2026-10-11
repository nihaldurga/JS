const inputText=document.getElementById("search-input");
const enrollButton=Array.from(document.getElementsByClassName("enroll-btn"));
const enrolledContainer=document.getElementById("enrolled-container");
const courseContainer=document.getElementById("course-container");
const showEnrolled=document.getElementById("show-enrolled");
const EmptyMessage=document.getElementById("empty-message");
const showAll=document.getElementById("show-all");
const AvailableCourse=document.querySelectorAll("section");
const courseCard=Array.from(document.getElementsByClassName("course-card"));
let count=0;

const para=document.createElement("p");
para.textContent=`Enrolled Courses: ${count}`;

enrolledContainer.parentElement.insertBefore(para,enrolledContainer);

enrollButton.forEach((i)=>{
    i.addEventListener("click",()=>{
        if(i.disabled) return;

        count++;
        EmptyMessage.style.display="none";
        para.textContent=`Enrolled Courses: ${count}`;

        i.disabled=true;
        enrolledContainer.appendChild(i.parentElement);
    });
});

showEnrolled.addEventListener("click",()=>{
    AvailableCourse[1].style.display="none";
    AvailableCourse[2].style.display="block";
});

showAll.addEventListener("click",()=>{
    AvailableCourse[1].style.display="block";
    AvailableCourse[2].style.display="none";

    courseCard.forEach((i)=>{
        i.style.display="block";
    });
});

const searchButton=document.getElementById("search-button");

searchButton.addEventListener("click",()=>{
    courseCard.forEach((i)=>{
            if (inputText.value.toLowerCase() === i.dataset.course.toLowerCase()) {
                i.classList.remove("hidden");
            } else {
                i.classList.add("hidden");
            }
    });
    inputText.value="";
    AvailableCourse[1].style.display="block";
    AvailableCourse[2].style.display="none";
});
