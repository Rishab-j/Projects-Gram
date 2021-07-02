import ProjectList from "../projects/ProjectList"
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from "redux";
import { Redirect } from "react-router-dom";  // used to redirect the routes

const DashBoard = ( { projects, auth } ) => {
    
    if(!auth.uid){ // is user not logged in then don't show him the dashboard
                   // send him to sign in page
        return <Redirect to = '/signin'/>
    }
    
    return(
        <div className="dashboard container">
            
            <div className="col s12 m6 center">
                <ProjectList projects = { projects }/>
            </div>
            
        </div>
    )
}

// redux setup
const mapStateToProps = (state) => {
    
    return{
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc']}
    ])
)(DashBoard);