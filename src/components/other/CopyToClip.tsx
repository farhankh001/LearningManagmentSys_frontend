import toast from "react-hot-toast";

export const copyToClipboard = async (text: string) => {
    try {
        // Attempt modern secure clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            toast.success("copied!");
        } else {
            // Fallback for insecure or older browsers
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed"; // Avoid scrolling
            textarea.style.left = "-9999px";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            const successful = document.execCommand("copy");
            if (successful) {
                toast.success("copied!");
            } else {
                throw new Error("Fallback copy failed");
            }

            document.body.removeChild(textarea);
        }
    } catch (error) {
        console.error("Copy failed", error);
        toast.error("Failed to copy passcode");
    }
};
