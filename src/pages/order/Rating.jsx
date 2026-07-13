import React, {
    useState,
    useMemo
} from "react";

const Rating = () => {

    const [ratings, setRatings] =
        useState([5, 4, 5]);

    const addRating = (
        value
    ) => {

        setRatings([
            ...ratings,
            value
        ]);

    };

    const averageRating =
        useMemo(() => {

            let total = 0;

            for (
                const rating
                of ratings
            ) {
                total += rating;
            }

            return (
                total /
                ratings.length
            ).toFixed(1);

        }, [ratings]);

    return (
        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-4">
                Average Rating:
                {averageRating}
            </h2>

            <div className="flex gap-2">

                {[1, 2, 3, 4, 5].map(
                    (star) => (

                        <button
                            key={star}
                            onClick={() =>
                                addRating(
                                    star
                                )
                            }
                            className="text-3xl"
                        >
                            ⭐
                        </button>

                    )
                )}

            </div>

        </div>
    );
};

export default Rating;