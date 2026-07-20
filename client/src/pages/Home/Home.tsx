import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Hero from "../../components/home/Hero";
import SearchBar from "../../components/common/SearchBar";
import MedicineCard from "../../components/medicine/MedicineCard";

import { getMedicines } from "../../services/medicineService";
import type { Medicine } from "../../types/Medicine";


const Home = () => {

  const navigate = useNavigate();


  const [medicines, setMedicines] =
    useState<Medicine[]>([]);


  const [loading, setLoading] =
    useState(true);


  const [query, setQuery] =
    useState("");



  useEffect(() => {

    const fetchMedicines = async () => {

      try {

        const data = await getMedicines();

        setMedicines(data);


      } catch(error){

        console.error(
          "Failed to fetch medicines:",
          error
        );


      } finally {

        setLoading(false);

      }

    };


    fetchMedicines();


  }, []);




  const handleSearch = () => {


    if(!query.trim()){

      return;

    }


    navigate(
      `/search?q=${encodeURIComponent(query)}`
    );


  };




  return (

    <>


      <Navbar />


      <Hero />



      <SearchBar

        value={query}

        onChange={setQuery}

        onSearch={handleSearch}

        placeholder="Search medicine, disease, symptom, or category..."

      />




      <section className="
        max-w-7xl
        mx-auto
        px-6
        py-12
      ">


        <h2 className="
          text-3xl
          font-bold
          text-gray-800
          mb-8
        ">

          Available Medicines

        </h2>




        {
          loading ? (

            <div className="text-center py-10">

              Loading medicines...

            </div>


          ) : medicines.length === 0 ? (


            <div className="text-center py-10 text-red-500">

              No medicines found.

            </div>


          ) : (


            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-6
            ">


              {
                medicines.map((medicine)=>(

                  <MedicineCard

                    key={medicine.id}

                    medicine={medicine}

                  />

                ))
              }


            </div>


          )
        }



      </section>


    </>

  );

};


export default Home;