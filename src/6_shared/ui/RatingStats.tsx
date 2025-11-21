interface RatingStatsProps {
    averageRating: number;
    ratings: number[];
    totalRatings: number;
}

const RatingStats = ({averageRating, ratings, totalRatings} : RatingStatsProps) => {


    return (
        <div className="bg-[#0f1236] text-white w-full max-w-xl p-8 rounded-xl">
            <div className="text-center mb-4">
                <h1 className="text-6xl font-bold">{averageRating}</h1>
                <p className="text-xl font-medium mt-1">
                    {averageRating >= 4.5 ? "Excellent" : "Good"}
                </p>
                <p className="opacity-70 mt-1">{totalRatings} ratings</p>
            </div>

            <div className="space-y-3 mt-6">
                {ratings.map((rate, index) => {
                    const percent = (rate / totalRatings) * 100;

                    return (
                        <div key={index+1} className="flex items-center gap-3">
                            <div className="w-6 flex items-center gap-1 opacity-90">
                                {index+1} <span>★</span>
                            </div>

                            <div className="w-full h-2 bg-[#1c2252] rounded overflow-hidden">
                                <div
                                    className="h-full bg-blue-500"
                                    style={{ width: `${Math.max(percent, 3)}%` }}
                                />
                            </div>

                            <div className="w-8 text-right opacity-80">
                                {index+1}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RatingStats;
