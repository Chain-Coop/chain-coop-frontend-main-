import logo from "../../../public/images/svg/icon.svg";
import { EnterButton } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../shared/redux/reduxHooks";
import { RegisterUser } from "../../shared/redux/slices/landing.slices";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";

const CreateAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [special, setSpecial] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const registerUser = useAppSelector(
    (state) => state.landing.getUserRegistered,
  );
  console.log(registerUser);

  const registerUserData = (e) => {
    e.preventDefault();
    if (isSubmitDisabled() || loading) {
      return;
    }
    setLoading(true);

    const body = {
      email: email,
      username: username,
      phoneNumber: phoneNumber,
      membershipType: membershipType,
      password: password,
    };
    dispatch(RegisterUser(body))
      .unwrap()
      .then(() => {
        setEmail("");
        setUsername("");
        setPhoneNumber("");
        setMembershipType("");
        setPassword("");
        setLoading(false);
        toast.success("Account created successfully");
        navigate(`/account-otp?email=${email}`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast.error("User already exists");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
        setLoading(false);
      });
  };

  const isSubmitDisabled = () => {
    return !(
      email.trim() &&
      username.trim() &&
      phoneNumber.trim() &&
      membershipType.trim() &&
      password.trim().length >= 8 &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleChange2 = (event) => {
    const value = event.target.value;

    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (hasSpecialCharacter) {
      setSpecial(true);
      console.log(hasSpecialCharacter);
    }
    setPassword(value);
  };

  const validatePassword = () => {
    setShowErrorBox(!showErrorBox);

    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setShowErrorBox(password.length < 8 || !special);
    if (hasSpecialCharacter) {
      setSpecial(true);
    }
  };

  return (
    <main className="h-vh flex items-center justify-center bg-log font-sans">
      <section className="text-center lg:w-[48%]">
        <div className="sm:px-[2em] lg:px-[5em]">
          <img src={logo} alt="Logo" className="mx-auto mb-4 h-[4em] w-[4em]" />
          <h1 className="mb-4 text-3xl font-bold text-text2">
            Create Your Account
          </h1>
          <div>
            <p className="font-medium text-howtext">
              Start building your investment portfolio and track your growth
            </p>
          </div>
        </div>
        <form onSubmit={registerUserData}>
          <div className="lg:px-13 form mt-[1em] w-full sm:px-[1em]">
            <div>
              <label
                htmlFor="email-input"
                className="mb-3 flex text-base font-semibold text-text1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email-input"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="e-mail address"
                className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md focus:border-text2 focus:ring-text2"
              />
            </div>
          </div>

          <div className="lg:px-13 form w-full sm:px-[1em]">
            <div className="box1">
              <label
                htmlFor="username-input"
                className="mb-3 flex font-semibold text-text1"
              >
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username-input"
                name="username"
                placeholder="username"
                className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md"
              />
            </div>
          </div>

          <div className="lg:px-13 form w-full sm:px-[1em]">
            <div>
              <label
                htmlFor="phoneNumber-input"
                className="mb-3 flex font-sans font-semibold text-text1"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phoneNumber-input"
                onChange={(e) => setPhoneNumber(e.target.value)}
                name="phoneNumber"
                placeholder="phone number"
                className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md"
              />
            </div>
          </div>

          <div className="lg:px-13 form w-full sm:px-[1em]">
            <div>
              <label
                htmlFor="membership-input"
                className="mb-3 flex font-semibold text-text1"
              >
                Membership Type
              </label>
              <select
                id="membership-input"
                name="membershipType"
                value={membershipType}
                onChange={(e) => setMembershipType(e.target.value)}
                className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md"
              >
                <option value="">--- Select your membership type ---</option>
                <option value="patron">Patron</option>
                <option value="investor">investor members</option>
              </select>
            </div>
          </div>
          <div className="lg:px-13 form w-full sm:px-[1em]">
            <div className="box1">
              <label
                htmlFor="password-input"
                className="mb-3 flex font-semibold text-text1"
              >
                Password
              </label>
              <input
                id="password-input"
                onFocus={validatePassword}
                type="password"
                onChange={handleChange2}
                value={password}
                name="password"
                placeholder="password"
                className="mb-5 h-[4em] w-full rounded-full px-4 text-sm shadow-md"
              />
            </div>
          </div>

          <div className="w-full">
            {showErrorBox && (
              <div className="mt-2 text-sm text-red-500">
                {password.length < 8 && (
                  <div className="mb-2">
                    Password must be at least 8 characters long
                  </div>
                )}
                {!special && (
                  <div>
                    Must contain at least one number or symbol (!@#$%^&*)
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:px-13 sm:px-[1em]">
            <div className="lg:px-13 sm:px-[1em]">
              <EnterButton
                type="submit"
                text="Submit"
                loading={loading}
                disabled={loading || isSubmitDisabled()}
              />
            </div>
          </div>
        </form>

        <div
          className="absolute left-0 top-0 ml-[4em] mt-[4em] cursor-pointer sm:hidden lg:block"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={35} fill="#440080" />
        </div>

        <div className="mb-[1em] flex justify-center">
          <p className="font-sans font-semibold text-text1">
            Have an account ?
            <span className="ml-2 font-sans font-medium text-text2">
              <a href="/login">Sign in</a>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default CreateAccount;
