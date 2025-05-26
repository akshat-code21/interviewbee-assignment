import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { Session } from "next-auth";

export interface CustomSession extends Session {
    accessToken?: string;
    refreshToken?: string;
}

export async function GET() {
    const session = (await getServerSession(authOptions as unknown as any)) as CustomSession;
    
    if (!session?.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.NEXTAUTH_URL
    );

    oauth2Client.setCredentials({
        access_token: session.accessToken,
        scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events'
    });

    const calendar = google.calendar({ 
        version: "v3", 
        auth: oauth2Client
    });

    const now = new Date();
    const event = {
        summary: "New Meeting",
        description: "Meeting created via InterviewBee",
        start: { 
            dateTime: now.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
        },
        end: {
            dateTime: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        conferenceData: {
            createRequest: {
                requestId: Math.random().toString(36).substring(7),
                conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
        },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1,
        });

        if (!response.data.hangoutLink) {
            throw new Error('Failed to create meeting link');
        }

        return NextResponse.json({ meetLink: response.data.hangoutLink });
    } catch (error: any) {
        console.error('Meet creation error:', error);
        return NextResponse.json({ 
            error: 'Failed to create meeting',
            details: error.message || 'Unknown error'
        }, { status: 500 });
    }
}