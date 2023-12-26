import AddMovie from "@/components/Form/AddMovie";
import { moviesService } from "@/services/movies/index.service";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

export default function CreateMovie() {
    const [imageUrl, setImageUrl] = useState();
    const router =useRouter();
    const submit=async (value)=>{
  try{

        const bodyData={
            title:value.title,
            publishingYear:value.year,
            movieImage:imageUrl.basePath

        }

        const res= await moviesService.createMovie(bodyData)
        if (res?.success) {
          
            toast.success(res?.message);
            router.push("/myMovies")

          } else {
            toast.warning(res?.message);
          }
        }
    
    catch(err){
     toast.error(err)
    }

    }
    return <>
        <section className='createMovie'>
            <Container>
                <div className='vh-100'>
                    <h1>Create a new movie</h1>
                  <AddMovie onSubmit={submit} imageUrl={imageUrl} setImageUrl={setImageUrl}/>
                </div>
            </Container>
        </section>
    </>
}