import { google } from 'googleapis';
const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2('193747352293-clfdutaol7c5c4h9347jmc0jn1t0hn6f.apps.googleusercontent.com', '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');

oAuth2Client.setCredentials({refresh_token: 'ya29.a0AWY7CklQB8aSLPVLPJbArFDBoetHxlwL077IMryGeYrNvbypbu2YtsK0oqmPvGw77bIfR7jbvHdN6wizOToz1mlMZoBALrmdU2GxCxFgA577u31EVvuh3qdXX53l1aNiFDOTuZylI8IofrLzUtKy7MET4j6QyHcaCgYKATgSARESFQG1tDrpF7JuL_zaGt2lXNTUV0DnEg0166'})

const calendar = google.calendar({version: 'v3', auth: oAuth2Client});

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDate() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
    train: 'Treinar exercício de braço',
    location: 'R. Vila Técnica Areão - Maj. Lage de Cima, Itabira - MG',
    description: 'Fazer Flexão de Braço, Tríceps Paralelo no Degrau e Flexão Pike',

    start: {
        dateTime: eventStartTime,
        timezone: 'America/Sao_Paulo',

    },
    end: {
        dateTime: eventEndTime,
        timezone: 'America/Sao_Paulo',
    },
    colorId: 1,
}

calendar.freebusy.query({
    resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
            timezone: 'America/Sao_Paulo',
        items: [{ id: 'primary' }],    
    },
}, (err, res) => {
    if(err) return console.error('Free Busy Query Error', err);

    const eventsArr = res.data.calendars.primary.busy;

    if(eventsArr.length === 0) 
    return calendar.events.insert(
        {calendarId: 'primary', resource: event}, 
        err => {
            if(err) return console.error('Calendar Event Creation Error: ', err);

            return console.log('Calendar Event Created');
        })
    return console.log("Sorry I'm Busy");    
})