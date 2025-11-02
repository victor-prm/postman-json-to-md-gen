import { mdMethod, mdRoleBadge } from './badges.js';
import { mdRoleForMethod } from './collection.js';

/* Functions to help generate markdown content */

// Generate heading of size 1-6
export function mdHeading(text, size = 1) {
    size = Math.min(6, Math.max(1, size));
    return `${"#".repeat(size)} ${text}\n\n`;
}

// Generate multiple line breaks
export function mdLineBreaks(count = 1) {
    return "\n\n".repeat(count);
}

// Generate a markdown table from columns and row objects
export function mdTable(columns, rows) {
    let table = `| ${columns.join(" | ")} |\n`;
    table += `|${columns.map(() => "---").join("|")}|\n`;
    rows.forEach(row => {
        table += `| ${columns.map(col => row[col] || "").join(" | ")} |\n`;
    });
    return table + mdLineBreaks();
}

// Shorten long URLs for table display but keep full URL as link
export function shortenEndpointsWithRefs(folder, collection, maxLength = 48) {
    const baseUrl = collection.variable?.find(v => v.key === "base_url")?.value || "";
    const fullRefs = [];
    let refCounter = 1;

    const epRows = folder.item.map(ep => {
        const raw = ep.request.url.raw.replace("{{base_url}}", "");
        const display = raw.length > maxLength ? raw.slice(0, maxLength) + "..." : raw;

        let endpointDisplay = `\`${display}\``;
        if (raw.length > maxLength) {
            const refId = `ep-${folder.name.toLowerCase().replace(/\s+/g, '-')}-${refCounter}`;
            endpointDisplay += ` [[${refCounter}](#${refId})]`;
            fullRefs.push({
                id: refId,
                label: refCounter,
                text: `${ep.request.method} ${baseUrl}${raw}`,
            });
            refCounter++;
        }

        return {
            "Method": mdMethod(ep.request.method),
            "Description": ep.name,
            "Endpoint": endpointDisplay,
            "Role": mdRoleBadge(mdRoleForMethod(ep.request.method))
        };
    });

    return { epRows, fullRefs };
}

export function mdEndpointBlock(ep, roles, index) {
    const display = ep.request.url.raw.replace("{{base_url}}", "");
    const methodBadge = mdMethod(ep.request.method);
    const roleBadges = mdRoleBadge(roles);

    return [
        `**${1 + index}. ${ep.name}** ${mdLineBreaks()}`, // bold name + roles
        `${methodBadge} \`${display}\` ${mdLineBreaks()}`, // method + endpoint URL
        `${roleBadges}${mdLineBreaks()}`,
        `${mdLineBreaks()}---${mdLineBreaks()}` // horizontal rule with blank lines
    ].join("\n");
}


export function mdFormatMultiline(strings, ...values) {
    const raw = strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");
    return raw.split("\n").map(line => line.trim()).join(""); // remove all leading/trailing spaces per line
}