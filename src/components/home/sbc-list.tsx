import type { SBCData } from '@/types/sbc'
import SBCCard from '../sbc-card'
import SectionHeader from '../common/section-header'
import { useGetSBCsQuery } from '@/redux/apis/home.api'
import { AsyncBoundary } from '../common/async-boundary'

function SBCList() {
    const { data: sbcs, isLoading, error } = useGetSBCsQuery("")

    return (
        <>
            <SectionHeader
                title="LATEST SBCS"
                description='Freshly added squad building challenges'
            />
            <AsyncBoundary className='pb-4' data={sbcs?.data} isLoading={isLoading} error={error}>
                {(data) => (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {data?.slice(0, 9).map((sbc: any) => (
                            <SBCCard key={sbc.setid} data={sbc} />
                        ))}
                    </div>
                )}
            </AsyncBoundary>
        </>
    )
}

export default SBCList