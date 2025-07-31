import { test, expect } from "@playwright/test";
import { PlaylistPage } from "../src/ui/pages/PlaylistPage";
import { listOfSongs } from "../src/common/testData/listOfSongs";

test.describe('Search Functionality', () => {
  let playlistPage;
  let list;

  test.beforeEach(async ({ page }) => {
    playlistPage = new PlaylistPage(page);
    list = listOfSongs();

    await playlistPage.open();
  });

  test('Fill the field and check the result', async () => {

    for (let name of list) {
      await playlistPage.fillSearchField(name);
      await playlistPage.assertNameMatchingInput(name);
    }
  });

})