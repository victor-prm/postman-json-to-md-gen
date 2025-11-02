/* Functions to generate badges for markdown */

// Generic badge generator
export function mdBadge(label, color = "grey", options = {}) {
    const { rounded = true, height = 18 } = options;
    const style = `flat-square${rounded ? "&rounded=true" : ""}`;
    const url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=${style}`;
    return `<img src="${url}" alt="${label}" style="height:${height}px; vertical-align:middle; margin-right:2px;">`;
}

// Method badges (GET, POST, etc.)
export function mdMethod(method) {
    const colorMap = {
        GET: "mediumseagreen",
        POST: "yellow",
        PUT: "blue",
        PATCH: "plum",
        DELETE: "salmon",
        OPTIONS: "deeppink",
        HEAD: "lightgrey",
    };
    return mdBadge(method, colorMap[method] || "grey");
}

// Role badges (Public, Editor, Admin)
export function mdRoleBadge(roles) {
    const colorMap = { Public: "mediumseagreen", Editor: "yellow", Admin: "red", "-": "grey" };
    return roles.map(r => mdBadge(r, colorMap[r] || "grey")).join('<br>');
}