interface Post {
  __v: number;
  _id: string;
  author: string;
  subTitles: string[];
  title: string;
  champions: string[];
  img: string;
  blurb: string;
  category: string;
  type: string;
  url: string;
  postedAt: string;
  slug: string;
  sections: {
    titles: string[];
    content: string | [];
    champions: ChampionChange[];
  }[];
}

interface Champion {
  abilities: {
    base?: string;
    p: string;
    q: string;
    w: string;
    e: string;
    r: string;
  };
  championName: string;
  tags: string[];
  title: string;
}

interface User {
  id: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  username: string;
}

interface ChampionChange {
  name: string;
  resume: string;
  context: string;
  changes: { stat: AbilityKey; blocks: ChangeBlockProps["block"][] }[];
  goal: string;
}

interface PostContentI {
  champions: ChampionChange[];
  skins: {
    name: string;
    id: string;
  }[];
}

type AbilityKey = "q" | "w" | "e" | "r" | "p" | "base";

interface PostsPageProps {
  post: Post;
  champions: Champion[];
  postContent: PostContentI;
}

interface StaticPropsParams {
  params: { slug: string };
}

interface HomeProps {
  posts: Post[];
}
