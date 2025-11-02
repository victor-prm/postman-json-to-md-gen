// Helpers to process Postman collection JSON

//const jsonFile = 'Book Tracker.postman_collection.json';
const jsonFile = 'test_collection.json';

// Fetch Postman JSON file
export async function fetchCollection(url = jsonFile) {
    const res = await fetch(url);
    return res.json();
}

// Map HTTP method to allowed roles
export function mdRoleForMethod(method) {
    switch (method) {
        case "GET": case "HEAD": case "OPTIONS": return ["Public"];
        case "POST": case "PUT": case "PATCH": return ["Editor", "Admin"];
        case "DELETE": return ["Admin"];
        default: return ["-"];
    }
}

// Collect header values for a specific header key
export function collectHeaderKeyValues(collection, headerKey) {
    const map = {};
    function process(items) {
        items.forEach(i => {
            (i.request?.header || []).forEach(h => {
                if (h.key?.toLowerCase() === headerKey.toLowerCase() && h.value) {
                    if (!map[h.key]) map[h.key] = new Set();
                    map[h.key].add(h.value);
                }
            });
            if (Array.isArray(i.item)) process(i.item);
        });
    }
    process(collection.item || []);
    return Object.fromEntries(Object.entries(map).map(([k,v]) => [k, Array.from(v)]));
}