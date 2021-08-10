export const formatURL = (url: string): string => {
    const pattern = /^((http|https|ftp):\/\/)/;
    return !pattern.test(url) ? `http://${url}` : url;
};
