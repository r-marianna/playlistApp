import { test, expect } from "@playwright/test";
import { PlaylistPage } from "../src/ui/pages/PlaylistPage";
import { listOfSongs } from "../src/common/testData/listOfSongs";

test.describe('Add Track Using "+" Button', () => {
  let playlistPage;
  let list;

  test.beforeEach(async ({ page }) => {
    playlistPage = new PlaylistPage(page);
    list = listOfSongs();

    await playlistPage.open();
  });

  test('Add a single track using the "+" button for a given track', async () => {
    await playlistPage.clickPlusButton();
    await playlistPage.assertTrackAppears(list[0]);
  });

  test('Verify track added to the “Your Playlist” list', async () => {
    await playlistPage.clickPlusButtonForAllAndAssert(list);
  });

})