const targets = document.querySelectorAll(".fadeUp");

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

targets.forEach(target=>observer.observe(target));