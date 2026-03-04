export function buildPagination(page?: string, limit?: string) {

    const p = Number(page ?? 1);
    const l = Number(limit ?? 10);

    return {
        skip: (p - 1) * 1,
        take: l,
    }
}