import AddMovie from "@/components/Form/AddMovie";
import { moviesService } from "@/services/movies/index.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { basePath } from "../../next.config";

export default function EditMovie() {
    const [imageUrl, setImageUrl] = useState();
    const router = useRouter()
    const [movie,setMovie]=useState();
    const {query:{id}} = router;
  

    const getMovie=async()=>{
        try{
            if(id){
                const res = await moviesService.getMovie(id);
                if(res?.success)
                {
                  setMovie(res?.data)
                  setImageUrl({
                    baseUrl:res?.data?.movieImageUrl,
                    basePath:res?.data?.movieImage
                    
                  })

                 
                }
            }
              
        }
        catch(err){

        }
    }
 
    const submit=async (value)=>{
        try{
        const bodyData={
            title:value?.title,
            publishingYear:value?.year,
            movieImage:imageUrl?.basePath
        }

        const res= await moviesService.editMovie(movie.id,bodyData)
        if(res?.success){

            toast.success(res?.message)
            await router.push("/myMovies");
        }

    }catch(err){
        toast.error(err);
    }
      

    }

    useEffect(()=>{
        getMovie();
    },[id])
    return <>
        <section className='createMovie'>
            <Container>
                <div className='vh-100'>
                    <h1>Edit Movie</h1>
                  <AddMovie onSubmit={submit} imageUrl={imageUrl} setImageUrl={setImageUrl} movie={movie} />
                </div>
            </Container>
        </section>
    </>
}