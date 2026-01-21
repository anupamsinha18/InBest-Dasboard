import React, { useRef, useEffect } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    BarElement
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import styles from './Dashboard.module.css';
import tableProfileImg from '../../assets/tableprofile.png';


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Filler
);

const Dashboard = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 6; // Adjustable

    const payrollDoughnutOptions = {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 8,
                    usePointStyle: true,
                    font: { size: 11 },
                    padding: 20,
                }
            },
        }
    };

    const attendanceDoughnutOptions = {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: { display: false },
        }
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
                display: true,
                grid: { display: false },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                border: { display: false }
            }
        },
        barThickness: 50,
        borderRadius: 8
    };

    const totalPayrollOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: {
                beginAtZero: true,
                display: true,
                grid: { display: false },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                border: { display: false }
            }
        },
        elements: {
            line: { tension: 0.4 },
            point: { radius: 0 }
        }
    };

    const yearlyPayrollOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#172B4D',
                bodyColor: '#172B4D',
                borderColor: '#DFE1E6',
                borderWidth: 1,
                padding: 10,
                displayColors: true,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(context.parsed.y) + 'K';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                display: true,
                grid: { display: false },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                border: { display: false }
            }
        },
        elements: {
            line: { tension: 0.4 },
            point: { radius: 0 }
        }
    };


    // --- Chart Data ---

    const payrollData = {
        labels: ['Marketing', 'Development', 'Designing', 'Claim'],
        datasets: [
            {
                data: [35, 30, 20, 15],
                backgroundColor: ['#FEDB9B', '#FFB020', '#6554C0', '#67CBAC'],

                data: [75, 25],
                backgroundColor: ['#0052CC', '#DEEBFF'],
                borderWidth: 0,
            },
        ],
    };

    const attendanceData = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                data: [60, 20],
                backgroundColor: ['#E9A40C', '#FCEECF'],
                borderWidth: 0,
            }
        ]
    };

    const onboardingData = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                data: [6, 3],
                backgroundColor: ['#0065FF', '#DEEBFF'],
                borderRadius: 8,
                barPercentage: 0.5,
            }
        ]
    };

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Payroll',
                data: [0.5, 1.2, 3, 2.5, 4, 6],
                borderColor: '#6554C0',
                backgroundColor: 'rgba(101, 84, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const yearlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'December, 2026',
                data: [300, 450, 300, 400, 550, 600, 580, 520, 680, 650, 850, 650],
                borderColor: '#2976ae',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(41, 118, 174, 0.3)');
                    gradient.addColorStop(1, 'rgba(41, 118, 174, 0.0)');
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
            },
            {
                label: 'December, 2025',
                data: [350, 380, 350, 450, 400, 500, 550, 500, 480, 520, 550, 550],
                borderColor: '#979797',
                backgroundColor: 'rgba(151, 160, 175, 0.0)',
                borderDash: [5, 5],
                borderDash: [],
                fill: false,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
            },
        ],
    };



    const stats = [
        { title: "Total Employees", sub1: "BILLP - 55", sub2: "BSIBPL - 65", sub3: "Baid & Company - 28", value: "148" },
        { title: "Present Today", sub1: "BILLP - 45", sub2: "BSIBPL - 55", sub3: "Baid & Company - 48", value: "98" },
        { title: "Absent Today", sub1: "BILLP - 20", sub2: "BSIBPL - 20", sub3: "Baid & Company - 10", value: "50" },
        { title: "Total Attendance Rate", sub1: "BILLP - 77%", sub2: "BSIBPL - 84%", sub3: "Baid & Company - 82%", value: "87%" },
    ];

    const employees = [
        { id: '1', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'BILLP', status: 'Permanent' },
        { id: '2', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'BSIBPL', status: 'Permanent' },
        { id: '3', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Probation' },
        { id: '4', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },
        { id: '5', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Probation' },

        { id: '6', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },
        { id: '7', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },
        { id: '8', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },
        { id: '9', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },
        { id: '10', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },
        { id: '11', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },
        { id: '12', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },
        { id: '13', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },
        { id: '14', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },
        { id: '15', code: 'xxxxxx', name: 'Employee name', dept: 'Department Name', desig: 'Designation', company: 'Company', status: 'Permanent' },

    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div style={{ padding: '10px' }}>
            <div className={styles.dashboardHeader}>
                <h2 className={styles.dashboardTitle}>Dashboard</h2>
            </div>

            <div className={styles.topStatsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <h3 className={styles.statTitle}>{stat.title}</h3>
                        <div className={styles.statContent}>
                            <div className={styles.statInfo}>
                                <span className={styles.statSubtext}>{stat.sub1}</span>
                                <span className={styles.statSubtext}>{stat.sub2}</span>
                                <span className={styles.statSubtext}>{stat.sub3}</span>
                            </div>
                            <div className={styles.statValue}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.sectionTabsContainer}>
                <div className={styles.sectionTabs}>
                    <button className={`${styles.tabButton} ${styles.activeTab}`}>ALL</button>
                    <button className={styles.tabButton}>BILLP</button>
                    <button className={styles.tabButton}>BSIBPL</button>
                    <button className={styles.tabButton}>Baid & Company</button>
                </div>

                <div className={styles.chartsRowTop}>

                    <div className={styles.chartCard} style={{ minHeight: '300px' }}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>Payroll by Department</h3>
                            <select className={styles.chartSelect}><option>Month</option></select>
                        </div>
                        <div style={{ height: '220px', display: 'flex', alignItems: 'center', padding: '10px' }}>
                            <div style={{ width: '150px', height: '150px', position: 'relative' }}>
                                <Doughnut data={payrollData} options={{ ...payrollDoughnutOptions, plugins: { legend: { display: false } } }} />
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#172B4D' }}>80</div>
                                    <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: '600' }}>Employees</div>
                                </div>
                            </div>
                            <div style={{ flex: 1, paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FFCA76' }}></span>
                                    <span style={{ color: '#172B4D', fontWeight: '500' }}>Marketing</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FFA20C' }}></span>
                                    <span style={{ color: '#172B4D', fontWeight: '500' }}>Development</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#7980FF' }}></span>
                                    <span style={{ color: '#172B4D', fontWeight: '500' }}>Designing</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#7DD2B7' }}></span>
                                    <span style={{ color: '#172B4D', fontWeight: '500' }}>Claim</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.chartCard} style={{ minHeight: '300px' }}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>Dept Attendance</h3>
                            <select className={styles.chartSelect}><option>UI/UX</option></select>
                        </div>
                        <div style={{ height: '220px', display: 'flex', alignItems: 'center', padding: '10px' }}>
                            <div style={{ width: '150px', height: '150px', position: 'relative' }}>
                                <Doughnut data={attendanceData} options={attendanceDoughnutOptions} />
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#172B4D' }}>80</div>
                                    <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: '600' }}>Employees</div>
                                </div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0.8rem', paddingLeft: '15px' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <div style={{ color: '#E9A40C', fontWeight: 'bold', fontSize: '0.85rem' }}>Present Employees</div>
                                    <div style={{ color: '#4A4D56' }}>60 Emp</div>
                                </div>
                                <div>
                                    <div style={{ color: '#F9E4B7', fontWeight: 'bold', fontSize: '0.85rem' }}>Absent Employees</div>
                                    <div style={{ color: '' }}>20 Emp</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.chartCard} style={{ minHeight: '300px' }}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>Pending Onboarding</h3>
                            <select className={styles.chartSelect}><option>Month</option></select>
                        </div>
                        <div style={{ flex: 1, minHeight: 0, padding: '10px' }}>
                            <Bar data={onboardingData} options={barOptions} />
                        </div>
                        <button className={styles.viewAllButton}>
                            VIEW ALL PENDING ONBOARDING →
                        </button>
                    </div>
                </div>

                <div className={styles.chartsRowBottom}>
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle} style={{ marginBottom: '1rem', padding: '10px 20px', backgroundColor: '#D9D9D9' }}>Total Payroll by Month</h3>
                        <div style={{ height: '350px', padding: '10px' }}>
                            <Line data={lineData} options={totalPayrollOptions} />
                        </div>
                    </div>

                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <h3 className={styles.chartTitle}>Yearly Payroll Analysis</h3>
                            <select className={styles.chartSelect}><option>2026</option></select>
                        </div>
                        <div style={{ height: '360px', position: 'relative', padding: '10px' }}>
                            <Line data={yearlyData} options={yearlyPayrollOptions} />

                            <div style={{ position: 'absolute', top: '20px', left: '50%', backgroundColor: 'rgba(255,255,255,0.9)', padding: '10px', borderRadius: '8px', border: '1px solid #DFE1E6', display: 'flex', flexDirection: 'column', gap: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                    <span style={{ width: 4, height: 16, backgroundColor: '#0052CC', borderRadius: 2 }}></span>
                                    <span style={{ color: '#42526E' }}>December, 2026</span>
                                    <span style={{ fontWeight: 'bold', color: '#FF8B00', marginLeft: 'auto' }}>₹950K</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                    <span style={{ width: 4, height: 16, backgroundColor: '#97A0AF', borderRadius: 2 }}></span>
                                    <span style={{ color: '#42526E' }}>December, 2025</span>
                                    <span style={{ fontWeight: 'bold', color: '#FF8B00', marginLeft: 'auto' }}>₹550K</span>
                                </div>
                            </div>

                            <div style={{ position: 'absolute', top: '12%', left: '33%', fontSize: '1rem', color: '#00875A', fontWeight: 'bold' }}>
                                +12.4% YoY
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h3 className={styles.chartTitle2}>Employee Overview</h3>
                        <div className={styles.searchWrapper}>
                            <input type="text" placeholder="Search here" className={styles.searchBar} />
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>🔍</span>
                        </div>
                    </div>
                    <div className={styles.empployee}>
                        <table className={styles.employeeTable}>
                            <thead>
                                <tr>
                                    <th>Profile</th>
                                    <th>Employee Code</th>
                                    <th>Employee Name</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((emp) => (
                                    <tr key={emp.id}>
                                        <td><div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}>
                                            <img src={tableProfileImg} alt="emp" style={{ width: '100%', height: '100%' }} />
                                        </div></td>
                                        <td>{emp.code}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.dept}</td>
                                        <td>{emp.desig}</td>
                                        <td>{emp.company}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${emp.status === 'Permanent' ? styles.permanent : styles.probation}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    <div className={styles.pagination}>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePage : ''}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                Copyright © 2025 Inbest.
            </div>
        </div>
    );
};

export default Dashboard;
