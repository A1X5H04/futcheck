import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { Button } from "@/components/ui/button";

import { HomeIcon } from "lucide-react"

export default function RootErrorPage() {
    const error = useRouteError();

    let errorMessage = "Something went wrong";
    let errorStatus = "Error";
    let errorDetails = "We couldn't find what you're looking for.";

    if (isRouteErrorResponse(error)) {
        errorStatus = `${error.status}`;
        errorMessage = error.statusText || "Page Not Found";

        if (error.status === 404) {
            errorDetails = "The page you're looking for doesn't exist.";
        } else if (error.status === 500) {
            errorDetails = "Our servers encountered an error. Please try again later.";
        } else if (error.status === 403) {
            errorDetails = "You don't have permission to access this page.";
        }
    } else if (error instanceof Error) {
        errorMessage = error.message;
        errorDetails = "An unexpected error occurred.";
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center px-4 bg-[url('/src/assets/images/website_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed ">
            <div
                className='absolute inset-0 pointer-events-none z-0'
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, var(--base-100) 70%)'
                }}
            />
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="space-y-3">
                    <h1 className="text-7xl font-bold tracking-tight text-foreground sm:text-8xl">
                        {errorStatus}
                    </h1>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {errorMessage}
                    </h2>
                    <p className="text-base text-muted-foreground sm:text-lg">
                        {errorDetails}
                    </p>
                </div>
                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild variant="default">
                        <Link to="/">
                            <HomeIcon />
                            Go Home
                        </Link>
                    </Button>


                    <Button variant="link"
                        onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                    Need help? Contact our support team
                </p>
            </div>
        </div>
    );
}