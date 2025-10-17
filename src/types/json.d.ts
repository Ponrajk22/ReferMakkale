declare module '@/data/businesses.json' {
  const value: {
    last_updated: string;
    businesses: import('@/types').Business[];
  };
  export default value;
}

declare module '@/data/categories.json' {
  const value: {
    last_updated: string;
    categories: import('@/types').Category[];
  };
  export default value;
}

declare module '@/data/suburbs.json' {
  const value: {
    last_updated: string;
    suburbs: import('@/types').Suburb[];
  };
  export default value;
}
