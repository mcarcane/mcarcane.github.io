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
        return response.json();
    }).then(data => {
        if (data.length > 0) document.querySelector('#empty-string').style.display = 'none';
        data.forEach(announcement => {
            // Formater la date pour l'affichage
            const date = new Date(announcement.date);
            const formattedDate = date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            let notesHtml = '';
            if (announcement.notes && announcement.notes.length > 0) {
                notesHtml = '<ul>';
                announcement.notes.forEach(note => {
                    if (note) {
                        notesHtml += `<li>${marked.parse(note, {
                            gfm: true,
                            breaks: true
                        })}</li>`;
                    }
                });
                notesHtml += '</ul>';
            }

            const html =
                `<div class="card${announcement.date ? " important" : ""}">\n` +
                "    <div class=\"card-header\" onclick=\"showCard(this);\">\n" +
                `        <h4>Publiée le ${formattedDate}</h4>\n` +
                `        <h3>${announcement.title}</h3>\n` +
                "    </div>\n" +
                `    <div class=\"card-body\"><button onclick=\"hideCard(this);\">×</button>` +
                `<h2>${announcement.title}</h2>` +
                `<h4>Publiée le ${formattedDate}</h4>` +
                `<span>${notesHtml}</span></div>\n` +
                "</div>";
            document.querySelector('.card-container').innerHTML += html;
        });
    }).catch(error => {
        console.error('Erreur lors du chargement des annonces:', error);
        document.querySelector('#empty-string').style.display = 'block';
    });
};