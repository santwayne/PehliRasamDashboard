export const parseBase64Image = (dataUri: string): { format: string; base64: string } => {
    const match = dataUri.match(/^data:image\/(.*?);base64,(.+)$/);
    if (!match) {
        throw new Error('Invalid Base64 image string');
    }

    const format = match[1]; // Extract the format (e.g., jpeg, png)
    const base64 = match[2]; // Extract the Base64 content
    return { format, base64 };
};
