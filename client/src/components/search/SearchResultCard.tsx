import { useNavigate } from "react-router-dom";

import type { SearchResult } from "../../types/Search";


interface Props {

    result: SearchResult;

}



const SearchResultCard = ({
    result
}: Props) => {


const navigate = useNavigate();



return (

<div
className="
bg-white
rounded-2xl
border
border-gray-200
shadow-sm
p-6
hover:shadow-xl
transition
"
>


{/* Header */}

<div
className="
flex
items-center
gap-4
"
>


<div
className="
w-16
h-16
rounded-xl
bg-blue-50
flex
items-center
justify-center
text-3xl
"
>

💊

</div>



<div>

<h2
className="
text-xl
font-bold
text-gray-800
"
>

{result.name}

</h2>


<p
className="
text-sm
text-gray-500
"
>

Generic:
{result.generic_name}

</p>


</div>


</div>





{/* Details */}

<div
className="
mt-5
space-y-3
text-gray-700
"
>


<p>

🏭

<span className="font-medium">
Manufacturer:
</span>

{" "}

{result.manufacturer ?? "N/A"}

</p>



<p>

💰

<span className="font-medium">
Price:
</span>

{" "}

Rs. {result.price}

</p>



<p>

📦

<span className="font-medium">
Stock:
</span>

{" "}

{result.stock_quantity}

</p>



<p>

📅

<span className="font-medium">
Expiry:
</span>

{" "}

{new Date(result.expiry_date)
.toLocaleDateString()}

</p>



</div>





{/* Button */}

<button

onClick={()=>navigate(
`/medicines/${result.id}`
)}

className="
mt-6
w-full
bg-blue-600
hover:bg-blue-700
text-white
py-3
rounded-xl
font-medium
transition
"

>

View Details

</button>



</div>

);


};


export default SearchResultCard;