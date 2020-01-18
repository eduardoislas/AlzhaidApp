export interface RootCatalog {
    success: boolean;
    catalogs: Catalog[];
    count: number;
}
  
export interface Catalog {
    _id: string;
    name: string;
    type: string;
    value?: number;
}