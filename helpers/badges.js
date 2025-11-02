/* Functions to generate badges for markdown */

// Generic badge generator
// Generic badge generator using shields.io
export function mdBadge(label, color = "grey") {
    // Encode the label for URL safety
    const badgeLabel = encodeURIComponent(label);
    const badgeColor = encodeURIComponent(color);
    const url = `https://img.shields.io/badge/${badgeLabel}-${badgeColor}?style=flat&logoColor=white`;
    return `![${label}](${url})`;
}


// Method badges (GET, POST, etc.)
export function mdMethod(method) {
    const colorMap = {
        GET: "mediumseagreen",
        POST: "goldenrod",
        PUT: "royalblue",
        PATCH: "plum",
        DELETE: "salmon",
        OPTIONS: "deeppink",
        HEAD: "lightgrey",
    };
    return mdBadge(method, colorMap[method] || "grey");
}

export function mdRoleBadge(roles) {
    const colorMap = {
        Public: "honeydew",
        Editor: "beige",
        Admin: "mistyrose",
        "-": "lightgrey",
    };
    return roles.map(r => mdBadge(r, colorMap[r] || "lightgrey")).join(" ");
}