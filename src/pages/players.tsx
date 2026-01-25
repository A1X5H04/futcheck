import PageHeader from '@/components/common/page-header'
import { Button } from '@/components/ui/button'

function PlayersPage() {
    return (
        <div>
            <PageHeader
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Players" }]}
                heading="Players"
                description="Browse and discover all FIFA Ultimate Team players. Filter by rating, position, nation, and more."

            />
            <div className='flex gap-5 p-5'>
                <div className='p-5 border'>
                    Filter Page
                </div>
                <div className='flex-1 p-5 border'>
                    Player Grid
                </div>
            </div>
        </div>
    )
}

export default PlayersPage