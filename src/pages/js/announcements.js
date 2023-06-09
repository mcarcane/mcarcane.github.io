window.onload(function () {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('touchstart', function () {
            this.querySelector('.card-inner').classList.toggle('is-flipped');
        });
    });
});