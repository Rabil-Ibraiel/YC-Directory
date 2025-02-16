import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || author->name match $search || category match $search] | order(_createdAt desc) {
  _id, title, description, slug, _createdAt,
    author -> {_id, name, image, bio},
    image, views, category
}`)

export const STARTUP_QUERY = defineQuery(`*[_type=="startup" && _id == $id][0] {
  _id, title, description, slug, _createdAt,
    author -> {_id, name, username, image, bio},
    image, views, category, pitch
}`)

export const USER_QUERY_BY_ID = defineQuery(`
  *[_type == "author" && id == $id][0] {
    _id,
    id,
    name,
    email,
    image,
    username
  }
`);

export const USER_QUERY_BY_AUTHOR_ID = defineQuery(`
  *[_type == "author" && _id == $id][0] {
    _id,
    id,
    name,
    email,
    image,
    username,
    bio
  }
`);

export const STARTUP_QUERY_BY_USER_ID = defineQuery(`*[_type=="startup" && author._ref == $id] {
  _id, title, description,
    author -> {_id, name, username, image, bio},
    image, views, category
}`)