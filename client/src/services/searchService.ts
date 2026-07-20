import api from "./api";


import type {
    SearchFilters,
    SearchResult,
    SearchSuggestion,
    SearchHistoryItem
} from "../types/Search";



// SEARCH MEDICINES

export const searchMedicines = async(
    filters:SearchFilters
):Promise<SearchResult[]>=>{


    const response = await api.get(
        "/medicines",
        {
            params:{
                search:filters.query
            }
        }
    );


    return response.data.data;

};




// SEARCH SUGGESTIONS

export const getSearchSuggestions = async(
    query:string
):Promise<SearchSuggestion[]>=>{


    if(!query){

        return [];

    }


    return [

        {
            id:1,
            label:query,
            type:"medicine"
        }

    ];

};




// HISTORY

export const getSearchHistory =
async():Promise<SearchHistoryItem[]>=>{


    return [];

};




// SAVE HISTORY

export const saveSearchHistory = async(
    data:{
        query:string;
        result_count:number;
    }
):Promise<SearchHistoryItem>=>{


    return {

        id:Date.now(),

        query:data.query,

        result_count:data.result_count,

        searched_at:
        new Date().toISOString()

    };


};
