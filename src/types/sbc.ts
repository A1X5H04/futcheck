export interface SBCData {
    setid: number | string;
    name: string;
    description: string;
    challengesCount: number;
    setImageId?: string;
    endTimeStamp?: string;
    endTime: number;
    totalCost?: number;
    rewards?: Array<{ itemType: string; id: string; name?: string }>;
    repeatability?: number;
    releaseTime?: number;
}