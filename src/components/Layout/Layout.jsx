import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import styles from './Layout.module.css';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(window.innerWidth > 768);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.layoutContainer}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className={styles.mainContent}>
                <Header toggleSidebar={toggleSidebar} />
                <Dashboard />
            </main>
        </div>
    );
};

export default Layout;
