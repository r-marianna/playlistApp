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

  test('Total duration of all tracks in "Your Playlist" is accurately calculated', async ({ page }) => {
    await playlistPage.clickPlusButtonForAllAndAssert(list)
    // const total = await playlistPage.calculateTotalInThePlaylist();
    await playlistPage.assertTotalTimeIsCorrect('1030');
  });

})