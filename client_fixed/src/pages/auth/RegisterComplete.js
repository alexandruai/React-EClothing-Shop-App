import React, {useState, useEffect} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import { useDispatch, useSelector} from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

// props.history
const RegisterComplete = ({history}) => {

    const [email, setEmail] = useState("andra2699@yahoo.com");
    const [password, setPassword] = useState("");

    const { user } = useSelector((state) => ({ ...state }));
    let dispatch = useDispatch();
    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
        //setEmail("andra2699@yahoo.com");
    }, [history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if (!email || !password) {
            toast.error("Email and password is required");
            return;
        }
      
          if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            if(result.user.emailVerified) {
                // remove user email fom local storage
                window.localStorage.removeItem("emailForRegistration");
                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                // redux store
                console.log("user", user, "idTokenResult", idTokenResult);
               
                createOrUpdateUser(idTokenResult.token).then((res) => {
                    dispatch({
                      type: "LOGGED_IN_USER",
                      payload: {
                        name: res.data.name,
                        email: user.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id:res.data.id
                      },
                  });
                }).catch(err => console.log(err));
               
                // redirect
                history.push("/");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    };

    const completeRegistrationForm = () => 
    <form onSubmit={handleSubmit}>

        <input 
            type="email" 
            className="form-control" 
            value={email} 
            disabled
        />

        <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={event =>setPassword(event.target.value)}
            placeholder="Password"
            autoFocus
        /> 

        <br />
        <button type="submit" className="btn btn-raised">
            Inregistrare Completa
        </button>
    </form>

    return (

        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {/* aici se executa functia */}
                    {completeRegistrationForm()}               
                </div>
            </div>
        </div>

    );
};

export default RegisterComplete;