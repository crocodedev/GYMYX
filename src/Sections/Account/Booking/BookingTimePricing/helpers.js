export const prepareVisitDateWithTime = (data, times) => {
    return {
        value: data?.value,
        time: times,
    }
}

export const checkData = (data) => {
    let status = true
    data.forEach(({ time, value }) => {
        if (!time?.length || !value) {
            status = false
            return
        }
    })

    return status
}