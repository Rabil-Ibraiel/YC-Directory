"use server"

import { revalidatePath } from "next/cache"
import { writeClient } from "./sanity/lib/write-client"
import { auth } from "./auth"
import slugify from "slugify"

interface formDataType {
        title: string,
        description: string,
        category: string,
        link: string,
        pitch: string,
}

export async function createStartup(formData: formDataType) {
    const session = await auth()
    const slug = slugify(formData.title, {lower: true, strict: true})
    const startup = await writeClient.create({
        _type: "startup",
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: formData.link,
        pitch: formData.pitch,
        views: 0,
        author: {
            _type: "reference",
            _ref: session?.id
        },
        slug: {
            _type: "slug",
            current: slug
        }
    })

    revalidatePath("/")

    return startup._id
}