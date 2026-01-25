import { type ReactNode } from 'react'

export interface AsyncBoundaryProps<T> {
    isLoading: boolean
    error?: Error | unknown
    data?: T

    onRetry?: () => void

    loadingView?: ReactNode
    errorView?: (error: Error | unknown, retry?: () => void) => ReactNode

    children: (data: T) => ReactNode

    className?: string
    as?: React.ElementType
}

export function AsyncBoundary<T>({
    isLoading,
    error,
    data,
    onRetry,
    loadingView,
    errorView,
    children,
    className,
    as: Component = 'div',
}: AsyncBoundaryProps<T>) {
    // 1. Handling loading state
    if (isLoading && !data) {
        if (className) {
            return <Component className={className}>{loadingView ?? <DefaultLoading />}</Component>
        }
        return <>{loadingView ?? <DefaultLoading />}</>
    }

    // 2. Handling Error state
    if (error) {
        const content = errorView
            ? errorView(error, onRetry)
            : <DefaultError error={error} onRetry={onRetry} />

        if (className) {
            return <Component className={className}>{content}</Component>
        }
        return <>{content}</>
    }

    // 3. Success state
    // We check if data exists to satisfy TypeScript
    if (data) {
        if (className) {
            return <Component className={className}>{children(data)}</Component>
        }
        return <>{children(data)}</>
    }

    return null
}


const DefaultError = ({
    error,
    onRetry
}: {
    error: Error | unknown,
    onRetry?: () => void
}) => {
    const message = error instanceof Error ? error.message : 'An error occurred'

    return (
        <div className="flex flex-col items-center justify-center p-4 gap-4">
            <div className="text-center text-red-500">
                <p>{message}</p>
            </div>
            {/* Only show button if a retry function was provided */}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                    Try Again
                </button>
            )}
        </div>
    )
}


const DefaultLoading = () => (
    <div className="flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
            <span className="text-sm text-gray-500">Loading...</span>
        </div>
    </div>
)