export default function RootErrorPage() {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="text-white font-bold">
                Oops! Something went wrong.
            </div>
            <a className="text-white bg-fuchsia-400 rounded px-2 mt-3" href="/">
                <button>Go Home</button>
            </a>
        </div>
    )
}