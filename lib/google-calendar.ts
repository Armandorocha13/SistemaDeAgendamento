import { google } from "googleapis";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);

if (GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
}

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export const createGoogleCalendarEvent = async (event: {
    summary: string;
    description: string;
    start: Date;
    end: Date;
}) => {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
        console.warn("Google Calendar credentials not fully configured. Skipping sync.");
        return null;
    }

    try {
        const response = await calendar.events.insert({
            calendarId: GOOGLE_CALENDAR_ID || "primary",
            requestBody: {
                summary: event.summary,
                description: event.description,
                start: {
                    dateTime: event.start.toISOString(),
                    timeZone: "America/Sao_Paulo",
                },
                end: {
                    dateTime: event.end.toISOString(),
                    timeZone: "America/Sao_Paulo",
                },
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating Google Calendar event:", error);
        return null;
    }
};

export const deleteGoogleCalendarEvent = async (eventId: string) => {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
        console.warn("Google Calendar credentials not fully configured. Skipping delete.");
        return;
    }

    try {
        await calendar.events.delete({
            calendarId: GOOGLE_CALENDAR_ID || "primary",
            eventId,
        });
    } catch (error) {
        console.error("Error deleting Google Calendar event:", error);
    }
};

export const updateGoogleCalendarEvent = async (eventId: string, updates: { summary?: string; description?: string }) => {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
        console.warn("Google Calendar credentials not fully configured. Skipping update.");
        return null;
    }

    try {
        // Primeiro buscamos o evento atual para manter os horários
        const currentEvent = await calendar.events.get({
            calendarId: GOOGLE_CALENDAR_ID || "primary",
            eventId,
        });

        const response = await calendar.events.patch({
            calendarId: GOOGLE_CALENDAR_ID || "primary",
            eventId,
            requestBody: {
                summary: updates.summary || currentEvent.data.summary,
                description: updates.description || currentEvent.data.description,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating Google Calendar event:", error);
        return null;
    }
};
