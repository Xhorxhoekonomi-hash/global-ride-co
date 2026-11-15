/** Stored values stay English; labels are localized for SQ forms. */
export const countries = ['Albania','Kosovo','North Macedonia','Montenegro','Germany','Netherlands','Italy','United Kingdom','United States','Canada','United Arab Emirates','Other'] as const;
const SQ: Record<string,string> = {Albania:'Shqipëri',Kosovo:'Kosovë','North Macedonia':'Maqedonia e Veriut',Montenegro:'Mali i Zi',Germany:'Gjermani',Netherlands:'Holandë',Italy:'Itali','United Kingdom':'Mbretëria e Bashkuar','United States':'Shtetet e Bashkuara',Canada:'Kanada','United Arab Emirates':'Emiratet e Bashkuara Arabe',Other:'Tjetër'};
export const countryLabel = (value: string, sq: boolean) => (sq ? SQ[value] : undefined) ?? value;
