import { getInstanceDropPoints, getInstanceVenues, getInstances } from "./aux_db_calls";

export const getDateFromJSON = (JSONDate : string) => {
    let date = JSONDate.split('T')[0];
    let [year,month,day] = date.split('-').map((n) => Number(n));
    month = month - 1;
    return(new Date(year,month,day))
}

export const venueDataGenerator = async (competition: string, instance_hierarchy: string[]) => {
    const date= new Date();
    const year = date.getFullYear();
    const newProps = await getInstances(competition,year).then(async (instances) => {
        const {instancia,fecha_limite_autorizacion} = instances.results.filter(instance => instance.fecha > date)[0];
        const next_instance = instancia;
        const auth_max_date = fecha_limite_autorizacion;
        const dropPoints = await getInstanceDropPoints(competition,year,next_instance);
        const venues = await getInstanceVenues(competition,year,next_instance);
        return({next_instance: next_instance,venues: venues,dropPoints: dropPoints.results,auth_max_date: JSON.parse(JSON.stringify(auth_max_date))})
    });
    return {
        props: newProps,
    };
}