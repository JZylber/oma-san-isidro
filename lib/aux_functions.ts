export const getDateFromJSON = (JSONDate : string) => {
    let date = JSONDate.split('T')[0];
    let [year,month,day] = date.split('-').map((n) => Number(n));
    month = month - 1;
    return(new Date(year,month,day))
}