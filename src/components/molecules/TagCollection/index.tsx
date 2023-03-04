import { FC, ReactNode } from "react";
import { Tag, TagProps } from "@/components/atoms/Tag";

export interface TagColectionProps {
  tags?: TagProps[];
  children?: ReactNode;
  variant?: keyof typeof variants;
}

const variants = {
  "1-row": "flex gap-2",
  "2-rows": "grid grid-cols-2 gap-2",
};

export const TagCollection: FC<TagColectionProps> = ({
  tags = [],
  variant = "1-row",
  children,
}) => {
  return (
    <div className={variants[variant]}>
      {tags?.map((tag, index) => {
        return <Tag key={index} {...tag} />;
      })}
      {children}
    </div>
  );
};
