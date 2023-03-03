import { FC, Fragment } from "react";
import { fonts, TextSize } from "@/config/fonts";
import { Heading } from "@/components/molecules/Heading";
import { Paragraph } from "@/components/molecules/Paragraph";
import styles from "./Typography.module.css";

export const Typography: FC = () => {
  const textSize = Object.keys(fonts.text).reverse();

  const getFontSizeAndLineHeight = (fontClass: any) => {
    const textSizes: any = fonts.text;
    const font = textSizes?.[fontClass]?.split(' ') || [];
    const fontSize = font[0]?.replaceAll('text-[', '').replaceAll(']', '');
    const lineHeight = font[1]?.replaceAll('leading-[', '').replaceAll(']', '');

    return `${fontSize} / ${lineHeight}`;
  }

  return (
    <div>
      <div>
        <div className={styles.displayHeading}>
          <div className={styles.leftSide}>Display Heading</div>
          <div className={styles.rightSide}>40px / 48px</div>
        </div>
        <Heading className="mt-3" style={{ fontSize: "64px", lineHeight: "80px", fontWeight: 600 }}>
          Display Heading - Reg - 400
        </Heading>
      </div>
      <div>
        <div className={styles.displayHeading}>
          <div className={styles.leftSide}>Heading 1</div>
          <div className={styles.rightSide}>40px / 48px</div>
        </div>
        <Heading className="mt-3" size="md" fontWeight="regular">
          Heading 1 - Reg - 400
        </Heading>
      </div>
      <div>
        <div className={styles.displayHeading}>
          <div className={styles.leftSide}>Heading 1</div>
          <div className={styles.rightSide}>40px / 56px</div>
        </div>
        <Heading className="mt-3" size="base" fontWeight="light">
          Heading 1 - Light - 300
        </Heading>
      </div>
      <div>
        <div className={styles.displayHeading}>
          <div className={styles.leftSide}>Heading 2</div>
          <div className={styles.rightSide}>32px / 48px</div>
        </div>
        <Heading className="mt-3" size="sm" fontWeight="regular" as="h2">
          Heading 2 - Reg - 400
        </Heading>
      </div>
      <div>
        <div className={styles.displayHeading}>
          <div className={styles.leftSide}>Heading 2</div>
          <div className={styles.rightSide}>32px / 48px</div>
        </div>
        <Heading className="mt-3" size="sm" fontWeight="light" as="h2">
          Heading 2 - Light - 300
        </Heading>
      </div>
      {textSize.map((item: typeof textSize[keyof typeof textSize], index: number) => (
        <Fragment key={index}>
          <div>
            <div className={styles.displayHeading}>
              <div className={styles.leftSide}>Body {index + 1}</div>
              <div className={styles.rightSide}>
                {getFontSizeAndLineHeight(item)}
              </div>
            </div>
            <Paragraph className="mt-3" size={item} fontWeight="regular">
              Body {index + 1} - Reg - 400
            </Paragraph>
          </div>
          <div>
            <div className={styles.displayHeading}>
              <div className={styles.leftSide}>Body {index + 1}</div>
              <div className={styles.rightSide}>
                {getFontSizeAndLineHeight(item)}
              </div>
            </div>
            <Paragraph className="mt-3" size={item} fontWeight="light">
              Body {index + 1} - Light - 300
            </Paragraph>
          </div>
          <div>
            <div className={styles.displayHeading}>
              <div className={styles.leftSide}>Body {index + 1}</div>
              <div className={styles.rightSide}>
                {getFontSizeAndLineHeight(item)}
              </div>
            </div>
            <Paragraph className="mt-3" size={item} fontWeight="light" uppercase>
              Body {index + 1} - UP - Light - 300
            </Paragraph>
          </div>
        </Fragment>
      ))}
    </div>
  );
};
