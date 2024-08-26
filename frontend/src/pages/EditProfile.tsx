import { Link } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/icons/arrow-left-solid.svg";
import EditProfileForm from "../components/EditProfileForm";
import { icons } from "../assets/icons/icons";

const EditProfile = () => {
  return (
    <div>
      <div className="p-3">
        <div className="flex items-center gap-5">
          <Link to="/profile">{icons.leftArrow}</Link>
          <h1 className="text-lg font-semibold">Edit Profile</h1>
        </div>
        <EditProfileForm />
      </div>
    </div>
  );
};

export default EditProfile;
