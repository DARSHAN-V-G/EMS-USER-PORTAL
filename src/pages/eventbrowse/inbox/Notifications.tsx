import React, { useState, useEffect } from 'react';
import styles from './Notifications.module.css';
import URL from '../../../links';

interface TeamInvite {
    id: string;
    event_id: number;
    event_name: string;
    from_user_name: string;
    teamName: string;
    from_team_id: number;
}

interface Notification {
    id: string | number;
    text: string;
    type: 'info' | 'reminder' | 'team_request';
    invite?: TeamInvite;
}

export default function NotificationsPage() {
    const [selectedTab, setSelectedTab] = useState<'all' | 'team_request'>('all');
    const [expandedNotificationId, setExpandedNotificationId] = useState<string | number | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [teamInvites, setTeamInvites] = useState<TeamInvite[]>([]);
    const [loadingInvites, setLoadingInvites] = useState(false);
    const [inviteActionLoading, setInviteActionLoading] = useState<{ [id: string]: boolean }>({});

    useEffect(() => {
        // Fetch team invitations from backend
        const fetchInvites = async () => {
            setLoadingInvites(true);
            try {
                const res = await fetch(`${URL}/user/fetch/invitations`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.data && Array.isArray(data.data)) {
                        setTeamInvites(data.data.map((invite: any, idx: number) => ({ ...invite, id: 'invite-' + idx })));
                    }
                }
            } catch (err) {
                // Optionally handle error
            } finally {
                setLoadingInvites(false);
            }
        };
        fetchInvites();
    }, []);

    const handleTabChange = (tab: 'all' | 'team_request') => {
        setSelectedTab(tab);
        setExpandedNotificationId(null);
    };

    const handleNotificationClick = (id: string | number) => {
        setExpandedNotificationId(prevId => (prevId === id ? null : id));
    };

    // Accept/Reject handlers
    const handleAccept = async (invite: TeamInvite) => {
        setInviteActionLoading(prev => ({ ...prev, [invite.id]: true }));
        try {
            const res = await fetch(`${URL}/user/acceptTeamInvite`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from_team_id: invite.from_team_id,
                    to_user_id: null, // backend gets from session
                    event_id: invite.event_id
                })
            });
            if (!res.ok) {
                const err = await res.json();
                alert(err.message || 'Failed to accept invite');
                return;
            }
            setTeamInvites(prev => prev.filter(i => i.id !== invite.id));
        } finally {
            setInviteActionLoading(prev => ({ ...prev, [invite.id]: false }));
        }
    };
    const handleReject = async (invite: TeamInvite) => {
        setInviteActionLoading(prev => ({ ...prev, [invite.id]: true }));
        try {
            const res = await fetch(`${URL}/user/rejectTeamInvite`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from_team_id: invite.from_team_id,
                    to_user_id: null, // backend gets from session
                    event_id: invite.event_id
                })
            });
            if (!res.ok) {
                const err = await res.json();
                alert(err.message || 'Failed to reject invite');
                return;
            }
            setTeamInvites(prev => prev.filter(i => i.id !== invite.id));
        } finally {
            setInviteActionLoading(prev => ({ ...prev, [invite.id]: false }));
        }
    };

    // Only show team invites as notifications
    const filteredNotifications: Notification[] = selectedTab === 'all'
        ? teamInvites.map(invite => ({
            id: invite.id,
            text: `${invite.from_user_name} invited you to join team "${invite.teamName}" for event "${invite.event_name}"`,
            type: 'team_request',
            invite
        }))
        : teamInvites.map(invite => ({
            id: invite.id,
            text: `${invite.from_user_name} invited you to join team "${invite.teamName}" for event "${invite.event_name}"`,
            type: 'team_request',
            invite
        }));

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
                    {filteredNotifications.map(({ id, text, type, invite }) => (
                        <div 
                            key={id} 
                            className={styles.notification} 
                            onClick={() => handleNotificationClick(id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleNotificationClick(id);
                                }
                            }}
                        >
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
                            {type === 'team_request' && invite && (
                                <div className={styles.actions}>
                                    <button className={`${styles.iconButton} ${styles.accept}`} aria-label="Accept" tabIndex={-1} onClick={e => { e.stopPropagation(); handleAccept(invite); }} disabled={inviteActionLoading[invite.id]}>✔</button>
                                    <button className={`${styles.iconButton} ${styles.reject}`} aria-label="Reject" tabIndex={-1} onClick={e => { e.stopPropagation(); handleReject(invite); }} disabled={inviteActionLoading[invite.id]}>✕</button>
                                </div>
                            )}
                        </div>
                    ))}
                    {selectedTab === 'team_request' && !loadingInvites && teamInvites.length === 0 && (
                        <div style={{textAlign:'center',color:'#888',marginTop:20}}>No team invitations.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
