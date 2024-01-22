import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { PasswordForm } from "./PasswordForm";
import ProfileService from "../../services/profile.service";
import { useHistory } from "react-router-dom";
import { Loading } from "../../utils/Loading";

const Profile: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [profile, setProfile] = useState<ProfileUpdateModel>();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [error, setError] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIsSaveDisabled(false);
    validateForm(name, value);
    setProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (name: string, value: any): boolean => {
    if (value === "" || (value == null && name !== "img")) {
      setError("All fields must be filled out.");
      return false;
    }

    switch (name) {
      case "name":
        if (
          value.length <= 2 ||
          value.length > 50 ||
          !/^[a-zA-Z]+$/.test(value)
        ) {
          setError(
            "Name must be more than 2 characters and up to 50, contain only letters."
          );
          return false;
        } else setError("");
        break;

      case "surname":
        if (
          value.length <= 2 ||
          value.length > 50 ||
          !/^[a-zA-Z]+$/.test(value)
        ) {
          setError(
            "Surname must be more than 2 characters, up to 50 and contain only letters."
          );
          return false;
        } else setError("");
        break;

      case "tel":
        if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) {
          setError("Telephone must be in the format 000-000-0000.");
          return false;
        } else setError("");
        break;
    }
    setError("");
    return true;
  };
  useEffect(() => {
    ProfileService.getProfileInfo().then(
      (response) => {
        setProfile(response?.data);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        const _content = history.push("/error");
      }
    );
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let isValid = true;
    if (!profile) {
      return false;
    }

    for (const [name, value] of Object.entries(profile)) {
      const isFieldValid = validateForm(name, value);
      if (!isFieldValid) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      try {
        if (profile) await ProfileService.editProfile(profile);
        alert("Saved!");
        setIsSaveDisabled(true);
      } catch (apiError: any) {
        if (apiError?.response?.status) {
          const statusCode = apiError.response.status;

          switch (statusCode) {
            case 400:
              alert("Invalid data is being added.");
              break;
            case 401:
              alert("Authorization token ended please sign in");
              break;
            default:
              alert("An error occurred while adding the procedure.");
          }
        } else {
          alert("An error occurred while adding the procedure.");
        }
      }
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container mt-5 mb-5">
      <h4 className="display-6 text-center">My profile</h4>

      <div className="row ">
        <div className=" col-6">
          <form
            className=" d-flex justify-content-center flex-column align-items-center"
            onSubmit={handleSubmit}
          >
            <h4>Edit </h4>
            <p>
              <strong>Email: {currentUser.email}</strong>
            </p>
            <p>{error}</p>
            <div className="mb-3 col-6">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3 col-6">
              <label htmlFor="surname" className="form-label">
                Surname:
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                className="form-control"
                value={profile?.surname}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3 col-6">
              <label htmlFor="tel" className="form-label">
                Tel:
              </label>
              <input
                type="text"
                id="tel"
                name="tel"
                className="form-control"
                value={profile?.tel}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              disabled={isSaveDisabled}
              className="btn accent-btn"
            >
              Save
            </button>
          </form>
        </div>

        <PasswordForm></PasswordForm>
      </div>
    </div>
  );
};

export default Profile;
