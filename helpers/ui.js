// Attach copy-to-clipboard functionality
export function enableCopyButton() {
    const btn = document.getElementById('copy-md-btn');
    const output = document.getElementById('output-md');

    btn.addEventListener('click', () => {
        const temp = document.createElement('textarea');
        temp.value = output.textContent;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        alert('Markdown copied to clipboard!');
    });
}