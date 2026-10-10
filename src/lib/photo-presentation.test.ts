import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { ALPHA_PHOTOS, PHOTO_SELECTIONS } from "./alpha-photos";
import { ownerPhoto, photoPresentation } from "./photo-presentation";

describe("shared original-photo presentation", () => {
  test("all originals resolve to positive dimensions and responsive focal points", () => {
    for (const photo of ALPHA_PHOTOS) {
      const layout = photoPresentation(photo);
      assert.equal(ownerPhoto(photo.src), photo);
      assert.ok(layout.width > 0 && layout.height > 0);
      assert.match(layout.focalDesktop, /^\d+% \d+%$/);
      assert.match(layout.focalMobile, /^\d+% \d+%$/);
      assert.equal(layout.photo.src, photo.src);
    }
    assert.equal(ownerPhoto("unknown-photo"), undefined);
  });
  test("landscape container and portrait transporter retain their distinct geometry", () => {
    const container = photoPresentation(PHOTO_SELECTIONS.container);
    assert.equal(container.format, "landscape");
    assert.equal(container.width, 1024);
    assert.equal(container.height, 768);
    assert.equal(photoPresentation(PHOTO_SELECTIONS.transporter).featureMobileRatio, "1 / 1");
  });
});