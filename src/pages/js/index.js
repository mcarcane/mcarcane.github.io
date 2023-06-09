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

    setTimeout(function () {
        button.textContent = originalText;
    }, 1000);
}