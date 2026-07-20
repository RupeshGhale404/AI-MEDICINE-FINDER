import type { SearchSuggestion } from "../../types/Search";


type SearchBarProps = {

  value:string;

  onChange:(value:string)=>void;

  onSearch:()=>void;

  placeholder?:string;

  suggestions?:SearchSuggestion[];

  onSuggestionClick?:(value:string)=>void;

  loadingSuggestions?:boolean;

};



const SearchBar = ({

  value,

  onChange,

  onSearch,

  placeholder="Search medicine, disease, or symptom...",

  suggestions=[],

  onSuggestionClick,

  loadingSuggestions,

}:SearchBarProps)=>{


  return (

    <div className="
      max-w-4xl
      mx-auto
      mt-10
      px-6
    ">


      <form

        onSubmit={(event)=>{

          event.preventDefault();

          onSearch();

        }}


        className="
          flex
          flex-col
          gap-3
        "

      >



        <div className="flex">


          <input


            type="text"


            value={value}


            onChange={(event)=>

              onChange(
                event.target.value
              )

            }


            placeholder={placeholder}


            className="
              flex-1
              border
              border-gray-200
              rounded-l-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
              bg-white
              shadow-sm
            "

          />



          <button


            type="submit"


            className="
              bg-blue-600
              text-white
              px-6
              rounded-r-xl
              hover:bg-blue-700
              transition
            "

          >

            Search


          </button>



        </div>





        {
          loadingSuggestions ? (

            <p className="text-sm text-gray-500">

              Loading suggestions...

            </p>


          ) : suggestions.length > 0 ? (


            <div className="flex flex-wrap gap-2">


              {
                suggestions.map((suggestion)=>(


                  <button

                    key={`${suggestion.type}-${suggestion.label}`}


                    type="button"


                    onClick={()=>

                      onSuggestionClick?.(
                        suggestion.label
                      )

                    }


                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-white
                      border
                      text-sm
                      hover:border-blue-400
                    "

                  >

                    {suggestion.label}


                  </button>


                ))
              }


            </div>


          ) : null
        }



      </form>


    </div>

  );

};


export default SearchBar;