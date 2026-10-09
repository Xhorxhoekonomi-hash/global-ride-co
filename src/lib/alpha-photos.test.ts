import { describe, expect, test } from "bun:test";
import { ALPHA_PHOTOS, ALPHA_ALBUMS, PHOTO_SELECTIONS, albumsForPhotos } from "./alpha-photos";

describe("owner-original photography rules", () => {
  test("all 30 original photos remain navigable exactly once", () => {
    const original = ALPHA_PHOTOS.map((photo) => photo.src);
    const grouped = ALPHA_ALBUMS.flatMap((album) => album.photos.map((photo) => photo.src));
    expect(original.length).toBe(30);
    expect(grouped.length).toBe(30);
    expect(new Set(grouped).size).toBe(30);
    expect(grouped.toSorted()).toEqual(original.toSorted());
  });
  test("every curated subject is an owner-original manifest photo", () => {
    for (const photo of Object.values(PHOTO_SELECTIONS)) expect(ALPHA_PHOTOS.includes(photo)).toBe(true);
    expect(PHOTO_SELECTIONS.urus.src.endsWith("/alpha-img_7334.jpg")).toBe(true);
    expect(PHOTO_SELECTIONS.transporter.src.endsWith("/alpha-img_6549.jpg")).toBe(true);
  });
  test("uncorroborated Rolls-Royce sessions remain separate", () => {
    const sessions = ALPHA_ALBUMS.filter((album) => album.id.startsWith("rolls-"));
    expect(sessions.length).toBe(3);
    expect(sessions.every((album) => album.photos.length === 1)).toBe(true);
  });
  test("container subsets only expose requested original photos", () => {
    const subset = ALPHA_PHOTOS.filter((photo) => photo.container);
    expect(albumsForPhotos(subset).flatMap((album) => album.photos).map((photo) => photo.src).toSorted()).toEqual(subset.map((photo) => photo.src).toSorted());
  });
});
