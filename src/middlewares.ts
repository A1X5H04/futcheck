// A test to see how middleware works, can be used for authentication.

import type { MiddlewareFunction } from "react-router";

export const loggingMiddleware: MiddlewareFunction = ({ request }, nextFn) => {
    console.log("Request Before navigation: ", request)
    const start = performance.now()
    const response = nextFn()
    const duration = performance.now() - start
    console.log("Response After navigation", response)
    console.log(`Navigation took ${duration}ms`)
    return response
}