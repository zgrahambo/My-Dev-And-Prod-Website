export const windowLoc = window.location;
const protocol = windowLoc.protocol + '//';
export const homeUrl = protocol+ windowLoc.hostname;
export const spaUrl = protocol + windowLoc.host + windowLoc.pathname;