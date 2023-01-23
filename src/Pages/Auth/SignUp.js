import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "Utils/useAxios";
import classes from "./Login.module.css";
import Section from "UI/Section";
import NavAuth from "components/NavAuth";
import CardAuth from "UI/CardAuth";
import toast from "react-hot-toast";

const SignUp = () => {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password] = useState("12345678");
  const [gender, setGender] = useState("Male");
  const [birthDate, setDob] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [religion, setReligion] = useState("Islam");
  const [homeAddress, setHomeAddress] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [guardianAddress, setGuardianAddress] = useState("");
  const [guardianRelationship, setGuardianRelationship] = useState("");
  const [, setLoading] = useState(false);
  const [profileImage, setprofileImage] = useState(null);
  const [classId] = useState(null);
  const [classTitle] = useState(null);
  const navigate = useNavigate();
  const handleImage = (event) => {
    setprofileImage(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birthDate", birthDate);
    formData.append("gender", gender);
    formData.append("admissionNo", admissionNo);
    formData.append("religion", religion);
    formData.append("classId", classId);
    formData.append("homeAddress", homeAddress);
    formData.append("guardianName", guardianName);
    formData.append("guardianPhone", guardianPhone);
    formData.append("guardianAddress", guardianAddress);
    formData.append("guardianRelationship", guardianRelationship);
    formData.append("role", "Student");
    formData.append("profileImage", profileImage);
    setLoading(true);
    axios
      .post("/auth/register", formData)
      .then((res) => {
        console.log(res);
        toast.success("Registration successful");
        setLoading(false);
        navigate("/l");
      })
      .catch((err) => {
        toast.error(err.response.data.error.message);
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <Section>
      <NavAuth />

      <div className={classes["card__container"]}>
        <CardAuth>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="py-4 m-0 overflow-y-auto h-auto"
          >
            <div className="text-primary-100 text-xl text-center mt-10">Student Registration</div>

            <div className="mt-8">
              <div className="mb-4">
                <label htmlFor="name" className="text-gray-500 text-sm block">
                  Student Name<span className="text-info-600">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                  placeholder="E.g. Adekunle Peters"
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="title" className="text-gray-500 text-sm block">
                  Class Title<span className="text-info-600">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={classTitle}
                  placeholder="E.g. Class VII"
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                />
              </div>
              <div className="">
                <input
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                  type="file"
                  placeholder="Upload photo"
                  onChange={(e) => {
                    handleImage(e);
                  }}
                />

                {!profileImage && (
                  <p className="text-red-400">Please Upload your Image</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="gender" className="text-gray-500 text-sm block">
                  Gender<span className="text-info-600">*</span>
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="text-gray-500 text-sm block">
                  Student Email<span className="text-info-600">*</span>
                </label>
                <input
                  id="Email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  placeholder="E.g. Adekunle-Peters@cbt.com"
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dob" className="text-gray-500 text-sm block">
                  Student Date of birth<span className="text-info-600">*</span>
                </label>
                <input
                  id="dob"
                  type="date"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  required
                  placeholder="E.g. Adekunle Peters"
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="admno" className="text-gray-500 text-sm block">
                  Admission No<span className="text-info-600">*</span>
                </label>
                <input
                  id="admno"
                  type="text"
                  onChange={(e) => {
                    setAdmissionNo(e.target.value);
                  }}
                  required
                  placeholder="E.g. S1234567"
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="Religion"
                  className="text-gray-500 text-sm block"
                >
                  Religion<span className="text-info-600">*</span>
                </label>
                <select
                  name="Religion"
                  id="Rel"
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                  onChange={(e) => {
                    setReligion(e.target.value);
                  }}
                >
                  <option value="Islam">Islam</option>
                  <option value="Cristianity">Christianity</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="text-gray-500 text-sm block"
                >
                  Home Address<span className="text-info-600">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  onChange={(e) => {
                    setHomeAddress(e.target.value);
                  }}
                  required
                  placeholder="E.g. No 1 Lagost street."
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                />
              </div>

              <h1>Guardians</h1>

              <div className="mb-4">
                <label htmlFor="name" className="text-gray-500 text-sm block">
                  Name<span className="text-info-600">*</span>
                </label>
                <input
                  id="Email"
                  type="text"
                  onChange={(e) => {
                    setGuardianName(e.target.value);
                  }}
                  required
                  placeholder="E.g. Adekunle Peters"
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="text-gray-500 text-sm block">
                  Phone<span className="text-info-600">*</span>
                </label>
                <input
                  id="phone"
                  type="text"
                  onChange={(e) => {
                    setGuardianPhone(e.target.value);
                  }}
                  required
                  placeholder="E.g. 09012345678"
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="text-gray-500 text-sm block"
                >
                  Address<span className="text-info-600">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  onChange={(e) => {
                    setGuardianAddress(e.target.value);
                  }}
                  required
                  placeholder="E.g. No 1 Lagost street."
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="relationship"
                  className="text-gray-500 text-sm block"
                >
                  Relationship <span className="text-info-600">*</span>
                </label>
                <input
                  id="relationship"
                  type="text"
                  onChange={(e) => {
                    setGuardianRelationship(e.target.value);
                  }}
                  required
                  placeholder="E.g. brother."
                  className="mt-2 text-sm text-black w-full outline-none border-b p-4"
                />
              </div>

              <div className="mt-10 flex justify-center items-center">
              {/* <button className="bg-primary-100 text-white rounded-xl text-sm font-semibold px-8 py-4">
                {!loading ? (
                  <p>Register</p>
                ) : (
                  <div className="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-primary-100 border-l-primary-100 animate-spin"></div>
                )}{" "}
              </button> */}
              </div>
            </div>
          </form>
        </CardAuth>
      </div>
    </Section>
  );
};

export default SignUp;
