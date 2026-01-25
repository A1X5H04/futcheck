import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckIcon, SparklesIcon } from "lucide-react"

const PREMIUM_FEATURES = [
    "Unlimited player searches & filters",
    "Advanced squad builder tools",
    "Real-time market price alerts",
    "Priority access to new features",
    "Ad-free browsing experience",
    "Exclusive Discord community access",
];

interface PremiumDialogProps {
    className?: string;
}

function PremiumDialog({ className }: PremiumDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={cn(
                    "group relative px-3 py-1.5 rounded-lg backdrop-blur-xl border-2 border-emerald-400/30",
                    "bg-linear-to-br from-emerald-900/40 via-black/60 to-black/80",
                    "shadow-lg hover:shadow-emerald-500/20 hover:shadow-xl",
                    "hover:scale-[1.02] transition-all duration-200 ease-out",
                    "cursor-pointer hover:border-emerald-400/50 overflow-hidden shrink-0",
                    className
                )}>

                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    <span className="text-primary font-bold text-sm relative">Go Premium</span>
                </button>
            </DialogTrigger>

            <DialogContent
                className="sm:max-w-md p-0 gap-0 overflow-hidden bg-card border-border/50"
                showCloseButton={true}
            >
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)'
                    }}
                />


                <div className="relative flex flex-col items-start gap-4 px-6 pt-8">

                    <div className="inline-flex  items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="FutCheck"
                            className="h-14 w-auto -mb-2 -mx-2 shrink-0"
                        />
                        <div className="inline-flex items-center gap-x-1.5 px-2 py-0.5 rounded-full border border-emerald-800 ">
                            <SparklesIcon className="w-3 h-3 text-emerald-500" />
                            <span className="text-xs font-bold uppercase tracking-wider text-white">Premium</span>
                        </div>
                    </div>


                    <div className="space-y-2 mt-2">
                        <DialogTitle className="text-xl font-bold text-foreground">
                            Unlock Premium Features
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm">
                            Take your FC 25 experience to the next level with exclusive tools and features.
                        </DialogDescription>
                    </div>
                </div>


                <div className="relative px-6 py-4">
                    <ul className="space-y-3">
                        {PREMIUM_FEATURES.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-3 text-sm text-foreground/90"
                            >
                                <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <CheckIcon className="text-emerald-400 w-3 h-3" />
                                </div>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative px-6 py-5 border-t border-border/30 bg-black/20">
                    <div className="flex flex-col items-center gap-3">
                        <Button
                            size="lg"
                            className="w-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
                        >
                            Buy Now
                        </Button>
                        <p className="text-[11px] text-muted-foreground/70 text-center leading-relaxed">
                            By purchasing, you agree to our{" "}
                            <a href="/terms" className="underline hover:text-muted-foreground transition-colors">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="underline hover:text-muted-foreground transition-colors">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PremiumDialog