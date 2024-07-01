const url = "https://nadpsu.edu.ua/wp-json/wp/v2/posts?status=publish&per_page=4&_embed";

const setNews = (news) => {
    let mainNews = document.querySelector(".main-news");
    let newsList = document.querySelector(".news-list");

    news.forEach((n, i) => {
        if (i === 0) {
            mainNews.innerHTML = "<div class='news-image'>" +
                "<img src='" + n._embedded['wp:featuredmedia'][0].source_url + "' alt='news'>" +
                "</div>" +
                "<div class='news-info'>" +
                "<h4>" + n.title.rendered + "</h4>" +
                "<p>" + n.excerpt.rendered.replace("<p>", "").replace("</p>", "") + "</p>" +
                "</div>";
        } else {
            newsList.innerHTML += "<div class='news-item'>" +
                "<div class='news-item-image'>" +
                "<img src='" + n._embedded['wp:featuredmedia'][0].source_url + "' alt='news'>" +
                "</div>" +
                "<div class='news-item-info'>" +
                "<h4>" + n.title.rendered + "</h4>" +
                "<p>" + n.excerpt.rendered.replace("<p>", "").replace("</p>", "") + "</p>" +
                "</div>" +
                "</div>";
        }
    });
}

async function getNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        setNews(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

getNews();