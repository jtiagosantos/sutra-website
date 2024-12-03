export const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z|0-9|\-\s]/g, '')
    .split(' ')
    .join('-');
};
