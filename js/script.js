const slidesUrl = "https://nadpsu.edu.ua/wp-json/wp/v2/posts?_embed&categories=50&per_page=6";

// const setPosts = (posts) => {
//     let imagesBox = document.querySelector(".slider-images-box");
//     let contentBox = document.querySelector(".slider-content-box");
//
//     if (posts !== null) {
//         posts.forEach(p => {
//             imagesBox.innerHTML += "<div class='slider-image-item'>" +
//                 "<img src='" + p._embedded['wp:featuredmedia'][0].source_url + "' alt='img'>" +
//                 "</div>";
//
//             contentBox.innerHTML += "<div class='slider-content-item'>" +
//                 "<h3>" + p.title.rendered + "</h3>" +
//                 "<p>" + p.excerpt.rendered.replace("<p>", "").replace("</p>", "") + "</p>" +
//                 "</div>";
//         });
//     }
// }
//
// const getPosts = async () => {
//     try {
//         const response = await fetch(slidesUrl);
//         const data = await response.json();
//         setPosts(data);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
//
// getPosts();

let sliderImages = document.querySelectorAll(".slider-image-item");
let sliderContents = document.querySelectorAll(".slider-content-item");

let imageWidth = sliderImages[0].offsetWidth;
let contentWidth = sliderContents[0].offsetWidth;

let dotsContainer = document.querySelector(".navigation-dots");
let dot = "<div class='dot'><div></div></div>"

const setDots = () => {
    for (let i = 0; i < sliderImages.length; i++) {
        dotsContainer.innerHTML += dot;
    }
}

setDots();

let dots = document.querySelectorAll(".dot");

let activeIndex = 0;

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

            if (slideCount > 0) {
                for (let c = 0; c < slideCount; c++) {
                    slide();
                }
            } else {
                for (let c = 0; c > slideCount; c--) {
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