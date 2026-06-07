const COOKIE_NAME = "flappyHighScores";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function readCookie(name) {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`));
    return cookie ? cookie.substring(name.length + 1) : "";
}

function writeCookie(name, value, maxAgeSeconds) {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds};`;
}

export function getHighScores() {
    const raw = readCookie(COOKIE_NAME);
    if (!raw) return [];

    return raw
        .split(",")
        .map(v => parseInt(v, 10))
        .filter(Number.isFinite)
        .sort((a, b) => b - a)
        .slice(0, 3);
}

export function saveHighScore(score) {
    const existing = getHighScores();
    const next = [...existing, score].sort((a, b) => b - a).slice(0, 3);
    writeCookie(COOKIE_NAME, next.join(","), COOKIE_MAX_AGE);
    return next;
}
