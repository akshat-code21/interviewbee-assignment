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
        const storedMeetings = localStorage.getItem('meetings');
        if (storedMeetings) {
            try {
                const parsedMeetings = JSON.parse(storedMeetings);
                const meetingsWithDates = parsedMeetings.map((meeting: Meeting) => ({
                    ...meeting,
                    date: new Date(meeting.date)
                }));
                setMeetings(meetingsWithDates);
            } catch (error) {
                console.error('Error parsing stored meetings:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (meetings.length > 0) {
            localStorage.setItem('meetings', JSON.stringify(meetings));
        }
    }, [meetings]);

    return (
        <MeetingContext.Provider value={{ meetings, setMeetings }}>
            {children}
        </MeetingContext.Provider>
    );
};