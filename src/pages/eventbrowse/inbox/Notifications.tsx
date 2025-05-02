import React, { useState } from 'react';
import styles from './Notifications.module.css';

const notifications = [
    { id: 1, text: 'Event 1 of <club name> registration successful!', type: 'info' },
    { id: 2, text: 'New event scheduled by <club name>, check it out!', type: 'info' },
    { id: 3, text: 'Event 2 of <club name> registration successful!', type: 'info' },
    { id: 4, text: '<Roll number> sent you a team request for event 4 of <club name>.', type: 'team_request' },
    { id: 5, text: 'Event 3 of <club name> to start in 30 minutes.', type: 'reminder' },
    { id: 6, text: 'Winners for event 5 of <club name> to be announced on 23-04-2025.', type: 'info' },
    { id: 7, text: 'New event scheduled by <club name>, check it out!', type: 'info' },
    { id: 8, text: '<Roll number> sent you a team request for event 6 of <club name>.', type: 'team_request' },
];

export default function NotificationsPage() {
    const [selectedTab, setSelectedTab] = useState('all'); // State to track selected tab
    const [expandedNotificationId, setExpandedNotificationId] = useState(null); // State to track expanded notification

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        setExpandedNotificationId(null); // Collapse any expanded notification when tab changes
    };

    const handleNotificationClick = (id) => {
        // Toggle the expanded notification
        setExpandedNotificationId(prevId => (prevId === id ? null : id));
    };

    const filteredNotifications = selectedTab === 'all' ?
        notifications : notifications.filter(notification => notification.type === 'team_request');

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>INBOX</h1>
                </div>

                <div className={styles.tabs}>
                    <button 
                        className={`${styles.tab} ${styles.tabAll}`}
                        onClick={() => handleTabChange('all')}
                    >
                        ALL
                    </button>
                    <button 
                        className={`${styles.tab} ${styles.tabTeam}`}
                        onClick={() => handleTabChange('team_request')}
                    >
                        TEAM REQUESTS
                    </button>
                </div>

                <div className={styles.notificationsList}>
                    {filteredNotifications.map(({ id, text, type }) => (
                        <div 
                            key={id} 
                            className={styles.notification} 
                            onClick={() => handleNotificationClick(id)} // Handle click to expand
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleNotificationClick(id);
                                }
                            }}
                        >
                            {type === 'reminder' ? (
                                <>
                                    <button className={`${styles.iconButton} ${styles.bell}`} aria-label="Reminder" tabIndex={-1}>
                                        <img src="/bell_icon.png" alt="bell icon" />
                                    </button>
                                    <span 
                                        title={text} 
                                        style={{ 
                                            overflow: 'hidden', 
                                            textOverflow: 'ellipsis', 
                                            whiteSpace: expandedNotificationId === id ? 'normal' : 'nowrap', 
                                            flexGrow: 1, 
                                            marginLeft: '10px' 
                                        }}
                                    >
                                        {text}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span 
                                        title={text} 
                                        style={{ 
                                            overflow: 'hidden', 
                                            textOverflow: 'ellipsis', 
                                            whiteSpace: expandedNotificationId === id ? 'normal' : 'nowrap', 
                                            flexGrow: 1, 
                                            marginRight: '10px' 
                                        }}
                                    >
                                        {text}
                                    </span>
                                    {type === 'team_request' && (
                                        <div className={styles.actions}>
                                            <button className={`${styles.iconButton} ${styles.accept}`} aria-label="Accept" tabIndex={-1}>✔</button>
                                            <button className={`${styles.iconButton} ${styles.reject}`} aria-label="Reject" tabIndex={-1}>✕</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
