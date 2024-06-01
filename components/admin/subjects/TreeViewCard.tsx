// next imports
import Image from "next/image";
type Props = {
  data: any;
};
const BookCard = ({ data }: Props) => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="">
          <div className="mt-1">
            <Image width={60} height={60} src="/icon/folder.png" alt="" />
          </div>
          <div>
            <div className="text-center">{data.title}</div>
            <div className="">{data.description}</div>
          </div>
        </div>
        <div className=""></div>
      </div>
    </>
  );
};
export default BookCard;
