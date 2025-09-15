export default function containsSpecialChars(str: string) {
    const contains = /[^a-zA-Z0-9_]/;
    return contains.test(str);
    
}