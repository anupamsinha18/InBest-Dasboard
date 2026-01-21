import React from 'react';
import styles from './Header.module.css';
import BrandLogo from '../../assets/brand_blue_shree_480 1.png';
import MenuIcon from '../../assets/square-menu.png';
import CalendarIcon from '../../assets/Icons.png';
import BellIcon from '../../assets/Icons (1).png';
import profileIcon from '../../assets/profile.png';
import MailIcon from '../../assets/Icons (2).png';

const Header = ({ toggleSidebar }) => {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <img src={MenuIcon} alt="Menu" className={styles.menuIcon} onClick={toggleSidebar} />
                <h1 className={styles.title}>Dashboard</h1>
            </div>

            <div className={styles.centerSection}>
                <img src={BrandLogo} alt="Shree" className={styles.brandLogo} />
            </div>

            <div className={styles.rightSection}>
                <button className={styles.iconButton}>
                    <img src={CalendarIcon} alt="Calendar" className={styles.actionIcon} />
                </button>
                <button className={styles.iconButton}>
                    <img src={BellIcon} alt="Notifications" className={styles.actionIcon} />
                </button>
                <button className={styles.iconButton}>
                    <img src={MailIcon} alt="Messages" className={styles.actionIcon} />
                </button>

                <div className={styles.profileContainer}>
                    <div className={styles.avatar}>
                        <img src={profileIcon} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className={styles.profileInfo}>
                        <span className={styles.profileName}>JOYMALYA PODDAR</span>
                        <span className={styles.profileRole}>ACCOUNTS</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
