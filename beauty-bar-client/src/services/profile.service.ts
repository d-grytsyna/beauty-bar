import api from "./api";

const getProfileInfo = () =>{
    return api.get("/profile");

}
const editProfile = (data: ProfileUpdateModel) =>{
    return api.put("/profile", data)
}

const changePassword = (data: PasswordChangeModel) =>{
    return api.put("/profile/password", data)
}
const ProfileService = {
    getProfileInfo,
    editProfile,
    changePassword
  };
  export default ProfileService;