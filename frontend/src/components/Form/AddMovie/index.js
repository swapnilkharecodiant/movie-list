import { Formik } from "formik";
import { Button, Form, FormGroup } from "react-bootstrap";
import validation from "./validation";
import FormTextField from "@/components/Input";
import { UploadProfile } from "@/components/Antd";

export default function AddMovie({onSubmit,imageUrl,setImageUrl,movie}) {

    const initialValues = {
        year: movie?.publishingYear || "",
        title: movie?.title || "",
        
    }

    return (<>
        <div>
            <div>
                <Formik
                    validationSchema={validation()}
                    onSubmit={onSubmit}
                    initialValues={{ ...initialValues }}
                    enableReinitialize
                >
                    {(props) => {
                        return(

                     <Form action="#" noValidate onSubmit={props.handleSubmit}>

                            <div className='row'>
                                <div className='col-lg-5'>
                                    <div className='text-center'>
                                        <div class="uploadDocument">
                                            <label for="uploadDocument">
                                              
                                                    <UploadProfile imageUrl={imageUrl} setImageUrl={setImageUrl} name="file" controlId="validationFormik01"/>
                                            </label>
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 offset-md-1'>
                                    <FormGroup className='form-group' >
                                        <FormTextField
                                            controlId="validationFormik01"
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            labelClass="labelText"
                                            placeholder='Title'
                                        />
                                    </FormGroup >
                                    <FormGroup className='form-group' >
                                        <FormTextField
                                            controlId="validationFormik01"
                                            type="text"
                                            name="year"
                                            className="form-control form-control-md"
                                            labelClass="labelText"
                                            placeholder='Publishing year'
                                        />
                                    </FormGroup >
                                    <div className='d-flex createMovie_btn'>
                                        <Button className='btn btn-outline w-100 me-3'>
                                            Cancel
                                        </Button>
                                        <Button className='btn btn-primary w-100' type="submit" >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>



                        </Form>)}}
                </Formik>

            </div>
        </div>
    </>

    );
}