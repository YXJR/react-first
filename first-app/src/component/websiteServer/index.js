import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Articles from "./articles"
import ArticleDetail from "./detail.js"
import ArticleEdit from "./eidt.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Articles />,
    children: [],
  },
  {
    path: "/articles",
    element: <Articles />,
    children: [],
  },
  {
    path: "/articles/:id",
    element: <ArticleDetail />,
    children: [],
  },
  {
    path: "/articles/:id/edit",
    element: <ArticleEdit />,
    children: [],
  },
])
const WebsitesRoutes = () => <RouterProvider router={router} />

export default WebsitesRoutes
