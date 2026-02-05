import { UserProfile } from "../model/UserProfileModel";

const AddUserProfile = async(req,res) => {
    // console.log(req.user)

    const {userProfileData} = req.body
    console.log(userProfileData)

    const user = await UserProfile.findOne(req.user)

    if(!user){
        
    }



}