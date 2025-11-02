let md = "";

async function fetchJSONCollection() {
    const response = await fetch('Book Tracker.postman_collection.json');
    const collection = await response.json();
    return collection;
}

fetchJSONCollection().then(collection => {
    console.log(collection)

    md += mdHeading(`${collection.info.name}`);

    collection.item.forEach(itm => {
        md += mdHeading(`📁 ${itm.name} endpoint`, 2);
    })

    console.log(md);

    document.querySelector("#output").innerHTML = marked.parse(md);
    document.querySelector("#output-md").textContent = md;
});

function mdHeading(content, headerSize = 1) {
    headerSize = Math.max(1, Math.min(6, headerSize));

    let headMd = "";

    headMd = "#".repeat(headerSize);

    return `${headMd} ${content}` + mdLineBreak();
}

function mdLineBreak() {
    return "\n\n";
}