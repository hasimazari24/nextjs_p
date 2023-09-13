const baseURL = "http://localhost:8000/";

const apiCall = {
    getStartUp : `${baseURL}api/tenant`,
    editStartUp : `${baseURL}api/tenant/`,
    addStartUp : `${baseURL}api/tenant/`,

    getProfileById : `${baseURL}api/user/edit-profile`,
    loginUser : `${baseURL}api/login/`,
    userValidation : `${baseURL}api/validation/`,
}

export default apiCall;