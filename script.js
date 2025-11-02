let md = "These docs are auto-generated from postman_collection.json. This is a homemade script, as I did not like the other json-to-md libraries I found out there." + mdLineBreaks();

async function fetchJSONCollection() {
    const response = await fetch('Book Tracker.postman_collection.json');
    const collection = await response.json();
    return collection;
}

fetchJSONCollection().then(collection => {
    console.log(collection)

    md += mdHeading(`${collection.info.name}`);
    md += collection.info.description + mdLineBreaks();


    md += generateCollectionTable(collection, "X-Authorization");

    // Loop for generating markdown collecition tables
    collection.item.forEach((itm, i) => {
        md += mdHeading(`📁 ${i + 1}. ${itm.name} endpoint`, 2);
        md += itm.description + mdLineBreaks();

        // Table header with 4 columns now
        md += `| Method | Description | Endpoint | Role  |\n|------|--------|-------------|---------|\n`;

        itm.item.forEach(it => {
            const formattedEndpoint = it.request.url.raw.replaceAll("{{base_url}}", "");
            const roleText = mdRoleForMethod(it.request.method); // e.g. "Editor, Admin"
            const roleBadge = mdRoleBadge(roleText);             // returns HTML with one or multiple badges
            md += `| ${mdMethod(it.request.method)} | ${it.name} | \`${formattedEndpoint}\` | ${roleBadge} |\n`;
        });

        md += mdLineBreaks(2) // spacing after table
    });
    //console.log(md);

    document.querySelector("#output").innerHTML = marked.parse(md);
    document.querySelector("#output-md").textContent = md;
});

function mdHeading(content, headerSize = 1) {
    headerSize = Math.max(1, Math.min(6, headerSize));

    let md = "";

    md = "#".repeat(headerSize);

    return `${md} ${content}` + mdLineBreaks();
}

function mdLineBreaks(count = 1) {
    return "\n\n".repeat(count); // each count = two newlines
}


// Role determination function
function mdRoleForMethod(method) {
    switch (method) {
        case "GET":
        case "HEAD":
        case "OPTIONS":
            return "Public";
        case "POST":
        case "PUT":
        case "PATCH":
            return "Editor, Admin";
        case "DELETE":
            return "Admin";
        default:
            return "-";
    }
}

// Role badge helper
function mdRoleBadge(roleString) {
    // Split roles by comma
    const roles = roleString.split(',').map(r => r.trim());

    // Map colors for individual roles
    const colorMap = {
        "Public": "mediumseagreen",
        "Editor": "yellow",
        "Admin": "red",
    };

    // Generate a badge for each role
    const badges = roles.map(role => {
        const color = colorMap[role] || "grey";
        const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(role)}-${color}?style=flat-square&logo=&logoColor=&rounded=true`;
        // Use HTML <img> for better control on size & vertical alignment
        return `<img src="${badgeUrl}" alt="${role}" style="height:18px; vertical-align:middle; margin-right:2px;">`;
    });

    // Return badges concatenated
    return badges.join('');
}




function mdMethod(method) {
    const colorMap = {
        GET: "mediumseagreen",
        POST: "yellow",
        PUT: "blue",
        PATCH: "plum",
        DELETE: "salmon",
        OPTIONS: "deeppink",
        HEAD: "lightgrey",
    };

    const color = colorMap[method] || "grey";
    const method_badgeUrl = `https://img.shields.io/badge/${method}-${color}?style=flat-square`;

    // Use HTML img for better vertical alignment
    return `<img src="${method_badgeUrl}" style="vertical-align: middle; height: 18px;">`;
}

function copyMarkDown() {
    const copyBtn = document.getElementById('copy-md-btn');
    const mdOutput = document.getElementById('output-md');

    copyBtn.addEventListener('click', () => {
        // Create a temporary textarea to copy text
        const temp = document.createElement('textarea');
        temp.value = mdOutput.textContent; // Use textContent to get raw text
        document.body.appendChild(temp);
        temp.select();
        temp.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        document.body.removeChild(temp);

        // Optional: show confirmation
        alert('Markdown copied to clipboard!');
    });
}

function collectHeaderKeyValues(collection, headerKey) {
    const headerMap = {};

    function processItems(items) {
        items.forEach(item => {
            if (item.request && Array.isArray(item.request.header)) {
                item.request.header.forEach(header => {
                    if (header.key && header.value) {
                        if (header.key.toLowerCase() === headerKey.toLowerCase()) {
                            if (!headerMap[header.key]) headerMap[header.key] = new Set();
                            headerMap[header.key].add(header.value);
                        }
                    }
                });
            }

            // Recursively handle nested folders
            if (Array.isArray(item.item)) {
                processItems(item.item);
            }
        });
    }

    if (Array.isArray(collection.item)) {
        processItems(collection.item);
    }

    // Convert sets to arrays
    const result = {};
    Object.entries(headerMap).forEach(([k, v]) => {
        result[k] = Array.from(v);
    });

    return result;
}

function generateCollectionTable(collection, headerKey = "X-Authorization") {
    let md = "";
    md += mdHeading(`🔐 Base URL and Tokens`, 2);

    // Table header
    md += `| Type | Key | Value |\n|------|-----|-------|\n`;

    // 1️⃣ Variables
    if (Array.isArray(collection.variable)) {
        collection.variable.forEach(v => {
            const typeBadge = `![VARIABLE](https://img.shields.io/badge/VARIABLE-darkslategrey?style=flat-square)`;
            md += `| ${typeBadge} | \`${v.key}\` | \`${v.value}\` |\n`;
        });
    }

    // 2️⃣ Headers
    const headers = collectHeaderKeyValues(collection, headerKey);
    Object.entries(headers).forEach(([key, values]) => {
        values.forEach(val => {
            const typeBadge = `![HEADER](https://img.shields.io/badge/HEADER-orange?style=flat-square)`;
            md += `| ${typeBadge} | \`${key}\` | \`${val}\` |\n`;
        });
    });

    md += mdLineBreaks();
    return md;
}

copyMarkDown();