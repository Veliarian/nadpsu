const menuActive = () => {
    let topNav = document.querySelector(".top-nav");
    topNav.classList.contains("active") ? topNav.classList.remove("active") : topNav.classList.add("active");
}