const button =document.getElementById("addNoteBtn");
const textArea=document.getElementById("noteInput");
const container=document.getElementById("notesContainer");

let count=0;
button.addEventListener("click",()=>{
    const divEle=document.createElement('div');
    divEle.classList.add("note");
    divEle.textContent=textArea.value;
    container.append(divEle);
    textArea.value="";
    (count%2===0)?divEle.classList.add("note-blue"):divEle.classList.add("note-white");
    count++;
    const deleteBtn=document.createElement('button');
    divEle.append(deleteBtn);
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent="+";
    deleteBtn.addEventListener("click",()=>{
        divEle.remove();
        deleteBtn.remove();
    })
})

