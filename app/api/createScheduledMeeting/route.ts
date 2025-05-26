import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession } from "../createInstantMeeting/route";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
    try {
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

        const { title, description, date, startTime, endTime } = await req.json();

        const startDateTime = new Date(date);
        const [startHours, startMinutes] = startTime.split(':');
        startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0);

        const endDateTime = new Date(date);
        const [endHours, endMinutes] = endTime.split(':');
        endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0);

        const event = {
            summary: title,
            description: description,
            start: { 
                dateTime: startDateTime.toISOString(), 
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
            },
            end: { 
                dateTime: endDateTime.toISOString(), 
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
            },
            conferenceData: {
                createRequest: {
                    requestId: Math.random().toString(36).substring(7),
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            },
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1,
        });

        return NextResponse.json({ 
            success: true,
            meetLink: response.data.hangoutLink,
            eventId: response.data.id
        });
    } catch (error) {
        console.error('Meet creation error:', error);
        return NextResponse.json(
            { error: "Failed to schedule meeting" },
            { status: 500 }
        );
    }
}