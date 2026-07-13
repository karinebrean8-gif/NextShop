import React, {
    useState
} from "react";

const Review = () => {

    const [reviews, setReviews] =
        useState([]);

    const [text, setText] =
        useState("");

    const addReview = () => {

        if (
            text.trim() === ""
        ) {
            return;
        }

        const newReview = {
            id: Date.now(),
            text
        };

        setReviews([
            newReview,
            ...reviews
        ]);

        setText("");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">

            <textarea
                className="border w-full p-3"
                rows="4"
                value={text}
                onChange={(e) =>
                    setText(
                        e.target.value
                    )
                }
            />

            <button
                onClick={addReview}
                className="bg-blue-600 text-white px-4 py-2 mt-3 rounded"
            >
                Submit Review
            </button>

            <div className="mt-5">

                {reviews.map(
                    (review) => (
                        <div
                            key={review.id}
                            className="border p-3 mb-2 rounded"
                        >
                            {review.text}
                        </div>
                    )
                )}

            </div>

        </div>
    );
};

export default Review;