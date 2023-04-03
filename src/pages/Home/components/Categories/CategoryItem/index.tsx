import { ReactNode, useState } from "react";

interface Children {
  text: string;
  url: string;
}

interface CategoryItemProps {
  data: {
    title: string;
    icon: ReactNode;
    children?: Children[];
  };
}
function CategoryItem(props: CategoryItemProps) {

  const [isOpen, setIsOpen] = useState(false);

  const handleClickIcon = () => {
    if (!props?.data?.children || props?.data?.children?.length === 0) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative group h-[70px] py-3 px-4 cursor-pointer bg-white rounded-[1rem] border group border-black border-solid flex-1 hover:bg-black ">
      <div
        onClick={handleClickIcon}
        className="flex items-center justify-between"
      >
        <span className="font-semibold group-hover:text-white">
          {props?.data.title}
        </span>
        <div>{props?.data.icon}</div>
        {props?.data?.children &&
          props?.data?.children?.length > 0 &&
          isOpen && (
            <div className="transition-all absolute z-[1000] top-[115%] right-0 h-auto  bg-white shadow-lg rounded-xl">
              <div className="p-2">
                {props?.data?.children?.map((item, idx) => (
                  <div
                    className="py-4 px-6 hover:bg-[#f2f2f7] transition-all"
                    key={idx}
                  >
                    <a href={item?.url}>
                      {item?.text}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default CategoryItem;
