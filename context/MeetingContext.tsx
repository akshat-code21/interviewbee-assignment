"use client";
import { Meeting } from "@/types/types";
import { createContext, useEffect, useState } from "react";

export const MeetingContext = createContext({
    meetings: [] as Meeting[],
    setMeetings: (meetings: Meeting[]) => { },
});

export const MeetingProvider = ({ children }: { children: React.ReactNode }) => {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    
    useEffect(() => {
        const meetings = localStorage.getItem('meetings');
        if (meetings) {
            setMeetings(JSON.parse(meetings) as Meeting[]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('meetings', JSON.stringify(meetings));
    }, [meetings]);

    return (
        <MeetingContext.Provider value={{ meetings, setMeetings }}>
            {children}
        </MeetingContext.Provider>
    );
};