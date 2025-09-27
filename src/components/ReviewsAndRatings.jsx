import { useState } from "react";
import AverageRatingStars from "./AverageRatingStars";
import RatingFilter from "./RatingFilter";

const ReviewsAndRatings = () => {

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <p className="text-2xl font-semibold">Public Reviews</p>
      <div className="md:text-sm flex items-center gap-3 mt-4">
        <span
          className={`${activeTab === 0 && "font-semibold"} cursor-pointer`}
          onClick={() => setActiveTab(0)}
        >
          All Reviews
        </span>
        <span
          className={`${activeTab === 1 && "font-semibold"} cursor-pointer`}
          onClick={() => setActiveTab(1)}
        >
          Post
        </span>
      </div>
      {/* all reviews */}
      {activeTab === 0 ? (
        <div className="flex md:flex-row flex-col justify-center items-start gap-4">
          {/* avg rating */}
          <div className="md:w-[20%] w-full flex md:items-center justify-center flex-col">
            <p className="text-[40px] mb-3 mt-8 md:ms-0 ms-4">4.5</p>
            <div className="flex flex-col gap-2 text-sm w-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <span className="min-w-4">{index + 1}</span>
                  <RatingProgress width="60%" />
                  <span className="min-w-4">{(index + 1) * 10}</span>
                </div>
              ))}
            </div>
          </div>
          {/* public ratings */}
          <div className="divide-y divide-gray-300 mt-6 md:w-[80%] h-[300px] overflow-y-auto md:px-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="my-4" key={index}>
                <div className="text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXi6kWCo1P3qJAuOnEAs6jWS1Dg1BqRkk8Q&s"
                      alt="profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <span>John Doe</span>
                    <div>
                      <AverageRatingStars value={3} total={5} />
                    </div>
                  </div>
                  <span>8/Aug/2025</span>
                </div>
                <p className="text-sm text-gray-500 mt-2 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Veritatis minus iste dignissimos praesentium asperiores porro
                  ducimus nam inventore, natus veniam. Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit. Deleniti id quas vitae
                  dolore explicabo quod eligendi similique consequuntur
                  assumenda perspiciatis.
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 p-6 bg-gray-100 flex flex-col gap-4 justify-center">
            <textarea className="bg-white outline-none p-3 text-sm resize-none w-full" rows={8} placeholder="Post Your Review"></textarea>
            <RatingFilter />
            <button className="w-fit text-sm hover:bg-black hover:text-white border px-3 py-1 cursor-pointer">Submit</button>
        </div>
      )}
    </div>
  );
};

const RatingProgress = ({ width }) => {
  return (
    <div className="md:w-[150px] w-full h-2 bg-gray-200 rounded-full">
      <div
        className="bg-yellow-400 rounded-full h-full"
        style={{ width: width }}
      ></div>
    </div>
  );
};

export default ReviewsAndRatings;
