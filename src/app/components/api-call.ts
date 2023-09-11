const baseURL = "http://192.168.100.4:1945/";

const apiCall = {
    getStartUp : `${baseURL}api/tenant`,
    editStartUp : `${baseURL}api/tenant/`,
    addStartUp : `${baseURL}api/tenant/`,

    getProfileById : `${baseURL}api/user/9a131c5f-7b54-4318-a9dd-02e52c99982b`,
    loginUser : `${baseURL}api/login/`,
    userValidation : `${baseURL}api/validation/`,
}

export default apiCall;