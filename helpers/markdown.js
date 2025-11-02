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