import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import styles from "./stype.module.scss";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { slugify } from "@/utils/common";

const InfluencerCard = ({ influencer }) => {
  return (
    <div
      className={`relative rounded-lg h-[429px]  overflow-hidden group shadow-lg ${styles["influencer-card"]} `}
    >
      <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden bg-white cursor-pointer">
        <Image
          src={"/images/temp/1.jpg"}
          // alt={hit?.name}
          className="object-cover"
          fill
          quality={95}
        />
      </div>

      <div
        className={`absolute z-10 bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg transition-transform ease-in-out duration-300 rounded-t-lg ${styles["influencer-details"]}`}
      >
        <h3 className="flex items flex-nowrap text-2xl leading-tight font-semibold text-brand-blue-700">
          <span className="mr-2 line-clamp-1">
            {influencer.firstName} {influencer.lastName}
          </span>
          <Image
            src={"/images/icons/verified.svg"}
            width={13}
            height={14}
            alt=""
          />
        </h3>
        {/* <span className="block text-sm text-brand-gray mb-4">
          Social media creator
        </span> */}
        <div className="flex  w-full items-center gap-0.5 mb-4">
          <IoLocationOutline className="text-brand-theme-500" />
          <span className="text-sm text-brand-gray font-medium">
            {influencer.city}, India
          </span>
        </div>
        <div>
          {/* {therapistAvailability && (
            <div className="w-full pt-4">
              <div
                className={`flex items-center px-4 w-full py-2.5  rounded ${therapistAvailability.textColor} ${therapistAvailability.bgColor} `}
              >
                <span
                  className={`rounded-full inline-block ${therapistAvailability.dotColor} w-2 h-2 mr-2`}
                />
                <span className="text-sm">{therapistAvailability.text}</span>
              </div>
            </div>
          )} */}
          {/* <div
            className="text-base text-brand-neutral mt-4 h-[144px] line-clamp-6 overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: hit?.content?.excerpt,
            }}
          /> */}
          <div className="flex items-center gap-y-2 gap-x-4 flex-wrap">
            {/* <div className="flex  w-full items-center gap-0.5">
              <IoLocationOutline className="text-brand-theme-500" />
              <span className="text-sm text-brand-blue-700 font-medium">
                Mumbai, India
              </span>
            </div> */}
            <div className="flex items-center w-full gap-1">
              <FaRegEye className="text-brand-theme-500" />
              <span className="text-sm text-brand-blue-700 font-medium">
                {influencer.averageInstagramViews / 1000}k average views
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaInstagram className="text-brand-theme-500" />
              <span className="text-sm text-brand-blue-700 font-medium">
                {influencer.instagramFollowers / 1000}k followers
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegHeart className="text-brand-theme-500" />
              <span className="text-sm text-brand-blue-700 font-medium">
                {influencer.averageInstagramLikes / 1000}k average likes
              </span>
            </div>
          </div>
          <Link
            href={`/creators/${influencer._id}/${slugify(
              influencer.firstName
            )}`}
            className="button--primary w-full inline-block mt-6"
          >
            View profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfluencerCard;
