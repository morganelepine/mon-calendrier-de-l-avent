// French plural, regular by default: pluralWord(2, "jour") -> "jours".
// Pass `plural` for irregular words ("cadeau" -> "cadeaux").
export const pluralWord = (
    count: number,
    singular: string,
    plural = `${singular}s`,
): string => (count > 1 ? plural : singular);

// Same with the count in front: pluralize(2, "boule") -> "2 boules".
export const pluralize = (
    count: number,
    singular: string,
    plural?: string,
): string => `${count} ${pluralWord(count, singular, plural)}`;
