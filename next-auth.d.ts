declare module "next-auth" {
    interface session {
        id: string
    }

    interface jwt {
        id: string
    }
}