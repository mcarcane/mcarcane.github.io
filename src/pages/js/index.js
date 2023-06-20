function copyToClipboard(text) {
    const button = document.getElementById('copyButton');
    const originalText = button.textContent;

    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    button.textContent = 'IP copiée !';
    button.style.backgroundColor = 'rgba(85, 173, 115, 0.8)';
    button.style.color = '#140400';

    setTimeout(function () {
        button.textContent = originalText;
        button.style.backgroundColor = '';
        button.style.color = '';
    }, 1000);
}

async function updateCounters() {
    const totalPlayers = document.getElementById('total--players');
    const totalTime = document.getElementById('total--time');

    let totalPlayersRes = await fetch('https://api.arcanemc.live/count/total_players');
    totalPlayersRes = await totalPlayersRes.json();

    let totalTimeRes = await fetch('https://api.arcanemc.live/count/total_time');
    totalTimeRes = await totalTimeRes.json();
    let totalPlaytime = totalTimeRes.total || 0;

    const hours = Math.floor(totalPlaytime / 3600);

    setTimeout(() => {
        totalPlayers.textContent = totalPlayersRes.total || 'Non disponible';
        if (hours > 0) totalTime.innerText = hours.toString();
        else document.getElementById('total--time').parentElement.innerText = 'Non disponible';
    }, 1);
}

async function updateOnlineStatus() {
    const onlineStatus = document.getElementById('curact');
    const onlineStatusText = document.getElementById('online-status-text');
    const onlineSvg = document.getElementById('online-svg');

    let res = await fetch('https://api.arcanemc.live/online');
    res = await res.json();
    console.log(res);
    if (res.up === 1) {
        if (Math.floor(Date.now() / 1000) - res.timestamp > 60000) {
            onlineStatus.style.display = 'none';
        } else if (res["online_players"] !== 0) {
            onlineStatus.style.dispay = 'flex';
            onlineSvg.classList.remove('offline');
            onlineSvg.classList.add('online');
            onlineStatusText.textContent = res["online_players"] + ' joueur' + (res["online_players"] > 1 ? 's' : '') + ' en ligne';
        } else {
            onlineStatus.style.display = 'flex';
            onlineSvg.classList.remove('offline');
            onlineSvg.classList.add('online');
            console.log(onlineSvg.classList);
            onlineStatusText.textContent = 'Aucun joueur en ligne';
        }
    } else {
        onlineStatus.style.display = 'flex';
        onlineSvg.classList.remove('online');
        onlineSvg.classList.add('offline');
        onlineStatusText.textContent = 'Serveur hors ligne';
    }
}

window.addEventListener('load', async function () {
    // update counters when the user scrolls to the numbers section, only once
    const counters = document.getElementById('numbers');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounters();
            observer.disconnect();
        }
    });
    observer.observe(counters);

    // update the online status every 20 seconds
    await updateOnlineStatus();
    setInterval(updateOnlineStatus, 20000);
});