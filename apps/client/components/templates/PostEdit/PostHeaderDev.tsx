import { useContext, useEffect, useRef, useState } from "react";

import ContentEditable from "react-contenteditable";
import clsx from "clsx";
import FaWhatsapp from "@meronex/icons/fa/FaWhatsapp";
import FaTwitter from "@meronex/icons/fa/FaTwitter";
import FaFacebook from "@meronex/icons/fa/FaFacebook";
import MdBookmarkBorder from "@meronex/icons/md/MdBookmarkBorder";
import MdInsertLink from "@meronex/icons/md/MdInsertLink";

import Typography from "../../atoms/Typography";
import CatIcon from "../../atoms/Icons/CatIcon";

import api from "../../../core/services/api";
import colors from "../../../core/constants/colors";
import UIContext from "../../../core/contexts/UIContext";

import { PostHeaderDevProps } from "./interfaces";
import PostViewstyles from "../PostView/styles.module.scss";
import styles from "./styles.module.scss";
import TextField from "../../atoms/TextField";
import TimeAgo from "../../../core/helpers/timeago";
import { uploadImage } from "../../../core/helpers/uploadImage";

const PostHeaderDev = (props: PostHeaderDevProps) => {
  const {
    category,
    title,
    blurb,
    img,
    author,
    handleChange,
    slug,
    url: refUrl,
    postedAt,
  } = props;
  const [image, setImage] = useState<FileList | null>(null);
  const imgUploadRef = useRef<HTMLInputElement>(null);
  const { uiDispatch: dispatch } = useContext(UIContext);

  function renderDefaultImages() {
    const imgs = [...Array(14)].map((_, index) => {
      const url = `https://assets.5pots.com/file/cincopots/posts/${index}.jpg`;
      return (
        <img
          key={`defaultimage-${index}`}
          src={url}
          onClick={() => handleChange("img", url)}
        />
      );
    });

    return imgs;
  }

  function handleImageUpload(urls: string[]) {
    handleChange("img", urls[0]);
  }

  useEffect(() => {
    function handleSubmitFile() {
      const token = localStorage.getItem("token");

      if (image && token)
        uploadImage(image, token, dispatch, false, true, handleImageUpload);
    }

    if (image) handleSubmitFile();
  }, [image]);

  return (
    <div className={PostViewstyles["post-header"]}>
      <div className={PostViewstyles["post-header__content"]}>
        <div className={PostViewstyles["post-header__content__cat"]}>
          <div>
            <Typography component="p" variant="p">
              Categoria
            </Typography>
            <Typography component="p" variant="p">
              <ContentEditable
                tagName="span"
                html={category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={styles.editable}
              />
            </Typography>
          </div>
          <CatIcon stroke={colors[category]} />
        </div>
        <Typography
          component="h1"
          variant="h2"
          className={PostViewstyles["post-header__content__title"]}
        >
          <ContentEditable
            tagName="span"
            html={title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={styles.editable}
          />
        </Typography>
        <Typography
          component="p"
          variant="h4"
          className={PostViewstyles["post-header__content__blurb"]}
        >
          <ContentEditable
            tagName="span"
            html={blurb}
            onChange={(e) => handleChange("blurb", e.target.value)}
            className={styles.editable}
          />
        </Typography>
        <div className={PostViewstyles["post-header__content__details"]}>
          <Typography component="p" variant="p">
            Por:{" "}
            <strong style={{ color: colors[category] }}>
              <ContentEditable
                tagName="span"
                html={author}
                onChange={(e) => handleChange("author", e.target.value)}
                className={styles.editable}
              />
            </strong>
          </Typography>

          <Typography component="p" variant="p">
            <em>
              Postado há{" "}
              {TimeAgo.inWords && TimeAgo.inWords(Date.parse(postedAt))}{" "}
              {refUrl && (
                <a href={refUrl} target="_blank" rel="noopener noreferrer">
                  {category === "pbe"
                    ? "no surrender at 20"
                    : "no site oficial"}
                </a>
              )}
            </em>
          </Typography>
        </div>
        <div className={PostViewstyles["post-header__content__social"]}>
          <FaWhatsapp /> <FaTwitter /> <FaFacebook />
        </div>
      </div>

      <div
        onClick={() => imgUploadRef.current?.click()}
        className={clsx(
          PostViewstyles["post-header__img"],
          styles["editable--background-img"]
        )}
        style={{ backgroundImage: `url("${img}")` }}
      />
      <div className={styles["default-images"]}>{renderDefaultImages()}</div>
      <div className={styles["controls"]}>
        <TextField
          icon={MdBookmarkBorder}
          label="slug"
          defaultValue={slug}
          type="text"
          name="slug"
          onChange={(e) => handleChange("slug", e.target.value)}
        />
        <TextField
          icon={MdInsertLink}
          label="link referência"
          defaultValue={refUrl}
          type="text"
          name="link"
          onChange={(e) => handleChange("url", e.target.value)}
        />
      </div>
      <input
        ref={imgUploadRef}
        className={styles["editable--invisible"]}
        type="file"
        onChange={(e) => setImage(e.target.files)}
      />
    </div>
  );
};

export default PostHeaderDev;
