import { OutputBlockData } from "@editorjs/editorjs";

export function customEmbed(block: OutputBlockData) {
  const { service, embed, source } = block.data;
  if (service === "twitter") {
    return `<blockquote class="twitter-tweet"><a href=${source}></a></blockquote>`;
  }
  if (service === "youtube") {
    return `<div class="video-container"><iframe width="560" height="315" src=${embed} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
  }
}

export function customRaw(block: OutputBlockData) {
  return block.data.html;
}
