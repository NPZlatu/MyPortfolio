// @ts-nocheck
const modules = import.meta.glob('/src/content/writings/*.md', { eager: true });

export const writings = Object.entries(modules)
  .map(([path, module]) => ({
    slug: path.split('/').pop()?.replace('.md', '') ?? '',
    ...module.metadata,
    component: module.default
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const featuredWritings = writings.filter(w => w.featured);
