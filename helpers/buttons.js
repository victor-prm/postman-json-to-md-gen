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

// Attach download button functionality
export function enableDownloadButton(buttonId = "download-md-btn", contentId = "output-md", filename = "README.md") {
    const btn = document.getElementById(buttonId);
    const output = document.getElementById(contentId);

    btn.addEventListener('click', () => {
        const mdContent = output.textContent;
        const blob = new Blob([mdContent], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}