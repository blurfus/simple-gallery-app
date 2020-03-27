import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MetadataComponentsPage, MetadataDeleteDialog, MetadataUpdatePage } from './metadata.page-object';

const expect = chai.expect;

describe('Metadata e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metadataComponentsPage: MetadataComponentsPage;
  let metadataUpdatePage: MetadataUpdatePage;
  let metadataDeleteDialog: MetadataDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Metadata', async () => {
    await navBarPage.goToEntity('metadata');
    metadataComponentsPage = new MetadataComponentsPage();
    await browser.wait(ec.visibilityOf(metadataComponentsPage.title), 5000);
    expect(await metadataComponentsPage.getTitle()).to.eq('galleryApp.metadata.home.title');
    await browser.wait(ec.or(ec.visibilityOf(metadataComponentsPage.entities), ec.visibilityOf(metadataComponentsPage.noResult)), 1000);
  });

  it('should load create Metadata page', async () => {
    await metadataComponentsPage.clickOnCreateButton();
    metadataUpdatePage = new MetadataUpdatePage();
    expect(await metadataUpdatePage.getPageTitle()).to.eq('galleryApp.metadata.home.createOrEditLabel');
    await metadataUpdatePage.cancel();
  });

  it('should create and save Metadata', async () => {
    const nbButtonsBeforeCreate = await metadataComponentsPage.countDeleteButtons();

    await metadataComponentsPage.clickOnCreateButton();

    await promise.all([
      metadataUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      metadataUpdatePage.setTitleInput('title'),
      metadataUpdatePage.setCommentInput('comment'),
      metadataUpdatePage.locationSelectLastOption()
    ]);

    expect(await metadataUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await metadataUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await metadataUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');

    await metadataUpdatePage.save();
    expect(await metadataUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await metadataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Metadata', async () => {
    const nbButtonsBeforeDelete = await metadataComponentsPage.countDeleteButtons();
    await metadataComponentsPage.clickOnLastDeleteButton();

    metadataDeleteDialog = new MetadataDeleteDialog();
    expect(await metadataDeleteDialog.getDialogTitle()).to.eq('galleryApp.metadata.delete.question');
    await metadataDeleteDialog.clickOnConfirmButton();

    expect(await metadataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
