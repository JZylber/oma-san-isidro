export const getDateFromJSON = (JSONDate : string) => {
    let date = JSONDate.split('T')[0];
    let [year,month,day] = date.split('-').map((n) => Number(n));
    month = month - 1;
    return(new Date(year,month,day))
}

export const getTimeFromJSON = (JSONDate : string) => {
    let time = JSONDate.split('T')[1];
    let [hour,minute,second] = time.split(':').map((n) => Number(n));
    return(new Date(0,0,0,hour,minute))
}

