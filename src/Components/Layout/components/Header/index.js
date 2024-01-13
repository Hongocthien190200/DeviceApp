import React, { useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '../../../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';


const cx = classNames.bind(styles);
function Header() {
    const location = useLocation();
    return (
        <div className={cx('header')}>
            <div className={cx('header-sc')}>
                <img src={logo}></img>
                {/* <i className={"fa-solid fa-bell"}></i> */}
            </div>
            <div className={cx('header-inner')}>
                <div className={cx('title-name')}>
                    <h3>Devices Manager</h3>
                    <p>Quản lý tài sản</p>
                </div>
                <nav className={cx('nav')}>
                    <ul>
                        <li className={location.pathname === '/' ? cx('selected') : ''}>
                            <Link to="/">
                                <i className={"fa-solid fa-house"}></i>Trang chủ
                            </Link>
                        </li>
                        <li className={location.pathname.includes('/devices') ? cx('selected') : ''}>
                            <Link to="/devices">
                                <i className={"fa-solid fa-list-check"}></i>Tài sản
                            </Link>
                        </li>
                        <li className={location.pathname === '/maintenance' ? cx('selected') : ''}>
                            <Link to="/maintenance">
                                <i className={"fa-solid fa-toolbox"}></i>Lịch sử bảo dưỡng
                            </Link>
                        </li>
                        <li className={location.pathname === '/repair' ? cx('selected') : ''}>
                            <Link to="/repair">
                                <i className={"fa-solid fa-screwdriver-wrench"}></i>Lịch sử sửa chữa
                            </Link>
                        </li>
                    </ul>
                    <div className={cx('config')}>
                        <p className={cx('tittle')}>CẤU HÌNH</p>
                        <ul>
                            <li className={location.pathname === '/status' ? cx('selected') : ''}>
                                <Link to="/status">
                                    <i className={"fa-solid fa-satellite"}></i>Trạng thái
                                </Link>
                            </li>
                            <li className={location.pathname === '/department' ? cx('selected') : ''}>
                                <Link to="/department">
                                    <i className={"fa-solid fa-house-circle-check"}></i>Phòng ban
                                </Link>
                            </li>
                            <li className={location.pathname === '/category' ? cx('selected') : ''}>
                                <Link to="/category">
                                    <i className={"fa-solid fa-shapes"}></i>Phân loại tài sản
                                </Link>
                            </li>
                            <li className={location.pathname === '/fixer' ? cx('selected') : ''}>
                                <Link to="/fixer">
                                    <i className={"fa-solid fa-user-nurse"}></i>Đơn vị bảo dưỡng
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('config')}>
                        <p className={cx('tittle')}>CÀI ĐẶT</p>
                        <ul>
                            <li className={location.pathname === '/setting' ? cx('selected') : ''}>
                                <Link to="/setting">
                                    <i className={"fa-solid fa-gear"}></i>Cài đặt chung
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className={cx('open-close-header')}>
                {/* <i className={"fa-solid fa-caret-left"}></i> */}
            </div>
        </div>
    );
}

export default Header;