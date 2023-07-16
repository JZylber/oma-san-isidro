'use client'
import Layout from "../../components/Layout/Layout";
import Home from "../../components/Homes/Home";
import {CalendarEvent} from "../../components/CalendarComponents/CalendarTypes";

interface HomeProps {
    events : Array<CalendarEvent>,
}

const OMAHome = ({events}:HomeProps) => {
    return(
        <>
        
        <Layout>
            <Home competition="OMA" dates={events}/>
        </Layout>
        </>
        )
}

export default OMAHome