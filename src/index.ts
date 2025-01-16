
/**
 * get calendar
 * @returns 
 */

const appToCalendar = async (payload: { name: string, phone: string , source:string}) => {
    try {
        const dataApi = await fetch("Aqui va la endpoint", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        return dataApi
    } catch (err) {
        console.log(`error: `, err)
    }
    
}



    
      





export { appToCalendar}
