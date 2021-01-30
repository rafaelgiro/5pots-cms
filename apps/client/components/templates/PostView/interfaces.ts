export interface PostViewProps {
  post: Post;
  champions: Champion[];
}

export interface PostBodyProps {
  sections: Post["sections"];
  titles: string[];
  title: Post["title"];
  category: Post["category"];
  champions: Champion[];
}

export interface PostHeaderProps {
  category: Post["category"];
  title: Post["title"];
  blurb: Post["blurb"];
  img: Post["img"];
  author: Post["author"];
  url: Post["url"];
  postedAt: Post["postedAt"];
}
