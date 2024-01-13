import { io } from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { logOut } from "../../../../redux/apiRequest";
import { createAxios } from "../../../../createInstance";
import { logoutSuccess } from "../../../../redux/authSlice";
import styles from './Nav.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Nav() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken;
    const id = user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const handleLogout = () => {
        setShowLogoutModal(true);
    }

    const handleLogoutConfirmed = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
        // Đăng xuất thành công, có thể thực hiện các bước khác nếu cần
        setShowLogoutModal(false);
    }

    const handleCancelLogout = () => {
        // Người dùng chọn hủy bỏ, đóng modal
        setShowLogoutModal(false);
    }
    return (
        <div>
            <div className={cx('nav')}>
                <div className={cx('user-info')}>
                    <div className={cx('user-info-icon')} onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>
            </div>

            {showLogoutModal && (
                <div className={cx('logout-modal')}>
                    <h1>ĐĂNG XUẤT DEVICES MANAGER!</h1>
                    <button onClick={handleLogoutConfirmed}>OK</button>
                    <button className={cx('cancel')} onClick={handleCancelLogout}>Cancel</button>
                </div>
            )}
        </div>

    );
}

export default Nav;
