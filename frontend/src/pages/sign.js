import UserLoginForm from "@/components/Form/LoginForm";
import { Container } from "react-bootstrap";
import { useRouter} from "next/router";
import { userService } from "@/services/user/index.service";
// import { login } from "@/redux/AuthSlice";
// import { useDispatch } from "react-redux";
import { setLocalStorageToken } from "@/utils/common.util";
import { toast } from "react-toastify";

export default function SignIn() {
  const router=useRouter();

    const submit =async (val) => {
        try{
        console.log("dfdf");
        const bodyData={
            email:val.email,
            password:val.password,
        }

        const res= await userService.userSingin(bodyData);
        console.log(res?.data);
        if (res?.success) {
            setLocalStorageToken(res?.data?.token)
            // dispatch(login(res?.data?.userDetails))
            router.push('/myMovies')
            toast.success(res?.message);
          } else {
            toast.warning(res?.message);
          }
        }
        catch(err){
            console.log(err)
            toast.error(err)
        }
    }
    

    return <>



        <div>
            <section className='signUppage'>
                <Container>
                    <div className='vh-100 d-flex align-items-center justify-content-center'>
                        <div className='signUppage_form'>
                            <h1>Sign In</h1>
                            <UserLoginForm onSubmit={submit} />
                        </div>
                    </div>
                </Container>
            </section>
        </div>

    </>

}

