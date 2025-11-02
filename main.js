import { fetchCollection, collectHeaderKeyValues, mdRoleForMethod } from './helpers/collection.js';
import { mdHeading, mdLineBreaks, mdTable, mdEndpointBlock } from './helpers/markdown.js';
import { mdBadge} from './helpers/badges.js';
import { enableCopyButton, enableDownloadButton } from './helpers/buttons.js';

let mdContent = "These docs are auto-generated from postman_collection.json. This is a homemade script, as I did not like the other json-to-md libraries I found out there.\n\n";

fetchCollection().then(col => {
    mdContent += mdHeading(col.info.name) + col.info.description + mdLineBreaks();

    mdContent += mdHeading(`🔐 Base URL and tokens`, 2);
    // Generate table for variables + headers
    const rows = [];
    (col.variable || []).forEach(v => rows.push({
        "Type": mdBadge("VARIABLE", "darkslategrey"),
        "Key": `\`${v.key}\``,
        "Value": `\`${v.value}\``
    }));
    const headers = collectHeaderKeyValues(col, "X-Authorization");
    Object.entries(headers).forEach(([k, vals]) => vals.forEach(v => rows.push({
        "Type": mdBadge("HEADER", "orange"),
        "Key": `\`${k}\``,
        "Value": `\`${v}\``
    })));
    mdContent += mdTable(["Type", "Key", "Value"], rows);

    // Generate endpoint tables
    (col.item || []).forEach((folder, i) => {
        mdContent += mdHeading(`📁 ${i + 1}. ${folder.name} endpoint`, 2);
        mdContent += (folder.description || "") + mdLineBreaks();

        folder.item.forEach((ep,i) => {
            const roles = mdRoleForMethod(ep.request.method);
            // Render the endpoint block directly (HTML badges will render)
            mdContent += mdEndpointBlock(ep, roles, i) + mdLineBreaks();
        });
    });

    document.querySelector("#output").innerHTML = marked.parse(mdContent);
    document.querySelector("#output-md").textContent = mdContent;
});

// Initialize buttons
enableCopyButton();
enableDownloadButton();