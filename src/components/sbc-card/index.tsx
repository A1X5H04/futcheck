import { Link } from "react-router";
import { Repeat2Icon, ClockIcon, GiftIcon, SwordIcon } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn, getTimeUntilExpiration } from "@/lib/utils";
import { urlBuilder } from "@/lib/helpers";

interface SbcData {
    name: string;
    description: string;
    challengesCount: number;
    setImageId?: string;
    endTimeStamp?: string;
    endTime: number;
    totalCost?: number;
    setid: number | string;
    rewards?: Array<{ itemType: string; id: string; name?: string }>;
    repeatability?: number;
    releaseTime?: number;
}

interface SbcCardMinimalProps {
    data: SbcData;
    className?: string;
    isNew?: boolean;
    isExpiringSoon?: boolean;
}

const SbcCardMinimal = ({ data, className, isNew, isExpiringSoon }: SbcCardMinimalProps) => {
    const {
        name,
        description,
        challengesCount,
        endTimeStamp,
        endTime,
        totalCost,
        setid,
        rewards,
        repeatability,
    } = data;

    const isExpired = endTime !== 0 && endTimeStamp && new Date(endTimeStamp).getTime() < Date.now();
    const timeRemaining = endTime === 0
        ? "No Expiry"
        : !endTimeStamp || isExpired
            ? "Expired"
            : getTimeUntilExpiration(endTimeStamp);

    // Get reward info
    const packReward = rewards?.find((r) => r.itemType !== "player");
    const playerReward = rewards?.find((r) => r.itemType === "player");
    const rewardName = packReward?.name || playerReward?.name;

    return (
        <Link to={`/sbc/${setid}`} className={cn("block group", className)}>
            <Card className="relative gap-0 py-0 h-full border border-border/40 rounded-xl overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:bg-card/70 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-0.5">
                <div className="absolute top-3 right-2 flex items-center gap-1.5">
                    {isNew && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-800/90 text-emerald-400 rounded-md shadow-sm">
                            New
                        </span>
                    )}
                    {isExpiringSoon && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-amber-800/90 text-amber-400 rounded-md shadow-sm">
                            Expiring
                        </span>
                    )}
                    {totalCost != null && totalCost > 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black text-xs font-medium text-amber-400">
                            <i className="fc-icon icon-coin" />
                            <span>{totalCost}</span>
                        </div>
                    )}
                </div>



                <CardContent className="relative flex gap-4 px-4 pt-8 pb-3">

                    <div className="shrink-0 w-20 h-20 md:w-[88px] md:h-[88px] flex items-center justify-center">
                        <img
                            src={urlBuilder.dynamic("sbc", setid)}
                            alt={name}
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "src/assets/sbc-icon_placeholder.png";
                            }}
                            className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>


                    <div className="flex-1 min-w-0 flex flex-col py-0.5">

                        <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 mb-1 group-hover:text-white transition-colors">
                            {name}
                        </h3>

                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1">
                            {description}
                        </p>

                        {rewardName && (
                            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                                <GiftIcon className="size-5 text-purple-400/70" />
                                <span className="truncate">{rewardName}</span>
                            </div>
                        )}
                    </div>

                </CardContent>


                <CardFooter className="relative border-t border-border/20 p-4 flex justify-between bg-black/30">

                    <div className="flex items-center gap-2">
                        <SwordIcon className="size-5 text-muted-foreground" />
                        <div className="flex flex-col leading-none">
                            <span className="text-muted-foreground/70 text-[9px] uppercase tracking-wider font-medium">Challenges</span>
                            <span className="text-foreground text-xs font-medium mt-0.5">{challengesCount}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ClockIcon className={cn(
                            "size-5 text-muted-foreground/60",
                            isExpiringSoon && !isExpired && "text-amber-500/70"
                        )} />
                        <div className="flex flex-col leading-none">
                            <span className="text-muted-foreground/70 text-[9px] uppercase tracking-wider font-medium">Expires</span>
                            <span className={cn(
                                "text-xs font-medium mt-0.5",
                                isExpired ? "text-red-400" : isExpiringSoon ? "text-amber-400" : "text-foreground"
                            )}>
                                {timeRemaining}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Repeat2Icon className="size-5 text-muted-foreground/60" />
                        <div className="flex flex-col leading-none">
                            <span className="text-muted-foreground/70 text-[9px] uppercase tracking-wider font-medium">Repeatable</span>
                            <span className="text-foreground text-xs font-medium mt-0.5">
                                {repeatability ?? "-"}
                            </span>
                        </div>
                    </div>
                </CardFooter>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-500 via-violet-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </Card>
        </Link>
    );
};

export default SbcCardMinimal;
