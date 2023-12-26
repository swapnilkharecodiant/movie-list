import { useEffect, useState } from "react"
import EmptyPage from "./empty";
import Pagination from "@/components/Pagination";
import { Col, Container, Row } from "react-bootstrap";
import { MovieCard } from "@/components";
import Link from "next/link";
import { moviesService } from "@/services/movies/index.service";
import { useRouter } from "next/router";
import user from "@/apiEndPoint/user";
import { userService } from "@/services/user/index.service";
import { toast } from "react-toastify";
import { getLocalStorageToken, removeLocalStorageToken } from "@/utils/common.util";

export default function MovieList() {


  const [movieList, setMovieList] = useState([1,2,3]);
  const router = useRouter();
  console.log();
  const [noOfPage, setNoOfPage] = useState();
  const [page, setPage] = useState(1);
  const [sizePerPage] = useState(8);
  const [totalCount, setTotalCount] = useState();


  const goToPage = (pageNo) => {
    const newParams = { ...param };
    if (pageNo) {
      newParams.page = pageNo;
    }
    navigateWithParam(newParams, navigate, pathname);
    tableReset();
  };


  const logOut=async()=>{
 try{
    const res =await userService.logOut();
  if(res?.success)
  {
  removeLocalStorageToken();
  router.push("/")
  }

 }
 catch(err){


 }
  }
  const getAllMovie = async () => {
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
      };
        const res = await moviesService.movieList(queryParams);
        const { data, success } = res;

        
        if (success) {
          setMovieList(data?.rows);
          setTotalCount(data.count);
          setNoOfPage(data?.count > 0 ? Math.ceil(data?.count / sizePerPage) : 1);
        }
    } catch (error) {
       toast.error(error);
    }
}


  useEffect(() => {
    if(!getLocalStorageToken())
    {
      router.push("/")
    }
    else{
        getAllMovie(); 
    }
  }, [])

  if (!movieList?.length) {

    return <>
      <EmptyPage />
    </>

  }
  else {
    return <>
      <section className='myMoviesPage bg-img'>
        <Container>
          <div className='myMoviesPage_head d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>
              <h1>My movies</h1>
              <Link href="/createMovie" className='d-flex'>
                <em className='icon icon-plus-circle' />
              </Link>
            </div>
            <a onClick={()=>logOut()}>Logout <em className='icon icon-logout' /></a>
          </div>

          <div className=''>
          <Row className='g-md-4 g-3'>
            {  movieList?.length>0 && movieList?.map((item,index)=>{  return(
                <Col xl={3} md={4} xs={6} key={index}>
                  <MovieCard item={item}  />
                </Col>)

            })
            
            }
              </Row>
          </div>

          <Pagination
            count={totalCount}
            page={parseInt(page)}
            sizePerPage={sizePerPage}
            noOfPage={noOfPage}
            goToPage={goToPage}
          // handleLimitChange={handleLimitChange}
          // hasLimit={hasLimit}
          />

        </Container>
      </section>

    </>

  }
}