interface Message {
    type?: "error" | "success" | "wrning" | "disabled"
    message: string
}
