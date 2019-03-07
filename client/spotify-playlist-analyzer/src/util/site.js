export const windowLoc = window.location;
export const homeUrl = windowLoc.hostname;
export const spaUrl = windowLoc.protocol + '//' + 
               windowLoc.host +
               windowLoc.pathname;