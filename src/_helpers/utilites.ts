export function pickRandomAvatarColor(id: number) {
    const colors = [
        "#dcedc8",
        "#ffecb3",
        "#c5cae9",
        "#b3e5fc",
        "#b2dfdb",
        "#ffccbc",
        "#f0f4c3",
        "#d7ccc8",
        "#cfd8dc",
        "#e3dbba",
        "#d8e6b3",
        "#d3e7ea",
        "#d3c8f0",
        "lavender",
        "#FFE7E7",
        "rgb(220, 196, 165)",
        "wheat",
        "paleturquoise",
        "rgb(184, 255, 255)",
        "peachpuff",
        "rgb(169, 251, 169)",
        "papayawhip",
        "rgba(255, 182, 193, 0.79)",
    ];
    return colors[id % 23] || "black";
}
export function convertTimestampToDate(timestamp: { seconds: number; nanoseconds: number }) {
    if (timestamp?.nanoseconds) {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

        const dateString = date.toLocaleString("en-US", {
            weekday: "short", // "Sat"
            month: "short", // "Dec"
            day: "2-digit", // "02"
            year: "numeric", // "2023"
            hour: "2-digit", // "15"
            minute: "2-digit", // "55"
        });

        return dateString;
    }
}
