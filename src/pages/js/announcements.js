function showCard(cardHeader) {
    const overlay = document.querySelector('.overlay');
    cardHeader.parentElement.classList.add('visible');
    overlay.classList.add('active');
}

function hideCard(button) {
    const overlay = document.querySelector('.overlay');
    button.parentElement.parentElement.classList.add('hiding');
    setTimeout(() => {
        button.parentElement.parentElement.classList.remove('visible');
        button.parentElement.parentElement.classList.remove('hiding');
    }, 700);
    overlay.classList.remove('active');
}

// listen for escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.card.visible').forEach(card => {
            hideCard(card.querySelector('button'));
        });
    }
});

document.querySelector('.overlay').addEventListener('click', function () {
    document.querySelectorAll('.card.visible').forEach(card => {
        hideCard(card.querySelector('button'));
    });
});

// Convert Markdown to HTML for each announcement
window.onload = async () => {
    await fetch('./src/pages/announcements.json').then(response => {
        response.json().then(response => {
            if (response.length > 0) document.querySelector('#empty-string').style.display = 'none';
            response.forEach(announcement => {
                const html =
                    "            <div class=\"card\">\n" +
                    "                <div class=\"card-header\" onclick=\"showCard(this);\">\n" +
                    `                    <h4>Publiée le ${announcement.date}</h4>\n` +
                    `                    <h3>${announcement.title}</h3>\n` +
                    "                </div>\n" +
                    `                <div class=\"card-body\"><button onclick=\"hideCard(this);\">×</button><h2>${announcement.title}</h2><h4>Publiée le ${announcement.date}</h4><span>${marked.parse(announcement.content, {
                        gfm: true,
                        breaks: true
                    })}</span></div>\n` +
                    "            </div>";
                document.querySelector('.card-container').innerHTML += html;
            });
        });
    });
};