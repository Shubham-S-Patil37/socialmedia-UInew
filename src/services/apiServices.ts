import axios from "axios";

export const backendUrl = "http://localhost:3000";

export type IApiData = {
  "status": boolean,
  "message": string,
  "data": object
}

const apiService = {

  logIn: async function (logInDetails: any) {

    try {
      const response = await axios.post(`${backendUrl}/user/login`, logInDetails, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
      debugger
      if (response)
        return { "status": true, "data": response.data }

      return { "status": false, "message": "Unable to create user" }
    }
    catch (error: any) {
      debugger
      console.log(error)
      const data = error.response.data
      return { "status": false, "message": data.message }
    }
  },

  signUp: async function (signUpDetails: any) {

    try {
      const response: any = await axios.post(`${backendUrl}/user`, signUpDetails, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
      debugger
      if (response)
        return { "status": true, "data": response.data }

      return { "status": false, "message": response.message }
    }
    catch (error: any) {
      debugger
      console.log(error)
      return { "status": false, "message": error.message }
    }
  },

  getUserProfile: async function () {
    try {

      const token = localStorage.getItem('accessToken')
      const response = await axios.get(`${backendUrl}/user`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
      })

      if (response)
        return { "status": true, "data": response.data }

      return { "status": false, "message": "Unable to create user" }
    }
    catch (error) {
      console.log(error)
      return { "status": false, "message": "Unable to create user" }
    }
  },

  updateUserProfile: async function (userProfile: any) {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.put(`${backendUrl}/user`, userProfile, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
      })

      if (response)
        return { "status": true, "data": response.data }

      return { "status": false, "message": "Unable to create user" }
    }
    catch (error) {
      console.log(error)
      return { "status": false, "message": "Unable to create user" }
    }
  },

  getUserPost: async function name() {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.get(`${backendUrl}/post/`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
      })

      if (response)
        return { "status": true, "data": response.data }

      return { "status": false, "message": "Unable to create user" }
    }
    catch (error) {
      console.log(error)
      return { "status": false, "message": "Unable to create user" }
    }
  },

  userFeed: async function name() {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.get(`${backendUrl}/user/feed/`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
      })

      if (response)
        return { "status": true, "data": response.data }

      return { "status": false, "message": "Unable to create user" }
    }
    catch (error) {
      console.log(error)
      return { "status": false, "message": "Unable to create user" }
    }
  },

  changePass: async function (currentPass: String, newPass: String) {
    try {
      const token = localStorage.getItem('accessToken')

      const dataToPass = {
        "currentPassword": currentPass,
        "password": newPass,
        "confirmPassword": newPass
      }
      const response = await axios.put(`${backendUrl}/user/updatePassword/`, dataToPass, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
      })

      if (response)
        return { "status": true, "data": response.data }

      return { "status": false, "message": "Unable to create user" }
    }
    catch (error) {
      console.log(error)
      return { "status": false, "message": "Unable to create user" }
    }
  },

  deactivateMyAccount: async function () {
    try {
      const token = localStorage.getItem('accessToken')

      const response = await axios.delete(`${backendUrl}/user/`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
      })

      if (response)
        return { "status": true, "data": response.data }

      return { "status": false, "message": "Unable to create user" }
    }
    catch (error) {
      console.log(error)
      return { "status": false, "message": "Unable to create user" }
    }
  }
};



export default apiService;
