// =====================================
// SEARCH FILTERS
// =====================================

export interface SearchFilters {

    query: string;

    category?: string;

    manufacturer?: string;

    price_min?: string;

    price_max?: string;

    availability?: boolean;

}



// =====================================
// SEARCH RESULT
// From Laravel:
// GET /api/medicines?search=
// =====================================

export interface SearchResult {

    id:number;

    name:string;

    generic_name:string;

    description:string | null;

    manufacturer:string | null;

    price:string;

    stock_quantity:number;

    expiry_date:string;

    image:string | null;

}



// =====================================
// SEARCH SUGGESTION
// =====================================

export interface SearchSuggestion {

    id?:number;

    label:string;

    type:string;

}



// =====================================
// SEARCH HISTORY
// =====================================

export interface SearchHistoryItem {

    id:number;

    query:string;

    result_count:number;

    searched_at?:string;

}