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