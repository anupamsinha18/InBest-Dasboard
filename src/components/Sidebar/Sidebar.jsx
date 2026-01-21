import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import Logo from '../../assets/Sidebar.png';
import DashboardIcon from '../../assets/DashboardSIdebar.png';
import EmployeeIcon from '../../assets/Employee.png';
import AttendanceIcon from '../../assets/Attendence.png';
import AdvanceIcon from '../../assets/Advance.png';
import PayrollIcon from '../../assets/Payroll.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const menuItems = [
        { name: 'Dashboard', icon: DashboardIcon },
        { name: 'Employee Onboarding', icon: EmployeeIcon },
        { name: 'Attendance Overview', icon: AttendanceIcon },
        { name: 'Advance Adjustment', icon: AdvanceIcon },
        { name: 'Payroll Management', icon: PayrollIcon },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
                onClick={toggleSidebar}
            ></div>

            <aside className={`${styles.sidebar} ${isOpen ? '' : styles.sidebarCollapsed}`}>
                <div className={styles.logoContainer}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={Logo} alt="HRMS Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                </div>

                <nav className={styles.navMenu}>
                    {menuItems.map((item) => {
                        return (
                            <div
                                key={item.name}
                                className={`${styles.navItem} ${activeItem === item.name ? styles.activeNavItem : ''}`}
                                onClick={() => setActiveItem(item.name)}
                            >
                                <img
                                    src={item.icon}
                                    alt={item.name}
                                    className={styles.icon}
                                    style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                />
                                <span>{item.name}</span>
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
