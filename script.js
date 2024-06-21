let sliderImages = document.querySelectorAll(".slider-image-item");
let sliderContents = document.querySelectorAll(".slider-content-item");

let imageWidth = sliderImages[0].offsetWidth;
let contentWidth = sliderContents[0].offsetWidth;

let dotsContainer = document.querySelector(".navigation-dots");
let dot = "<div class='dot'><div></div></div>"

let activeIndex = 0;

const setDots = () => {
    for (let i = 0; i < sliderImages.length; i++) {
        dotsContainer.innerHTML += dot;
    }
}

setDots();

let dots = document.querySelectorAll(".dot");

const setDefault = () => {
    activeIndex = 0;

    sliderImages.forEach((s, i) => {
        i === 0 ? s.style.left = "0px" : s.style.left = imageWidth * i + "px";
    });

    sliderContents.forEach((c, i) => {
        i === 0 ? c.style.left = "0px" : c.style.left = contentWidth * i + "px";
    });

    dots.forEach(d => {
        d.classList.remove("active");
    });
    dots[activeIndex].classList.add("active");
}

setDefault();

const slide = () => {
    if (activeIndex === sliderImages.length - 1) {
        setDefault();
    } else {
        activeIndex++;
        dots.forEach(d => {
            d.classList.remove("active");
        });
        dots[activeIndex].classList.add("active");
        for (let i = 0; i < sliderImages.length; i++) {
            sliderImages[i].style.left = (parseInt(sliderImages[i].style.left) - imageWidth) + "px";
            sliderContents[i].style.left = (parseInt(sliderContents[i].style.left) - contentWidth) + "px";
        }
    }
}

const prevSlide = () => {
    if (activeIndex !== 0) {
        activeIndex--;
        dots.forEach(d => {
            d.classList.remove("active");
        });
        dots[activeIndex].classList.add("active");
        for (let i = sliderImages.length - 1; i >= 0; i--) {
            sliderImages[i].style.left = (parseInt(sliderImages[i].style.left) + imageWidth) + "px";
            sliderContents[i].style.left = (parseInt(sliderContents[i].style.left) + contentWidth) + "px";
        }
    }
}

let timerId = setInterval(slide, 7000);

document.querySelector(".navigation-next").addEventListener("click", (e) => {
    clearInterval(timerId);
    slide();
    timerId = setInterval(slide, 7000);
});

document.querySelector(".navigation-prev").addEventListener("click", (e) => {
    clearInterval(timerId);
    prevSlide();
    timerId = setInterval(slide, 7000);
});

document.querySelectorAll(".dot").forEach((d, i) => {
    d.addEventListener("click", (e) => {
        if (!e.target.classList.contains("active")) {
            clearInterval(timerId);
            let slideCount = i - activeIndex;

            if(slideCount > 0){
                for(let c = 0; c < slideCount; c++) {
                    slide();
                }
            }else {
                for(let c = 0; c > slideCount; c--) {
                    prevSlide();
                }
            }
            timerId = setInterval(slide, 7000);
        }
    });
});

onresize = () => {
    imageWidth = sliderImages[0].offsetWidth;
    contentWidth = sliderContents[0].offsetWidth;
    setDefault();
}

const menuActive = () => {
    let topNav = document.querySelector(".top-nav");
    topNav.classList.contains("active") ? topNav.classList.remove("active") : topNav.classList.add("active");
}