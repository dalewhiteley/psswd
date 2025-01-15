export function selectElement(element: Node): void {
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(element);
    selection?.removeAllRanges();
    selection?.addRange(range);
}

export function copyToClipboard(value: string): void {
    navigator.clipboard.writeText(value);
}