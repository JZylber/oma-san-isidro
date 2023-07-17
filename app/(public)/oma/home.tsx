'use client'
import Home from "../../../components/Homes/Home";
import {CalendarEvent} from "../../../components/CalendarComponents/CalendarTypes";

interface HomeProps {
    events : Array<CalendarEvent>,
}

const OMAHome = ({events}:HomeProps) => {
    return(<Home competition="OMA" dates={events}/>)
}

export default OMAHome