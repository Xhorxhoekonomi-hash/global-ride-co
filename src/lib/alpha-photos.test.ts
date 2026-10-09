import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { ALPHA_PHOTOS, ALPHA_ALBUMS, PHOTO_SELECTIONS, albumsForPhotos } from "./alpha-photos";

describe("owner-original photography rules", () => {
  test("all 30 original photos remain navigable exactly once", () => {
    const original = ALPHA_PHOTOS.map((photo) => photo.src);
    const grouped = ALPHA_ALBUMS.flatMap((album) => album.photos.map((photo) => photo.src));
    assert.equal(original.length, 30);
    assert.equal(grouped.length, 30);
    assert.equal(new Set(grouped).size, 30);
    assert.deepEqual([...grouped].sort(), [...original].sort());
  });
  test("every curated subject is an owner-original manifest photo", () => {
    for (const photo of Object.values(PHOTO_SELECTIONS)) assert.equal(ALPHA_PHOTOS.includes(photo), true);
    assert.equal(PHOTO_SELECTIONS.urus.src.endsWith("/alpha-img_7334.jpg"), true);
    assert.equal(PHOTO_SELECTIONS.transporter.src.endsWith("/alpha-img_6549.jpg"), true);
  });
  test("uncorroborated Rolls-Royce sessions remain separate", () => {
    const sessions = ALPHA_ALBUMS.filter((album) => album.id.startsWith("rolls-"));
    assert.equal(sessions.length, 3);
    assert.equal(sessions.every((album) => album.photos.length === 1), true);
  });
  test("container subsets only expose requested original photos", () => {
    const subset = ALPHA_PHOTOS.filter((photo) => photo.container);
    assert.deepEqual(albumsForPhotos(subset).flatMap((album) => album.photos).map((photo) => photo.src).sort(), subset.map((photo) => photo.src).sort());
  });
});
