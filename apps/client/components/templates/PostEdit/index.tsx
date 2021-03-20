import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import MdDashboard from "@meronex/icons/md/MdDashboard";
import MdDeveloperMode from "@meronex/icons/md/MdDeveloperMode";

import PostHeaderDev from "./PostHeaderDev";
import PostBodyDev from "./PostBodyDev";
import SavePostButton from "./SavePostButton";
import EditContext from "./EditContext";
import UIContext from "../../../core/contexts/UIContext";
import debouce from "../../../core/helpers/debouce";
import api from "../../../core/services/api";

import { PostEditProps } from "./interfaces";
import postViewStyles from "../PostView/styles.module.scss";
import styles from "./styles.module.scss";
import { defaultChampionChange } from "./helpers";
import ChampionChange from "../../molecules/ChampionChange";

const PostEdit = (props: PostEditProps) => {
  const { post, champions, allChampions } = props;
  const [postState, setPostState] = useState(post);
  const [hasChanged, setHasChanged] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const { uiDispatch: dispatch } = useContext(UIContext);
  const {
    category,
    title,
    blurb,
    img,
    author,
    url,
    sections,
    subTitles,
    postedAt,
    slug: postSlug,
    type,
  } = postState;
  const championSectionIndex = postState.sections.findIndex(
    (section) => section.champions
  );

  function handleChange(key: string, value: string) {
    const newPost = { ...postState };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    newPost[key] = value;

    setPostState(newPost);
    if (!hasChanged) setHasChanged(true);
  }

  function handleChampionChange(newChange: ChampionChange) {
    const champIndex = postState.sections[
      championSectionIndex
    ].champions?.findIndex((champ) => champ.name === newChange.name);

    const newState = { ...postState };
    newState.sections[championSectionIndex].champions[champIndex] = newChange;

    setPostState(newState);
    if (!hasChanged) setHasChanged(true);
  }

  function handleNewChampion(champion: string) {
    if (postState.champions.includes(champion)) return;

    const newState = { ...postState };
    newState.sections[championSectionIndex].champions.push({
      ...defaultChampionChange,
      name: champion,
    });

    setPostState(newState);
    if (!hasChanged) setHasChanged(true);
  }

  function handleDeleteChampion(champion: string) {
    const champIndex = postState.sections[
      championSectionIndex
    ].champions?.findIndex((champ) => champ.name === champion);

    const newState = { ...postState };

    newState.sections[championSectionIndex].champions.splice(champIndex, 1);

    setPostState(newState);
    if (!hasChanged) setHasChanged(true);
  }

  function handleUpdate() {
    if (hasChanged) {
      const token = localStorage.getItem("token");

      dispatch({ type: "OPEN_LOADING" });

      api
        .put(
          `/posts/${slug}`,
          { post: postState },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          setHasChanged(false);
          setPostState(res.data);

          if (res.data.slug !== slug) {
            router.push(`/posts/${res.data.slug}/edit`);
          }
        })
        .catch((err) => {
          dispatch({
            type: "SHOW_SNACKBAR",
            snackbar: {
              msg: err.response.data.message || "Deu ruim mano.",
              variant: "error",
            },
          });
        })
        .finally(() => {
          dispatch({ type: "CLOSE_LOADING" });
        });
    }
  }

  function handleNewFromPaste(championChange: ChampionChange) {
    if (postState.champions.includes(championChange.name)) return;

    const newState = { ...postState };

    newState.sections[championSectionIndex].champions.push(championChange);

    setPostState(newState);
    if (!hasChanged) setHasChanged(true);
  }

  const hasIntro =
    sections[0].content && sections[0].content.slice(0, 3) === "<p>"
      ? ["Introdução", ...subTitles]
      : subTitles;

  return (
    <article
      className={clsx(
        postViewStyles["post-view"],
        postViewStyles[post.category]
      )}
    >
      <EditContext.Provider
        value={{
          json: jsonMode,
          handleChampionChange,
          handleNewChampion,
          handleDeleteChampion,
          postState,
          setPostState,
          championSectionIndex,
          setHasChanged,
          handleNewFromPaste,
        }}
      >
        <PostHeaderDev
          category={category}
          title={title}
          blurb={blurb}
          img={img}
          author={author}
          url={url}
          postedAt={postedAt}
          handleChange={debouce(handleChange, 400)}
          slug={postSlug}
          type={type}
        />
        <PostBodyDev
          sections={sections}
          titles={hasIntro}
          title={title}
          champions={champions}
          type={type}
          allChampions={allChampions}
        />
        <SavePostButton hasChanged={hasChanged} handleUpdate={handleUpdate} />
        <div className={styles["json-mode"]}>
          <MdDeveloperMode
            className={clsx(jsonMode && styles["json-mode--active"])}
            onClick={() => setJsonMode(true)}
          />
          <MdDashboard
            className={clsx(!jsonMode && styles["json-mode--active"])}
            onClick={() => setJsonMode(false)}
          />
        </div>
      </EditContext.Provider>
    </article>
  );
};

export default PostEdit;
