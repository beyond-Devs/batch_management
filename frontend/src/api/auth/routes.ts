
export const publicRoutes = [
    "/api/user"
]


export const protectedRoutes = [
    "/dashboard",
    "/condominium",
    "/condominium/create",
    "/street"
]


export const authRoutes = [
    "/", 
    "/auth/error",
]

export const apiAuthPrefix = "/lib/auth"


export const DEFAULT_LOGIN_REDIRECT = "/dashboard"