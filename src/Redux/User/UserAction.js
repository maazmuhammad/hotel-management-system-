import {
    SET_CURRENT_USER,
    SET_LOADING,
    SET_ERROR,
    SET_LOGOUT,
    GET_ALL_USERS,
    GET_ALL_HOTELS
} from "./UserTypes";
import Swal from "sweetalert2";

import { auth,db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore"


export const setUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};

export const setallUser = (users) => {
    return {
        type: GET_ALL_USERS,
        payload: users,
    };
};

export const setallHotels = (hotels) => {
    return {
        type: GET_ALL_HOTELS,
        payload: hotels,
    };
};


export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading
    };
};

export const setErrors = (errors) => {
    return {
        type: SET_ERROR,
        payload: errors,
    };
};


export const setLogout = () => {
    return {
        type: SET_LOGOUT,
    };
};

export const stateChanged = () => (dispatch) =>{
    try{
        auth.onAuthStateChanged(user => {
            dispatch(setUser(user))
        })
    }
    catch(err)
    {
        Swal.fire({
            customClass: {
                container: "my-swal",
            },
            icon: "error",
            title: "Web app",
            titleText: "Something Went Wrong"
            // titleText: `${err?.response?.data?.message}`,
        });
        dispatch(setErrors(err));

    }
}


export const userSignup = (email, password) => async(dispatch) => {
    try {
        await dispatch(setLoading(true))
          return auth.createUserWithEmailAndPassword(email,password)

        // return res
        
        // console.log(email,password)
    }
    catch (err) {
        dispatch(setLoading(true))
        Swal.fire({
            customClass: {
                container: "my-swal",
            },
            icon: "error",
            title: "Web app",
            titleText: `${err?.message}`
            // titleText: `${err?.response?.data?.message}`,
        });
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err)

    }

}


export const userLogin = (email, password) => async(dispatch) => {
    try {
        await dispatch(setLoading(true))
          return auth.signInWithEmailAndPassword(email,password)

        // return res
        
        // console.log(email,password)
    }
    catch (err) {
        dispatch(setLoading(true))
        Swal.fire({
            customClass: {
                container: "my-swal",
            },
            icon: "error",
            title: "Web app",
            titleText: `${err?.message}`
            // titleText: `${err?.response?.data?.message}`,
        });
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err)

    }

}


export const userLogout = () => async(dispatch) => {
    try {
        await dispatch(setLogout(true))
         return auth.signOut()

        // return res
        
        // console.log(email,password)
    }
    catch (err) {
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err)

    }

}


export const getAllUsers = () => async(dispatch) => {
    try {
        await dispatch(setLoading(true))
        let arr  = [];

        await db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = {
                    id : doc.id,
                    data : doc.data()
                }
                arr.push(data)
                console.log(doc.id, " => ", doc.data());
            });
            dispatch(setallUser(arr))
        })
        
    }
    catch (err) {
        dispatch(setLoading(true))
        // Swal.fire({
        //     customClass: {
        //         container: "my-swal",
        //     },
        //     icon: "error",
        //     title: "Web app",
        //     titleText: `${err?.message}`
        //     // titleText: `${err?.response?.data?.message}`,
        // });
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err,"all users")

    }

}


export const getAllHotels = () => async(dispatch) => {
    try {
        await dispatch(setLoading(true))
        let arr  = [];

        await db.collection("hotels").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = {
                    id : doc.id,
                    data : doc.data()
                }
                arr.push(data)
                console.log(doc.id, " => ", doc.data());
            });
            dispatch(setallHotels(arr))
        })
        
    }
    catch (err) {
        dispatch(setLoading(true))
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err,"all users")

    }

}
