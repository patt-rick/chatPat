import { useEffect } from "react";
import { Toaster, toast } from "sonner";

function Notification() {
    useEffect(() => {
        const handleAlert = (event: CustomEvent) => {
            const { msg, type, duration = 3000 } = event.detail;

            switch (type) {
                case "success":
                    toast.success(msg, { duration });
                    break;
                case "error":
                    toast.error(msg, { duration: undefined });
                    break;
                case "warning":
                    toast.warning(msg, { duration });
                    break;
                case "info":
                    toast.info(msg, { duration });
                    break;
                default:
                    toast(msg, { duration });
            }
        };

        window.addEventListener("NotificationEvent", handleAlert as EventListener);

        return () => {
            window.removeEventListener("NotificationEvent", handleAlert as EventListener);
        };
    }, []);

    return <Toaster position="top-right" richColors closeButton />;
}

export default Notification;
