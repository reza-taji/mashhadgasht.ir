export function normalizeSearch(value) {
  return value.normalize('NFKD').replace(/[\u064B-\u065F\u0670]/g, '').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/\u200c/g, ' ').toLocaleLowerCase().trim();
}

export function filterPlaces(places, { query = '', category = 'all', tag = '', savedOnly = false, saved = [], sort = 'recommended', language = 'fa' }) {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const filtered = places.filter(place => {
    const content = normalizeSearch([place.title, place.excerpt, place.address, ...place.tags].join(' '));
    return (category === 'all' || place.category === category) && (!tag || place.tagIds.includes(tag)) && (!savedOnly || saved.includes(place.id)) && terms.every(term => content.includes(term));
  });
  return sort === 'alphabetical' ? filtered.sort((first, second) => first.title.localeCompare(second.title, language)) : filtered;
}
