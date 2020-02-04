export interface RootCatalog {
    success: boolean;
    catalogs: Catalog[];
    count: number;
}
  
export interface Catalog {
    selected?: boolean;
    score?: number;
    _id: string;
    name: string;
    type: string;
    value?: number;
    classification: string;
}