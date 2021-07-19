export function parseToFloat(v?: string | null): number {
    const parsed = Number.parseFloat(v ?? "");
    return parsed;
};

export function nullthrows<T>(v: T | null | undefined): T {
    if (v == null) {
        throw new Error("null!");
    } else {
        return v;
    }
}