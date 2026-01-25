import { type ReactNode } from 'react'

interface SectionHeaderProps {
    title: string;
    description: string;
    action?: ReactNode
}


function SectionHeader({ title, description, action }: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between py-6 mb-4 border-b border-white/5">
            <div className="flex items-center gap-4">
                <div className="w-1 h-12 rounded-full bg-linear-to-b from-violet-500 to-indigo-600" />
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-white">
                        {title}
                    </h2>
                    <p className="text-sm text-white/50">
                        {description}
                    </p>
                </div>
            </div>
            <div>
                {action}
            </div>
        </div>
    )
}

export default SectionHeader