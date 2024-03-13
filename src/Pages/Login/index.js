import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

import styles from "./Login.module.scss"; // Import SCSS module
import classNames from "classnames/bind";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const cx = classNames.bind(styles);

const Login = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false); // State để kiểm soát hiển thị spinner
  const [rememberMe, setRememberMe] = useState(false); // State để lưu trạng thái của checkbox "Remember Me"
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    // Kiểm tra xem có thông tin tài khoản đã được lưu trong localStorage hay không
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true); // Đánh dấu ô "Remember Me"
    }

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!currentUser) {
      // Nếu chưa đăng nhập, thì mới yêu cầu vị trí
      requestLocation();
    } else {
      navigate("/");
    }
  }, [currentUser]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const newUser = {
      username: username,
      password: password,
      userLocation: [latitude, longitude],
    };
    if (!username.trim() || !password.trim()) {
      setErrors({ message: "Vui lòng điền đầy đủ thông tin." });
      setLoading(false); // Ẩn spinner nếu có lỗi
      return;
    } else if (latitude === "" || longitude === "") {
      setErrors({ message: "Vui lòng cho phép truy cập vị trí" });
      setLoading(false); // Ẩn spinner nếu có lỗi
      return;
    }
    loginUser(newUser, dispatch, navigate, handleLoginError, setLoading);

    // Lưu thông tin tài khoản nếu người dùng chọn "Remember Me"
    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  };

  const handleLoginError = (error) => {
    setErrors({ message: error.message });
  };

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error("Lỗi khi lấy vị trí:", error.message);
        // Xử lý lỗi nếu người dùng từ chối chia sẻ vị trí hoặc có lỗi khác
      }
    );
  };

  return (
    <div className={cx("body-login")}>
      <div className={cx("wrapper")}>
        {loading && <div className={cx("spinner-overlay")}></div>}
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className={cx("input-box")}>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <FaUser className={cx("icon")} />
          </div>
          <div className={cx("input-box")}>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <FaLock className={cx("icon")} />
          </div>
          <div className={cx("login-error")}>
            <span>{errors?.message}</span>
          </div>
          <div className={cx("remember-forgot")}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe} // Liên kết ô "Remember Me" với state
                onChange={(e) => setRememberMe(e.target.checked)} // Cập nhật trạng thái khi ô "Remember Me" được chọn
              />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <div className={cx("register-link")}>
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
          {loading && (
            <div className={cx("spinner-container")}>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
