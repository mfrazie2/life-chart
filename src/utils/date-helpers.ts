import differenceInWeeks from "date-fns/differenceInWeeks";
import format from "date-fns/format";

export const getToday = () => {
    return new Date();
}

export const formatDate = (date: Date) => {
    return format(date, 'yyyy/MM/dd')
}

export const getMaxDate = () => {
    return format(getToday(), 'yyyy-MM-dd')
}

export const getDifferenceInWeeks = (dateOfBirth: Date) => {
    return differenceInWeeks(getToday(), dateOfBirth, {
        roundingMethod: 'floor',
    })
}