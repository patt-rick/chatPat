export function showWarning(msg: string, duration: number = 3000) {
    window.dispatchEvent(
        new CustomEvent("NotificationEvent", { detail: { msg, duration, type: "warning" } })
    );
}
export function showError(msg: string, duration: number = 3000) {
    window.dispatchEvent(
        new CustomEvent("NotificationEvent", { detail: { msg, duration, type: "error" } })
    );
}
export function showSuccess(msg: string, duration: number = 5000) {
    window.dispatchEvent(
        new CustomEvent("NotificationEvent", { detail: { msg, duration, type: "success" } })
    );
}
export function showInfo(msg: string, duration: number = 3000) {
    window.dispatchEvent(
        new CustomEvent("NotificationEvent", { detail: { msg, duration, type: "info" } })
    );
}
