export const isEmail = (value: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
export const isPhone = (value: string) => /^[+ ()\d]{8,20}$/.test(value)
export const isUsername = (value: string) => /^[abcdefghijklmnopqrstuvwxyz0123456789_]{1,16}$/.test(value)