const modalContainer = document.querySelector(".modalContainer");
const modalTriggers = document.querySelectorAll(".modalTrigger");

modalTriggers.forEach(trigger => trigger.addEventListener('click', toggleModal));

function toggleModal(){
    modalContainer.classList.toggle("active")
};


