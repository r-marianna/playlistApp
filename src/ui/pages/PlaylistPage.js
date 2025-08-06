import { test, expect } from "@playwright/test";

export class PlaylistPage {
  constructor(page) {
    this.page = page;
    this.searchField = page.getByRole('textbox', { name: 'Search' });
    this.tracklist = page.locator('#tracklist').locator('.MuiGrid-container');
    this.tracks = this.tracklist.nth(0).first();
    // this.trackName = this.tracklist.nth(0).first().textContent();
    this.plusBtn = this.tracks.getByRole('button', { name: '+' });
    this.tracklistYourPlaylist = page.locator('#playlist').locator('.MuiGrid-container');
    this.tracksYourPlaylist = this.tracklistYourPlaylist.nth(0).first();
    // this.trackNameYourPlaylist = this.tracksYourPlaylist.nth(0).first().textContent();
    this.plusBtnAll = this.tracklist.getByRole('button', { name: '+' });
    this.totalTime = page.locator('#playlist-duration');

  }

  async open() {
    await this.page.goto('/');
  }

  async fillSearchField(name) {
    await test.step('Fill in Search field', async () => {
      await this.searchField.fill(name);
    })
  }

  async clickPlusButton() {
    await test.step('Click plus button', async () => {
      await this.plusBtn.click();
    })
  }

  async assertNameMatchingInput(name) {
    await test.step('Only matching tracks are displayed', async () => {
      await expect(this.tracks).toContainText(name);
      await expect(this.tracklist).toHaveCount(1);
    })
  }

  async assertTrackAppears(name) {
    await test.step('Assert track appears in the list after clicking +', async () => {
      await expect(this.tracksYourPlaylist).toContainText(name);
    })
  }


  async clickPlusButtonForAllAndAssert(list) {
    await test.step('Click plus button for all search results and check', async () => {
      const count = await this.plusBtnAll.count();

      for (let i = 0; i < count; i++) {
        await this.plusBtnAll.nth(i).click();

        await expect(this.tracklistYourPlaylist.nth(i)).toContainText(list[i]);
      }
    }); //hate this one, but here we go, and I don't have enough time to rewrite it
  }

  async calculateTotalInThePlaylist() {
    const count = await this.tracklistYourPlaylist.count();
    let sum = 0;

    for (let i = 0; i < count; i++) {
      // console.log(await this.tracklistYourPlaylist.nth(i).locator('p').nth(1).innerHTML());

      const timeElement = this.tracklistYourPlaylist.nth(i).locator('p').nth(1);
      const timeText = await timeElement.textContent();

      const [minutes, seconds] = timeText.split(':').map(Number);;
      sum += minutes * 60 + seconds;
    }

    return sum;
  }


  async assertTotalTimeIsCorrect() {
    await test.step('Assert track appears in the list after clicking +', async () => {
      const total = await this.calculateTotalInThePlaylist();

      await expect(this.totalTime).toHaveText(String(total));
    })
  }
}


