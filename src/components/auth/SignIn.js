import { useState } from "react"
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

const SignIn = ( props ) => {

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [auth, setAuth] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        // if(e.target.id === 'email') setEmail(e.target.value);
        // else if(e.target.id === 'password') setPassword(e.target.value);
        const newAuth = {...auth, [e.target.id] : e.target.value};

        setAuth(newAuth);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.signIn(auth);
    }

    

    const { authError } = props;

    const isSignedIn = props.auth;
    
    if(isSignedIn.uid) return <Redirect to = '/'/>

    return (
        <div>
            <div className="container">
                <form onSubmit = {handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign in</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id = "email" onChange = {handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id = "password" onChange = {handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Login
                        </button>
                        <div className="red-text center">
                            { authError ? <p>{authError}</p>: null}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        authError : state.auth.authError,
        auth : state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);