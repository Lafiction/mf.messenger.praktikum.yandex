export function makeSearch(): string {
  const searchContent = `
  <div class="search">
    <label class="search__label" for="">🔍</label>
    <input class="search__input" type="text" placeholder="Search contacts...">
  </div>`;
  return searchContent;
}