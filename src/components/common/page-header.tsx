import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';

type AccentColor = 'purple' | 'emerald' | 'amber' | 'blue' | 'rose';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    heading: string;
    description?: string;
    className?: string;
    /** Breadcrumb navigation items */
    breadcrumbs?: BreadcrumbItem[];
    /** Optional right-side content (buttons, actions, etc.) */
    actions?: ReactNode;
    /** Show the subtle stadium background */
    showBackground?: boolean;
}


function PageHeader({
    heading,
    description,
    className,
    breadcrumbs,
    actions,
    showBackground = true,
}: PageHeaderProps) {

    return (
        <header className={cn("relative overflow-hidden border-b border-border/40", className)}>
            {showBackground && (
                <>
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-[url('/src/assets/images/page_header_bg.jpg')] bg-cover bg-right bg-no-repeat opacity-[0.15]"
                    />
                    {/* Radial gradient fade overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 0%, var(--background) 70%)',
                        }}
                    />
                </>
            )}

            {/* Dot Grid - subtle, fades radially from left */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, oklch(0.7 0.15 300 / 0.25) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    maskImage: 'radial-gradient(ellipse 70% 70% at 0% 50%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 0% 50%, black 0%, transparent 70%)',
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 px-6 py-10 md:py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <nav aria-label="Breadcrumb" className="mb-3">
                            <ol className="flex items-center gap-1.5 text-xs">
                                <li>
                                    <Link
                                        to="/"
                                        className="flex items-center text-muted-foreground/60 hover:text-foreground transition-colors"
                                    >
                                        <HomeIcon className="size-3.5" />
                                    </Link>
                                </li>
                                {breadcrumbs.map((crumb, index) => (
                                    <li key={index} className="flex items-center gap-1.5">
                                        <ChevronRightIcon className="size-3 text-muted-foreground/30" />
                                        {crumb.href ? (
                                            <Link
                                                to={crumb.href}
                                                className="text-muted-foreground/60 hover:text-foreground transition-colors"
                                            >
                                                {crumb.label}
                                            </Link>
                                        ) : (
                                            <span className="font-medium text-purple-500">
                                                {crumb.label}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    )}

                    {/* Main Content Row */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-8">
                        {/* Left: Heading & Description */}
                        <div className="flex-1 min-w-0">
                            {/* Heading with accent underline */}
                            <div className="inline-block">
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                    {heading}
                                </h1>
                                {/* Accent underline */}
                                <div className="h-0.5 w-12 mt-2 rounded-full bg-purple-500" />
                            </div>

                            {/* Description */}
                            {description && (
                                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                                    {description}
                                </p>
                            )}
                        </div>

                        {/* Right: Actions Slot */}
                        {actions && (
                            <div className="shrink-0 flex items-center gap-2">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default PageHeader;
