import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api/' }),
  tagTypes: ['Articles', 'Users'],
  endpoints: (builder) => ({
    getImage: builder.query({
      query: ({ url }) => ({
        url,
        headers: {
          mode: 'no-cors',
        },
      }),
    }),
    getArticles: builder.query({
      query: ({ page = 1, quantityViewed = 10, token }) => ({
        url: `articles?limit=${quantityViewed}&offset=${quantityViewed * (page - 1)}`,
        headers: {
          authorization: `Token ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [Array.from(result).map(({ slug }) => ({ type: 'Articles', id: slug })), { type: 'Articles', id: 'LIST' }]
          : [{ type: 'Articles', id: 'LIST' }],
    }),
    getArticle: builder.query({
      query: ({ slug, token }) => ({
        url: `articles/${slug}`,
        headers: {
          authorization: `Token ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [Array.from(result).map(({ slug }) => ({ type: 'Articles', id: slug })), { type: 'Articles', id: 'LIST' }]
          : [{ type: 'Articles', id: 'LIST' }],
    }),
    createArticle: builder.mutation({
      query: ({ article, token }) => ({
        url: 'articles',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${token}`,
        },
        body: JSON.stringify({ article }),
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    editArticle: builder.mutation({
      query: ({ article, slug, token }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${token}`,
        },
        body: JSON.stringify({ article }),
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    deleteArticle: builder.mutation({
      query: ({ slug, token }) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
        headers: {
          authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    favoriteArticle: builder.mutation({
      query: ({ slug, token }) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    unfavoriteArticle: builder.mutation({
      query: ({ slug, token }) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    getUser: builder.query({
      query: (token) => ({
        url: 'user',
        headers: {
          authorization: `Token ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [Array.from(result).map(({ username }) => ({ type: 'Users', id: username })), { type: 'Users', id: 'LIST' }]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    registerUser: builder.mutation({
      query: ({ username, email, password }) => ({
        url: 'users',
        method: 'POST',
        body: {
          user: {
            username,
            email,
            password,
          },
        },
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: 'users/login',
        method: 'POST',
        body: {
          user: {
            email,
            password,
          },
        },
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    editUser: builder.mutation({
      query: ({ username, email, password, urlImage, token }) => ({
        url: 'user',
        method: 'PUT',
        headers: {
          authorization: `Token ${token}`,
        },
        body: {
          user: {
            username,
            email,
            image: urlImage,
            bio: '',
            password,
          },
        },
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useRegisterUserMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useEditArticleMutation,
  useEditUserMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
  useGetArticleQuery,
  useGetUserQuery,
  useLoginUserMutation,
  useGetImageQuery,
} = blogApi
