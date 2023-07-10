export default function generateReference(): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let reference: string = 'BANDS-';
    for (let i = 0; i < 12; i++) {
        const randomIndex: number = Math.floor(Math.random() * characters.length);
        reference += characters[randomIndex];
    }
    return reference;
}
