import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, registerUser, getAlllistLogin, updatePassWord, deleteUser } from "../../redux/apiRequest";
import NotiSucces from '../../Components/Notification/notisuccess';
import NotiFailed from '../../Components/Notification/notifailed';
import Blockuser from '../../Components/Layout/components/Block';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';

import styles from './Setting.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Setting() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    let stateAlllogin = useSelector((state) => state.auth.alllogin);
    let alllogin = [];
    if (stateAlllogin && stateAlllogin.listlogin) {
        alllogin = stateAlllogin.listlogin;
    }

    let state = useSelector((state) => state.auth.allusers);
    let allUsers = [];
    if (state && state.listuser) {
        allUsers = state.listuser;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUserName, setNewUserName] = useState("");
    const [newFullName, setNewFullName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [validationError, setValidationError] = useState("");

    // Hàm xử lý khi người dùng mở modal thêm mới
    const handleOpenModal = () => {
        setIsModalOpen(true);
        setNewUserName("");
        setNewFullName("");
        setNewEmail("");
        setNewPassword("");
    }

    // Hàm xử lý khi người dùng đóng modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setValidationError("");
    }

    // Hàm xử lý khi người dùng ấn nút "Lưu"
    const handleSaveRepairer = async () => {
        if (!newUserName || !newFullName || !newEmail || !newPassword) {
            setValidationError("*Vui lòng không bỏ trống");
            return;
        }


        // Gọi hàm postNewRepairer khi cần thêm mới đơn vị bảo dưỡng/sửa chữa
        const newData = {
            username: newUserName,
            fullname: newFullName,
            email: newEmail,
            password: newPassword,
        };
        await registerUser(newData, dispatch, successCallback, errCallback, user?.accessToken, axiosJWT);
        setNewUserName("");
        setNewFullName("");
        setNewEmail("");
        setNewPassword("");
        setValidationError("");
    }

    //xử lý modal sửa thành công
    const handleCloseSuccessModal = () => {
        setIsNotiSucces(false);
    }
    const [isNotiSucces, setIsNotiSucces] = useState(false);

    //xử lý modal sửa thất bại
    const handleCloseFailedModal = () => {
        setIsNotiFailed(false);
    }
    const [isNotiFailed, setIsNotiFailed] = useState(false);

    const successCallback = async () => {
        await getAllUser(user?.accessToken, dispatch, axiosJWT);
        setIsModalOpen(false);
        setIsNotiSucces(true);
    }

    const errCallback = () => {
        setIsModalOpen(false);
        setIsNotiFailed(true);
    }
    //THAY ĐỔI MẬT KHẨU
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [newChangePassword, setNewChangePassword] = useState("");
    const [confirmNewChangePassword, setConfirmNewChangePassword] = useState("");
    const [passwordValidationError, setPasswordValidationError] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    // Hàm xử lý khi người dùng nhấn nút "Chỉnh sửa" mật khẩu
    const handleOpenPasswordModal = (userId) => {
        setIsPasswordModalOpen(true);
        setNewChangePassword("");
        setConfirmNewChangePassword("");
        setPasswordValidationError("");
        setCurrentUser(userId);
    }

    // Hàm xử lý khi người dùng đóng modal chỉnh sửa mật khẩu
    const handleClosePasswordModal = () => {
        setIsPasswordModalOpen(false);
        setPasswordValidationError("");
    }

    // Hàm xử lý khi người dùng nhấn nút "OK" trong modal
    const handleUpdatePassword = async () => {
        if (!newChangePassword || !confirmNewChangePassword) {
            setPasswordValidationError("*Vui lòng không bỏ trống");
            return;
        }

        if (newChangePassword !== confirmNewChangePassword) {
            setPasswordValidationError("*Mật khẩu xác nhận không khớp");
            return;
        }
        const newData = {
            id: currentUser,
            passWord: newChangePassword
        }
        // Gọi hàm updatePassWord khi cần cập nhật mật khẩu
        await updatePassWord(newData, dispatch, successCallback, errCallback, user?.accessToken, axiosJWT);
        setNewPassword("");
        setConfirmNewChangePassword("");
        setPasswordValidationError("");
        setIsPasswordModalOpen(false);
    }
    //Xoá tài khoản
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleOpenDeleteModal = (user) => {
        setIsDeleteModalOpen(true);
        setUserToDelete(user);
    };
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };
    const handleConfirmDelete = async () => {
        await deleteUser(userToDelete.id, dispatch, successCallback, errCallback, user?.accessToken, axiosJWT);
        handleCloseDeleteModal();
    };
    useEffect(() => {
        if (user?.accessToken) {
            getAllUser(user?.accessToken, dispatch, axiosJWT);
            getAlllistLogin(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    return (
        user.admin ? (
            <>
                <div className={cx('repairer-container')}>
                    <div className={cx('repairer-wrap')}>
                        <h1>Danh sách tài khoản nội bộ</h1>
                        <button className={cx('add-button')} onClick={handleOpenModal}>Thêm mới</button>
                        <div className={cx('repairer-list')}>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>Tên tài khoản</th>
                                        <th>Họ tên</th>
                                        <th>Email</th>
                                        <th>Chức năng</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.username}</td>
                                            <td>{user.fullname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.admin}</td>
                                            <td>
                                                <button className={cx('update-button')} onClick={() => handleOpenPasswordModal(user.id)}>
                                                    <i className={cx('fa-solid fa-pen-nib')} />
                                                </button>
                                            </td>
                                            <td>
                                                {user.admin === "người dùng" ? (
                                                    <>
                                                        <button className={cx('delete-button')} onClick={() => handleOpenDeleteModal(user)}>
                                                            <i className={cx('fa-solid fa-trash-can')} />
                                                        </button>
                                                        {isDeleteModalOpen && (
                                                            <div className={cx('modal-overlay')}>
                                                                <div className={cx('modal-create')}>
                                                                    <button className={cx('close-button')} onClick={handleCloseDeleteModal}>
                                                                        <i className={cx("fa-solid fa-times")} />
                                                                    </button>
                                                                    <h2>Xác nhận xoá tài khoản</h2>
                                                                    <div className={cx('group-button')}>
                                                                        <button className={cx('cancel-button')} onClick={handleCloseDeleteModal}>
                                                                            Hủy
                                                                        </button>
                                                                        <button className={cx('create-button')} onClick={handleConfirmDelete}>
                                                                            Xoá
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : ''}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {isPasswordModalOpen && (
                        <div className={cx('modal-overlay')}>
                            <div className={cx('modal-create')}>
                                <button className={cx('close-button')} onClick={handleClosePasswordModal}>
                                    <i className={cx("fa-solid fa-times")} />
                                </button>
                                <h2>Thay đổi mật khẩu</h2>
                                <input
                                    type="password"
                                    value={newChangePassword}
                                    onChange={(e) => setNewChangePassword(e.target.value)}
                                    placeholder="Nhập mật khẩu mới"
                                />
                                <input
                                    type="password"
                                    value={confirmNewChangePassword}
                                    onChange={(e) => setConfirmNewChangePassword(e.target.value)}
                                    placeholder="Nhập lại mật khẩu mới"
                                />
                                <span className={cx('validation-error')}>{passwordValidationError}</span>
                                <div className={cx('group-button')}>
                                    <button className={cx('cancel-button')} onClick={handleClosePasswordModal}>
                                        Hủy
                                    </button>
                                    <button className={cx('create-button')} onClick={handleUpdatePassword}>
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {isModalOpen && (
                        <div className={cx('modal-overlay')}>
                            <div className={cx('modal-create')}>
                                <button className={cx('close-button')} onClick={handleCloseModal}>
                                    <i className={cx("fa-solid fa-times")} />
                                </button>
                                <h2>Thêm mới tài khoản người dùng</h2>
                                <input
                                    type="text"
                                    value={newUserName}
                                    onChange={(e) => setNewUserName(e.target.value)}
                                    placeholder="Nhập tên tài khoản"
                                />
                                <input
                                    type="text"
                                    value={newFullName}
                                    onChange={(e) => setNewFullName(e.target.value)}
                                    placeholder="Nhập đầy đủ họ tên"
                                />
                                <input
                                    type="text"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="Nhập email"
                                />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu"
                                />
                                <span className={cx('validation-error')}>{validationError}</span>
                                <div className={cx('group-button')}>
                                    <button className={cx('cancel-button')} onClick={handleCloseModal}>
                                        Hủy
                                    </button>
                                    <button className={cx('create-button')} onClick={handleSaveRepairer}>
                                        Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {isNotiSucces && <NotiSucces handleCloseSuccessModal={handleCloseSuccessModal} />}
                {isNotiFailed && <NotiFailed handleCloseFailedModal={handleCloseFailedModal} />}

                <div className={cx('repairer-container')}>
                    <div className={cx('repairer-wrap')}>
                        <h1>Lịch sử đăng nhập</h1>
                        <div className={cx('repairer-list')}>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>Tên tài khoản</th>
                                        <th>Thời gian đăng nhập</th>
                                        <th>Vĩ độ</th>
                                        <th>Kinh độ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alllogin.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.userName}</td>
                                            <td>{user.loginInfo.timestamp}</td>
                                            <td>{user.loginInfo.location[0]}</td>
                                            <td>{user.loginInfo.location[1]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <Blockuser />
        )
    );
}

export default Setting;
