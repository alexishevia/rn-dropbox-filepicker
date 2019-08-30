import { Dropbox } from "dropbox";

const getFileType = entry => {
  const tag = entry[".tag"];
  if (tag === "file" && entry.is_downloadable) return "file";
  if (tag === "folder") return "directory";
  return "unknown";
};

const dropboxEntryToNode = entry => ({
  fileType: getFileType(entry),
  path: entry.path_lower,
  name: entry.name
});

export default async function dropboxLoadDir({ accessToken, path }) {
  const dropbox = new Dropbox({ fetch: global.fetch, accessToken });
  const { entries } = await dropbox.filesListFolder({ path });
  return {
    contents: entries.map(dropboxEntryToNode)
  };
}
