const BASE_URL: string = "http://localhost:5000";
const API_URL: string = `${BASE_URL}/api`

export const FOODS_URL: string = `${API_URL}/foods`
export const FOODS_TAGS_URL: string = `${FOODS_URL}/tags`
export const FOODS_BY_SEARCH_URL: string = `${FOODS_URL}/search/`
export const FOODS_BY_TAG_URL: string = `${FOODS_URL}/tag/`
export const FOODS_BY_ID_URL: string = `${FOODS_URL}/`

export const USER_URL: string = `${API_URL}/users`;
export const USER_LOGIN_URL: string = `${USER_URL}/login`;