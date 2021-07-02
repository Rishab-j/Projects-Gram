import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { deleteProject } from '../../store/actions/projectActions';

const ProjectDetails = ( props ) => {

    const { project, auth, id } = props;
    if(!auth.uid){ // is user not logged in then don't show him the dashboard
        // send him to sign in page
        return <Redirect to = '/signin'/>
    }

    const handleDelete = (e) => {
        e.preventDefault();
        
        // const { auth } = props;
        // console.log("auth", auth);
        // console.log("project",project);
        props.deleteProject(id);
        props.history.push('/');
    }

    const deleteButton = auth.uid === project.authorId ? <button className="btn pink lighten-1 z-depth-0 delete" onClick = {handleDelete}>
                                                            Delete
                                                        </button> : null;

    if(project){
        return(
            <div className="container section project-details center">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{project.title}</span>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                        { deleteButton }
                    </div>
                </div>
            </div> 
        )
    }else{
        return (
            <div className="container center">
                <p>Loading Project ....</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return{
        project: project,
        auth: state.firebase.auth,
        id: id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (id) => dispatch(deleteProject(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
        collection : 'projects',
    }])
)(ProjectDetails);
