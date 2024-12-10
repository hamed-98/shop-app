export interface Product {
    quantity?: number;
    id: number;
    name: string;
    category: string;
    price: number;
    image?: File|string| null;
    description?:string;
  }

  interface Cart {
    products: Product[];
    total: number;
  }

  export interface ProductFilter {
    searchTerm: string;
    category: string;
    priceRange: { min: number; max: number };
  }
  
  