import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SearchBar from "../../components/common/SearchBar";
import SearchResultCard from "../../components/search/SearchResultCard";

import {
  searchMedicines,
  getSearchSuggestions,
} from "../../services/searchService";

import type {
  SearchResult,
  SearchSuggestion,
} from "../../types/Search";


const Search = () => {


  const [searchParams, setSearchParams] =
    useSearchParams();


  const [query, setQuery] =
    useState(
      searchParams.get("q") || ""
    );


  const [results, setResults] =
    useState<SearchResult[]>([]);



  const [suggestions, setSuggestions] =
    useState<SearchSuggestion[]>([]);



  const [loading, setLoading] =
    useState(false);



  const [loadingSuggestions, setLoadingSuggestions] =
    useState(false);



  const [error, setError] =
    useState("");




  // ============================
  // SEARCH FUNCTION
  // ============================

  const handleSearch = async (
    value:string = query
  )=>{


    if(!value.trim()){

      setResults([]);

      return;

    }



    try{


      setLoading(true);

      setError("");



      const data =
        await searchMedicines({

          query:value

        });



      setResults(data);



      setSearchParams({

        q:value

      });



    }
    catch(error){


      console.log(error);


      setResults([]);


      setError(
        "No medicines found"
      );


    }
    finally{

      setLoading(false);

    }


  };






  // ============================
  // LOAD FROM URL
  // ============================


  useEffect(()=>{


    const q =
      searchParams.get("q");


    if(q){

      setQuery(q);

      handleSearch(q);

    }


  },[]);







  // ============================
  // SUGGESTION SEARCH
  // ============================


  useEffect(()=>{


    const timer =
      setTimeout(async()=>{


        if(query.length < 2){

          setSuggestions([]);

          return;

        }



        try{


          setLoadingSuggestions(true);



          const data =
            await getSearchSuggestions(
              query
            );



          setSuggestions(data);



        }
        catch(error){


          console.log(error);


          setSuggestions([]);

        }
        finally{


          setLoadingSuggestions(false);

        }



      },500);



      return ()=>clearTimeout(timer);



  },[query]);








return (

<>

<Navbar />



<section
className="
min-h-screen
bg-gray-50
"
>


<div
className="
max-w-7xl
mx-auto
px-6
py-10
"
>



<div
className="
text-center
mb-10
"
>


<h1
className="
text-4xl
font-bold
text-gray-800
"
>

Smart Medicine Search

</h1>



<p
className="
text-gray-600
mt-3
"
>

Search medicines, diseases and symptoms

</p>


</div>






<SearchBar

value={query}

onChange={setQuery}

onSearch={()=>handleSearch(query)}

suggestions={suggestions}

loadingSuggestions={
loadingSuggestions
}

onSuggestionClick={(value)=>{


setQuery(value);


handleSearch(value);


}}

/>







<div
className="
mt-10
"
>



{
loading && (

<div
className="
text-center
py-10
"
>

Searching medicines...

</div>

)

}





{
error && (

<div
className="
text-center
text-red-500
py-10
"
>

{error}

</div>

)

}





{
!loading &&
!error &&
results.length===0 && (

<div
className="
text-center
text-gray-500
py-10
"
>

Start a search to find medicines.

</div>


)

}






<div
className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-6
"
>


{

results.map(
(result:SearchResult)=>(


<SearchResultCard

key={result.id}

result={result}

/>


)

)

}


</div>



</div>



</div>


</section>



<Footer />


</>

);


};


export default Search;