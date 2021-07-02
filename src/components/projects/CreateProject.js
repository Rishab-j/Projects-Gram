import { useState } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";

const CreateProject = (props) => {

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [project, setProject] = useState({
        title: '',
        content: '',
    });

    const { auth } = props;

    if(!auth.uid){ // is user not logged in then don't show him the dashboard
                   // send him to sign in page
        return <Redirect to = '/signin'/>
    }

    const handleChange = (e) => {
        // if(e.target.id === 'email') setEmail(e.target.value);
        // else if(e.target.id === 'password') setPassword(e.target.value);
        const newProject = {...project, [e.target.id] : e.target.value};

        setProject(newProject);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.createProject(project);
        props.history.push('/');
    }

    return (
        <div>
            <div className="container">
                <form onSubmit = {handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create Project</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id = "title" onChange = {handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Project Content</label>
                        <textarea id="content" className="materialize-textarea" onChange = {handleChange}></textarea>    
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    
    return{
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);