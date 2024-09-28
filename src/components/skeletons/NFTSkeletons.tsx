import { PiImages, FaArrowRight } from '@/components/icons';
import { Skeleton } from '../ui/skeleton';

const NFTSkeletons = () => {
  return (
    <div className="bg-white shadow-sm h-36 rounded-lg p-3">
				<p className="font-semibold text-xl items-center flex">
					<PiImages className="mr-1" /> NFTs
				</p>
				<div className="nft-preview py-5">
					<div className="flex justify-center items-center gap-3">
						<Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
						<Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
						<Skeleton className="h-16 w-16 rounded-xl bg-slate-200" />
						<span className="h-12 w-12 items-center flex justify-center bg-gray-200 rounded-xl">
							<FaArrowRight className="text-gray-700" />
						</span>
					</div>
				</div>
			</div>
  )
}

export default NFTSkeletons