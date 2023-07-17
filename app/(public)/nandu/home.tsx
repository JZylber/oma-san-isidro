'use client'
import Home from "../../../components/Homes/Home";
import {CalendarEvent} from "../../../components/CalendarComponents/CalendarTypes";

interface HomeProps {
    events : Array<CalendarEvent>,
}

const NanduHome = ({events}:HomeProps) => {
    return(<Home competition="Ñandú" dates={events}/>)
}

export default NanduHome